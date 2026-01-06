import useTheme from "@/hooks/useColor";
import { PADDING_PAGE } from "@/theme/layout";
import { ReactElement } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import TextUi from "../ui/TextUi";
import TouchableOpacityUi from "../ui/TouchableOpacityUi";

const windowWidth = Dimensions.get('window').width;

interface UtilityProps {
    icon: ReactElement;
    label: string;
    onPress?: () => void;
}

function Utility(props: UtilityProps) {

    const color = useTheme();
    
    return (
        <TouchableOpacityUi style={styles.item} onPress={props.onPress}>
            <View style={[
                styles.iconWrap,
                {
                    backgroundColor: color.bgImage
                }
            ]}>
                {props.icon}
            </View>

            <TextUi allowFontScaling={false} style={{textAlign: "center", height: 36}}>{props.label}</TextUi>
        </TouchableOpacityUi>
    )
}

export default Utility

const styles = StyleSheet.create({
    iconWrap: {
        height: 50,
        width: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
        marginBottom: 10
    },
    name: {
        fontSize: 18,
        fontWeight: "500",
    },
    idWrap: {
        marginTop: 8,
        justifyContent: "flex-start"
    },
    item: {
        alignItems: "center",
        width: (windowWidth - PADDING_PAGE * 4 - 60) / 4
    }
})