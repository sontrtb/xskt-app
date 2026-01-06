import useTheme from "@/hooks/useColor";
import { PADDING_PAGE } from "@/theme/layout";
import Constants from 'expo-constants';
import { ReactElement } from "react";
import { StyleSheet, View } from "react-native";
import TextUi from "../ui/TextUi";

const statusBarHeight = Constants.statusBarHeight;

interface IHeaderHome {
    title: string,
    action?: ReactElement
}

function HeaderHome(props: IHeaderHome) {
    const {title, action} = props

    const color = useTheme()

    return (
        <View style={[styles.root, {backgroundColor: color.primary}]}>
            <TextUi style={styles.title}>{title}</TextUi>
            {action}
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        paddingTop: statusBarHeight + 10,
        paddingHorizontal: PADDING_PAGE,
        paddingBottom: PADDING_PAGE,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row"
    },
    title: {
        fontSize: 22,
        fontWeight: "600",
        color: "#fff"
    }
})

export default HeaderHome