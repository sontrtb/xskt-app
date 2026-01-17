import { kqxs } from "@/api/kqxs";
import CardUi from "@/components/ui/CardUi";
import DatePickerUi from "@/components/ui/DatePickerUi";
import TouchableOpacityUi from "@/components/ui/TouchableOpacityUi";
import { now } from "@/lib/date";
import { PADDING_PAGE } from "@/theme/layout";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Prize from "./Prize";

interface ResultXSKTProps {
  disable?: boolean;
  onPress?: () => void;
}

function ResultXSKT(props: ResultXSKTProps) {
  const { disable, onPress } = props;



  const sixThirty = moment().hour(18).minute(40).second(0);
  const dateStringInit = now.isBefore(sixThirty)
    ? moment().subtract(1, "day").format("DD-MM-YYYY")
    : moment().format("DD-MM-YYYY");

  const [dateString, setDateString] = useState<string>(dateStringInit);

  const kqxsQuery = useQuery({
    queryKey: ["kqxs", dateString],
    queryFn: () => kqxs(dateString)
  })
  const data = kqxsQuery.data?.data

  return (
    <TouchableOpacityUi onPress={onPress} activeOpacity={onPress ? 0.5 : 1}>
      <CardUi title="Kết quả" style={styles.root}>
        <DatePickerUi onChange={setDateString} value={dateString} disable={disable} />

        <View style={styles.resultsContainer}>
          <Prize title="Giải ĐB" numbers={data?.specialPrize} isSpecial />
          <Prize title="Giải Nhất" numbers={data?.firstPrize} />
          <Prize title="Giải Nhì" numbers={data?.secondPrize} />
          <Prize title="Giải Ba" numbers={data?.thirdPrize} />
          <Prize title="Giải Tư" numbers={data?.fourthPrize} />
          <Prize title="Giải Năm" numbers={data?.fifthPrize} />
          <Prize title="Giải Sáu" numbers={data?.sixthPrize} />
          <Prize title="Giải Bảy" numbers={data?.seventhPrize} />
          <Prize title="Mã đặc biệt" numbers={data?.ticketCodes} />
        </View>
      </CardUi>
    </TouchableOpacityUi>
  );
}

export default ResultXSKT;

const styles = StyleSheet.create({
  root: {
    margin: PADDING_PAGE,
  },
  resultsContainer: {
    marginTop: 16,
  },
});