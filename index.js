import messaging from '@react-native-firebase/messaging';

// Register app entry through Expo Router

import 'expo-router/entry';

// Initialize services

messaging().setBackgroundMessageHandler(async remoteMessage => {
  // console.log('Message handled in the background!', remoteMessage);
});

