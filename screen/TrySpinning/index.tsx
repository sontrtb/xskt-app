import { IKqxs } from "@/api/kqxs";
import Prize from "@/components/commons/ResultXSKT/Prize";
import ButtonUi from "@/components/ui/ButtonUi";
import CardUi from "@/components/ui/CardUi";
import TextUi from "@/components/ui/TextUi";
import { PADDING_PAGE } from "@/theme/layout";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

function TrySpinning() {
    const dataInit: IKqxs = {
        date: "DD-MM-YYYY",
        specialPrize: "------",
        firstPrize: "-----",
        secondPrize: "-----,-----",
        thirdPrize: "-----,-----,-----,-----,-----,-----",
        fourthPrize: "----,----,----,----",
        fifthPrize: "----,----,----,----,----,----",
        sixthPrize: "---,---,---",
        seventhPrize: "--,--,--,--",
        ticketCodes: "--,--,--,--,--,--,--,--",
    };

    const [data, setData] = useState<IKqxs>(dataInit);
    const [isSpinning, setIsSpinning] = useState(false);

    const generateRandomNumber = (digits: number): string => {
        return Math.floor(Math.random() * Math.pow(10, digits))
            .toString()
            .padStart(digits, '0');
    };

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const updatePrizeNumbers = async (
        prizeKey: keyof IKqxs,
        count: number,
        digits: number,
    ) => {
        const numbers: string[] = [];

        for (let i = 0; i < count; i++) {
            const newNumber = generateRandomNumber(digits);
            numbers.push(newNumber);

            // Tạo chuỗi với số đã quay và số chưa quay (còn --)
            const remaining = Array(count - i - 1).fill('----');
            const currentDisplay = [...numbers, ...remaining].join(',');

            setData(prev => ({
                ...prev,
                [prizeKey]: currentDisplay
            }));

            await sleep(300);
        }

        // Cập nhật giá trị cuối cùng
        setData(prev => ({
            ...prev,
            [prizeKey]: numbers.join(',')
        }));
    };

    const randomData = async () => {
        if (isSpinning) return;

        setIsSpinning(true);
        setData(dataInit);

        await sleep(500);

        // Giải Nhất (1 số - 5 chữ số)
        await updatePrizeNumbers('firstPrize', 1, 5);

        // Giải Nhì (2 số - 5 chữ số)
        await updatePrizeNumbers('secondPrize', 2, 5);

        // Giải Ba (6 số - 5 chữ số)
        await updatePrizeNumbers('thirdPrize', 6, 5);

        // Giải Tư (4 số - 4 chữ số)
        await updatePrizeNumbers('fourthPrize', 4, 4);

        // Giải Năm (6 số - 4 chữ số)
        await updatePrizeNumbers('fifthPrize', 6, 4);

        // Giải Sáu (3 số - 3 chữ số)
        await updatePrizeNumbers('sixthPrize', 3, 3);

        // Giải Bảy (4 số - 2 chữ số)
        await updatePrizeNumbers('seventhPrize', 4, 2);

        // Giải Đặc Biệt (1 số - 5 chữ số)
        await updatePrizeNumbers('specialPrize', 1, 5);

        setIsSpinning(false);
    };

    return (
        <View style={styles.root}>
            <View>
                <CardUi title="Kết quả quay thử">
                    <Prize title="Giải ĐB" numbers={data?.specialPrize} isSpecial />
                    <Prize title="Giải Nhất" numbers={data?.firstPrize} />
                    <Prize title="Giải Nhì" numbers={data?.secondPrize} />
                    <Prize title="Giải Ba" numbers={data?.thirdPrize} />
                    <Prize title="Giải Tư" numbers={data?.fourthPrize} />
                    <Prize title="Giải Năm" numbers={data?.fifthPrize} />
                    <Prize title="Giải Sáu" numbers={data?.sixthPrize} />
                    <Prize title="Giải Bảy" numbers={data?.seventhPrize} />
                </CardUi>
                <TextUi style={styles.textNote}>* Kết quả chỉ mang tính chất giải trí</TextUi>
            </View>

            <ButtonUi
                text={isSpinning ? "Đang quay..." : "Quay thử"}
                onPress={randomData}
                isLoading={isSpinning}
            />
        </View>
    );
}

export default TrySpinning;

const styles = StyleSheet.create({
    root: {
        padding: PADDING_PAGE,
        justifyContent: "space-between",
        flex: 1
    },
    textNote: {
        marginTop: 12,
        fontStyle: "italic"
    }
});