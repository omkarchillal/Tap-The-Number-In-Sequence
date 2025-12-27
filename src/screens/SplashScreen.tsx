import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ImageBackground, Image, Animated, Dimensions } from 'react-native';
import { CLOUDINARY_URLS } from '../config/cloudinary';
import metrics from '../config/metrics';

// Require local asset
const APP_LOGO = require('../assets/app logo.png');

const { width, height } = Dimensions.get('window');

interface Props {
    onFinish: () => void;
}

type SplashPhase = 'LOGO' | 'LOADING';

const SplashScreen: React.FC<Props> = ({ onFinish }) => {
    const [phase, setPhase] = useState<SplashPhase>('LOGO');
    const progress = useRef(new Animated.Value(0)).current;

    // Configuration for the progress bar size
    const BAR_WIDTH = metrics.rw(85);
    const BAR_HEIGHT = metrics.rh(3);

    useEffect(() => {
        if (phase === 'LOGO') {
            const timer = setTimeout(() => {
                setPhase('LOADING');
            }, 1500); // Show logo for 1.5 seconds

            return () => clearTimeout(timer);
        } else if (phase === 'LOADING') {
            Animated.timing(progress, {
                toValue: 1,
                duration: 3000, // 3 seconds
                useNativeDriver: false, // width animation requires false
            }).start(({ finished }) => {
                if (finished) {
                    onFinish();
                }
            });
        }
    }, [phase, onFinish, progress]);

    const widthInterpolation = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, BAR_WIDTH],
    });

    if (phase === 'LOGO') {
        return (
            <View style={styles.logoContainer}>
                <Image
                    source={APP_LOGO}
                    style={styles.logoImage}
                    resizeMode="contain"
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={{ uri: CLOUDINARY_URLS.splashScreen }}
                style={styles.background}
                resizeMode="cover"
            >
                <View style={styles.progressContainer}>
                    {/* Background Empty Bar */}
                    <Image
                        source={{ uri: CLOUDINARY_URLS.volumeBarEmpty }}
                        style={{ width: BAR_WIDTH, height: BAR_HEIGHT }}
                        resizeMode="stretch"
                    />

                    {/* Foreground Fill Bar (Masked) */}
                    <View style={[styles.fillContainer, { width: BAR_WIDTH, height: BAR_HEIGHT }]}>
                        <Animated.View
                            style={{
                                width: widthInterpolation,
                                height: '100%',
                                overflow: 'hidden',
                                alignItems: 'flex-start', // Keep image aligned left
                            }}
                        >
                            {/* The inner image is full width, but revealed by the parent's animated width */}
                            <Image
                                source={{ uri: CLOUDINARY_URLS.volumeBarFill }}
                                style={{ width: BAR_WIDTH, height: BAR_HEIGHT }}
                                resizeMode="stretch"
                            />
                        </Animated.View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logoContainer: {
        flex: 1,
        backgroundColor: '#F8F5F2', // Match app theme or white
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImage: {
        width: metrics.rw(60), // Adjust size as needed
        height: metrics.rw(60),
    },
    background: {
        flex: 1,
        width: width,
        height: height,
        justifyContent: 'flex-end', // Position loading bar at bottom
        alignItems: 'center',
    },
    progressContainer: {
        marginBottom: metrics.rh(20),
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fillContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
});

export default SplashScreen;
