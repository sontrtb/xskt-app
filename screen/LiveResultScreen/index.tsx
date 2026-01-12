import ButtonUi from "@/components/ui/ButtonUi";
import CardUi from "@/components/ui/CardUi";
import SpaceUi from "@/components/ui/SpaceUi";
import TextUi from "@/components/ui/TextUi";
import useColor from "@/hooks/useColor";
import { PADDING_PAGE } from "@/theme/layout";
import { StyleSheet, View } from "react-native";
import { WebView } from 'react-native-webview';

function LiveResultScreen() {
    const color = useColor()

    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script language="javascript" src="https://www.minhngoc.net.vn/jquery/jquery-1.7.2.js"></script>
            <link rel="stylesheet" type="text/css" href="https://www.minhngoc.net.vn/style/bangketqua_mini.css"/>
            <style>
                /* Ẩn toàn bộ header */
                #box_kqxs_minhngoc > div:first-child {
                    display: none !important;
                }
                
                /* Ẩn border ngoài */
                #box_kqxs_minhngoc {
                    border: none !important;
                }
                
                .box_kqxs_mini {
                    border: none !important;
                    box-shadow: none !important;
                }
                
                .box_kqxs_mini .top,
                .box_kqxs_mini .content {
                    border: none !important;
                }
                
                /* Ẩn tiêu đề "KQXS Miền Bắc" */
                .box_kqxs_mini .title {
                    display: none !important;
                }
                
                .box_kqxs_mini .top {
                    display: none !important;
                }
                
                /* Reset table styles */
                .bkqtinhmienbac_mini {
                    border-collapse: collapse !important;
                }
                
                /* Style cho các hàng - giống ResultMini */
                .bkqtinhmienbac_mini tr {
                    border: none !important;
                    border-bottom: 1px solid #fff !important;
                }
                
                .bkqtinhmienbac_mini td {
                    border: none !important;
                    padding: 12px 8px !important;
                    vertical-align: middle !important;
                }
                
                /* Style cho cột tiêu đề giải (cột trái) */
                .bkqtinhmienbac_mini td:first-child {
                    width: 100px !important;
                    font-weight: 600 !important;
                    font-size: 16px !important;
                }
                
                /* Style cho cột số (cột phải) */
                .bkqtinhmienbac_mini td:last-child {
                    flex: 1 !important;
                    font-family: monospace !important;
                    font-size: 16px !important;
                    font-weight: 600 !important;
                }
                
                /* Style đặc biệt cho giải ĐB */
                .bkqtinhmienbac_mini tr:nth-child(2) {
                    border-bottom: 2px solid ${color.primary} !important;
                    background-color: ${color.bgImage} !important;
                }
                
                .bkqtinhmienbac_mini tr:nth-child(2) td:first-child {
                    color: ${color.primary} !important;
                    font-size: 16px !important;
                    font-weight: 700 !important;
                }
                
                .bkqtinhmienbac_mini tr:nth-child(2) td:last-child {
                    color: ${color.primary} !important;
                    font-weight: 700 !important;
                    font-size: 18px !important;
                }
                
                /* Style cho hàng ngày tháng */
                .bkqtinhmienbac_mini tr:first-child td {
                    background-color: ${color.bgCard} !important;
                    font-weight: 600 !important;
                }
                
                /* Thêm khoảng cách giữa các số */
                .bkqtinhmienbac_mini td:last-child {
                    word-spacing: 4px !important;
                }

                /* Ẩn tất cả border của table */
                .bkqtinhmienbac_mini,
                .bkqtinhmienbac_mini tbody,
                .bkqtinhmienbac_mini tr,
                .bkqtinhmienbac_mini td {
                    border-top: none !important;
                    border-left: none !important;
                    border-right: none !important;
                }
                
                /* Reset border cho body và container */
                body, html, #box_kqxs_minhngoc, .box_kqxs_mini {
                    border: none !important;
                    outline: none !important;
                    box-shadow: none !important;
                }
                    
            </style>
        </head>
        <body style="margin: 0; padding: 0;">
            <div id="box_kqxs_minhngoc">
                <script language="javascript"> 
                    bgcolor="${color.bg}";
                    titlecolor="${color.primary}";
                    dbcolor="${color.primary}";
                    fsize="18px";
                    kqwidth="100%"; 
                </script>
                <script language="javascript" src="https://www.minhngoc.net.vn/getkqxs/mien-bac.js"></script>
            </div>
        </body>
        </html>
    `

    return (
        <View style={[styles.root, { backgroundColor: color.bg }]}>
            <CardUi title="Hiện tại chưa đến giờ quay số.">
                <TextUi>Vui lòng quay lại sau 6 giờ 15 phút.</TextUi>
                <SpaceUi height={PADDING_PAGE}/>
                <ButtonUi
                    type="outline"
                    text="Xem kết quả các ngày trước"
                />
            </CardUi>
            <CardUi style={styles.container}>
                <WebView
                    style={[styles.container, { backgroundColor: color.bgCard }]}
                    source={{ html: html }}
                    originWhitelist={['*']}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    mixedContentMode="always"
                    allowFileAccess={true}
                    allowUniversalAccessFromFileURLs={true}
                />
            </CardUi>
        </View>
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