import useColor from "@/hooks/useColor";
import { ActivityIndicator } from "react-native";

function ActivityIndicatorUi() {
    const color = useColor()
    return <ActivityIndicator size="large" color={color.primary}/>
}

export default ActivityIndicatorUi