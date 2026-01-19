import CardUi from '@/components/ui/CardUi';
import DatePickerUi from '@/components/ui/DatePickerUi';
import TextUi from '@/components/ui/TextUi';
import useColor from '@/hooks/useColor';
import { now } from '@/lib/date';
import { PADDING_PAGE } from '@/theme/layout';
import Feather from '@expo/vector-icons/Feather';
import { SolarDate } from "@nghiavuive/lunar_date_vi";
import moment from 'moment';
import React, { useMemo, useState } from 'react';
import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';

function LunarCalendar() {
    const color = useColor();

    const [currentDate, setCurrentDate] = useState(now);

    const getDayOfWeekVietnamese = () => {
        const daysOfWeek = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
        return daysOfWeek[currentDate.day()];
    };

    const lunarDate = useMemo(() => {
        return new SolarDate(currentDate.toDate()).toLunarDate();
    }, [currentDate])

    const navigateDate = (direction: number) => {
        setCurrentDate(prevDate => prevDate.clone().add(direction, 'days'));
    };

    return (
        <ScrollView contentContainerStyle={[styles.root, { backgroundColor: color.bg }]}>
            <View style={styles.fieldContainer}>
                <TextUi style={styles.label}>Chọn ngày</TextUi>
                <DatePickerUi
                    value={currentDate.format("DD-MM-YYYY")}
                    onChange={date => setCurrentDate(moment(date, "DD-MM-YYYY"))}
                />
            </View>

            <TextUi style={styles.header}>
                {getDayOfWeekVietnamese()}, {currentDate.format("DD-MM-YYYY")}
            </TextUi>

            <View style={styles.calendarContainer}>
                <TouchableOpacity
                    style={styles.navButton}
                    onPress={() => navigateDate(-1)}
                >
                    <Feather name="arrow-left-circle" size={32} color={color.primary} />
                </TouchableOpacity>

                <ImageBackground
                    resizeMode="cover"
                    style={styles.imageGoldenCircle}
                    imageStyle={{ tintColor: color.primary }}
                    source={require("@/assets/images/lunar-calendar/bg-day.png")}
                >
                    <TextUi style={styles.lunarLabel}>Âm lịch</TextUi>
                    <TextUi style={styles.mainTextDay}>{lunarDate.get().day}</TextUi>
                    <TextUi style={styles.textMonth}>Tháng {lunarDate.get().month}</TextUi>
                </ImageBackground>

                <TouchableOpacity
                    style={styles.navButton}
                    onPress={() => navigateDate(1)}
                >
                    <Feather name="arrow-right-circle" size={32} color={color.primary} />
                </TouchableOpacity>
            </View>

            {/* Lunar Calendar Details */}
            <CardUi title='Âm lịch'>
                {/* Time Grid */}
                <View style={styles.timeGrid}>
                    <View style={styles.timeItem}>
                        <TextUi style={styles.timeLabel}>NGÀY</TextUi>
                        <TextUi style={[styles.timeValue, { color: color.primary }]}>{lunarDate.get().day}</TextUi>
                        <TextUi style={styles.timeSubtext}>Ngày {lunarDate.getDayName()}</TextUi>
                    </View>

                    <View style={styles.timeItem}>
                        <TextUi style={styles.timeLabel}>THÁNG</TextUi>
                        <TextUi style={[styles.timeValue, { color: color.primary }]}>{lunarDate.get().month}</TextUi>
                        <TextUi style={styles.timeSubtext}>Tháng {lunarDate.getMonthName()}</TextUi>
                    </View>

                    <View style={styles.timeItem}>
                        <TextUi style={styles.timeLabel}>NĂM</TextUi>
                        <TextUi style={[styles.timeValue, { color: color.primary }]}>{lunarDate.get().year}</TextUi>
                        <TextUi style={styles.timeSubtext}>Năm {lunarDate.getYearName()}</TextUi>
                    </View>
                </View>

                <View style={styles.infoSection}>
                    <TextUi style={[styles.infoTitle, { color: color.primary }]}>Tiết khí</TextUi>
                    <TextUi style={styles.infoText}>
                        {lunarDate.getSolarTerm()}
                    </TextUi>
                </View>

                {/* Auspicious Hours */}
                <View style={styles.infoSection}>
                    <TextUi style={[styles.infoTitle, { color: color.primary }]}>GIỜ HOÀNG ĐẠO</TextUi>
                    <TextUi style={styles.infoText}>
                        {
                            lunarDate.getLuckyHours().map(h => `${h.name} (${h.time[0]}h - ${h.time[1]}h)`).join(",  ")
                        }
                    </TextUi>
                </View>
            </CardUi>
        </ScrollView>
    );
}

export default LunarCalendar;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: PADDING_PAGE,
    },
    fieldContainer: {
        marginBottom: 16,
    },
    label: {
        fontWeight: "500",
        marginBottom: 8
    },
    header: {
        fontSize: 20,
        textAlign: "center"
    },
    calendarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 32,
        gap: 16
    },
    navButton: {
        padding: 12,
    },
    imageGoldenCircle: {
        width: 224,
        height: 224,
        borderRadius: 112,
        justifyContent: "center",
        alignItems: "center",
    },
    lunarLabel: {
        color: '#fff'
    },
    mainTextDay: {
        color: '#fff',
        fontSize: 64,
        lineHeight: 68
    },
    textMonth: {
        fontSize: 18,
        color: "#fff"
    },
    timeGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    timeItem: {
        flex: 1,
        alignItems: 'center',
    },
    timeLabel: {
        fontWeight: '600',
        color: '#6B7280',
    },
    timeValue: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 6,
        marginTop: 4
    },
    timeSubtext: {
        fontSize: 14,
    },
    infoSection: {
        marginBottom: 16,
    },
    infoTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    infoText: {
        color: '#374151',
        lineHeight: 22,
    },
});