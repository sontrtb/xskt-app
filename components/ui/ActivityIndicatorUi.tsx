import useColor from "@/hooks/useColor";
import { ActivityIndicator } from "react-native";

function ActivityIndicatorUi({size}: {size?: number | "small" | "large"}) {
    const color = useColor()
    return <ActivityIndicator size={size ?? "large"} color={color.primary}/>
}

export default ActivityIndicatorUi