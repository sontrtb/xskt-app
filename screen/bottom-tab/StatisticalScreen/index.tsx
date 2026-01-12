import HeaderHome from "@/components/commons/HeaderHome";
import CardUi from "@/components/ui/CardUi";
import { PADDING_PAGE } from "@/theme/layout";
import { ScrollView, StyleSheet, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";


function StatisticalScreen() {
    const data = [{ value: 50 }, { value: 80 }, { value: 90 }, { value: 70 }]

    return (
        <View style={styles.root}>
            <HeaderHome title="Thống kê" />
            <ScrollView contentContainerStyle={styles.contentContainerStyle}>


                <CardUi>
                    <BarChart data={data} />
                </CardUi>

                <CardUi>
                    <BarChart data={data} />
                </CardUi>
                <CardUi>
                    <BarChart data={data} />
                </CardUi>
                <CardUi>
                    <BarChart data={data} />
                </CardUi>
                <CardUi>
                    <BarChart data={data} />
                </CardUi>
            </ScrollView>
        </View>
    )
}

export default StatisticalScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    contentContainerStyle: {
        flex: 1,
        padding: PADDING_PAGE,
        gap: PADDING_PAGE
    }
})
