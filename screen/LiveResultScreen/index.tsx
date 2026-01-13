import ButtonUi from "@/components/ui/ButtonUi";
import CardUi from "@/components/ui/CardUi";
import LoadingScreen from "@/components/ui/LoadingScreen";
import SpaceUi from "@/components/ui/SpaceUi";
import TextUi from "@/components/ui/TextUi";
import useColor from "@/hooks/useColor";
import { PADDING_PAGE } from "@/theme/layout";
import { useRouter } from "expo-router";
import moment from "moment";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from 'react-native-webview';

function isBeforeOrToday(dateStr: string) {
    const inputDate = moment(dateStr, "DD/MM/YYYY");
    const today = moment();

    // so sánh theo ngày (bỏ giờ phút)
    return inputDate.isSameOrBefore(today, "day");
}

function LiveResultScreen() {
    const color = useColor()
    const router = useRouter()

    const [isLive, setIsLive] = useState(true)
    const [loading, setLoading] = useState(true);


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
            <View style={[styles.root, { backgroundColor: color.bg }]}>
                <CardUi title={isLive ? "Trực tiếp..." : "Hiện tại chưa đến giờ quay số."}>
                    <TextUi>{isLive ? "Kết quả xổ số hôm nay." : "Vui lòng quay lại sau 6 giờ 15 phút."}</TextUi>
                    <SpaceUi height={PADDING_PAGE} />
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
            </View>
        </LoadingScreen>
    )
}

export default LiveResultScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: PADDING_PAGE,
        gap: PADDING_PAGE
    },
    container: {
        flex: 1,
    },
})