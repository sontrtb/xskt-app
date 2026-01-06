import TextUi from "@/components/ui/TextUi";
import TitleUi from "@/components/ui/Title";
import useColor from "@/hooks/useColor";
import { PADDING_PAGE } from "@/theme/layout";
import { ScrollView, StyleSheet, View } from "react-native";

function TermsOfUse() {
    const color = useColor()

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={[styles.root, { backgroundColor: color.bg }]}>
            <View style={styles.content}>
                <TextUi style={styles.intro}>
                    Chào mừng bạn đến với Ứng dụng SMAC. Vui lòng đọc kỹ các điều khoản sử dụng dưới đây trước khi sử dụng ứng dụng.
                </TextUi>

                <View style={styles.section}>
                    <TitleUi>1. Chấp nhận điều khoản</TitleUi>
                    <TextUi style={styles.sectionContent}>
                        Bằng việc cài đặt và sử dụng Ứng dụng SMAC, người dùng xác nhận đã đọc, hiểu và đồng ý tuân thủ các Điều khoản Sử dụng này.
                    </TextUi>
                </View>

                <View style={styles.section}>
                    <TitleUi>2. Phạm vi sử dụng</TitleUi>
                    <TextUi style={styles.sectionContent}>
                        Ứng dụng SMAC được cung cấp nhằm hỗ trợ các hoạt động quản lý và nghiệp vụ hợp pháp.
                    </TextUi>
                    <TextUi style={styles.sectionContent}>
                        Người dùng không được:
                    </TextUi>
                    <TextUi style={styles.bulletPoint}>• Sử dụng Ứng dụng cho mục đích trái pháp luật</TextUi>
                    <TextUi style={styles.bulletPoint}>• Can thiệp, phá hoại hoặc truy cập trái phép vào hệ thống</TextUi>
                </View>

                <View style={styles.section}>
                    <TitleUi>3. Tài khoản người dùng</TitleUi>
                    <TextUi style={styles.sectionContent}>
                        Người dùng có trách nhiệm:
                    </TextUi>
                    <TextUi style={styles.bulletPoint}>• Bảo mật thông tin tài khoản</TextUi>
                    <TextUi style={styles.bulletPoint}>• Không chia sẻ tài khoản cho người khác</TextUi>
                    <TextUi style={styles.sectionContent}>
                        Mọi hoạt động phát sinh từ tài khoản đều được xem là trách nhiệm của người dùng.
                    </TextUi>
                </View>

                <View style={styles.section}>
                    <TitleUi>4. Quyền sở hữu trí tuệ</TitleUi>
                    <TextUi style={styles.sectionContent}>
                        Toàn bộ nội dung, dữ liệu, giao diện và mã nguồn của Ứng dụng SMAC thuộc quyền sở hữu của CCK hoặc các bên được ủy quyền hợp pháp.
                    </TextUi>
                </View>

                <View style={styles.section}>
                    <TitleUi>5. Giới hạn trách nhiệm</TitleUi>
                    <TextUi style={styles.sectionContent}>
                        Chúng tôi không chịu trách nhiệm đối với:
                    </TextUi>
                    <TextUi style={styles.bulletPoint}>• Thiệt hại phát sinh do sử dụng Ứng dụng không đúng mục đích</TextUi>
                    <TextUi style={styles.bulletPoint}>• Gián đoạn dịch vụ do bảo trì, sự cố kỹ thuật hoặc các yếu tố khách quan</TextUi>
                </View>

                <View style={styles.section}>
                    <TitleUi>6. Thay đổi điều khoản</TitleUi>
                    <TextUi style={styles.sectionContent}>
                        Chúng tôi có quyền cập nhật Điều khoản Sử dụng theo thời gian. Việc tiếp tục sử dụng Ứng dụng đồng nghĩa với việc người dùng chấp nhận các thay đổi đó.
                    </TextUi>
                </View>

                <View style={styles.section}>
                    <TitleUi>7. Luật áp dụng</TitleUi>
                    <TextUi style={styles.sectionContent}>
                        Các Điều khoản Sử dụng này được điều chỉnh và giải thích theo pháp luật Việt Nam.
                    </TextUi>
                </View>

                <View style={styles.footer}>
                    <TextUi style={styles.footerText}>
                        Ngày cập nhật: {new Date().toLocaleDateString('vi-VN')}
                    </TextUi>
                    <TextUi style={styles.footerText}>
                        Nếu có thắc mắc, vui lòng liên hệ bộ phận hỗ trợ của chúng tôi.
                    </TextUi>
                </View>
            </View>
        </ScrollView>
    )
}

export default TermsOfUse

const styles = StyleSheet.create({
    root: {
        padding: PADDING_PAGE
    },
    content: {
        gap: 16
    },
    intro: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 8
    },
    section: {
        gap: 8
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 22,
        marginTop: 8
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
    footer: {
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        gap: 8
    },
    footerText: {
        fontSize: 13,
        lineHeight: 18,
        fontStyle: 'italic'
    }
})