import TextUi from "@/components/ui/TextUi";
import useColor from "@/hooks/useColor";
import { PADDING_PAGE } from "@/theme/layout";
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, StyleSheet, View } from "react-native";
import TouchableOpacityUi from "../../../../components/ui/TouchableOpacityUi";

const windowWidth = Dimensions.get('window').width;

const widthItem = (windowWidth - PADDING_PAGE * 2 - 8) / 2

interface UtilityProps {
    label: string;
    icon?: string;
    iconLib?: string;
    onPress?: () => void;
    index: number;
}

function Utility(props: UtilityProps) {
    const color = useColor()

    // Xác định hướng gradient dựa trên vị trí của item
    const getGradientDirection = (index: number) => {
        switch(index) {
            case 0: // Top left - gradient từ trên trái xuống dưới phải (hướng về tâm)
                return {
                    start: { x: 0, y: 0 },
                    end: { x: 1, y: 1 }
                };
            case 1: // Top right - gradient từ trên phải xuống dưới trái (hướng về tâm)
                return {
                    start: { x: 1, y: 0 },
                    end: { x: 0, y: 1 }
                };
            case 2: // Bottom left - gradient từ dưới trái lên trên phải (hướng về tâm)
                return {
                    start: { x: 0, y: 1 },
                    end: { x: 1, y: 0 }
                };
            case 3: // Bottom right - gradient từ dưới phải lên trên trái (hướng về tâm)
                return {
                    start: { x: 1, y: 1 },
                    end: { x: 0, y: 0 }
                };
            default:
                return {
                    start: { x: 0, y: 0 },
                    end: { x: 1, y: 1 }
                };
        }
    }

    const gradientDirection = getGradientDirection(props.index);

    const renderIcon = () => {
        if (!props.icon) return null;

        const iconProps = {
            name: props.icon as any,
            size: 32,
            color: "#ffffff"
        };

        if (props.iconLib === 'MaterialCommunityIcons') {
            return <MaterialCommunityIcons {...iconProps} />;
        }
        
        return <Feather {...iconProps} />;
    };

    return (
        <TouchableOpacityUi onPress={props.onPress}>
            <LinearGradient
                colors={[color.primary, '#f16380', '#f5859c']}
                start={gradientDirection.start}
                end={gradientDirection.end}
                style={[
                    styles.content
                ]}
            >
                <View style={styles.iconContainer}>
                    {renderIcon()}
                </View>
                <TextUi style={styles.name}>{props.label}</TextUi>
            </LinearGradient>
        </TouchableOpacityUi>
    )
}

export default Utility

const styles = StyleSheet.create({
    name: {
        fontSize: 16,
        fontWeight: "500",
        textAlign: "center",
        color: "#ffffff"
    },
    iconContainer: {
        marginBottom: 8
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