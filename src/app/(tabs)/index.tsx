import { Colors } from "@/constants/Colors"
import { Link } from "expo-router"
import { Text, View } from "react-native"

const Home = () => {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: Colors.white }}>
            <Text style={{ color: "black" }}>Home</Text>
            <Link href={"/(tabs)/ProfileScreen"} style={{ color: "black" }}>
                cádasdasd
            </Link>
        </View>
    )
}
export default Home
