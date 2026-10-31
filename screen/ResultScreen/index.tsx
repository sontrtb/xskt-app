import ResultXSKT from "@/components/commons/ResultXSKT";
import { PADDING_PAGE } from "@/theme/layout";
import { ScrollView, StyleSheet } from "react-native";

function ResultScreen() {

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.root}>
            <ResultXSKT showBanner />
        </ScrollView>
    )
}

export default ResultScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    root: {
        flexGrow: 1,
        justifyContent: "space-between",
        paddingBottom: PADDING_PAGE,
    }
})

