import useColor from "@/hooks/useColor"
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useState } from "react"
import { Linking, View } from "react-native"
import { checkVersion } from "react-native-check-version"
import DeviceInfo from 'react-native-device-info'
import Modal from "react-native-modal"
import ButtonUi from "../ui/ButtonUi"
import CardUi from "../ui/CardUi"
import Row from "../ui/Row"
import TextUi from "../ui/TextUi"
import TitleUi from "../ui/Title"

function compareVersion(current: string, min: string): boolean {
    const cur = current.split('.').map(Number);
    const req = min.split('.').map(Number);

    const length = Math.max(cur.length, req.length);

    for (let i = 0; i < length; i++) {
        const c = cur[i] ?? 0;
        const r = req[i] ?? 0;

        if (c > r) return true;
        if (c < r) return false;
    }

    return true;
}


function ModalUpdate() {
    const color = useColor()

    const [open, setOpen] = useState(false)

    const version = DeviceInfo.getVersion();

    // const getVersionQuery = useQuery({
    //     queryKey: ["getVersion"],
    //     queryFn: getVersion
    // })
    // const minVersionRequired = Platform.OS === "android" ? getVersionQuery.data?.data.androidVersion : getVersionQuery.data?.data.iosVersion


    const onUpdate = async () => {
        const version = await checkVersion({
            country: 'vn',
        });
        if (version.url) {
            Linking.openURL(version.url);
        }
    }

    return (
        <Modal isVisible={open} animationIn="bounceIn" animationOut="bounceOut">
            <CardUi>
                <Row style={{ justifyContent: "flex-start" }}>
                    <MaterialIcons name="system-security-update" size={60} color={color.primary} />

                    <View>
                        <TitleUi>Có bản cập nhật mới</TitleUi>
                        <TextUi style={{ marginTop: 8 }}>Vui lòng cập nhật để tiếp tục sử dụng</TextUi>
                    </View>
                </Row>


                <Row style={{ marginTop: 20 }}>
                    {/* <ButtonUi type="outline" text="Đóng" style={{ flex: 1 }} onPress={() => setOpen(false)} /> */}
                    <ButtonUi text="Cập nhật" style={{ flex: 1 }} onPress={onUpdate} />
                </Row>
            </CardUi>
        </Modal>
    )
}

export default ModalUpdate