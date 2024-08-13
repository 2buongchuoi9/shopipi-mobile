import { Category, ParamsRequest } from "@/http"
// import { ChatGroup } from '@/http/chatApi'
import { Order } from "@/http/OrderApi"
// import { ChatPayload } from '@/socketService'
// import { saveAs } from 'file-saver'
import moment from "moment"
// import * as XLSX from 'xlsx'
import { dateFormat } from "./constants"

const routeRedirect = `${window.location.origin}/login-redirect`
const apiUrl = process.env.EXPO_PUBLIC_API_URL
export const google_url_login = `${apiUrl}/api/v1/oauth2/authorization/google?redirect_url=${routeRedirect}`
export const facebook_url_login = `${apiUrl}/api/v1/oauth2/authorization/facebook?redirect_url=${routeRedirect}`

export const removeNullParams = (params?: ParamsRequest) => {
    if (!params) return {}
    return Object.fromEntries(Object.entries(params).filter(([_, value]) => !value))
}

// export const formatCurrency = (amount: number | string | undefined) => {
//     if (!amount) return "₫0"

//     // Chuyển đổi đầu vào thành số nếu là chuỗi
//     const numericAmount = typeof amount === "string" ? parseFloat(amount) : amount

//     // Kiểm tra nếu numericAmount là NaN hoặc không hợp lệ
//     if (isNaN(numericAmount)) return "₫0" // Hoặc bạn có thể trả về một chuỗi khác như "Invalid amount"

//     return new Intl.NumberFormat("vi-VN", {
//         style: "currency",
//         currency: "VND",
//     }).format(numericAmount)
// }

export const convertVietNameseToSlug = (title: string) => {
    if (!title) return ""
    var slug = title.toLowerCase()

    var map: Record<string, string> = {
        "á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ": "a",
        "é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ": "e",
        "i|í|ì|ỉ|ĩ|ị": "i",
        "ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ": "o",
        "ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự": "u",
        "ý|ỳ|ỷ|ỹ|ỵ": "y",
        đ: "d",
        "\\`|\\~|\\!|\\@|\\#|\\$|\\%|\\^|\\&|\\*|\\(|\\)|\\+|\\=|\\,|\\.|\\/|\\?|\\>|\\<|\\'|\\\"|\\:|\\;|\\_": "",
        " ": "-",
    }

    for (var pattern in map) {
        slug = slug.replace(new RegExp(pattern, "g"), map[pattern])
    }

    // slug = slug.replace(/-+-/g, "-") // replace 2- to 1-
    // slug = slug.replace(/^\-+|\-+$/g, "") // remove - at the start and end

    slug = slug.replace(/-+/g, "-") // replace multiple dashes with a single dash
    slug = slug.replace(/^-+|-+$/g, "") // remove dashes at the start and end

    return slug
}
export const randomPriceDiscount = (price: number | undefined, valueDifference: number): number => {
    if (!price) return 0
    // Tính toán một giá trị giảm giá ngẫu nhiên từ 0 đến valueDifference
    const discount = Math.random() * valueDifference * 1000
    // Trừ giá trị giảm giá từ giá gốc
    const discountedPrice = price - discount
    // Làm tròn giá sau giảm giá về 3 chữ số trước dấu phẩy
    return Math.floor(discountedPrice / 1000) * 1000
}

export const randomGradient = () => {
    const getRandomColor = () => {
        const letters = "0123456789ABCDEF"
        let color = "#"
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)]
        }
        return color
    }

    const color1 = getRandomColor()
    const color2 = getRandomColor()
    return `linear-gradient(45deg, ${color1}, ${color2})`
}

// export function groupChatsBySender(chats: ChatPayload[]): ChatGroup[] {
//     if (chats.length === 0) return []

//     const groupedChats: ChatGroup[] = []
//     let currentGroup: ChatGroup | null = null

//     for (const chat of chats) {
//         if (currentGroup === null || currentGroup.senderId !== chat.senderId) {
//             // Start a new group if sender changes
//             currentGroup = {
//                 senderId: chat.senderId,
//                 chats: [chat],
//                 createdAt: chat.createdAt,
//             }
//             groupedChats.push(currentGroup)
//         } else {
//             // Add chat to the current group
//             currentGroup.chats.push(chat)
//         }
//     }

//     return groupedChats
// }

export function findCategoryTree(categories: Category[], ids: String[]): Category[] {
    const result: Category[] = []

    function traverse(categories: Category[], ids: String[]): Category[] {
        for (const category of categories) {
            if (ids.includes(category.id)) {
                result.push(category)
            } else if (category.children && category.children.length > 0) {
                const children = traverse(category.children, ids)
                if (children.length > 0) {
                    result.push({
                        ...category,
                        children,
                    })
                }
            }
        }
        return result
    }

    return traverse(categories, ids)
}

export function findCategoryBySlug(categories: Category[], slug: String): Category | undefined {
    for (const category of categories) {
        if (category.slug === slug) {
            return category
        } else if (category.children && category.children.length > 0) {
            const found = findCategoryBySlug(category.children, slug)
            if (found) return found
        }
    }
    return undefined
}
