import { Product } from "@/http"
import { Button, Card, Text, Badge } from "react-native-paper"
import { Image, StyleSheet, View } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import Rate from "./Rate"

const ProductCard = ({ product }: { product: Product }) => {
    const { thumb, price, priceSale, name, slug, shop, discount, variants, ratingAvg } = product
    return (
        <Card style={styles.card}>
            <Card.Cover source={{ uri: product.thumb }} style={styles.cover} />
            <Card.Content style={styles.content}>
                <View style={styles.badgesContainer}>
                    {price !== priceSale && (
                        <View style={[styles.badge, styles.topDealBadge]}>
                            <AntDesign name="checkcircle" size={14} color="white" />
                            <Text style={styles.badgeText}>{discount} </Text>
                        </View>
                    )}

                    {price === priceSale && (
                        <View style={[styles.badge, styles.authenticBadge]}>
                            <AntDesign name="checkcircle" size={14} color="white" />
                            <Text style={styles.badgeText}>CHÍNH HÃNG</Text>
                        </View>
                    )}
                </View>
                <Text variant="labelMedium" numberOfLines={2}>
                    {product.name}
                </Text>
                <View style={styles.ratingContainer}>
                    <Rate ratingAvg={product.ratingAvg} />
                </View>
                <Text> Đã bán: {variants.map((v) => v.sold).reduce((sold, current) => sold + current, 0)}</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={styles.price}>{product.price}</Text>
                    <Text style={styles.oldPrice}>{product?.priceSale}</Text>
                </View>
            </Card.Content>
        </Card>
    )
}

export default ProductCard

const styles = StyleSheet.create({
    card: {
        width: 150,
        margin: 10,
    },
    cover: {
        height: 200,
        resizeMode: "contain",
    },
    content: {
        paddingHorizontal: 10,
    },
    badgesContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 5,
    },
    badge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 5,
        borderRadius: 5,
    },
    topDealBadge: {
        backgroundColor: "red",
    },
    authenticBadge: {
        backgroundColor: "blue",
    },
    badgeText: {
        color: "white",
        marginLeft: 5,
    },

    ratingContainer: {
        flexDirection: "row",
        marginVertical: 5,
    },
    price: {
        fontSize: 16,
        fontWeight: "bold",
        color: "red",
    },
    oldPrice: {
        fontSize: 14,
        textDecorationLine: "line-through",
        color: "gray",
    },
})
