import TextUi from "@/components/ui/TextUi";
import TitleUi from "@/components/ui/Title";
import useColor from "@/hooks/useColor";
import { PADDING_PAGE } from "@/theme/layout";
import { ScrollView, StyleSheet, View } from "react-native";

function PrivacyPolicy() {
    const color = useColor()

    return (
        <ScrollView style={{flex: 1}} contentContainerStyle={[styles.root, {backgroundColor: color.bg}]}>
            <View style={styles.header}>
                <TextUi style={styles.appName}>Ứng dụng XSKT</TextUi>
                <TextUi style={styles.updateDate}>Cập nhật lần cuối: 17/12/2025</TextUi>
            </View>

            <TextUi style={styles.intro}>
                Ứng dụng XSKT được phát triển và vận hành bởi CCK nhằm hỗ trợ các hoạt động quản lý và nghiệp vụ. Chính sách Quyền riêng tư này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ thông tin của người dùng khi sử dụng Ứng dụng.
            </TextUi>

            <TextUi style={styles.intro}>
                Bằng việc cài đặt và sử dụng Ứng dụng XSKT, bạn xác nhận đã đọc, hiểu và đồng ý với nội dung của Chính sách Quyền riêng tư này.
            </TextUi>

            <View style={styles.section}>
                <TitleUi>1. Thông tin chúng tôi thu thập</TitleUi>

                <TextUi style={styles.subTitle}>1.1. Thông tin cá nhân</TextUi>
                <TextUi style={styles.sectionContent}>
                    Chúng tôi có thể thu thập một số thông tin cần thiết để cung cấp và duy trì hoạt động của Ứng dụng, bao gồm:
                </TextUi>
                <TextUi style={styles.bulletPoint}>• Họ tên người dùng</TextUi>
                <TextUi style={styles.bulletPoint}>• Thông tin đăng nhập và xác thực tài khoản</TextUi>
                <TextUi style={styles.bulletPoint}>• Dữ liệu phát sinh trong quá trình sử dụng Ứng dụng</TextUi>
                <TextUi style={styles.sectionContent}>
                    Chúng tôi không thu thập dữ liệu cá nhân nhạy cảm ngoài phạm vi cần thiết cho việc vận hành Ứng dụng.
                </TextUi>

                <TextUi style={styles.subTitle}>1.2. Dữ liệu sử dụng</TextUi>
                <TextUi style={styles.sectionContent}>
                    Ứng dụng có thể tự động thu thập một số thông tin kỹ thuật, bao gồm:
                </TextUi>
                <TextUi style={styles.bulletPoint}>• Địa chỉ IP</TextUi>
                <TextUi style={styles.bulletPoint}>• Loại thiết bị, hệ điều hành</TextUi>
                <TextUi style={styles.bulletPoint}>• Thời gian truy cập và tần suất sử dụng Ứng dụng</TextUi>
                <TextUi style={styles.sectionContent}>
                    Các dữ liệu này được sử dụng nhằm mục đích thống kê, cải thiện hiệu năng và đảm bảo an toàn hệ thống.
                </TextUi>
            </View>

            <View style={styles.section}>
                <TitleUi>2. Mục đích sử dụng thông tin</TitleUi>
                <TextUi style={styles.sectionContent}>
                    Thông tin thu thập được sử dụng để:
                </TextUi>
                <TextUi style={styles.bulletPoint}>• Cung cấp và duy trì hoạt động của Ứng dụng</TextUi>
                <TextUi style={styles.bulletPoint}>• Xác thực và quản lý tài khoản người dùng</TextUi>
                <TextUi style={styles.bulletPoint}>• Cải thiện trải nghiệm và chất lượng dịch vụ</TextUi>
                <TextUi style={styles.bulletPoint}>• Đảm bảo an toàn, bảo mật và ngăn chặn hành vi gian lận</TextUi>
            </View>

            <View style={styles.section}>
                <TitleUi>3. Chia sẻ dữ liệu</TitleUi>
                <TextUi style={styles.sectionContent}>
                    Chúng tôi không bán, không cho thuê và không chia sẻ dữ liệu cá nhân của người dùng cho bên thứ ba, ngoại trừ các trường hợp sau:
                </TextUi>
                <TextUi style={styles.bulletPoint}>• Có yêu cầu hợp pháp từ cơ quan nhà nước có thẩm quyền</TextUi>
                <TextUi style={styles.bulletPoint}>• Thực hiện nghĩa vụ theo quy định của pháp luật</TextUi>
            </View>

            <View style={styles.section}>
                <TitleUi>4. Bảo mật dữ liệu</TitleUi>
                <TextUi style={styles.sectionContent}>
                    Chúng tôi áp dụng các biện pháp kỹ thuật và quản lý phù hợp nhằm bảo vệ dữ liệu người dùng khỏi truy cập trái phép, mất mát hoặc tiết lộ trái phép.
                </TextUi>
                <TextUi style={styles.sectionContent}>
                    Tuy nhiên, không có hệ thống nào đảm bảo an toàn tuyệt đối, và chúng tôi không thể cam kết bảo mật 100%.
                </TextUi>
            </View>

            <View style={styles.section}>
                <TitleUi>5. Quyền của người dùng</TitleUi>
                <TextUi style={styles.sectionContent}>
                    Người dùng có quyền:
                </TextUi>
                <TextUi style={styles.bulletPoint}>• Yêu cầu truy cập, chỉnh sửa hoặc xóa dữ liệu cá nhân</TextUi>
                <TextUi style={styles.bulletPoint}>• Ngừng sử dụng Ứng dụng bất kỳ lúc nào</TextUi>
                <TextUi style={styles.sectionContent}>
                    Mọi yêu cầu liên quan đến dữ liệu cá nhân có thể được gửi qua thông tin liên hệ bên dưới.
                </TextUi>
            </View>

            <View style={styles.section}>
                <TitleUi>6. Quyền riêng tư của trẻ em</TitleUi>
                <TextUi style={styles.sectionContent}>
                    Ứng dụng XSKT không hướng đến người dùng dưới 13 tuổi.
                </TextUi>
                <TextUi style={styles.sectionContent}>
                    Chúng tôi không cố ý thu thập dữ liệu cá nhân của trẻ em. Trong trường hợp phát hiện dữ liệu của trẻ em được thu thập ngoài ý muốn, chúng tôi sẽ tiến hành xóa bỏ kịp thời.
                </TextUi>
            </View>

            <View style={styles.section}>
                <TitleUi>7. Thay đổi chính sách</TitleUi>
                <TextUi style={styles.sectionContent}>
                    Chính sách Quyền riêng tư này có thể được cập nhật theo thời gian. Mọi thay đổi sẽ được công bố trong Ứng dụng hoặc tại trang hiển thị chính sách.
                </TextUi>
            </View>

            <View style={styles.section}>
                <TitleUi>8. Thông tin liên hệ</TitleUi>
                <TextUi style={styles.sectionContent}>
                    Nếu có bất kỳ câu hỏi nào liên quan đến Chính sách Quyền riêng tư, vui lòng liên hệ:
                </TextUi>
                <View style={styles.contactBox}>
                    <TextUi style={styles.contactText}>Đơn vị quản lý: CCK</TextUi>
                    <TextUi style={styles.contactText}>
                        Địa chỉ: Ngõ 165, Đường Thái Hà, Phường Láng Hạ, Quận Đống Đa, Hà Nội
                    </TextUi>
                    <TextUi style={styles.contactText}>Email: phongsohoa@pmcweb.vn</TextUi>
                </View>
            </View>

            <View style={styles.footer}>
                <TextUi style={styles.footerText}>
                    Cảm ơn bạn đã tin tưởng và sử dụng Ứng dụng XSKT.
                </TextUi>
            </View>
        </ScrollView>
    )
}

export default PrivacyPolicy

const styles = StyleSheet.create({
    root: {
        padding: PADDING_PAGE,
        flex: 1,
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