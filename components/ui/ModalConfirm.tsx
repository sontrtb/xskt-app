import { PADDING_PAGE } from "@/theme/layout";
import Modal from "react-native-modal";
import ButtonUi from "./ButtonUi";
import CardUi from "./CardUi";
import Row from "./Row";
import TextUi from "./TextUi";

interface ModalConfirmProps {
    title: string;
    des?: string;
    open: boolean;
    setOpen: (o: boolean) => void;
    onOk?: () => void;
}

function ModalConfirm(props: ModalConfirmProps) {
    const { open, setOpen, onOk, title, des } = props;

    const onConfirm = () => {
        setOpen(false)
        setTimeout(() => onOk?.(), 350)
    }

    return (
        <Modal isVisible={open} animationIn="zoomInUp" animationOut="slideOutDown">
            <CardUi title={title} style={{ padding: PADDING_PAGE }}>
                <TextUi style={{ marginTop: 8 }}>{des}</TextUi>

                <Row style={{ marginTop: 24 }}>
                    <ButtonUi type="outline" text="Đóng" style={{ flex: 1 }} onPress={() => setOpen(false)} />
                    {
                        onOk && <ButtonUi text="Xác nhận" style={{ flex: 1 }} onPress={onConfirm} />
                    }
                </Row>
            </CardUi>
        </Modal>
    )
}

export default ModalConfirm