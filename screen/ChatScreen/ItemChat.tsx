import TextUi from "@/components/ui/TextUi";
import ThinkingDots from "@/components/ui/ThinkingDotsUi";
import useColor from "@/hooks/useColor";
import { EStatusChat, IChatIem } from "@/types/chat";

import { StyleSheet, View } from "react-native";


function ItemChat({item}: {item: IChatIem}) {
    const color = useColor()

    const isBot = item.send === "bot";
    const isThinking = item.status === EStatusChat.thinking;
    
    return (
        <View style={[
            styles.root,
            isBot ? styles.botContainer : styles.userContainer
        ]}>
            <View style={[
                styles.bubble,
                isBot ? styles.botBubble : styles.userBubble,
                {backgroundColor: isBot ? color.bgImage : color.primary}
            ]}>
                {isThinking ? (
                    <ThinkingDots />
                ) : (
                    <TextUi style={[
                        styles.text,
                        isBot ? styles.botText : styles.userText
                    ]}>
                        {item.content}
                    </TextUi>
                )}
            </View>
        </View>
    )
}

export default ItemChat

const styles = StyleSheet.create({
    root: {
        width: "100%",
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    botContainer: {
        alignItems: "flex-start",
    },
    userContainer: {
        alignItems: "flex-end",
    },
    bubble: {
        maxWidth: "80%",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 16,
    },
    botBubble: {
        backgroundColor: "#F0F0F0",
    },
    userBubble: {
        borderBottomRightRadius: 4,
    },
    text: {
        fontSize: 16,
        lineHeight: 22,
    },
    botText: {
        color: "#000000",
    },
    userText: {
        color: "#FFFFFF",
    },
})