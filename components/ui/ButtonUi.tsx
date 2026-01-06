import useTheme from "@/hooks/useColor";
import { useMemo } from "react";
import { ActivityIndicator, StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import TextUi from "./TextUi";

interface ButtonUiProps {
    text: string;
    type?: "primary" | "outline";
    style?: StyleProp<ViewStyle>;
    onPress?: () => void;
    isLoading?: boolean;
    disable?: boolean
}

function ButtonUi(props: ButtonUiProps) {
    const {
        text,
        type = "primary",
        style,
        onPress,
        isLoading,
        disable
    } = props;

    const color = useTheme()

    const colorBtn = useMemo(() => {
        let bgColor = color.primary
        let textColor = "#fff"

        switch (type) {
            case "primary":
                bgColor = color.primary
                textColor = "#fff"
                break
            case "outline":
                bgColor = color.bgImage
                textColor = color.primary
                break
        }

        return { bgColor, textColor }
    }, [color, type])

    return (
        <TouchableOpacity
            disabled={isLoading || disable}
            activeOpacity={0.6}
            style={[
                styles.root,
                {
                    backgroundColor: (isLoading || disable) ? color.disable : colorBtn.bgColor,
                },
                style
            ]}
            onPress={onPress}
        >
            {isLoading ? <ActivityIndicator size="small" color="#ffffff" /> : <TextUi style={{ color: colorBtn.textColor, fontWeight: "500" }}>{text}</TextUi>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    root: {
        paddingHorizontal: 12,
        height: 44,
        borderRadius: 22,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default ButtonUi