import { useAppReview } from '@/stores/useAppReview';
import { PADDING_PAGE } from '@/theme/layout';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import RateApp, { AndroidMarket } from 'react-native-rate-app';
import ButtonUi from '../ui/ButtonUi';
import CardUi from '../ui/CardUi';
import TextUi from '../ui/TextUi';

const ModalReview = () => {
    const {
        hasRated,
        launchCount,
        lastRequestedLaunchCount,
        setHasRated,
        setLastRequestedLaunchCount
    } = useAppReview();

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger if:
        // 1. Not rated yet
        // 2. Launch count is at least 3
        // 3. Haven't asked in this launch count session
        if (!hasRated && launchCount >= 3 && launchCount > lastRequestedLaunchCount) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [hasRated, launchCount, lastRequestedLaunchCount]);

    const handleRate = async () => {
        setIsVisible(false);
        setHasRated(true);
        setLastRequestedLaunchCount(launchCount);

        try {
            // Native In-App Review (Best for 1-tap rating)
            // Note: This might not show on Emulators if the app isn't on Play Store/App Store.
            const result = await RateApp.requestReview({
                androidMarket: AndroidMarket.GOOGLE,
                androidPackageName: 'vn.sonfe.xskt',
            });

            // Fallback: If on dev or if native dialog is silent, open the store page directly
            // On iOS simulator, requestReview usually works. 
            // On Android emulator, it almost never shows unless logged in and app is on store.
            if (__DEV__ || Platform.OS === 'android') {
                setTimeout(async () => {
                    await RateApp.openStoreForReview({
                        androidPackageName: 'vn.sonfe.xskt',
                        androidMarket: AndroidMarket.GOOGLE,
                        // iOSAppId: 'YOUR_IOS_APP_ID' // Add this when you have one
                    });
                }, 1000);
            }
        } catch (error) {
            console.error("Rating error:", error);
            // Final fallback
            await RateApp.openStoreForReview({
                androidPackageName: 'vn.sonfe.xskt',
                androidMarket: AndroidMarket.GOOGLE,
            });
        }
    };

    const handleClose = () => {
        setIsVisible(false);
        setLastRequestedLaunchCount(launchCount); // Don't ask again in this launch
    };

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={handleClose}
            animationIn="zoomIn"
            animationOut="zoomOut"
        >
            <CardUi style={styles.card}>
                <Ionicons name="star" size={60} color="#FFD700" style={styles.icon} />
                <TextUi weight="bold" style={styles.title} textLang="rating.title" />
                <TextUi style={styles.description} textLang="rating.description" />

                <View style={styles.starsContainer}>
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Ionicons key={i} name="star" size={35} color="#FFD700" style={{ marginHorizontal: 2 }} />
                    ))}
                </View>

                <View style={styles.footer}>
                    <ButtonUi
                        text="Để sau"
                        type="outline"
                        style={styles.button}
                        onPress={handleClose}
                    />
                    <ButtonUi
                        text="Xác nhận"
                        style={styles.button}
                        onPress={handleRate}
                    />
                </View>
            </CardUi>
        </Modal>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: PADDING_PAGE,
        alignItems: 'center',
    },
    icon: {
        marginBottom: 16,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 8,
    },
    description: {
        textAlign: 'center',
        marginBottom: 24,
        fontSize: 15,
        lineHeight: 22,
    },
    starsContainer: {
        flexDirection: 'row',
        marginBottom: 30,
    },
    footer: {
        flexDirection: 'row',
        gap: 12,
        width: '100%',
    },
    button: {
        flex: 1,
    },
});

export default ModalReview;
