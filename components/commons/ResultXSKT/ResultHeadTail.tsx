import { IKqxs } from "@/api/kqxs";
import TextUi from "@/components/ui/TextUi";
import useColor from "@/hooks/useColor";
import { StyleSheet, View } from "react-native";

interface ResultHeadTailProps {
  data?: IKqxs;
}

const ResultHeadTail = ({ data }: ResultHeadTailProps) => {
  const color = useColor();

  if (!data) return null;

  // Extract all 2-digit endings from all prizes
  const getAllEndings = () => {
    const endings: string[] = [];
    const prizeKeys: (keyof IKqxs)[] = [
      "specialPrize",
      "firstPrize",
      "secondPrize",
      "thirdPrize",
      "fourthPrize",
      "fifthPrize",
      "sixthPrize",
      "seventhPrize",
    ];

    prizeKeys.forEach((key) => {
      const prizeValue = data[key];
      if (prizeValue) {
        const numbers = prizeValue.split(",");
        numbers.forEach((num) => {
          const trimmedNum = num.trim();
          if (trimmedNum.length >= 2) {
            endings.push(trimmedNum.slice(-2));
          }
        });
      }
    });
    return endings;
  };

  const endings = getAllEndings();

  // Group by Head (tens digit)
  const headGroups: Record<number, number[]> = {};
  // Group by Tail (units digit)
  const tailGroups: Record<number, number[]> = {};

  for (let i = 0; i <= 9; i++) {
    headGroups[i] = [];
    tailGroups[i] = [];
  }

  endings.forEach((end) => {
    const head = parseInt(end[0]);
    const tail = parseInt(end[1]);
    if (!isNaN(head)) headGroups[head].push(tail);
    if (!isNaN(tail)) tailGroups[tail].push(head);
  });

  // Sort the results for better display
  for (let i = 0; i <= 9; i++) {
    headGroups[i].sort((a, b) => a - b);
    tailGroups[i].sort((a, b) => a - b);
  }

  const renderHeader = () => (
    <View style={[styles.row, styles.header, { backgroundColor: color.bgImage, borderBottomColor: color.primary }]}>
      <View style={[styles.col, styles.colHead]}>
        <TextUi style={styles.headerText}>Đầu</TextUi>
      </View>
      <View style={[styles.col, styles.colTail]}>
        <TextUi style={styles.headerText}>Đuôi</TextUi>
      </View>
      <View style={[styles.col, styles.colTail, { borderLeftWidth: 1, borderLeftColor: "#e5e7eb" }]}>
        <TextUi style={styles.headerText}>Đầu</TextUi>
      </View>
      <View style={[styles.col, styles.colHead]}>
        <TextUi style={styles.headerText}>Đuôi</TextUi>
      </View>
    </View>
  );

  const renderRow = (i: number) => {
    const headTails = headGroups[i].length > 0 ? headGroups[i].join(",") : "-";
    const tailHeads = tailGroups[i].length > 0 ? tailGroups[i].join(",") : "-";

    return (
      <View key={i} style={[styles.row, { borderBottomColor: "#e5e7eb" }]}>
        <View style={[styles.col, styles.colHead, { backgroundColor: color.bgImage }]}>
          <TextUi style={[styles.cellText, styles.bold, { color: color.primary }]}>{i}</TextUi>
        </View>
        <View style={[styles.col, styles.colTail]}>
          <TextUi style={styles.cellText}>{headTails}</TextUi>
        </View>
        <View style={[styles.col, styles.colTail, { borderLeftWidth: 1, borderLeftColor: "#e5e7eb" }]}>
          <TextUi style={styles.cellText}>{tailHeads}</TextUi>
        </View>
        <View style={[styles.col, styles.colHead, { backgroundColor: color.bgImage }]}>
          <TextUi style={[styles.cellText, styles.bold, { color: color.primary }]}>{i}</TextUi>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => renderRow(i))}
    </View>
  );
};

export default ResultHeadTail;

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    minHeight: 40,
  },
  header: {
    borderBottomWidth: 2,
  },
  col: {
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  colHead: {
    flex: 0.15,
    alignItems: "center",
  },
  colTail: {
    flex: 0.35,
  },
  headerText: {
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  cellText: {
    fontSize: 16,
    textAlign: "center",
  },
  bold: {
    fontWeight: "700",
  },
});
