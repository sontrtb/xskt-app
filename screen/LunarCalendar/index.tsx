import CardUi from "@/components/ui/CardUi";
import DatePickerUi from "@/components/ui/DatePickerUi";
import ImageUi from "@/components/ui/ImageUi";
import Row from "@/components/ui/Row";
import TextUi from "@/components/ui/TextUi";
import TouchableOpacityUi from "@/components/ui/TouchableOpacityUi";
import useColor from "@/hooks/useColor";
import { PADDING_PAGE } from "@/theme/layout";
import { Ionicons } from "@expo/vector-icons";
import { LunarDate } from "lunar-date-vi";
import moment from "moment";
import { useMemo, useState } from "react";
import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";

function LunarCalendar() {
    const color = useColor();
    const [date, setDate] = useState(new Date());

    const lunarDate = useMemo(() => new LunarDate(date), [date]);

    const handlePrevDay = () => {
        setDate(prev => moment(prev).subtract(1, 'days').toDate());
    };

    const handleNextDay = () => {
        setDate(prev => moment(prev).add(1, 'days').toDate());
    };

    const solarInfo = moment(date).format("DD-MM-YYYY");
    const lunarInfo = `Ngày ${lunarDate.date}/${lunarDate.month}/${lunarDate.year} ${lunarDate.isLeap ? '(Nhuận)' : ''}`;

    return (
        <ScrollView style={styles.container} contentContainerStyle={[styles.root, { backgroundColor: color.bg }]}>
            <CardUi title="Chọn ngày">
                <DatePickerUi
                    value={moment(date).format("DD-MM-YYYY")}
                    onChange={(val) => setDate(moment(val, "DD-MM-YYYY").toDate())}
                />
            </CardUi>

            <CardUi style={{ marginTop: 16 }}>
                <View style={styles.calendarContainer}>
                    <TouchableOpacityUi onPress={handlePrevDay} style={styles.navButton}>
                        <Ionicons name="chevron-back" size={32} color={color.primary} />
                    </TouchableOpacityUi>

                    <ImageBackground
                        source={require("@/assets/images/lunar-calendar/bg-day.png")}
                        style={styles.imageGoldenCircle}
                        imageStyle={{ borderRadius: 112 }}
                    >
                        <TextUi style={styles.lunarLabel}>{lunarDate.getYearName()}</TextUi>
                        <TextUi weight="bold" style={styles.mainTextDay}>{lunarDate.date}</TextUi>
                        <TextUi style={styles.textMonth}>Tháng {lunarDate.month}</TextUi>
                    </ImageBackground>

                    <TouchableOpacityUi onPress={handleNextDay} style={styles.navButton}>
                        <Ionicons name="chevron-forward" size={32} color={color.primary} />
                    </TouchableOpacityUi>
                </View>

                <View style={styles.timeGrid}>
                    <View style={styles.timeItem}>
                        <TextUi style={styles.timeLabel}>DƯƠNG LỊCH</TextUi>
                        <TextUi style={styles.timeValue}>{moment(date).date()}</TextUi>
                        <TextUi style={styles.timeSubtext}>Tháng {moment(date).month() + 1}</TextUi>
                    </View>
                    <View style={{ width: 1, backgroundColor: '#E5E7EB' }} />
                    <View style={styles.timeItem}>
                        <TextUi style={styles.timeLabel}>TIẾT KHÍ</TextUi>
                        <TextUi style={styles.timeValue}>{lunarDate.getSolarTerm()}</TextUi>
                        <TextUi style={styles.timeSubtext}>{moment(date).year()}</TextUi>
                    </View>
                </View>

                <View style={styles.infoSection}>
                    <TextUi style={[styles.infoTitle, { color: color.primary }]}>NGÀY HÀNH ĐẠO</TextUi>
                    <TextUi style={styles.infoText}>{lunarDate.getDayName()}</TextUi>
                </View>

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
    container: {
        flex: 1,
    },
    root: {
        flexGrow: 1,
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
