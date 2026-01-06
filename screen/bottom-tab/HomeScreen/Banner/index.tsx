import CardUi from "@/components/ui/CardUi";
import CaurouselUi from "@/components/ui/CaurouselUi";
import ImageUi from "@/components/ui/ImageUi";
import { PADDING_PAGE } from "@/theme/layout";
import { Dimensions, StyleSheet, View } from "react-native";

const windowWidth = Dimensions.get('window').width;

function Banner() {

    const banners = [
        "https://mdland.com.vn/upload/files/biet-thu-vinhome-riverside-long-bien.png",
        "https://media.vneconomy.vn/1200x630/images/upload/2021/04/20/170702_VHR2_Ben-vung-gia-tri-xanh_PR1.3_Anh-1-79fc2.jpg",
        "https://batdongsanexpress.vn/upload/2019/12/banner-vinhomes-riverside-hoa-lan1.jpg"
    ]

    return (
        <CaurouselUi length={banners.length} style={styles.container} >
            {
                banners.map((b, index) => (
                    <View style={styles.page} key={index}>
                        <CardUi style={styles.card} key="1">
                            <ImageUi
                                source={{
                                    uri: b
                                }}
                                style={styles.banner}
                            />
                        </CardUi>
                    </View>
                ))
            }
        </CaurouselUi>
    )
}

export default Banner

const styles = StyleSheet.create({
    container: {
        height: 150,
    },
    page: {
        width: windowWidth,
        padding: PADDING_PAGE,
    },
    card: {
        padding: 0
    },
    banner: {
        height: "100%",
        borderRadius: 12
    }
})