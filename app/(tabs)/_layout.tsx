import useColor from '@/hooks/useColor';
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

      <NativeTabs.Trigger name="statistical">
        <Label>Thống kê</Label>
        <Icon
          src={
            <VectorIcon
              family={Feather}
              name="message-circle"
            />
          }
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger
        name="setting"
      >
        <Icon
          src={
            <VectorIcon
              family={Feather}
              name="user"
            />
          }
        />
        <Label>Thiết lập</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
