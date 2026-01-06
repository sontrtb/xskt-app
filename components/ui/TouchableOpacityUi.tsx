import { TouchableOpacity, TouchableOpacityProps } from "react-native";

function TouchableOpacityUi(props: TouchableOpacityProps) {
    return (
        <TouchableOpacity activeOpacity={0.5} {...props}/>
    )
}

export default TouchableOpacityUi