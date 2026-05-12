import ResultXSKT from "@/components/commons/ResultXSKT";
import { ScrollView, StyleSheet } from "react-native";

function ResultScreen() {

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.root}>
            <ResultXSKT />
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
        justifyContent: "space-between"
    }
})
