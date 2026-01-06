import CardUi from "@/components/ui/CardUi";
import DatePickerUi from "@/components/ui/DatePickerUi";
import { PADDING_PAGE } from "@/theme/layout";
import moment from "moment";
import { useState } from "react";
import { StyleSheet } from "react-native";

function ResultMini() {
        const [dateString, setDateString] = useState<string>(moment().subtract(1, "day").format("DD-MM-YYYY"))
    
    return (
        <CardUi title="Kết quả" style={styles.root}>
            <DatePickerUi onChange={setDateString} value={dateString}/>
        </CardUi>
    )
}

export default ResultMini

const styles = StyleSheet.create({
    root: {
        marginHorizontal: PADDING_PAGE,
        marginTop: 4
    }
})
