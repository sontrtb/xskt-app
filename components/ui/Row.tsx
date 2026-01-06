import { View, ViewProps } from "react-native";

function Row(props: ViewProps) {
    return (
        <View {...props} style={[{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 8 }, props.style]} />
    )
}

export default Row;