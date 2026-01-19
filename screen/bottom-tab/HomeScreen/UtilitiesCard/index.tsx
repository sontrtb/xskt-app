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
            icon: "moon",
            iconLib: "Feather",
            onPress: () => {
                router.navigate('/dream-book')
            }
        },
        {
            label: "Dự đoán\nkết quả",
            icon: "crystal-ball",
            iconLib: "MaterialCommunityIcons",
            onPress: () => {
                router.navigate('/forecast')
            }
        },
         {
            label: "Quay thử",
            icon: "refresh-cw",
            iconLib: "Feather",
            onPress: () => {
                router.navigate('/try-spinning')
            }
        },
        {
            label: "Ngày giờ\nhoàng đạo",
            icon: "calendar-star",
            iconLib: "MaterialCommunityIcons",
            onPress: () => {
                router.navigate('/lunar-calendar')
            }
        },
    ]

    return (
        <View style={styles.root}>
            {
                utilities.map((u, index) => (
                    <Utility {...u} key={index} index={index}/>
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