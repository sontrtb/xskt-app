import { statistical } from "@/api/statistical";
import HeaderHome from "@/components/commons/HeaderHome";
import TextUi from "@/components/ui/TextUi";
import { dateTimeFormat } from "@/lib/date";
import { PADDING_PAGE } from "@/theme/layout";
import { useQuery } from "@tanstack/react-query";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import ConsecutivePairs from "./components/ConsecutivePairs";
import LongestAbsentPairs from "./components/LongestAbsentPairs";
import TopPairs from "./components/TopPairs";


function StatisticalScreen() {
  const statisticalQuery = useQuery({
    queryFn: statistical,
    queryKey: ["statistical"]
  })
  const data = statisticalQuery.data?.data

  return (
    <View style={styles.root}>
      <HeaderHome title="Thống kê" />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <TextUi style={styles.noteText}>Dữ liệu cập nhật lúc {dateTimeFormat(data?.createdAt)}</TextUi>

        <TopPairs
          key={`top_pairs_${statisticalQuery.isLoading}`}
          data3={data?.topPairs3Days}
          data7={data?.topPairs7Days}
        />

        <LongestAbsentPairs
          data={data?.longestAbsentPairs}
          key={`longest_absent_pairs_${statisticalQuery.isLoading}`}
        />

        <ConsecutivePairs
          key={`consecutive_pairs_${statisticalQuery.isLoading}`}
          data={data?.consecutivePairs}
        />
      </ScrollView>
    </View>
  );
}

export default StatisticalScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  contentContainerStyle: {
    padding: PADDING_PAGE,
    gap: PADDING_PAGE,
    paddingBottom: Platform.OS === "android" ? 130 : 20,
  },
  noteText: {
    fontStyle: 'italic',
  }
});