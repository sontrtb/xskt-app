import TextUi from "@/components/ui/TextUi";
import useColor from "@/hooks/useColor";
import { PADDING_PAGE } from "@/theme/layout";
import { Fragment } from "react";
import { StyleSheet, View } from "react-native";

interface PrizeProps {
    title: string,
    numbers?: string,
    isSpecial?: boolean,
}

function Prize(props: PrizeProps) {
    const { title, numbers, isSpecial } = props

    const color = useColor()

    const renderBallNumber = (number?: string) => {
        return (
            <View style={styles.ballContainer}>
                {number?.split('').map((digit, idx) => (
                    <View key={idx} style={[styles.ball, { backgroundColor: color.primary }]}>
                        <TextUi style={styles.ballText}>{digit}</TextUi>
                    </View>
                ))}
            </View>
        );
    };

    return (
        <View style={[styles.prizeRow, isSpecial && { ...styles.specialRow, borderBottomColor: color.primary, backgroundColor: color.bgImage }]}>
            <View style={styles.prizeTitle}>
                <TextUi style={[styles.prizeTitleText, isSpecial && { ...styles.specialText, color: color.primary }]}>
                    {title}
                </TextUi>
            </View>
            <View style={styles.prizeNumbers}>
                {isSpecial ? (
                    renderBallNumber(numbers)
                ) : (
                    <View style={styles.numbersWrapper}>
                        {numbers?.split(',').map((num, idx) => (
                            <Fragment key={idx} >
                                <TextUi style={styles.numberText}>
                                    {num}
                                </TextUi>
                                {
                                    (idx < (numbers?.split(',')?.length - 1)) && <View style={[styles.line, { backgroundColor: color.textNeutral }]} />
                                }
                            </Fragment>
                        ))}
                    </View>
                )}
            </View>
        </View>
    )
}

export default Prize;

const styles = StyleSheet.create({
    root: {
        margin: PADDING_PAGE,
    },
    resultsContainer: {
        marginTop: 16,
    },
    line: {
        width: 1,
        height: 24,
    },
    prizeRow: {
        flexDirection: "row",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#e5e7eb",
        alignItems: "center",
    },
    specialRow: {
        borderBottomWidth: 2,
    },
    prizeTitle: {
        width: 100,
        paddingHorizontal: 8,
    },
    prizeTitleText: {
        fontWeight: "300",
        fontSize: 16,
    },
    specialText: {
        fontSize: 16,
        fontWeight: "700",
    },
    prizeNumbers: {
        flex: 1,
        paddingHorizontal: 8,
    },
    numbersWrapper: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
    },
    numberText: {
        fontSize: 18,
        fontWeight: "700",
        fontFamily: "monospace",
    },
    ballContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 4,
    },
    ball: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6,
    },
    ballText: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "700",
    },
});