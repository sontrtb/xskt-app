import ButtonUi from "@/components/ui/ButtonUi";
import CardUi from "@/components/ui/CardUi";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { adUnitBannerId } from "@/configs/admod";
import useColor from "@/hooks/useColor";
import { PADDING_PAGE } from "@/theme/layout";
import analytics from '@react-native-firebase/analytics';
import { useRouter } from "expo-router";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { Dimensions, Platform, ScrollView, StyleSheet } from "react-native";
import { BannerAd, BannerAdSize, useForeground } from 'react-native-google-mobile-ads';
import { WebView } from 'react-native-webview';

const windowWidth = Dimensions.get('window').width;

function isBeforeOrToday(dateStr: string) {
    const inputDate = moment(dateStr, "DD/MM/YYYY");
    const today = moment();

    // so sánh theo ngày (bỏ giờ phút)
    return inputDate.isSameOrBefore(today, "day");
}

function LiveResultScreen() {
    const bannerRef = useRef<BannerAd>(null);

    const color = useColor()
    const router = useRouter()

    const [isLive, setIsLive] = useState(true)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        analytics().logScreenView({
            screen_name: 'LiveResult',
        });
    }, [])

    useForeground(() => {
        Platform.OS === 'ios' && bannerRef.current?.load();
    });

    // JavaScript để inject CSS và lấy ngày
    const injectedJavaScript = `
        (function() {
            function hideElements() {
                const style = document.createElement('style');
                style.textContent = \`
                    /* Ẩn link */
                    a { display: none !important; }
                    .clnote { display: none !important; }

                    .txt-giai {
                        font-weight: 600;
                        font-size: 16px;
                    }
                    
                    /* Ẩn control panel (đầy đủ, 2 số, 3 số) */
                    .control-panel { display: none !important; }
                    .hover-panel { display: none !important; }
                    .buttons-wrapper { display: none !important; }
                    
                    /* Ẩn bảng đầu đuôi */
                    .col-firstlast { display: none !important; }
                    
                    /* Ngăn scroll */
                    html, body {
                        overflow: hidden !important;
                        height: 100% !important;
                        background-color: ${color.bgCard} !important;
                    }
                    
                    body {
                        margin: 0 !important;
                        padding: 0 !important;
                    }
                \`;
                document.head.appendChild(style);
                
                // Lấy ngày từ h1
                const h1Element = document.querySelector('h1.regional-title');
                if (h1Element) {
                    const fullText = h1Element.textContent || h1Element.innerText;
                    const dateMatch = fullText.match(/ngày\\s+(\\d{2}\\/\\d{2}\\/\\d{4})/);
                    if (dateMatch) {
                        window.ReactNativeWebView.postMessage(JSON.stringify({
                            type: 'date',
                            date: dateMatch[1]
                        }));
                    }
                }
                
                // Chặn tất cả click event
                document.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                }, true);
                
                document.addEventListener('touchstart', function(e) {
                    e.stopPropagation();
                }, true);
                
                // Ngăn scroll bằng JavaScript
                document.body.style.overflow = 'hidden';
                document.documentElement.style.overflow = 'hidden';
            }
            
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', hideElements);
            } else {
                hideElements();
            }
            
            setTimeout(hideElements, 300);
        })();
        true;
    `;

    const handleWebViewMessage = (event: any) => {
        try {
            const data = JSON.parse(event.nativeEvent.data);
            if (data.type === 'date') {
                setIsLive(isBeforeOrToday(data.date));
            }
        } catch (error) {
            setIsLive(false)
            console.error('Error parsing WebView message:', error);
        }
    };

    return (
        <LoadingScreen isLoading={loading}>
            <ScrollView contentContainerStyle={[styles.root, { backgroundColor: color.bg }]}>
                <CardUi title={isLive ? "Trực tiếp kết quả xổ số hôm nay" : "Hiện tại chưa đến giờ quay số."}>
                    <ButtonUi
                        type="outline"
                        text="Xem kết quả các ngày trước"
                        onPress={() => {
                            router.push("/result")
                        }}
                    />
                </CardUi>

                <CardUi style={styles.container}>
                    <WebView
                        onLoadStart={() => setLoading(true)}
                        onLoadEnd={() => setLoading(false)}
                        style={[styles.container, { backgroundColor: color.bgCard }]}
                        source={{ uri: 'https://xosothantai.mobi/embedded/kq-mienbac' }}
                        injectedJavaScript={injectedJavaScript}
                        onMessage={handleWebViewMessage}
                        scrollEnabled={false}
                        bounces={false}
                        overScrollMode="never"
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        onShouldStartLoadWithRequest={(request) => {
                            if (request.url === 'https://xosothantai.mobi/embedded/kq-mienbac' ||
                                request.url === 'about:blank') {
                                return true;
                            }
                            return false;
                        }}
                    />
                </CardUi>
                <BannerAd
                    width={windowWidth - PADDING_PAGE * 2}
                    ref={bannerRef}
                    unitId={adUnitBannerId} 
                    size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                />
            </ScrollView>
        </LoadingScreen>
    )
}

export default LiveResultScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingHorizontal: PADDING_PAGE,
        paddingTop: PADDING_PAGE,
        gap: PADDING_PAGE
    },
    container: {
        flex: 1,
    },
})