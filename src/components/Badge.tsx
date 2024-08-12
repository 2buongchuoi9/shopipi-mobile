import React from "react"
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native"
import { Badge as PaperBadge, BadgeProps as PaperBadgeProps } from "react-native-paper"

type CustomBadgeProps = PaperBadgeProps & {
    count?: number // Số lượng cần hiển thị trong badge
    children: React.ReactNode // Component icon
    badgeStyle?: StyleProp<ViewStyle> // Tùy chỉnh style của badge
}

const CustomBadge: React.FC<CustomBadgeProps> = ({ count, children, badgeStyle, ...rest }) => {
    return (
        <View style={styles.container}>
            {children}
            {count !== undefined && (
                <PaperBadge
                    style={[styles.badge, badgeStyle]} // Áp dụng style tùy chỉnh nếu có
                    {...rest} // Truyền các props khác của Badge
                >
                    {count}
                </PaperBadge>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    badge: {
        position: "absolute",
        top: -10,
        right: -10,
        backgroundColor: "red",
        borderRadius: 12,
        width: 24,
        height: 24,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "white",
    },
})

export default CustomBadge
