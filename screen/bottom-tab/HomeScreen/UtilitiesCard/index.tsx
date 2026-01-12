import Utility from "@/screen/bottom-tab/HomeScreen/UtilitiesCard/Utility";
import { PADDING_PAGE } from "@/theme/layout";
import { useRouter } from "expo-router";
import { Dimensions, StyleSheet, View } from "react-native";

const windowWidth = Dimensions.get('window').width;

function UtilitiesCard() {
    const router = useRouter();

    const utilities = [
        {
            icon: require("@/assets/images/features/dream_book.png"),
            label: "Chat",
            onPress: () => {
                router.navigate('/chat')
            }
        },
        {
            icon: require("@/assets/images/features/dream_book.png"),
            label: "Dịch vụ",
            onPress: () => {
                // router.navigate('/repair-service')
            }
        },
        {
            icon: require("@/assets/images/features/dream_book.png"),
            label: "Ý kiến",
            // onPress: () => router.navigate("/residents-opinions")
        },
        {
            icon: require("@/assets/images/features/dream_book.png"),
            label: "Liên hệ",
            // onPress: () => router.navigate("/contact")
        },
    ]

    return (
        <View style={styles.root}>
            {
                utilities.map((u, index) => (
                    <Utility {...u} key={index} />
                ))
            }
        </View>
    )
}

export default UtilitiesCard

const styles = StyleSheet.create({
    root: {
        marginHorizontal: PADDING_PAGE,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        width: windowWidth - PADDING_PAGE * 2,
        flexWrap: "wrap",
        marginTop: 70

    },
    avatar: {
        height: 60,
        width: 60,
        borderRadius: 30
    },
})