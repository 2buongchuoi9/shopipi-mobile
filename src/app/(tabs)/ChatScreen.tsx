import { Colors } from "@/constants/Colors"
import productApi from "@/http/productApi"
import { useEffect } from "react"
import { Text, View } from "react-native"

const ChatScreen = () => {
    useEffect(() => {
        const a = async () => {
            const r = await productApi.getAll()
            console.log("conc", r)
        }
        a()
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: Colors.white }}>
            <Text>Chat</Text>
        </View>
    )
}
export default ChatScreen
