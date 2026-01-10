import CardUi from "@/components/ui/CardUi";
import { PADDING_PAGE } from "@/theme/layout";
import { Image } from 'expo-image';
import { Dimensions, StyleSheet } from "react-native";
import TouchableOpacityUi from "../../../../components/ui/TouchableOpacityUi";

const windowWidth = Dimensions.get('window').width;

const widthItem = (windowWidth - PADDING_PAGE * 2 - 8) / 2

interface UtilityProps {
    icon: any;
    label: string;
    onPress?: () => void;
}

function Utility(props: UtilityProps) {

    return (
        <TouchableOpacityUi onPress={props.onPress}>
            <CardUi style={{padding: 0}}>
                <Image
                    style={styles.image}
                    source={props.icon}
                    contentFit="cover"
                    transition={1000}
                />
            </CardUi>
        </TouchableOpacityUi>
    )
}

export default Utility

const styles = StyleSheet.create({
    name: {
        fontSize: 18,
        fontWeight: "500",
    },
    image: {
        alignItems: "center",
        width: widthItem,
        height: widthItem * 3 / 5,
        borderRadius: 8
    },
})