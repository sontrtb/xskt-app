import useColor from "@/hooks/useColor"
import { KeyboardAvoidingViewProps, Platform } from "react-native"
import { KeyboardAwareScrollView, KeyboardToolbar } from "react-native-keyboard-controller"

function KeyboardAvoidingViewUi(props: KeyboardAvoidingViewProps | any) {
    const color = useColor()
    return (
        <>
            <KeyboardAwareScrollView bottomOffset={62}
                style={{ flex: 1, backgroundColor: color.bg }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                {...props}
            />
            {
                Platform.OS === "ios" &&
                <KeyboardToolbar />
            }
        </>
    )
}

export default KeyboardAvoidingViewUi