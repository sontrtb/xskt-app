import useColor from "@/hooks/useColor";
import Feather from "@expo/vector-icons/Feather";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Calendar } from 'react-native-calendars';
import BottomSheet from "./BottomSheet";
import ButtonUi from "./ButtonUi";
import Row from "./Row";
import TextInputUi from "./TextInputUi";
import TouchableOpacityUi from "./TouchableOpacityUi";

interface DatePickerUiProps {
    onChange?: (date: string) => void;
    value?: string
}

function DatePickerUi(props: DatePickerUiProps) {
    const { value, onChange } = props;

    const valueConvert = value ? moment(value, "DD-MM-YYYY").format("YYYY-MM-DD") : undefined

    const color = useColor()

    const [isModalVisible, setModalVisible] = useState(false)
    const [dateString, setDateString] = useState<string | undefined>(valueConvert)

    useEffect(() => {
        if (isModalVisible) {
            setDateString(valueConvert)
        }
    }, [valueConvert, isModalVisible])

    const onChangeDate = () => {
        if (dateString) {
            onChange?.(moment(dateString, "YYYY-MM-DD").format("DD-MM-YYYY"))
        }
        setModalVisible(false)
    }

    return (
        <View style={styles.root}>
            <TouchableOpacityUi onPress={() => setModalVisible(true)}>
                <TextInputUi
                    editable={false}
                    placeholder="Chọn ngày"
                    value={value}
                    style={{color: color.text, borderColor: isModalVisible ? color.primary : color.borderColor}}
                    onPress={() => setModalVisible(true)}
                />
            </TouchableOpacityUi>
            <BottomSheet
                isModalVisible={isModalVisible}
                setModalVisible={setModalVisible}
            >
                <View>
                    <Calendar
                        current={moment().format('YYYY-MM-DD')}
                        onDayPress={day => {
                            setDateString(day.dateString)
                        }}
                        markedDates={dateString ? {
                            [dateString]: { selected: true, disableTouchEvent: true }
                        } : undefined}
                        maxDate={moment().format('YYYY-MM-DD')}
                        theme={{
                            backgroundColor: 'transparent',
                            calendarBackground: 'transparent',
                            selectedDayBackgroundColor: color.primary,
                            selectedDayTextColor: '#ffffff',
                            todayTextColor: color.primary,
                            dayTextColor: color.text,
                            textDisabledColor: color.disable,
                            monthTextColor: color.text,
                            textMonthFontWeight: 'bold',
                            arrowColor: color.primary,
                        }}
                        renderArrow={(direction) => (
                            <Feather
                                name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
                                size={24}
                                color={color.primary}
                            />
                        )}
                    />

                    <Row style={styles.footer}>
                        <ButtonUi
                            text="Đóng"
                            style={{ flex: 1 }}
                            type="outline"
                            onPress={() => {
                                setModalVisible(false)
                            }}
                        />
                        <ButtonUi
                            text="Chọn"
                            style={{ flex: 1 }}
                            onPress={onChangeDate}
                        />
                    </Row>
                </View>
            </BottomSheet>
        </View>
    )
}

export default DatePickerUi

const styles = StyleSheet.create({
    root: {

    },
    footer: {
        marginTop: 20,
    }
})