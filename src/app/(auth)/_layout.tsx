import { Stack } from "expo-router"

const AuthLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="login/index" options={{ headerShown: false }} />
        </Stack>
    )
}
export default AuthLayout
