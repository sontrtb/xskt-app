import ResultXSKT from "@/components/commons/ResultXSKT";
import { adUnitBannerId } from "@/configs/admod";
import { useRef } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { BannerAd, BannerAdSize, useForeground } from 'react-native-google-mobile-ads';

function ResultScreen() {
    const bannerRef = useRef<BannerAd>(null);

    useForeground(() => {
        Platform.OS === 'ios' && bannerRef.current?.load();
    });

    return (
        <View style={styles.root}>
            <ResultXSKT />
            <BannerAd ref={bannerRef} unitId={adUnitBannerId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
        </View>
    )
}

export default ResultScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "space-between"
    }
})
