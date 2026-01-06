import useColor from "@/hooks/useColor";
import { ReactElement } from "react";
import { StyleSheet, View } from "react-native";
import BottomSheet from "./BottomSheet";
import Row from "./Row";
import TextUi from "./TextUi";
import TouchableOpacityUi from "./TouchableOpacityUi";

interface BottomSheetActionProps {
    isModalVisible: boolean;
    setModalVisible: (o: boolean) => void;
    actions: {
        text: string;
        icon?: ReactElement;
        subText?: string;
        onPress?: () => void;
    }[]
}

function BottomSheetAction(props: BottomSheetActionProps) {
    const { isModalVisible, setModalVisible, actions } = props

    const color = useColor()

    return (
        <BottomSheet
            isModalVisible={isModalVisible}
            setModalVisible={setModalVisible}
        >
            <View>
                {
                    actions.map((action, index) => (
                        <TouchableOpacityUi
                            onPress={action.onPress}
                            key={index}
                            style={[
                                styles.item,
                                { borderColor: color.borderColor }
                            ]}
                        >
                            <Row style={{ justifyContent: "flex-start" }}>
                                {action.icon}
                                <View>
                                    <TextUi textLang={action.text} />
                                    {action.subText && <TextUi style={styles.subText} textLang={action.subText} />}
                                </View>
                            </Row>

                        </TouchableOpacityUi>
                    ))
                }
            </View>
        </BottomSheet>
    )
}

export default BottomSheetAction

const styles = StyleSheet.create({
    root: {

    },
    item: {
        gap: 12,
        padding: 12,
        borderBottomWidth: 1,
    },
    subText: {
        fontSize: 12,
        opacity: 0.7
    }
})