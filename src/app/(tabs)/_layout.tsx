import React, { useState } from "react"
import { BottomNavigation, Text } from "react-native-paper"
import Home from "./index"
import CategoryScreen from "./CategoryScreen"
import ChatScreen from "./ChatScreen"
import ProfileScreen from "./ProfileScreen"
import { Colors } from "@/constants/Colors"
// import Icon from "react-native-vector-icons/MaterialCommunityIcons"

const HomeRoute = () => <Home />
const CategoryRoute = () => <CategoryScreen />
const ChatRoute = () => <ChatScreen /> // Bạn có thể thay bằng component khác nếu cần
const ProfileRoute = () => <ProfileScreen /> // Bạn có thể thay bằng component khác nếu cần

const Layout = () => {
    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: "home", title: "Trang chủ", focusedIcon: "home", unfocusedIcon: "home-outline" },
        { key: "category", title: "Danh mục", focusedIcon: "format-list-bulleted", unfocusedIcon: "format-list-bulleted-type" },
        { key: "chat", title: "Tin nhắn", focusedIcon: "message", unfocusedIcon: "message-outline" },
        { key: "profile", title: "Tài khoản", focusedIcon: "account", unfocusedIcon: "account-outline" },
    ])

    const renderScene = BottomNavigation.SceneMap({
        home: HomeRoute,
        category: CategoryRoute,
        chat: ChatRoute,
        profile: ProfileRoute,
    })

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            activeColor={Colors.blue} // Màu của icon và title khi được chọn
            inactiveColor={Colors.black} // Màu của icon và title khi không được chọn
            barStyle={{
                backgroundColor: Colors.white,
                shadowColor: "black", // Màu của bóng
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 5,
            }}
        />
    )
}

export default Layout
