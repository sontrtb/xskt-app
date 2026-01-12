import CardUi from "@/components/ui/CardUi";
import DatePickerUi from "@/components/ui/DatePickerUi";
import TextUi from "@/components/ui/TextUi";
import useColor from "@/hooks/useColor";
import { PADDING_PAGE } from "@/theme/layout";
import moment from "moment";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

// Mock data cho kết quả xổ số
const mockResults = {
  specialPrize: "123456",
  firstPrize: "789012",
  secondPrize: ["345678", "901234"],
  thirdPrize: ["567890", "123457", "789013", "345679", "901235", "567891"],
  fourthPrize: ["1234", "5678", "9012", "3456"],
  fifthPrize: ["7890", "1235", "5679", "9013", "3457", "7891"],
  sixthPrize: ["789", "012", "345"],
  seventhPrize: ["12", "34", "56", "78"]
};

function ResultXSKT() {
    const color = useColor()

  const [dateString, setDateString] = useState<string>(
    moment().subtract(1, "day").format("DD-MM-YYYY")
  );

  // Render số dạng quả bóng cho giải đặc biệt
  const renderBallNumber = (number: string) => {
    return (
      <View style={styles.ballContainer}>
        {number.split('').map((digit, idx) => (
          <View key={idx} style={[styles.ball, {backgroundColor: color.primary}]}>
            <TextUi style={styles.ballText}>{digit}</TextUi>
          </View>
        ))}
      </View>
    );
  };

  // Render một dòng giải thưởng
  const renderPrize = (
    title: string,
    numbers: string | string[],
    isSpecial = false
  ) => {
    return (
      <View style={[styles.prizeRow, isSpecial && {...styles.specialRow, borderBottomColor: color.primary, backgroundColor: color.bgImage}]}>
        <View style={styles.prizeTitle}>
          <TextUi style={[styles.prizeTitleText, isSpecial && {...styles.specialText, color: color.primary}]}>
            {title}
          </TextUi>
        </View>
        <View style={styles.prizeNumbers}>
          {isSpecial ? (
            renderBallNumber(numbers as string)
          ) : (
            <View style={styles.numbersWrapper}>
              {Array.isArray(numbers) ? (
                numbers.map((num, idx) => (
                  <TextUi key={idx} style={styles.numberText}>
                    {num}
                  </TextUi>
                ))
              ) : (
                <TextUi style={styles.numberText}>{numbers}</TextUi>
              )}
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <CardUi title="Kết quả" style={styles.root}>
      <DatePickerUi onChange={setDateString} value={dateString} />

      <View style={styles.resultsContainer}>
        {renderPrize("Giải ĐB", mockResults.specialPrize, true)}
        {renderPrize("Giải Nhất", mockResults.firstPrize)}
        {renderPrize("Giải Nhì", mockResults.secondPrize)}
        {renderPrize("Giải Ba", mockResults.thirdPrize)}
        {renderPrize("Giải Tư", mockResults.fourthPrize)}
        {renderPrize("Giải Năm", mockResults.fifthPrize)}
        {renderPrize("Giải Sáu", mockResults.sixthPrize)}
        {renderPrize("Giải Bảy", mockResults.seventhPrize)}
      </View>
    </CardUi>
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
    fontSize: 14,
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
    fontSize: 16,
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