import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = TestIds.BANNER; // Use TestIds.BANNER for testing

const GlobalBannerAd = () => {
    const [adLoaded, setAdLoaded] = useState(true); // default true to allocate space, or strictly handle opacity

    return (
        <View style={styles.container}>
            <BannerAd
                unitId={adUnitId}
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
                onAdLoaded={() => {
                    console.log('Banner Ad Loaded');
                }}
                onAdFailedToLoad={(error) => {
                    console.error('Banner Ad failed to load', error);
                    setAdLoaded(false);
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent', // Transparent to show app background
        paddingVertical: 0, // Remove padding to sit flush or keep minimal if needed
        zIndex: 1000, // Ensure it's above other content
    },
});

export default GlobalBannerAd;
