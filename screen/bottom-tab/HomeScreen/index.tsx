import useColor from '@/hooks/useColor';
import Constants from 'expo-constants';
import { Platform, ScrollView, StyleSheet } from 'react-native';
import ResultXSKT from '../../../components/commons/ResultXSKT';
import ResultBox from './ResultBox';
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
      <ResultBox />
      <UtilitiesCard />
      {/* <Banner /> */}
      <ResultXSKT />
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
});
