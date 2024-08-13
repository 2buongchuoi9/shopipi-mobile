import AuthProvider from "@/contexts/AuthContext"
import CategoryProvider from "@/contexts/CategoryContext"
import { useFonts } from "expo-font"
import { SplashScreen, Stack } from "expo-router"
import React, { useEffect } from "react"
import { PaperProvider } from "react-native-paper"
// import "../utils/extensions.ts"

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    })

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync()
        }
    }, [loaded])

    if (!loaded) {
        return null
    }
    return (
        <PaperProvider>
            <AuthProvider>
                {/* <CartProvider> */}
                <CategoryProvider>
                    <Stack>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                    </Stack>
                </CategoryProvider>
                {/* </CartProvider> */}
            </AuthProvider>
        </PaperProvider>
    )
}
