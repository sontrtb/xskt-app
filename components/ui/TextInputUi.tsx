import useTheme from "@/hooks/useColor";
import Feather from '@expo/vector-icons/Feather';
import { useState } from "react";
import { StyleSheet, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";
import TextUi from "./TextUi";

interface TextInputUiProps extends TextInputProps {
    label?: string;
    errorText?: string;
    height?: number;
    isPassword?: boolean;
    required?: boolean;
}

function TextInputUi(props: TextInputUiProps) {
    const {
        label,
        errorText,
        height,
        isPassword,
        required,
        ...restProps
    } = props

    const color = useTheme()
    const [isFocused, setIsFocused] = useState(false)
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    return (
        <View style={styles.root}>
            {label && <TextUi style={styles.label}>{label} {required && <TextUi style={styles.required}>*</TextUi>}</TextUi>}
            <View style={[styles.inputContainer, {height: height}]}>
                <TextInput
                    placeholderTextColor={color.disable}
                    onFocus={(e) => {
                        setIsFocused(true)
                        restProps.onFocus?.(e)
                    }}
                    onBlur={(e) => {
                        setIsFocused(false)
                        restProps.onBlur?.(e)
                    }}
                    secureTextEntry={isPassword && !isPasswordVisible}
                    {...restProps}
                    style={[
                        styles.textInput,
                        {
                            borderColor: isFocused ? color.primary : color.borderColor,
                            height: height,
                            paddingRight: isPassword ? 50 : 12
                        },
                        restProps.style
                    ]}
                />
                {isPassword && (
                    <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                        activeOpacity={0.7}
                    >
                        {isPasswordVisible ?
                            <Feather name="eye" size={20} color={color.text} /> :
                            <Feather name="eye-off" size={20} color={color.text} />
                        }
                    </TouchableOpacity>
                )}
            </View>
            {
                errorText &&
                <TextUi style={styles.errorText} textLang={errorText} />
            }
        </View>
    )
}

export default TextInputUi

const styles = StyleSheet.create({
    root: {
        // flex: 1
    },
    inputContainer: {
        position: "relative",
    },
    required: {
        color: "red",
        fontWeight: "500"
    },
    textInput: {
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    eyeIcon: {
        position: "absolute",
        right: 12,
        top: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        width: 30,
    },
    errorText: {
        color: "red",
        marginTop: 4,
        fontSize: 12
    },
    label: {
        fontWeight: "500",
        marginBottom: 4
    }
})