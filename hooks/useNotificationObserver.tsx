import { requestNotiPermission } from '@/lib/permistions';
import { toastSuccess } from '@/lib/toast';
import { useCountNoti } from '@/stores/useCountNoti';
import messaging from '@react-native-firebase/messaging';
import { router } from 'expo-router';
import { useEffect } from 'react';

const handleOpenScreen = (data: { notificationId: number }) => {
    router.push(`/notification/${data.notificationId}`)
}

export default function useNotificationObserver() {
    const {increaseCount} = useCountNoti()

    requestNotiPermission();
    //  App đang mở (foreground)
    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            toastSuccess(remoteMessage.notification?.title ?? "Thông báo mới", remoteMessage.notification?.body)
            increaseCount()
        });

        return unsubscribe;
    }, [increaseCount]);

    // App kill → click notification
    useEffect(() => {
        (async () => {
            const message = await messaging().getInitialNotification();
            if (message?.data) {
                handleOpenScreen(message.data as unknown as { notificationId: number })
            }

        })();
    }, []);


    // App background → click notification
    useEffect(() => {
        const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
            console.log("remoteMessage", remoteMessage);
            if (remoteMessage?.data) {
                handleOpenScreen(remoteMessage.data as unknown as { notificationId: number })
            }
        });

        return unsubscribe;
    }, []);
}
