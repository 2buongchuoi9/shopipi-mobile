import { accessToken, clientId } from "@/utils/asyncStorage"
import axios, { AxiosError, AxiosHeaders, AxiosInstance, AxiosRequestConfig } from "axios"

// Các kiểu dữ liệu và lớp tùy chỉnh
export type Pagination = {
    total: number
    current: number
    pageSize: number
}

export type ParamsRequest = {
    page?: number | string | null
    size?: number | string | null
    sort?: string | null
    keySearch?: string | null
    [key: string]: any
}

export type Page<T> = {
    content: T[]
    totalPage: number
    currentPage: number
    pageSize: number
    totalElement: number
    last?: boolean
}

export type PayLoad<T> = {
    code: number
    status: string
    message: string
    data: T
}

export class ErrorPayload extends Error {
    code: number
    status: string
    message: string
    data: any

    constructor(payload: PayLoad<any>) {
        super(payload.data ?? payload.message ?? "unknown error")
        this.code = payload.code
        this.status = payload.status
        this.message = payload.message
        this.data = payload.data
    }
}

export class HttpClient {
    private instance: AxiosInstance

    constructor() {
        this.instance = axios.create({
            baseURL: process.env.EXPO_PUBLIC_API_URL + "/api",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
            withCredentials: true,
        })

        this.initializeRequestInterceptor()
        this.initializeResponseInterceptor()
    }

    private async getHeader(): Promise<AxiosHeaders> {
        const headers = new AxiosHeaders()

        const authToken = await accessToken.get()
        const clientID = await clientId.get()

        if (authToken) headers.set("authorization", authToken)
        if (clientID) headers.set("x-client-id", clientID)

        return headers
    }

    private initializeRequestInterceptor() {
        this.instance.interceptors.request.use(
            async (config) => {
                // Kết hợp headers từ getHeader với headers hiện tại trong config
                const headers = await this.getHeader()
                config.headers = new AxiosHeaders({
                    ...headers,
                    ...config.headers,
                })
                return config
            },
            (error) => {
                // Xử lý lỗi trước khi request được gửi đi
                return Promise.reject(error)
            }
        )
    }

    private initializeResponseInterceptor() {
        this.instance.interceptors.response.use(
            (response) => {
                const method = response.config.method?.toUpperCase() || "UNKNOWN_METHOD"
                const url = response.config.url
                const params = response.config.params
                    ? `?${new URLSearchParams(
                          Object.fromEntries(
                              Object.entries(response.config.params)
                                  .filter(([_, v]) => v !== null && v !== undefined)
                                  .map(([k, v]) => [k, String(v)])
                          )
                      ).toString()}`
                    : ""
                console.log(`${method} [${response.status}] ${url}${params}`, response)

                return response.data
            },
            (error: AxiosError<PayLoad<any>>) => {
                console.error("error from axios", error)

                if (error.response) {
                    const { status, code, message, data } = error.response.data

                    throw new ErrorPayload({
                        code: code,
                        status: status,
                        message: message ?? "Unknown error occurred",
                        data: data || null,
                    })
                } else if (error.request) {
                    throw new ErrorPayload({
                        code: 0,
                        status: "error",
                        message: "Network error",
                        data: null,
                    })
                } else {
                    throw new ErrorPayload({
                        code: -1,
                        status: "error",
                        message: error.message ?? "Unknown error occurred",
                        data: null,
                    })
                }
            }
        )
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.instance.get<T>(url, config)
        return response.data
    }

    public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.instance.post<T>(url, data, config)
        return response.data
    }

    public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.instance.put<T>(url, data, config)
        return response.data
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.instance.delete<T>(url, config)
        return response.data
    }
}

const http = new HttpClient()

export default http
