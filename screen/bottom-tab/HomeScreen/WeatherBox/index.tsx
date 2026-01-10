import { PADDING_PAGE } from '@/theme/layout';
import Constants from 'expo-constants';
import { ImageBackground } from 'expo-image';
import moment from 'moment';
import 'moment/locale/vi';
import { Dimensions, StyleSheet } from "react-native";

const statusBarHeight = Constants.statusBarHeight;
const windowWidth = Dimensions.get('window').width;

moment.locale('vi');

function WeatherBox() {
    // const { theme } = useTheme()
    // const isDark = theme === "dart"

    // const [currentTime, setCurrentTime] = useState(moment().format('HH:mm'));
    // const [currentDate, setCurrentDate] = useState(moment().format('dddd, DD [tháng] MM, YYYY'));

    // useEffect(() => {
    //     const updateDateTime = () => {
    //         setCurrentTime(moment().format('HH:mm'));
    //         const dateStr = moment().format('dddd, DD [tháng] MM, YYYY');
    //         setCurrentDate(dateStr.charAt(0).toUpperCase() + dateStr.slice(1));
    //     };

    //     updateDateTime();
    //     const interval = setInterval(updateDateTime, 1000);

    //     return () => clearInterval(interval);
    // }, []);


    return (
        <ImageBackground
            style={styles.root}
            source={require("@/assets/images/banner_home.png")}
            imageStyle={{
                objectFit: "cover",
                height: windowWidth / 5 * 4,
                width: windowWidth,
            }}
        >
            {/* <View
                style={[
                    styles.weatherCard,
                ]}
            >
                <Row>
                    <TextUi allowFontScaling={false} style={[styles.textTime, { color: isDark ? "#000" : "#fff" }]}>{currentTime}</TextUi>
                    <TextUi allowFontScaling={false} style={[styles.textDate, { color: isDark ? "#000" : "#fff" }]}>{currentDate}</TextUi>
                </Row>
            </View> */}
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
        marginTop: 4,
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    iconWeather: {
        height: 32,
        width: 32
    }
})