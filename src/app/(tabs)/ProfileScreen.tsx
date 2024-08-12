import { Colors } from "@/constants/Colors"
import { useAuth, useCart } from "@/hooks"
import { Ionicons, MaterialIcons } from "@expo/vector-icons"
import { Link } from "expo-router"
import { View } from "react-native"
import { Appbar, Avatar, Badge, Button, Card, Divider, IconButton, Text } from "react-native-paper"

const Avt = () => {
    const { isAuthenticated, user } = useAuth()
    return (
        <View style={{ flex: 1 }}>
            <Card.Title
                style={{
                    width: "100%",
                    flexDirection: "row",
                    borderBlockColor: "black",
                    borderRadius: 24,
                    borderWidth: 2,
                }}
                title={isAuthenticated ? user.name : "Chào mừng bạn đến với Shopipi!"}
                subtitle={
                    isAuthenticated ? (
                        `${user.email}`
                    ) : (
                        <View style={{ flexDirection: "row" }}>
                            <Link href={"/login"} style={{ color: Colors.blue }}>
                                Đăng nhập
                            </Link>
                            <Text> / </Text>
                            <Link href={"/register"} style={{ color: Colors.blue }}>
                                Đăng ký
                            </Link>
                        </View>
                    )
                }
                // left={(props) => <Avatar.Image {...props} source={isAuthenticated ? { uri: user.image } : require("../../assets/images/icon.png")} />}
                left={(props) => (
                    <View {...props}>
                        {isAuthenticated && user.image ? (
                            <Avatar.Image
                                source={{ uri: user.image }}
                                size={40} // Điều chỉnh kích thước theo yêu cầu
                            />
                        ) : (
                            <Avatar.Text
                                label={isAuthenticated ? user.name.charAt(0) : "A"} // Hiển thị chữ cái đầu tiên của tên người dùng hoặc chữ 'A' nếu chưa xác thực
                                size={40} // Điều chỉnh kích thước theo yêu cầu
                            />
                        )}
                    </View>
                )}
            />
        </View>
    )
}

const ProfileScreen = () => {
    const { totalItem } = useCart()
    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header>
                <Appbar.Content title="Tài khoản" />
                <Appbar.Action
                    icon={({ color }) => <MaterialIcons name="settings" size={24} color={color} />}
                    onPress={() => {
                        /* xử lý sự kiện khi bấm nút */
                    }}
                />
                <View style={{ position: "relative" }}>
                    <Badge style={{ position: "absolute" }} visible={!!totalItem}>
                        {totalItem}
                    </Badge>
                    <Appbar.Action
                        icon="cart"
                        onPress={() => {
                            /* Xử lý sự kiện khi bấm nút */
                        }}
                    />
                </View>
            </Appbar.Header>

            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: Colors.white, marginHorizontal: 10 }}>
                <Avt />
                <Text>Profile</Text>
                <Link href={"/login"}>đăng nhập</Link>
            </View>
        </View>
    )
}
export default ProfileScreen
