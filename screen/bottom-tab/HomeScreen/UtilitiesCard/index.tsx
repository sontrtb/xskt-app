import Utility from "@/screen/bottom-tab/HomeScreen/UtilitiesCard/Utility";
import { PADDING_PAGE } from "@/theme/layout";
import { useRouter } from "expo-router";
import { Dimensions, StyleSheet, View } from "react-native";

const windowWidth = Dimensions.get('window').width;

function UtilitiesCard() {
    const router = useRouter();

    const utilities = [
        {
            label: "Giải mã\ngiấc mơ",
            onPress: () => {
                router.navigate('/dream-book')
            }
        },
        {
            label: "Dự đoán\nkết quả",
            onPress: () => {
                router.navigate('/forecast')
            }
        },
         {
            label: "Giải mã\ngiấc mơ",
            onPress: () => {
                router.navigate('/dream-book')
            }
        },
        {
            label: "Dự đoán\nkết quả",
            onPress: () => {
                router.navigate('/forecast')
            }
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