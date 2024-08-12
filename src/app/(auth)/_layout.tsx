import { Stack } from "expo-router"

const Layout = () => {
    return (
        <Stack>
            <Stack.Screen name="login/index" options={{ headerShown: false }} />
            <Stack.Screen name="register/index" options={{ headerShown: false }} />
        </Stack>
    )
}
export default Layout
