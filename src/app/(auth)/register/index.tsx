import React, { useState } from "react"
import { ActivityIndicator, Image, StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { Appbar, Button, TextInput } from "react-native-paper"
import authApi from "@/http/authApi"
import { accessToken, clientId, refreshTokenStorage } from "@/utils/asyncStorage"
import { Colors } from "@/constants/Colors"
// import { useNavigation } from "@react-navigation/native"
import { Link, router } from "expo-router"
import { useNavigation } from "@react-navigation/native"

const Register = () => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const navigate = useNavigation()

    const handleRegister = async () => {
        setLoading(true)
        setError("")
        try {
            const data = await authApi.register({ email, name, password })
            clientId.set(data.user.id)
            accessToken.set(data.token.accessToken)
            refreshTokenStorage.set(data.token.refreshToken)
            // Handle successful registration
            router.push("/")
        } catch (err) {
            console.error("Registration error:", err)
            setError("Đăng ký không thành công. Vui lòng thử lại.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigate.goBack()} />
                <Appbar.Content title="Đăng Ký" />
                <Appbar.Action
                    icon="dots-vertical"
                    onPress={() => {
                        /* Handle action */
                    }}
                />
            </Appbar.Header>

            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image source={require("@/assets/images/icon.png")} style={styles.image} />
            </View>

            <View style={styles.container}>
                {error ? <Text style={styles.error}>{error}</Text> : null}

                <TextInput mode="outlined" label="Email" placeholder="Nhập email" value={email} onChangeText={setEmail} style={styles.input} />
                <TextInput mode="outlined" label="Name" placeholder="Nhập tên" value={name} onChangeText={setName} style={styles.input} />
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
                <TextInput
                    mode="outlined"
                    label="Xác nhận mật khẩu"
                    placeholder="Nhập lại mật khẩu"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                    right={
                        <TextInput.Icon icon={showConfirmPassword ? "eye-off" : "eye"} onPress={() => setShowConfirmPassword(!showConfirmPassword)} />
                    }
                    style={styles.input}
                />

                <Button mode="contained" onPress={handleRegister} loading={loading}>
                    Đăng ký
                </Button>
            </View>

            <View style={styles.footer}>
                <Text>Bạn đã có tài khoản?</Text>
                <Link href="/login" style={{ color: Colors.blue }}>
                    Đăng nhập
                </Link>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
    },
    input: {
        marginBottom: 12,
    },
    error: {
        color: "red",
        marginBottom: 12,
    },
    image: {
        height: 120,
        resizeMode: "contain",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        backgroundColor: Colors.bg,
    },
})

export default Register
