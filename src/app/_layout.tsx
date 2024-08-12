import AuthProvider from "@/contexts/AuthContext"
import CategoryProvider from "@/contexts/CategoryContex"
import { useFonts } from "expo-font"
import { SplashScreen, Stack } from "expo-router"
import React, { useEffect } from "react"
import { PaperProvider } from "react-native-paper"
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
                <CategoryProvider>
                    <Stack>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                    </Stack>
                </CategoryProvider>
            </AuthProvider>
        </PaperProvider>
    )
}
