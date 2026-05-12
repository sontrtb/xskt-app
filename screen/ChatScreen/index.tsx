import useColor from "@/hooks/useColor";
import { PADDING_PAGE } from "@/theme/layout";
import { EStatusChat, IChatIem } from "@/types/chat";
import { useState } from "react";
import { FlatList, Platform, StyleSheet } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import InputMessage from "./InputMessage";
import ItemChat from "./ItemChat";

const initChats: IChatIem[] = [
  {
    id: 1,
    send: "bot",
    content: "Chào bạn 👋, mình là bot AI giải mã giấc mơ. Bạn hãy cho biết bạn mơ thấy gì để mình giải mã nhé !!!",
    status: EStatusChat.success
  },
];

function ChatScreen() {
  const color = useColor()

  const [chatList, setChatList] = useState<IChatIem[]>(initChats)

  const [pendingChatItem, setPendingChatItem] = useState<IChatIem>()

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.root, { backgroundColor: color.bg }]}
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

      {
        pendingChatItem && <ItemChat item={pendingChatItem} />
      }

      <InputMessage
        setChatList={setChatList}
        setPendingChatItem={setPendingChatItem}
      />
    </KeyboardAvoidingView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingBottom: PADDING_PAGE
  },
  flatList: {
    flex: 1,
  },
  flatListContent: {
    flexGrow: 1,
    justifyContent: 'flex-start', // Đổi thành flex-start khi dùng inverted
  }
})