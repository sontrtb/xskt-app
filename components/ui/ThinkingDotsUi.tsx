import useColor from "@/hooks/useColor";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";
import TextUi from "./TextUi";

function ThinkingDots() {
    const color = useColor()

    const dot1 = useSharedValue(0);
    const dot2 = useSharedValue(0);
    const dot3 = useSharedValue(0);

    useEffect(() => {
        dot1.value = withRepeat(
            withSequence(
                withTiming(1, { duration: 400 }),
                withTiming(0, { duration: 400 })
            ),
            -1
        );

        dot2.value = withDelay(
            200,
            withRepeat(
                withSequence(
                    withTiming(1, { duration: 400 }),
                    withTiming(0, { duration: 400 })
                ),
                -1
            )
        );

        dot3.value = withDelay(
            400,
            withRepeat(
                withSequence(
                    withTiming(1, { duration: 400 }),
                    withTiming(0, { duration: 400 })
                ),
                -1
            )
        );
    }, [dot1, dot2, dot3]);

    const animatedStyle1 = useAnimatedStyle(() => ({
        opacity: 0.3 + dot1.value * 0.7,
        transform: [{ translateY: -dot1.value * 4 }],
    }));

    const animatedStyle2 = useAnimatedStyle(() => ({
        opacity: 0.3 + dot2.value * 0.7,
        transform: [{ translateY: -dot2.value * 4 }],
    }));

    const animatedStyle3 = useAnimatedStyle(() => ({
        opacity: 0.3 + dot3.value * 0.7,
        transform: [{ translateY: -dot3.value * 4 }],
    }));

    return (
        <View style={styles.dotsContainer}>
            <TextUi style={[styles.thinkingText, {color: color.textNeutral}]}>Đang suy nghĩ</TextUi>
            <Animated.View style={animatedStyle1}>
                <TextUi style={[styles.dot, {color: color.textNeutral}]}>.</TextUi>
            </Animated.View>
            <Animated.View style={animatedStyle2}>
                <TextUi style={[styles.dot, {color: color.textNeutral}]}>.</TextUi>
            </Animated.View>
            <Animated.View style={animatedStyle3}>
                <TextUi style={[styles.dot, {color: color.textNeutral}]}>.</TextUi>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
     dotsContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    thinkingText: {
        fontSize: 16,
        marginRight: 2,
    },
    dot: {
        fontSize: 24,
        fontWeight: "bold",
        lineHeight: 24,
    },
})

export default ThinkingDots