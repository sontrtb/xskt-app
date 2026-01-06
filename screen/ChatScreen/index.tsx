import useColor from "@/hooks/useColor";
import { IChatIem } from "@/types/chat";
import { useState } from "react";
import { FlatList, Platform, StyleSheet } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import InputMessage from "./InputMessage";
import ItemChat from "./ItemChat";

function ChatScreen() {
    const color = useColor()

    const [chatList, setChatList] = useState<IChatIem[]>([])

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
                inverted={chatList.length > 0} // Đảo ngược list để tin nhắn mới ở dưới
            />
            <InputMessage />
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