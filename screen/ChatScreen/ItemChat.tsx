import TextUi from "@/components/ui/TextUi";
import { IChatIem } from "@/types/chat";
import { StyleSheet, View } from "react-native";

function ItemChat({item}: {item: IChatIem}) {
    return (
        <View style={styles.root}>
            <TextUi>{item.content}</TextUi>
        </View>
    )
}

export default ItemChat

const styles = StyleSheet.create({
    root: {
        
    }
})