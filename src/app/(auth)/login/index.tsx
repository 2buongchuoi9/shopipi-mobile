import { useState } from "react"
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import authApi from "@/http/authApi"
import { accessToken, clientId, refreshTokenStorage } from "@/utils/asyncStorage"
import { Colors } from "@/constants/Colors"
import { Button, Icon, TextInput } from "react-native-paper"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

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
        } catch (err) {
            console.error("Login error:", err)
            setError("Đăng nhập không thành công. Vui lòng thử lại.")
        } finally {
            setLoading(false)
        }
    }
    return (
        <View>
            <Image source={require("@/assets/images/icon.png")} style={styles.image} />
            <View style={styles.container}>
                <Text style={styles.title}>Đăng Nhập</Text>
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

                <Button mode="contained" onPress={handleLogin}>
                    Đăng nhập
                </Button>
            </View>
        </View>
    )
}
export default Login

const styles = StyleSheet.create({
    container: {
        padding: 16,
        // backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        marginBottom: 12,
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
        width: "100%", // Chiều rộng của hình ảnh
        // height: , // Chiều cao của hình ảnh
        resizeMode: "contain", // Điều chỉnh cách hình ảnh được hiển thị
    },
})
