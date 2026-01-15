import { forecast } from "@/api/kqxs";
import CardUi from "@/components/ui/CardUi";
import LoadingScreen from "@/components/ui/LoadingScreen";
import useColor from "@/hooks/useColor";
import { PADDING_PAGE } from "@/theme/layout";
import { useQuery } from "@tanstack/react-query";
import { StyleSheet } from "react-native";
import WebView from "react-native-webview";

function Forecast() {
    const color = useColor()

    const forecastQuery = useQuery({
        queryFn: forecast,
        queryKey: ['forecast']
    })

    // Inject CSS và JavaScript để vô hiệu hóa tất cả events và tùy chỉnh font
    const injectedHTML = forecastQuery.data?.data.htmlContent 
        ? `
            <!DOCTYPE html>
            <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
                <style>
                    * {
                        font-family: 'LexendDeca', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
                        font-size: 15px !important;
                        line-height: 1.3;
                        font-weight: 400 !important;
                        color: ${color.text};
                        pointer-events: none !important;
                        user-select: none !important;
                        -webkit-user-select: none !important;
                        -webkit-touch-callout: none !important;
                    }
                    a {
                        pointer-events: none !important;
                        cursor: default !important;
                        text-decoration: none !important;
                    }

                    h3 {
                        font-size: 18px !important;
                        font-weight: 600 !important;
                    }

                    b {
                        color: ${color.primary};
                        font-weight: 600 !important;
                    }
                </style>
            </head>
            <body>
                ${forecastQuery.data.data.htmlContent}
                <script>
                    // Vô hiệu hóa tất cả các events
                    document.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    }, true);
                    
                    document.addEventListener('touchstart', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    }, true);
                    
                    // Loại bỏ tất cả href
                    document.querySelectorAll('a').forEach(function(link) {
                        link.removeAttribute('href');
                        link.style.cursor = 'default';
                    });
                </script>
            </body>
            </html>
        `
        : "";

    return (
        <LoadingScreen isLoading={forecastQuery.isLoading}>
            <CardUi
                style={styles.root}
                title={forecastQuery.data?.data.title}
            >
                <WebView
                    originWhitelist={['*']}
                    source={{ html: injectedHTML }}
                    javaScriptEnabled={true}
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />
            </CardUi>
        </LoadingScreen>
    )
}

export default Forecast

const styles = StyleSheet.create({
    root: {
        flex: 1,
        margin: PADDING_PAGE
    }
})