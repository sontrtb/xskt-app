import useColor from "@/hooks/useColor";
import { EStatusChat, IChatIem } from "@/types/chat";
import { useState } from "react";
import { FlatList, Platform, StyleSheet } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import InputMessage from "./InputMessage";
import ItemChat from "./ItemChat";

const initChats: IChatIem[] = [
  {
    id: 1,
    send: "user",
    content: "Hello bot!",
    status: EStatusChat.success
  },
  {
    id: 2,
    send: "bot",
    content: "Chào bạn 👋, mình có thể giúp gì?",
    status: EStatusChat.success
  },
  {
    id: 3,
    send: "user",
    content: "Đợi xíu nha...",
    status: EStatusChat.pending
  },
  {
    id: 4,
    send: "bot",
    content: "Mình đang suy nghĩ câu trả lời...",
    status: EStatusChat.thinking
  }
];

function ChatScreen() {
    const color = useColor()

    const [chatList, setChatList] = useState<IChatIem[]>(initChats)

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.root, {backgroundColor: color.bg}]}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}
        >
            <FlatList
                data={chatList}
                renderItem={({ item }) => <ItemChat item={item} />}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.flatListContent}
                style={styles.flatList}
                inverted={chatList.length > 0}
            />

            <InputMessage
                setChatList={setChatList}
            />
        </KeyboardAvoidingView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    flatList: {
        flex: 1,
    },
    flatListContent: {
        flexGrow: 1,
        justifyContent: 'flex-start', // Đổi thành flex-start khi dùng inverted
    }
})