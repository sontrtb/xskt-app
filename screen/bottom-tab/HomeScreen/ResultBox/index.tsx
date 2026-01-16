import { kqxs } from "@/api/kqxs";
import CardUi from "@/components/ui/CardUi";
import TitleUi from "@/components/ui/Title";
import TouchableOpacityUi from "@/components/ui/TouchableOpacityUi";
import useColor from "@/hooks/useColor";
import { now } from "@/lib/date";
import { PADDING_PAGE } from "@/theme/layout";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import moment from "moment";
import { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming
} from "react-native-reanimated";

const windowWidth = Dimensions.get('window').width;

function ResultBox() {
    const color = useColor()
    const scale = useSharedValue(1);

    const router = useRouter()

    useEffect(() => {
        scale.value = withRepeat(
            withSequence(
                withTiming(1.4, {
                    duration: 300,
                    easing: Easing.inOut(Easing.ease)
                }),
                withTiming(1, {
                    duration: 300,
                    easing: Easing.inOut(Easing.ease)
                })
            ),
            -1,
            false
        );
    }, [scale]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    const sixThirty = moment().hour(18).minute(45).second(0);
    const dateString = now.isBefore(sixThirty)
        ? moment().subtract(1, "day").format("DD-MM-YYYY")
        : moment().format("DD-MM-YYYY");

    const kqxsQuery = useQuery({
        queryKey: ["kqxs", dateString],
        queryFn: () => kqxs(dateString)
    })
    const data = kqxsQuery.data?.data

    return (
        <TouchableOpacityUi
            style={styles.root}
            onPress={() => {
                router.navigate("/live-result")
            }}
        >
            <CardUi style={[styles.content, { borderColor: color.primary }]}>
                <View style={styles.result}>
                    <View style={styles.headerContainer}>
                        <MaterialCommunityIcons
                            name="star-four-points"
                            size={20}
                            color="#FFD700"
                        />
                        <TitleUi style={{ fontSize: 14 }}>Giải đặc biệt ngày {dateString}:</TitleUi>
                        <MaterialCommunityIcons
                            name="star-four-points"
                            size={20}
                            color="#FFD700"
                        />
                    </View>
                    <Text style={[styles.luckyNumber, { color: color.primary }]}>{data?.specialPrize}</Text>
                </View>

                <View style={styles.liveWrap}>
                    <View style={styles.liveContainer}>
                        <Animated.View
                            style={[styles.redDot, animatedStyle]}
                        />
                        <Text style={[styles.liveText]}>Kết quả{'\n'}trực tiếp</Text>
                    </View>
                </View>
            </CardUi>
        </TouchableOpacityUi>
    )
}

const styles = StyleSheet.create({
    root: {
        position: "absolute",
        top: windowWidth / 5 * 4 - 60,
    },
    content: {
        margin: PADDING_PAGE,
        width: windowWidth - PADDING_PAGE * 2,
        flexDirection: "row",
        borderWidth: 1,
        paddingVertical: 16,
        paddingHorizontal: 12,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    luckyNumber: {
        fontSize: 32,
        fontWeight: "bold",
    },
    result: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    liveWrap: {
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 12,
        borderLeftWidth: 1,
        borderLeftColor: "#E0E0E0",
    },
    liveContainer: {
        alignItems: "center",
        gap: 8,
    },
    redDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#FF0000",
    },
    liveText: {
        fontSize: 14,
        fontWeight: "700",
        textAlign: "center",
        lineHeight: 18,
    }
})

export default ResultBox;