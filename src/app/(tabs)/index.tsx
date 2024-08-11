import { Colors } from "@/constants/Colors"
import { Text, View } from "react-native"

const Home = () => {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: Colors.white }}>
            <Text style={{ color: "black" }}>Home</Text>
        </View>
    )
}
export default Home
