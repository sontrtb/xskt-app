import Row from "@/components/ui/Row";
import TextInputUi from "@/components/ui/TextInputUi";
import TouchableOpacityUi from "@/components/ui/TouchableOpacityUi";
import useColor from "@/hooks/useColor";
import useSendMessage from "@/hooks/useSendMessage";
import { PADDING_PAGE } from "@/theme/layout";
import { IChatIem } from "@/types/chat";
import Feather from '@expo/vector-icons/Feather';
import { useState } from "react";
import { Keyboard, StyleSheet } from "react-native";

interface InputMessageProps {
    setChatList: React.Dispatch<React.SetStateAction<IChatIem[]>>
}

function InputMessage(props: InputMessageProps) {
    const { setChatList } = props

    const color = useColor()

    const [textInput, setTextInput] = useState("")

    const { sendMessage, isLoading } = useSendMessage({
        onDoneTyping: (mess) => { console.log(mess) },
        onTyping: (mess) => { console.log(mess) },
    })

    const handleSendMess = () => {
        Keyboard.dismiss()
        setTextInput("")
    }

    return (
        <Row style={styles.root}>
            <TextInputUi
                value={textInput}
                onChangeText={setTextInput}
                style={styles.textInput}
                placeholder="Mơ thấy ..."
            />
            <TouchableOpacityUi
                disabled
                style={[styles.btnSend, { backgroundColor: color.bgImage }]}
                onPress={handleSendMess}
            >
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
