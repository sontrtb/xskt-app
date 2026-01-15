
import ModalUpdate from '@/components/commons/ModalUpdate';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import mobileAds from 'react-native-google-mobile-ads';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import Toast from "react-native-toast-message";
import Routers from "./routers";

const queryClient = new QueryClient()

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    "LexendDeca-Thin": require("../assets/fonts/LexendDeca-Thin.ttf"),
    "LexendDeca-ExtraLight": require("../assets/fonts/LexendDeca-ExtraLight.ttf"),
    "LexendDeca-Light": require("../assets/fonts/LexendDeca-Light.ttf"),
    "LexendDeca-Regular": require("../assets/fonts/LexendDeca-Regular.ttf"),
    "LexendDeca-Medium": require("../assets/fonts/LexendDeca-Medium.ttf"),
    "LexendDeca-SemiBold": require("../assets/fonts/LexendDeca-SemiBold.ttf"),
    "LexendDeca-Bold": require("../assets/fonts/LexendDeca-Bold.ttf"),
    "LexendDeca-ExtraBold": require("../assets/fonts/LexendDeca-ExtraBold.ttf"),
    "LexendDeca-Black": require("../assets/fonts/LexendDeca-Black.ttf"),
  });


  useEffect(() => {
    if (loaded) {
      SplashScreen.hide();
    }
  }, [loaded]);

  useEffect(() => {
    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        console.log("Mobile Ads status:", adapterStatuses)
      });
  }, [])

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <KeyboardProvider>
          <Routers />
          <Toast
            position="top"
            visibilityTime={3000}
          />
          <ModalUpdate />
        </KeyboardProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  )
}
