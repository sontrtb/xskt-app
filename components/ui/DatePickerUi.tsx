import useColor from "@/hooks/useColor";
import Feather from "@expo/vector-icons/Feather";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Calendar, LocaleConfig } from 'react-native-calendars';
import BottomSheet from "./BottomSheet";
import ButtonUi from "./ButtonUi";
import Row from "./Row";
import TextInputUi from "./TextInputUi";
import TouchableOpacityUi from "./TouchableOpacityUi";

interface DatePickerUiProps {
    onChange?: (date: string) => void;
    value?: string
    disable?: boolean
}

function DatePickerUi(props: DatePickerUiProps) {
    const { value, onChange, disable } = props;

    const valueConvert = value ? moment(value, "DD-MM-YYYY").format("YYYY-MM-DD") : undefined

    LocaleConfig.locales['vi'] = {
        monthNames: [
            'Tháng 1',
            'Tháng 2',
            'Tháng 3',
            'Tháng 4',
            'Tháng 5',
            'Tháng 6',
            'Tháng 7',
            'Tháng 8',
            'Tháng 9',
            'Tháng 10',
            'Tháng 11',
            'Tháng 12',
        ],
        monthNamesShort: [
            'Th1',
            'Th2',
            'Th3',
            'Th4',
            'Th5',
            'Th6',
            'Th7',
            'Th8',
            'Th9',
            'Th10',
            'Th11',
            'Th12',
        ],
        dayNames: [
            'Chủ nhật',
            'Thứ hai',
            'Thứ ba',
            'Thứ tư',
            'Thứ năm',
            'Thứ sáu',
            'Thứ bảy',
        ],
        dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
        today: 'Hôm nay',
    };

    LocaleConfig.defaultLocale = 'vi';

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
            <TouchableOpacityUi disabled={disable} onPress={() => setModalVisible(true)}>
                <TextInputUi
                    editable={false}
                    placeholder="Chọn ngày"
                    value={value}
                    style={{ color: color.text, borderColor: isModalVisible ? color.primary : color.borderColor }}
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