import { ReactNode } from "react";
import { Dimensions, StyleSheet, View } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface LoadingComponentUiProps {
    children: ReactNode,
    isLoading: boolean
}

function LoadingComponentUi(props: LoadingComponentUiProps) {
    const { children, isLoading } = props
    return (
        <View style={styles.root}>
            {/* <View style={{zIndex: 1}}>
                {children}
            </View>
            {
                isLoading &&
                <View style={styles.loadingWrap}>
                    <ActivityIndicatorUi />
                </View>
            } */}
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        position: "relative"
    },
    loadingWrap: {
        height: windowHeight,
        width: windowWidth,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        position: "absolute",
        zIndex: 10000,
        alignItems: "center",
        justifyContent: "center"
    }
})

export default LoadingComponentUi