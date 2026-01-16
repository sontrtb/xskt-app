import TextUi from "@/components/ui/TextUi";
import useColor from "@/hooks/useColor";
import { PADDING_PAGE } from "@/theme/layout";
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, StyleSheet } from "react-native";
import TouchableOpacityUi from "../../../../components/ui/TouchableOpacityUi";

const windowWidth = Dimensions.get('window').width;

const widthItem = (windowWidth - PADDING_PAGE * 2 - 8) / 2

interface UtilityProps {
    label: string;
    onPress?: () => void;
}

function Utility(props: UtilityProps) {
    const color = useColor()

    return (
        <TouchableOpacityUi onPress={props.onPress}>
            <LinearGradient
                colors={[color.primary, '#f16380', '#f5859c']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                    styles.content
                ]}
            >
                <TextUi style={styles.name}>{props.label}</TextUi>
            </LinearGradient>
        </TouchableOpacityUi>
    )
}

export default Utility

const styles = StyleSheet.create({
    name: {
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center",
        color: "#ffffff"
    },
    content: {
        alignItems: "center",
        justifyContent: "center",
        width: widthItem,
        height: widthItem * 3 / 5,
        overflow: 'hidden',
        padding: 12,
        borderRadius: 12,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    gradient: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
})