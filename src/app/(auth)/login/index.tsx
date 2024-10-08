import { useState } from "react"
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import authApi from "@/http/authApi"
import { accessToken, clientId, refreshTokenStorage } from "@/utils/asyncStorage"
import { Colors } from "@/constants/Colors"
import { Appbar, Button, Icon, TextInput } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import { Link, router } from "expo-router"
import { useAuth, useCart } from "@/hooks"

const Login = () => {
    const { fetchUser } = useAuth()
    const { fetchCart } = useCart()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const navigate = useNavigation()

    const handleLogin = async () => {
        setLoading(true)
        setError("")
        try {
            // Thay đổi URL dưới đây với URL API của bạn
            const data = await authApi.login({ email, password })
            // Xử lý phản hồi từ API
            console.log("Login successful:", data)

            clientId.set(data.user.id)
            accessToken.set(data.token.accessToken)
            refreshTokenStorage.set(data.token.refreshToken)
            // Thực hiện các hành động sau khi đăng nhập thành công, ví dụ: điều hướng người dùng
            router.push("/")
            await fetchUser()
            await fetchCart()
        } catch (err) {
            console.error("Login error:", err)
            setError("Đăng nhập không thành công. Vui lòng thử lại.")
        } finally {
            setLoading(false)
        }
    }
    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header>
                <Appbar.BackAction
                    onPress={() => {
                        navigate.goBack()
                    }}
                />
                <Appbar.Content title="Đăng Nhập" />
                <Appbar.Action
                    icon="dots-vertical"
                    onPress={() => {
                        /* xử lý sự kiện khi bấm nút */
                    }}
                />
            </Appbar.Header>

            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image source={require("@/assets/images/icon.png")} style={styles.image} />
            </View>
            <View style={styles.container}>
                {/* <Text style={styles.title}>Đăng Nhập</Text> */}
                {error ? <Text style={styles.error}>{error}</Text> : null}

                <TextInput mode="outlined" label="Email" placeholder="Nhập email" value={email} onChangeText={setEmail} style={styles.input} />
                <TextInput
                    mode="outlined"
                    label="Mật khẩu"
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    right={<TextInput.Icon icon={showPassword ? "eye-off" : "eye"} onPress={() => setShowPassword(!showPassword)} />}
                    style={styles.input}
                />

                <Button mode="contained" onPress={handleLogin} loading={loading}>
                    Đăng nhập
                </Button>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", padding: 10, backgroundColor: Colors.bg }}>
                <Text>Bạn chưa có tài khoản?</Text>
                <Link href={"/register"} style={{ color: Colors.blue }}>
                    {" "}
                    Đăng ký
                </Link>
            </View>
        </View>
    )
}
export default Login

const styles = StyleSheet.create({
    container: {
        padding: 16,
        // backgroundColor: "#f5f5f5",

        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        marginBottom: 12,
        // borderRadius: 100,
    },
    button: {
        width: "100%",
        padding: 12,
        backgroundColor: "#007BFF",
        borderRadius: 4,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    error: {
        color: "red",
        marginBottom: 12,
    },
    image: {
        // width: "50%", // Chiều rộng của hình ảnh
        height: 120,
        resizeMode: "contain", // Điều chỉnh cách hình ảnh được hiển thị
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
})
