import { PairFrequency } from "@/api/statistical";
import CardUi from "@/components/ui/CardUi";
import SelectOptionUi from "@/components/ui/SelectOptionUi";
import SpaceUi from "@/components/ui/SpaceUi";
import TextUi from "@/components/ui/TextUi";
import useColor from "@/hooks/useColor";
import { PADDING_PAGE } from "@/theme/layout";
import { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

interface TopPairsProps {
    data3?: PairFrequency[];
    data7?: PairFrequency[]
}
const windowWidth = Dimensions.get('window').width;

function TopPairs(props: TopPairsProps) {
    const { data3, data7 } = props;

    const color = useColor()

    const [data, setData] = useState(data3)

    const chartData = data?.map((item) => ({
        value: item.count,
        label: item.pair,
    }));

    return (
        <CardUi title="Số xuất hiện nhiều nhất">
            <SelectOptionUi
                options={
                    [
                        {
                            value: 3,
                            label: "3 ngày"
                        },
                        {
                            value: 7,
                            label: "7 ngày"
                        }
                    ]
                }

                placeholder="3 ngày"
                onChange={(v) => {
                    if (v.value === 3) {
                        setData(data3)
                    } else if (v.value === 7) {
                        setData(data7)
                    }
                }}
            />
            <SpaceUi height={16} />
            <View>
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
            </View>
        </CardUi>
    );
}

export default TopPairs;

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