import useColor from "@/hooks/useColor";
import { PADDING_PAGE } from "@/theme/layout";
import { ScrollView, StyleSheet, View } from "react-native";
import TextUi from "../ui/TextUi";

const PrivacyPolicy = () => {
    const color = useColor();

    return (
        <ScrollView style={{flex: 1}} contentContainerStyle={[styles.root, {backgroundColor: color.bg}]}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <TextUi style={styles.appName}>Chính Sách Bảo Mật XSKT</TextUi>
                    <TextUi style={styles.updateDate}>Cập nhật lần cuối: Ngày 25 tháng 05 năm 2024</TextUi>
                </View>

                <TextUi style={styles.intro}>
                    Chào mừng bạn đến với ứng dụng XSKT. Chúng tôi cam kết bảo vệ quyền riêng tư của bạn và đảm bảo rằng thông tin cá nhân của bạn được xử lý một cách an toàn và có trách nhiệm.
                </TextUi>

                <View style={styles.section}>
                    <TextUi weight="bold" style={styles.subTitle}>1. Thông Tin Chúng Tôi Thu Thập</TextUi>
                    <TextUi style={styles.sectionContent}>
                        Ứng dụng của chúng tôi không bắt buộc bạn phải đăng ký tài khoản. Tuy nhiên, để cung cấp dịch vụ tốt nhất, chúng tôi có thể thu thập:
                    </TextUi>
                    <TextUi style={styles.bulletPoint}>• Thông tin thiết bị: Phiên bản hệ điều hành, loại thiết bị.</TextUi>
                    <TextUi style={styles.bulletPoint}>• Thông tin vị trí: Để cung cấp kết quả xổ số theo khu vực (nếu bạn cho phép).</TextUi>
                </View>

                <View style={styles.section}>
                    <TextUi weight="bold" style={styles.subTitle}>2. Cách Chúng Tôi Sử Dụng Thông Tin</TextUi>
                    <TextUi style={styles.sectionContent}>
                        Chúng tôi sử dụng thông tin thu thập được để:
                    </TextUi>
                    <TextUi style={styles.bulletPoint}>• Cung cấp và duy trì các tính năng của ứng dụng.</TextUi>
                    <TextUi style={styles.bulletPoint}>• Gửi thông báo về kết quả xổ số mới nhất.</TextUi>
                    <TextUi style={styles.bulletPoint}>• Cải thiện trải nghiệm người dùng và hiệu suất ứng dụng.</TextUi>
                </View>

                <View style={styles.section}>
                    <TextUi weight="bold" style={styles.subTitle}>3. Chia Sẻ Thông Tin</TextUi>
                    <TextUi style={styles.sectionContent}>
                        Chúng tôi cam kết không bán, trao đổi hoặc cho thuê thông tin cá nhân của bạn cho bên thứ ba. Chúng tôi chỉ chia sẻ thông tin trong các trường hợp:
                    </TextUi>
                    <TextUi style={styles.bulletPoint}>• Khi có yêu cầu từ cơ quan nhà nước có thẩm quyền.</TextUi>
                    <TextUi style={styles.bulletPoint}>• Với các đối tác cung cấp dịch vụ phân tích (như Google Analytics) để hiểu cách ứng dụng được sử dụng.</TextUi>
                </View>

                <View style={styles.section}>
                    <TextUi weight="bold" style={styles.subTitle}>4. An Toàn Dữ Liệu</TextUi>
                    <TextUi style={styles.sectionContent}>
                        Chúng tôi áp dụng các biện pháp bảo mật kỹ thuật phù hợp để ngăn chặn việc truy cập trái phép, tiết lộ hoặc phá hủy thông tin của bạn.
                    </TextUi>
                </View>

                <View style={styles.section}>
                    <TextUi weight="bold" style={styles.subTitle}>5. Quyền Của Bạn</TextUi>
                    <TextUi style={styles.sectionContent}>
                        Bạn có quyền truy cập, sửa đổi hoặc yêu cầu xóa dữ liệu cá nhân của mình bất kỳ lúc nào thông qua cài đặt ứng dụng hoặc liên hệ với chúng tôi.
                    </TextUi>
                </View>

                <View style={styles.section}>
                    <TextUi weight="bold" style={styles.subTitle}>6. Liên Hệ</TextUi>
                    <TextUi style={styles.sectionContent}>
                        Nếu bạn có bất kỳ câu hỏi nào về Chính Sách Bảo Mật này, vui lòng liên hệ:
                    </TextUi>
                    <View style={styles.contactBox}>
                        <TextUi style={styles.contactText}>Email: hotro.xskt@gmail.com</TextUi>
                        <TextUi style={styles.contactText}>Website: https://xskt-app.com</TextUi>
                    </View>
                </View>

                <View style={styles.footer}>
                    <TextUi style={styles.footerText}>
                        Cảm ơn bạn đã tin tưởng và sử dụng ứng dụng XSKT!
                    </TextUi>
                </View>
            </View>
        </ScrollView>
    )
}

export default PrivacyPolicy

const styles = StyleSheet.create({
    root: {
        padding: PADDING_PAGE,
        flexGrow: 1,
    },
    content: {
        gap: 16
    },
    header: {
        alignItems: 'center',
        marginBottom: 8
    },
    appName: {
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 24,
        marginBottom: 4
    },
    updateDate: {
        fontSize: 13,
        lineHeight: 18,
        color: '#6B7280',
        fontStyle: 'italic'
    },
    intro: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 4
    },
    section: {
        gap: 8,
        marginTop: 8
    },
    subTitle: {
        fontSize: 15,
        fontWeight: '600',
        lineHeight: 21,
        marginTop: 8,
    },
    sectionContent: {
        fontSize: 14,
        lineHeight: 20,
    },
    bulletPoint: {
        fontSize: 14,
        lineHeight: 20,
        paddingLeft: 8
    },
    contactBox: {
        backgroundColor: '#F9FAFB',
        padding: 12,
        borderRadius: 8,
        borderLeftWidth: 3,
        borderLeftColor: '#3B82F6',
        gap: 6
    },
    contactText: {
        fontSize: 14,
        lineHeight: 20,
        color: '#374151'
    },
    footer: {
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        alignItems: 'center'
    },
    footerText: {
        fontSize: 14,
        lineHeight: 20,
        color: '#6B7280',
        fontStyle: 'italic',
        textAlign: 'center'
    }
})
