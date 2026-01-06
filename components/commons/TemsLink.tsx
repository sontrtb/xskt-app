import useColor from "@/hooks/useColor";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import TextUi from "../ui/TextUi";
import TouchableOpacityUi from "../ui/TouchableOpacityUi";

function TemsLink() {
    const color = useColor()

    const router = useRouter()

    return (
        <View style={styles.root}>
            <TouchableOpacityUi onPress={() => router.push("/tems/terms-of-use")}>
                <TextUi weight="semiBold" style={{color: color.primary, textDecorationLine: "underline"}}>Điều khoản sử dụng</TextUi>
            </TouchableOpacityUi>
            <TextUi>và</TextUi>
            <TouchableOpacityUi onPress={() => router.push("/tems/confidentiality-policy")}>
                <TextUi weight="semiBold" style={{color: color.primary, textDecorationLine: "underline"}}>Chính sách bảo mật</TextUi>
            </TouchableOpacityUi>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        justifyContent: "center",
        flexDirection: "row",
        gap: 4,
        paddingTop: 12
    }
})


export default TemsLink