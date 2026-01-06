import Row from "@/components/ui/Row";
import TextInputUi from "@/components/ui/TextInputUi";
import TouchableOpacityUi from "@/components/ui/TouchableOpacityUi";
import useColor from "@/hooks/useColor";
import { PADDING_PAGE } from "@/theme/layout";
import Feather from '@expo/vector-icons/Feather';
import { StyleSheet } from "react-native";

function InputMessage() {
    const color = useColor()

    return (
        <Row style={styles.root}>
            <TextInputUi style={styles.textInput} placeholder="Mơ thấy ..."/>
            <TouchableOpacityUi style={[styles.btnSend, {backgroundColor: color.bgImage}]}>
                <Feather name="send" size={22} color={color.primary} />
            </TouchableOpacityUi>
        </Row>
    )
}

export default InputMessage

const styles = StyleSheet.create({
    root: {
        padding: PADDING_PAGE
    },
    textInput: {
        borderRadius: 100
    },
    btnSend: {
        height: 44,
        width: 44,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20
    }
})
