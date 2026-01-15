import { statistical } from "@/api/statistical";
import HeaderHome from "@/components/commons/HeaderHome";
import { adUnitBannerId } from "@/configs/admod";
import { PADDING_PAGE } from "@/theme/layout";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { Dimensions, Platform, ScrollView, StyleSheet, View } from "react-native";
import { BannerAd, BannerAdSize, useForeground } from 'react-native-google-mobile-ads';
import ConsecutivePairs from "./components/ConsecutivePairs";
import LongestAbsentPairs from "./components/LongestAbsentPairs";
import TopPairs from "./components/TopPairs";

const windowWidth = Dimensions.get('window').width;

function StatisticalScreen() {
  const statisticalQuery = useQuery({
    queryFn: statistical,
    queryKey: ["statistical"]
  })
  const data = statisticalQuery.data?.data

  const bannerRef = useRef<BannerAd>(null);

  useForeground(() => {
    Platform.OS === 'ios' && bannerRef.current?.load();
  });

  return (
    <View style={styles.root}>
      <HeaderHome title="Thống kê" />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <TopPairs
          key={`top_pairs_${statisticalQuery.isLoading}`}
          data3={data?.topPairs3Days}
          data7={data?.topPairs7Days}
        />
        <BannerAd width={windowWidth - PADDING_PAGE * 2} ref={bannerRef} unitId={adUnitBannerId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />

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
  chartContainer: {
    padding: 16,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
    color: '#1e293b',
    alignSelf: 'flex-start',
  },
  topLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1e293b',
  },
  yAxisText: {
    fontSize: 11,
    color: '#64748b',
  },
  xAxisText: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '500',
  },
});