import Utility from "@/components/commons/Utility";
import CardUi from "@/components/ui/CardUi";
import useTheme from "@/hooks/useColor";
// import { toastCommingSoon } from "@/lib/toast";
import { PADDING_PAGE } from "@/theme/layout";
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from "expo-router";
import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;

function UtilitiesCard() {
    const color = useTheme()
    const router = useRouter();

    const utilities = [
        {
            icon: <Feather name="layers" size={24} color={color.primary} />,
            label: "Chat",
            onPress: () => {
                router.navigate('/chat')
            }
        },
        {
            icon: <Feather name="trello" size={24} color={color.primary} />,
            label: "Dịch vụ",
            onPress: () => {
                // router.navigate('/repair-service')
            }
        },
        {
            icon: <Feather name="message-circle" size={24} color={color.primary} />,
            label: "Ý kiến",
            // onPress: () => router.navigate("/residents-opinions")
        },
        {
            icon: <Feather name="phone" size={24} color={color.primary} />,
            label: "Liên hệ",
            // onPress: () => router.navigate("/contact")
        },
    ]

    return (
        <CardUi style={styles.root}>
            {
                utilities.map((u, index) => (
                    <Utility {...u} key={index} />
                ))
            }
        </CardUi>
    )
}

export default UtilitiesCard

const styles = StyleSheet.create({
    root: {
        marginHorizontal: PADDING_PAGE,
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        paddingHorizontal: PADDING_PAGE,
        position: "absolute",
        width: windowWidth - PADDING_PAGE * 2,
        top: windowWidth * 4 / 5 - 50,
        flexWrap: "wrap"
    },
    avatar: {
        height: 60,
        width: 60,
        borderRadius: 30
    },
})