import useColor from "@/hooks/useColor";
import Feather from '@expo/vector-icons/Feather';
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import BottomSheetAction from "./BottomSheetAction";
import TextUi from "./TextUi";
import TouchableOpacityUi from "./TouchableOpacityUi";

interface IOption {
    value: string | number | boolean;
    label: string;
    subLabel?: string;
}

interface SelectOptionProps {
    label?: string;
    options: IOption[];
    placeholder?: string;
    onChange?: (v: IOption) => void;
    errorText?: string;
    required?: boolean;
}

function SelectOptionUi(props: SelectOptionProps) {
    const {
        options,
        onChange,
        label,
        placeholder,
        errorText,
        required
    } = props

    const color = useColor()

    const [show, setShow] = useState(false)

    const [selectValue, setSelectValue] = useState<IOption>()

    const onChangeState = (v: IOption) => {
        onChange?.(v)
        setSelectValue(v)
        setShow(false)
    }

    return (
        <View style={styles.root}>
            {label && <TextUi style={styles.label}>{label} {required && <TextUi style={styles.required}>*</TextUi>}</TextUi>}
            <TouchableOpacityUi
                style={[
                    styles.input,
                    {
                        borderColor: show ? color.primary : color.borderColor
                    }
                ]}
                onPress={() => (
                    setShow(true)
                )}
            >
                <TextUi style={{ color: selectValue ? color.text : color.disable }}>{selectValue?.label ?? placeholder ?? "Chọn..."}</TextUi>
                <Feather name="chevron-down" size={20} color={color.borderColor} />
            </TouchableOpacityUi>
            {
                errorText &&
                <TextUi style={styles.errorText} textLang={errorText} />
            }

            <BottomSheetAction
                isModalVisible={show}
                setModalVisible={setShow}
                actions={
                    options.map(o => ({
                        text: o.label,
                        subText: o.subLabel,
                        onPress: () => {
                            onChangeState(o)
                        }
                    }
                    ))}
            />
        </View>
    )
}

export default SelectOptionUi

const styles = StyleSheet.create({
    root: {},
    input: {
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    label: {
        fontWeight: "500",
        marginBottom: 4
    },
    errorText: {
        color: "red",
        marginTop: 4,
        fontSize: 12
    },
    required: {
        color: "red",
        fontWeight: "500"
    },
})
