import Row from '@/components/ui/Row';
import SpaceUi from '@/components/ui/SpaceUi';
import TextUi from '@/components/ui/TextUi';
import { useTheme } from '@/stores/useTheme';
import { PADDING_PAGE } from '@/theme/layout';
import Constants from 'expo-constants';
import { GlassView } from 'expo-glass-effect';
import { ImageBackground } from 'expo-image';
import moment from 'moment';
import 'moment/locale/vi';
import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from "react-native";

const statusBarHeight = Constants.statusBarHeight;
const windowWidth = Dimensions.get('window').width;

moment.locale('vi');



function WeatherBox() {
    const { theme } = useTheme()
    const isDark = theme === "dart"

    const [currentTime, setCurrentTime] = useState(moment().format('HH:mm'));
    const [currentDate, setCurrentDate] = useState(moment().format('dddd, DD [tháng] MM, YYYY'));

    useEffect(() => {
        const updateDateTime = () => {
            setCurrentTime(moment().format('HH:mm'));
            const dateStr = moment().format('dddd, DD [tháng] MM, YYYY');
            setCurrentDate(dateStr.charAt(0).toUpperCase() + dateStr.slice(1));
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 1000);

        return () => clearInterval(interval);
    }, []);


    return (
        <ImageBackground
            style={styles.root}
            source={{
                uri: "https://cdn2.tuoitre.vn/thumb_w/480/2020/6/25/photo-1-15930621693272126964820.jpg"
            }}
            imageStyle={{
                objectFit: "contain"
            }}
        >
            <GlassView
                style={[
                    styles.weatherCard,
                ]}
                glassEffectStyle="clear"
            >
                <Row>
                    <TextUi allowFontScaling={false} style={[styles.textTime, { color: isDark ? "#000" : "#fff" }]}>{currentTime}</TextUi>
                    <TextUi allowFontScaling={false} style={[styles.textDate, { color: isDark ? "#000" : "#fff" }]}>{currentDate}</TextUi>
                </Row>
                <SpaceUi height={12} />
            </GlassView>
        </ImageBackground>
    )
}

export default WeatherBox

const styles = StyleSheet.create({
    root: {
        height: windowWidth / 5 * 4,
        width: windowWidth,
        paddingHorizontal: PADDING_PAGE,
        paddingTop: statusBarHeight
    },
    content: {

    },
    textTime: {
        fontSize: 28,
        fontWeight: "600",
    },
    textDate: {
        fontSize: 16
    },
    textTemperature: {
        fontSize: 16,
        fontWeight: "600",
    },
    weatherCard: {
        paddingHorizontal: PADDING_PAGE,
        paddingVertical: 12,
        borderRadius: 16,
        marginTop: 16,
        backgroundColor: "rgba(0, 0, 0, 0.15)",
    },
    iconWeather: {
        height: 32,
        width: 32
    }
})