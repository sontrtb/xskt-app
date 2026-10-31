import { kqxs } from "@/api/kqxs";
import CardUi from "@/components/ui/CardUi";
import DatePickerUi from "@/components/ui/DatePickerUi";
import LoadingComponentUi from "@/components/ui/LoadingComponentUi";
import TouchableOpacityUi from "@/components/ui/TouchableOpacityUi";
import { adUnitBannerId } from "@/configs/admod";
import { now } from "@/lib/date";
import { PADDING_PAGE } from "@/theme/layout";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import Prize from "./Prize";
import ResultHeadTail from "./ResultHeadTail";

interface ResultXSKTProps {
  disable?: boolean;
  onPress?: () => void;
  showBanner?: boolean;
}

function ResultXSKT(props: ResultXSKTProps) {
  const { disable, onPress, showBanner } = props;



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
    <View>
      <TouchableOpacityUi onPress={onPress} activeOpacity={onPress ? 0.5 : 1}>
        <CardUi title="Kết quả" style={styles.root}>
          <DatePickerUi
            onChange={setDateString}
            value={dateString}
            disable={disable}
            maxDate={moment().format('YYYY-MM-DD')}
          />
          <LoadingComponentUi isLoading={kqxsQuery.isLoading}>
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
          </LoadingComponentUi>
        </CardUi>
      </TouchableOpacityUi>

      {showBanner && (
        <View style={styles.bannerContainer}>
          <BannerAd
            unitId={adUnitBannerId}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        </View>
      )}

      <TouchableOpacityUi onPress={onPress} activeOpacity={onPress ? 0.5 : 1}>
        <CardUi title="Bảng loto miền Bắc" style={{ marginHorizontal: PADDING_PAGE }}>
          <ResultHeadTail data={data} />
        </CardUi>
      </TouchableOpacityUi>
    </View>
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
  bannerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: PADDING_PAGE,
  },
});