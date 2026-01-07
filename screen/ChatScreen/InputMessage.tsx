import ActivityIndicatorUi from "@/components/ui/ActivityIndicatorUi";
import Row from "@/components/ui/Row";
import TextInputUi from "@/components/ui/TextInputUi";
import TouchableOpacityUi from "@/components/ui/TouchableOpacityUi";
import useColor from "@/hooks/useColor";
import useSendMessage from "@/hooks/useSendMessage";
import { PADDING_PAGE } from "@/theme/layout";
import { EStatusChat, IChatIem } from "@/types/chat";
import Feather from '@expo/vector-icons/Feather';
import { useEffect, useRef, useState } from "react";
import { Keyboard, StyleSheet } from "react-native";

interface InputMessageProps {
    setChatList: React.Dispatch<React.SetStateAction<IChatIem[]>>
    setPendingChatItem: React.Dispatch<React.SetStateAction<IChatIem | undefined>>
}

function InputMessage(props: InputMessageProps) {
    const { setChatList, setPendingChatItem } = props

    const color = useColor()

    const [textInput, setTextInput] = useState("")
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const { sendMessage, isLoading } = useSendMessage({
        onDoneTyping: (mess) => {
            {
                setPendingChatItem(undefined)
                setChatList(pre => [mess, ...pre])
            }
        },
        onTyping: setPendingChatItem,
        onError: () => {
            setPendingChatItem(undefined);
            const newMess: IChatIem = {
                id: new Date().getTime(),
                send: "bot",
                content: "Có lỗi xảy ra. Bạn quay lại sau ít phút nhé !!!",
                status: EStatusChat.success
            }
            setChatList(pre => [newMess, ...pre])
        }
    })

    // Cleanup timeout
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    const handleSendMess = () => {
        Keyboard.dismiss()
        if (textInput.length > 0) {
            const newMess: IChatIem = {
                id: new Date().getTime(),
                send: "user",
                content: textInput,
                status: EStatusChat.success
            }
            setChatList(pre => [newMess, ...pre])

            // Clear timeout cũ nếu có
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }

            // Lưu timeout ID vào ref
            timeoutRef.current = setTimeout(() => {
                sendMessage(textInput)
                timeoutRef.current = null
            }, 100)
        }

        setTextInput("")
    }

    return (
        <Row style={styles.root}>
            <TextInputUi
                value={textInput}
                onChangeText={setTextInput}
                style={styles.textInput}
                placeholder="Tôi mơ thấy ..."
            />
            <TouchableOpacityUi
                disabled={isLoading}
                style={[styles.btnSend, { backgroundColor: color.bgImage }]}
                onPress={handleSendMess}
            >
                {isLoading ? <ActivityIndicatorUi size={22} /> : <Feather name="send" size={22} color={color.primary} />}
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