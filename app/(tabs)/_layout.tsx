import useColor from '@/hooks/useColor';
import { FontAwesome5 } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import { Icon, Label, NativeTabs, VectorIcon } from 'expo-router/unstable-native-tabs';

export default function TabLayout() {
  const color = useColor()

  return (
    <NativeTabs
      backgroundColor={color.bottomTab}
      tintColor={color.primary}
      shadowColor={color.shadow}
      indicatorColor={color.bgImage}
      disableTransparentOnScrollEdge={true}
    >
      <NativeTabs.Trigger name="index" >
        <Label>Trang chủ</Label>
        <Icon
          src={
            <VectorIcon
              family={Feather}
              name="home"
            />
          }
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger
        name="statistical"
      >
        <Icon
          src={
            <VectorIcon
              family={FontAwesome5}
              name="chart-bar"
            />
          }
        />
        <Label>Thống kê</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="note">
        <Label>Sổ ghi</Label>
        <Icon
          src={
            <VectorIcon
              family={Feather}
              name="book"
            />
          }
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
