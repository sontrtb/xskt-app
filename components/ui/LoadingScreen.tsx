import { ReactNode } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import ActivityIndicatorUi from "./ActivityIndicatorUi";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface LoadingScreenProps {
    children: ReactNode,
    isLoading: boolean
}

function LoadingScreen(props: LoadingScreenProps) {
    const { children, isLoading } = props
    return (
        <View style={styles.root}>
            <View style={{flex: 1, zIndex: 1}}>
                {children}
            </View>
            {
                isLoading &&
                <View style={styles.loadingWrap}>
                    <ActivityIndicatorUi />
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        position: "relative"
    },
    loadingWrap: {
        height: windowHeight,
        width: windowWidth,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        position: "absolute",
        zIndex: 10000,
        alignItems: "center",
        justifyContent: "center"
    }
})

export default LoadingScreen