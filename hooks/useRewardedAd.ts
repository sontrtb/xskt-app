// hooks/useRewardedAd.ts
import { adUnitBannerId } from '@/configs/admod';
import { useEffect, useState } from 'react';
import { RewardedAd, RewardedAdEventType } from 'react-native-google-mobile-ads';

let rewarded: RewardedAd | null = null;

export const useRewardedAd = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Tạo ad instance nếu chưa có
    if (!rewarded) {
      rewarded = RewardedAd.createForAdRequest(adUnitBannerId);
    }

    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setIsLoaded(true);
        setIsLoading(false);
        console.log('Rewarded ad loaded');
      }
    );

    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        console.log('User earned reward:', reward);
      }
    );

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);

  const loadAd = () => {
    if (!isLoaded && !isLoading) {
      setIsLoading(true);
      rewarded?.load();
    }
  };

  const showAd = async () => {
    if (isLoaded && rewarded) {
      try {
        await rewarded.show();
        setIsLoaded(false);
        // Load ad mới sau khi show
        loadAd();
      } catch (error) {
        console.log('Error showing ad:', error);
      }
    }
  };

  return {
    isLoaded,
    isLoading,
    loadAd,
    showAd,
  };
};