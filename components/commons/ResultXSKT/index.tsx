import { kqxs } from "@/api/kqxs";
import CardUi from "@/components/ui/CardUi";
import DatePickerUi from "@/components/ui/DatePickerUi";
import TextUi from "@/components/ui/TextUi";
import TouchableOpacityUi from "@/components/ui/TouchableOpacityUi";
import useColor from "@/hooks/useColor";
import { PADDING_PAGE } from "@/theme/layout";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

interface ResultXSKTProps {
  disable?: boolean;
  onPress?: () => void;
}

function ResultXSKT(props: ResultXSKTProps) {
  const { disable, onPress } = props;

  const color = useColor()

  const sixThirty = moment().hour(6).minute(30).second(0);
  const now = moment();
  const dateStringInit = now.isBefore(sixThirty)
    ? moment().subtract(1, "day").format("DD-MM-YYYY")
    : moment().format("DD-MM-YYYY");

  const [dateString, setDateString] = useState<string>(dateStringInit);

  const kqxsQuery = useQuery({
    queryKey: ["kqxs", dateString],
    queryFn: () => kqxs(dateString)
  })
  const data = kqxsQuery.data?.data

  // Render số dạng quả bóng cho giải đặc biệt
  const renderBallNumber = (number?: string) => {
    return (
      <View style={styles.ballContainer}>
        {number?.split('').map((digit, idx) => (
          <View key={idx} style={[styles.ball, { backgroundColor: color.primary }]}>
            <TextUi style={styles.ballText}>{digit}</TextUi>
          </View>
        ))}
      </View>
    );
  };

  // Render một dòng giải thưởng
  const renderPrize = (
    title: string,
    numbers?: string,
    isSpecial = false
  ) => {
    return (
      <View style={[styles.prizeRow, isSpecial && { ...styles.specialRow, borderBottomColor: color.primary, backgroundColor: color.bgImage }]}>
        <View style={styles.prizeTitle}>
          <TextUi style={[styles.prizeTitleText, isSpecial && { ...styles.specialText, color: color.primary }]}>
            {title}
          </TextUi>
        </View>
        <View style={styles.prizeNumbers}>
          {isSpecial ? (
            renderBallNumber(numbers)
          ) : (
            <View style={styles.numbersWrapper}>
              {numbers?.split(',').map((num, idx) => (
                <TextUi key={idx} style={styles.numberText}>
                  {num}
                </TextUi>
              ))}
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <TouchableOpacityUi onPress={onPress} activeOpacity={onPress ? 0.5 : 1}>
      <CardUi title="Kết quả" style={styles.root}>
        <DatePickerUi onChange={setDateString} value={dateString} disable={disable} />

        <View style={styles.resultsContainer}>
          {renderPrize("Giải ĐB", data?.specialPrize, true)}
          {renderPrize("Giải Nhất", data?.firstPrize)}
          {renderPrize("Giải Nhì", data?.secondPrize)}
          {renderPrize("Giải Ba", data?.thirdPrize)}
          {renderPrize("Giải Tư", data?.fourthPrize)}
          {renderPrize("Giải Năm", data?.fifthPrize)}
          {renderPrize("Giải Sáu", data?.sixthPrize)}
          {renderPrize("Giải Bảy", data?.seventhPrize)}
          {renderPrize("Mã đặc biệt", data?.ticketCodes)}
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
  prizeRow: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    alignItems: "center",
  },
  specialRow: {
    borderBottomWidth: 2,
  },
  prizeTitle: {
    width: 100,
    paddingHorizontal: 8,
  },
  prizeTitleText: {
    fontWeight: "600",
    fontSize: 16,
  },
  specialText: {
    fontSize: 16,
    fontWeight: "700",
  },
  prizeNumbers: {
    flex: 1,
    paddingHorizontal: 8,
  },
  numbersWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  numberText: {
    fontFamily: "monospace",
    fontSize: 18,
    fontWeight: "600",
  },
  ballContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
  },
  ball: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  ballText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
});