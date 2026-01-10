import CardUi from "@/components/ui/CardUi";
import TitleUi from "@/components/ui/Title";
import { PADDING_PAGE } from "@/theme/layout";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const windowWidth = Dimensions.get('window').width;

function ResultBox() {
    return (
        <CardUi style={styles.root}>
            <View style={styles.headerContainer}>
                <MaterialCommunityIcons 
                    name="star-four-points" 
                    size={20} 
                    color="#FFD700" 
                />
                <TitleUi style={styles.title}>Giải đặc biệt 10/12/2025:</TitleUi>
                <MaterialCommunityIcons 
                    name="star-four-points" 
                    size={20} 
                    color="#FFD700" 
                />
            </View>
            <View style={styles.luckyNumberContainer}>
                <View style={styles.circleOuter}>
                    <View style={styles.circleInner}>
                        <Text style={styles.luckyNumber}>20</Text>
                    </View>
                </View>
            </View>
        </CardUi>
    )
}

const styles = StyleSheet.create({
    root: {
        margin: PADDING_PAGE,
        width: windowWidth - PADDING_PAGE * 2,
        position: "absolute",
        top: windowWidth / 5 * 4 - 70,
        flexDirection: "column",
        gap: 12,
        alignItems: "center",
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
    },
    luckyNumberContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    circleOuter: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#FFD700",
        alignItems: "center",
        justifyContent: "center",
    },
    circleInner: {
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "#FFA500",
    },
    luckyNumber: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FF6B6B",
    },
})

export default ResultBox;