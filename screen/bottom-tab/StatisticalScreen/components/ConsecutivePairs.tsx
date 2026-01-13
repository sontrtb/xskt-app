import { ConsecutivePair } from "@/api/statistical";
import CardUi from "@/components/ui/CardUi";
import TextUi from "@/components/ui/TextUi";
import useColor from "@/hooks/useColor";
import { PADDING_PAGE } from "@/theme/layout";
import { Dimensions, StyleSheet } from "react-native";
import { BarChart } from "react-native-gifted-charts";

const windowWidth = Dimensions.get('window').width;

function ConsecutivePairs({ data }: { data?: ConsecutivePair[] }) {
    const color = useColor()

    const chartData = data?.map((item) => ({
        value: item.totalCount,
        label: item.pair,
    }));

    return (
        <CardUi title="Số ra liên tiếp">
            <TextUi style={styles.yAxisTitle}>Số lần</TextUi>
            <BarChart
                showGradient
                gradientColor={color.primary}
                frontColor={color.bgImage}
                data={chartData}
                width={windowWidth - PADDING_PAGE * 2 - 90}
                height={250}
                barWidth={24}
                spacing={20}
                yAxisTextStyle={styles.yAxisText}
                xAxisLabelTextStyle={{ ...styles.xAxisText, backgroundColor: color.bgImage, color: color.primary }}
                isAnimated
                barBorderTopLeftRadius={4}
                barBorderTopRightRadius={4}
                animationDuration={800}
            />
        </CardUi>
    );
}

export default ConsecutivePairs;

const styles = StyleSheet.create({
    yAxisTitle: {
        fontSize: 11,
        fontWeight: '600',
        height: 20
    },
    yAxisText: {
        fontSize: 11,
    },
    xAxisText: {
        height: 26,
        width: 26,
        borderRadius: 13,
        lineHeight: 26,
        textAlign: "center",
        marginLeft: 10,
        fontWeight: "600"
    },
});