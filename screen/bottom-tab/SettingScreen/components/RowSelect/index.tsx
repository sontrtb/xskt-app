import Row from "@/components/ui/Row";
import TextUi from "@/components/ui/TextUi";
import TouchableOpacityUi from "@/components/ui/TouchableOpacityUi";
import useTheme from "@/hooks/useColor";
import Feather from '@expo/vector-icons/Feather';
import { ReactElement } from "react";

import { StyleSheet } from "react-native";

interface RowSelectProps {
    text: string;
    icon: ReactElement;
    textValue?: string;
    onPress?: () => void;
}

function RowSelect(props: RowSelectProps) {
    const { text, icon, textValue, onPress } = props

    const color = useTheme()

    return (
        <TouchableOpacityUi onPress={onPress}>
            <Row style={styles.root}>
                <Row style={{maxWidth: "70%"}}>
                    {icon}
                    <TextUi style={styles.text} textLang={text} />
                </Row>

                <Row>
                    <TextUi style={styles.textValue} textLang={textValue}/>
                    <Feather name="chevron-right" size={18} color={color.text} />
                </Row>
            </Row>
        </TouchableOpacityUi>
    )
}

export default RowSelect

const styles = StyleSheet.create({
    root: {
        paddingVertical: 12
    },
    text: {
        fontSize: 16,
    },
    textValue: {
        fontSize: 16,
        fontWeight: "500",
    }
})