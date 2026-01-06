import useColor from "@/hooks/useColor";
import { PADDING_PAGE } from "@/theme/layout";
import { ReactElement } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { PanGestureHandler } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface BottomSheetProps {
    isModalVisible: boolean;
    setModalVisible: (o: boolean) => void;
    children: ReactElement
}

function BottomSheet(props: BottomSheetProps) {
    const { isModalVisible, setModalVisible, children } = props

    const insets = useSafeAreaInsets();
        const bottomBarHeight = Platform.OS === "android" ? insets.bottom : 0;

    const color = useColor()

    const handleGesture = (event: any) => {
        // Khi vuốt xuống hơn 100px thì đóng modal
        if (event.nativeEvent.translationY > 100) {
            setModalVisible(false);
        }
    };

    return (
        <Modal
            isVisible={isModalVisible}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            backdropOpacity={0.3}
            onBackdropPress={() => setModalVisible(false)}
            onSwipeComplete={() => setModalVisible(false)}
            swipeDirection="down"
            propagateSwipe={true}
            style={[styles.modal]}
        >
            <PanGestureHandler onGestureEvent={handleGesture}>
                <View style={[styles.container, {backgroundColor: color.bgCard}]}>
                    <View style={styles.handleContainer}>
                        <View style={styles.handle}/>
                    </View>
                    {children}
                    <View style={{height: bottomBarHeight}}/>
                </View>
            </PanGestureHandler>
        </Modal>
    )
}

export default BottomSheet

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    container: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: PADDING_PAGE,
        paddingTop: 0,
        minHeight: 200,
    },
    handleContainer: {
        alignItems: 'center',
        paddingVertical: 12,
    },
    handle: {
        height: 4,
        width: 100,
        borderRadius: 2,
        backgroundColor: '#DDDDDD',
    }
})