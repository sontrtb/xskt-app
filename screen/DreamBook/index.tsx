import ButtonUi from "@/components/ui/ButtonUi";
import TextInputUi from "@/components/ui/TextInputUi";
import TextUi from "@/components/ui/TextUi";
// import { adUnitInterstitialId } from "@/configs/admod";
import data from "@/configs/dream_book_data.json";
import useColor from "@/hooks/useColor";
import { PADDING_PAGE } from "@/theme/layout";
import analytics from '@react-native-firebase/analytics';
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  View,
  VirtualizedList
} from "react-native";
// import { useInterstitialAd } from "react-native-google-mobile-ads";

type DreamItem = {
  keyword: string;
  numbers: string;
};

function DreamBook() {
  const color = useColor();
  const [search, setSearch] = useState("");
  const router = useRouter()

  useEffect(() => {
    analytics().logScreenView({
      screen_name: 'DreamBookScreen',
    });
  }, [])

  // const { isLoaded, isClosed, load, show } = useInterstitialAd(adUnitInterstitialId);

  // useEffect(() => {
  //   load();
  // }, [load]);

  // useEffect(() => {
  //   if (isClosed) {
  //     router.navigate("/chat")
  //   }
  // }, [isClosed, router]);

  const goChat = () => {
    // if (isLoaded) {
    //   show()
    //   return;
    // }
    router.navigate("/chat")
  }

  // Filter data
  const filteredData: DreamItem[] = useMemo(() => {
    if (!search.trim()) return data as DreamItem[];

    const key = search.toLowerCase();
    return (data as DreamItem[]).filter(
      item =>
        item.keyword.toLowerCase().includes(key) ||
        item.numbers.includes(key)
    );
  }, [search]);

  const getItem = (_: DreamItem[], index: number) => filteredData[index];
  const getItemCount = () => filteredData.length;

  const renderItem = ({ item }: { item: DreamItem }) => {
    return (
      <View style={[styles.item, { borderBottomColor: color.borderColor }]}>
        <TextUi style={[styles.keyword]}>
          {item.keyword}
        </TextUi>
        <TextUi style={[styles.number, { color: color.primary }]}>
          {item.numbers}
        </TextUi>
      </View>
    );
  };

  return (
    <View style={[styles.root, { backgroundColor: color.bg }]}>
      <TextInputUi
        placeholder="Tìm kiếm từ khoá: bò, gà, ăn cỗ..."
        value={search}
        onChangeText={setSearch}
        style={{ margin: PADDING_PAGE }}
      />

      <VirtualizedList
        data={filteredData}
        initialNumToRender={20}
        windowSize={10}
        maxToRenderPerBatch={20}
        updateCellsBatchingPeriod={50}
        keyExtractor={(item, index) => `${item.keyword}-${index}`}
        getItemCount={getItemCount}
        getItem={getItem}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
      />

      <View style={[styles.footer, { borderColor: color.borderColor }]}>
        <TextUi style={[styles.textFooter, { color: color.textNeutral }]}>Bạn có thể hỏi trợ lý ảo để đưa ra kết quả chính xác nhất.</TextUi>
        <ButtonUi
          text="Hỏi trợ lý ảo"
          onPress={goChat}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  list: {
    paddingHorizontal: PADDING_PAGE,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  keyword: {
    flex: 1,
  },
  number: {
    fontWeight: "600",
  },
  footer: {
    padding: PADDING_PAGE,
    paddingBottom: 0,
    borderTopWidth: 1
  },
  textFooter: {
    textAlign: "center",
    paddingHorizontal: 40,
    paddingBottom: PADDING_PAGE
  }
});


export default DreamBook;
