import useColor from '@/hooks/useColor';
import Constants from 'expo-constants';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import Banner from './Banner';
import ResultMini from './ResultMini';
import UtilitiesCard from './UtilitiesCard';
import WeatherBox from './WeatherBox';

const statusBarHeight = Constants.statusBarHeight;

export default function HomeScreen() {
  const color = useColor();

  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={[styles.contentContainer]}
      showsVerticalScrollIndicator={false}
      style={[styles.root, { backgroundColor: color.bg }]}
      contentInset={{ top: Platform.OS === "android" ? 0 : -(statusBarHeight + 10) }}
    >
      <WeatherBox />
      <UtilitiesCard />
      <View style={styles.addressWrap}>
       <Banner />
      </View>
      <ResultMini />
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: Platform.OS === "android" ? 130 : 20,
  },
  addressWrap: {
    marginTop: 76,
  }
});
