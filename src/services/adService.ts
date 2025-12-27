import { RewardedAd, RewardedAdEventType, AdEventType, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = TestIds.REWARDED;

let rewarded: RewardedAd | null = null;

const getRewardedAd = () => {
    if (!rewarded) {
        rewarded = RewardedAd.createForAdRequest(adUnitId, {
            keywords: ['game', 'puzzle'],
        });
    }
    return rewarded;
};

export const loadRewardedAd = () => {
    getRewardedAd().load();
};

export const showRewardedAd = (onReward: () => void, onClose: () => void, onError: (err: any) => void) => {
    const ad = getRewardedAd();

    const unsubscribeLoaded = ad.addAdEventListener(RewardedAdEventType.LOADED, () => {
        ad.show();
    });

    const unsubscribeEarned = ad.addAdEventListener(RewardedAdEventType.EARNED_REWARD, reward => {
        console.log('User earned reward of ', reward);
        onReward();
    });


    const unsubscribeClosed = ad.addAdEventListener(AdEventType.CLOSED, () => {
        onClose();
        unsubscribeLoaded();
        unsubscribeEarned();
        unsubscribeClosed();
        loadRewardedAd();
    });

    const unsubscribeError = ad.addAdEventListener(AdEventType.ERROR, error => {
        console.error('Ad failed to load', error);
        onError(error);
        unsubscribeLoaded();
        unsubscribeEarned();
        unsubscribeClosed();
    });


    if (ad.loaded) {
        ad.show();
    } else {

        loadRewardedAd();
    }


    return () => {
        unsubscribeLoaded();
        unsubscribeEarned();
        unsubscribeClosed();
        unsubscribeError();
    };
};


