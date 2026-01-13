import CardUi from "@/components/ui/CardUi";
import { PADDING_PAGE } from "@/theme/layout";
import { Dimensions, StyleSheet, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";

interface StatisticalData {
    pair: string;
    count: number;
    change: 'up' | 'down' | 'none';
    changeAmount: number;
}

const windowWidth = Dimensions.get('window').width;

function ConsecutivePairs() {
    const rawData: StatisticalData[] = [
        { pair: "BTC/USDT", count: 150, change: "up", changeAmount: 25 },
        { pair: "ETH/USDT", count: 120, change: "down", changeAmount: -15 },
        { pair: "BNB/USDT", count: 180, change: "up", changeAmount: 40 },
        { pair: "SOL/USDT", count: 95, change: "none", changeAmount: 0 },
        { pair: "ADA/USDT", count: 130, change: "up", changeAmount: 20 },
    ];

    const chartData = rawData.map((item) => ({
        value: item.count,
        label: item.pair.split('/')[0],
        frontColor: item.change === 'up' ? '#4ade80' : item.change === 'down' ? '#f87171' : '#94a3b8',
        topLabelComponent: () => (
            <Text style={styles.topLabel}>{item.count}</Text>
        ),
    }));

    return (
        <CardUi title="Số ra liên tiếp">
            <BarChart
                data={chartData}
                width={windowWidth - PADDING_PAGE * 2 - 90}
                height={250}
                barWidth={20}
                spacing={24}
                roundedTop
                hideRules
                xAxisThickness={1}
                yAxisThickness={1}
                yAxisTextStyle={styles.yAxisText}
                xAxisLabelTextStyle={styles.xAxisText}
                noOfSections={5}
                maxValue={200}
                isAnimated
                animationDuration={800}
            />
        </CardUi>
    );
}

export default ConsecutivePairs;

const styles = StyleSheet.create({
    topLabel: {
        fontSize: 11,
        fontWeight: '600',
        color: '#1e293b',
    },
    yAxisText: {
        fontSize: 11,
        color: '#64748b',
    },
    xAxisText: {
        fontSize: 11,
        color: '#64748b',
        fontWeight: '500',
    },
});