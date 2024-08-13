import ProductCard from "@/components/ProductCard"
import { Colors } from "@/constants/Colors"
import { useAuth, useCart } from "@/hooks"
import { Product } from "@/http"
import productApi from "@/http/productApi"
// import { formatCurrency } from "@/utils"
import { AntDesign, MaterialIcons, MaterialCommunityIcons, Ionicons, Entypo } from "@expo/vector-icons"
import { Link } from "expo-router"
import { useEffect, useState } from "react"
import { ScrollView, StyleSheet, View, ViewStyle } from "react-native"
import { Appbar, Avatar, Badge, Card, List, Text } from "react-native-paper"

type IconProps = {
    color: string
    size: number
}

const listOrder = [
    {
        title: "Chờ thanh toán",
        icon: ({ color, size }: IconProps) => (
            <AntDesign name="book" color={color} size={size} style={stylesOrder.icon} onPress={() => console.log("cc")} />
        ),
    },
    {
        title: "Đang xử lý",
        icon: ({ color, size }: IconProps) => <MaterialCommunityIcons name="truck-fast-outline" color={color} size={size} style={stylesOrder.icon} />,
    },
    {
        title: "đang vận chuyển",
        icon: ({ color, size }: IconProps) => <MaterialCommunityIcons name="truck-fast-outline" color={color} size={size} style={stylesOrder.icon} />,
    },
    {
        title: "Đã giao",
        icon: ({ color, size }: IconProps) => <MaterialCommunityIcons name="truck-check" color={color} size={size} style={stylesOrder.icon} />,
    },
    {
        title: "Đã hủy",
        icon: ({ color, size }: IconProps) => <Entypo name="circle-with-cross" color={color} size={size} style={stylesOrder.icon} />,
    },
]

const Avt = ({ style }: { style?: ViewStyle }) => {
    const { isAuthenticated, user } = useAuth()
    return (
        <View style={[{ flex: 1 }, style]}>
            <Card.Title
                style={{
                    width: "100%",
                    flexDirection: "row",
                    // borderBlockColor: "black",
                    // borderRadius: 24,
                    // borderWidth: 2,
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
    const [products, setProduct] = useState<Product[]>([])

    useEffect(() => {
        ;(async () => {
            const res = await productApi.getAll({ page: 0, limit: 10 })

            const products = res.content.map((p) => {
                let totalPrice = 0
                let totalPriceSale = 0
                let countPrice = 0
                let countPriceSale = 0

                p.variants.forEach((v) => {
                    if (v.price > 0) {
                        totalPrice += v.price
                        countPrice++
                    }
                    if (v.priceSale > 0) {
                        totalPriceSale += v.priceSale
                        countPriceSale++
                    }
                })

                const price = countPrice > 0 ? totalPrice / countPrice : 0
                const priceSale = countPriceSale > 0 ? totalPriceSale / countPriceSale : 0
                return {
                    ...p,
                    price,
                    priceSale,
                    discount: p.sale?.type === "FIXED_AMOUNT" ? p.sale?.value : p.sale?.value + "%",
                }
            })

            setProduct(products)
        })()
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header style={{ borderBottomWidth: 1 }}>
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
            <ScrollView style={{ flex: 1, backgroundColor: Colors.bg }}>
                <Avt style={{ ...styles.container, marginTop: 0 }} />
                <View style={styles.container}>
                    <View style={styles.title}>
                        <Text variant="titleLarge">Đơn hàng của tôi</Text>
                        <MaterialIcons name="keyboard-arrow-right" size={24} />
                    </View>
                    <View style={stylesOrder.container}>
                        {listOrder.map((v, i) => (
                            // <List.Item key={i} title={v.title} left={(props) => <List.Icon {...props} color="blue" icon={v.icon} />} />
                            <View style={stylesOrder.customItem} key={i}>
                                <View style={stylesOrder.iconContainer}>
                                    <v.icon color="blue" size={24} />
                                </View>
                                <Text style={stylesOrder.title}>{v.title}</Text>
                            </View>
                        ))}
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={styles.title}>
                        <Text variant="titleLarge">Đánh giá sản phẩm</Text>
                        <MaterialIcons name="keyboard-arrow-right" size={24} />
                    </View>
                </View>
                <View style={{ ...styles.container, marginBottom: 0 }}>
                    <View style={styles.title}>
                        <Text variant="titleLarge">Sản phẩm bạn quan tâm</Text>
                    </View>
                    <View style={stylesOrder.twoColumnContainer}>
                        {products.map((v, i) => (
                            <ProductCard key={i} product={v} />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default ProfileScreen

const stylesOrder = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        // paddingHorizontal: 20,
    },
    icon: {
        backgroundColor: Colors.bg,
        padding: 8,
        borderRadius: 10,
    },
    customItem: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
        width: 60, // or any width that suits your layout
    },
    iconContainer: {
        flex: 1,
        marginBottom: 5, // space between icon and title
    },
    title: {
        textAlign: "center",
        flex: 1,
    },
    twoColumnContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
})
const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        paddingHorizontal: 20,
        backgroundColor: Colors.white,
        marginVertical: 5,
    },
    title: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 5,
    },
})
