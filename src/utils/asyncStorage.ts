import * as SecureStore from "expo-secure-store"
class Default {
    key: string

    constructor(key: string) {
        this.key = key
    }

    async get() {
        try {
            const value = await await SecureStore.getItemAsync(this.key)
            return value
        } catch (error) {
            console.error("Failed to get data", error)
            return null
        }
    }

    async set(value: string) {
        try {
            await SecureStore.setItemAsync(this.key, value)
        } catch (error) {
            console.error("Failed to set data", error)
        }
    }

    async remove() {
        try {
            await await SecureStore.deleteItemAsync(this.key)
        } catch (error) {
            console.error("Failed to remove data", error)
        }
    }
}

const accessToken = new Default("token")
const refreshTokenStorage = new Default("refreshToken")
const clientId = new Default("x-client-id")

export { accessToken, refreshTokenStorage, clientId }
