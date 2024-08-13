import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { AntDesign, FontAwesome } from "@expo/vector-icons"

interface RatingProps {
    ratingAvg: number // Điểm trung bình (0-5)
    totalStars?: number // Tổng số sao để hiển thị (mặc định là 5)
    starSize?: number // Kích thước sao (mặc định là 14)
}

const Rate: React.FC<RatingProps> = ({ ratingAvg, totalStars = 5, starSize = 14 }) => {
    // Tạo mảng sao đầy đủ
    const stars = Array(totalStars)
        .fill(false)
        .map((_, index) => index < Math.floor(ratingAvg))
    const halfStars = ratingAvg % 1 > 0.5 // Xác định nếu có sao nửa

    return (
        <View style={styles.container}>
            <Text style={styles.ratingText}>{ratingAvg.toFixed(1)}</Text>
            <View style={styles.starsContainer}>
                {stars.map((filled, index) => (
                    <FontAwesome key={index} name={filled ? "star" : "star-o"} size={starSize} color="gold" />
                ))}
                {halfStars && <FontAwesome key={totalStars} name="star-half-empty" size={starSize} color="gold" />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    ratingText: {
        fontSize: 16,
        marginRight: 5,
        color: "black",
    },
    starsContainer: {
        flexDirection: "row",
    },
})

export default Rate
