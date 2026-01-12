import ResultXSKT from "@/components/commons/ResultXSKT";
import { StyleSheet, View } from "react-native";

function ResultScreen() {
    return (
        <View style={styles.root}>
            <ResultXSKT />
        </View>
    )
}

export default ResultScreen

const styles = StyleSheet.create({
    root: {
        flex: 1
    }
})
