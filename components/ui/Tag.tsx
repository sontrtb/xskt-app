

import useColor from "@/hooks/useColor";
import { StyleSheet, View } from "react-native";
import TextUi from "./TextUi";

interface TagProps {
    backgroundColor?: string;
    text?: string;
}

function Tag(props: TagProps) {
    const color = useColor()

    const { backgroundColor, text } = props;

    return (
        <View style={styles.statusContainer}>
            <View
                style={[
                    styles.statusBadge,
                    { backgroundColor: backgroundColor ?? color.primary }
                ]}
            >
                <TextUi style={styles.statusText}>
                    {text}
                </TextUi>
            </View>
        </View>
    )
}

export default Tag

const styles = StyleSheet.create({
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    statusText: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: '600',
    },
})