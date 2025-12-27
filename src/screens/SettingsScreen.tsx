import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, ImageBackground, PanResponder, Animated, StyleSheet, Dimensions } from 'react-native';
import { CLOUDINARY_URLS } from '../config/cloudinary';
import { soundManager } from '../services/audioService';
import BounceButton from '../components/BounceButton';
import { styles } from './styles/SettingsScreenStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
    onBack: () => void;
}

const SLIDER_WIDTH = 300;
const KNOB_SIZE = 70;
const MAX_SLIDE = SLIDER_WIDTH - KNOB_SIZE;


// Custom Slider Component
const CustomSlider = ({
    initialValue,
    onValueChange,
    knobImage,
    label
}: {
    initialValue: number;
    onValueChange: (val: number) => void;
    knobImage: string;
    label: string;
}) => {
    // effectiveWidth is how much the knob can actually slide
    const effectiveWidth = MAX_SLIDE;

    // Animated value for position
    // Initializing x based on the initialValue (0 to 1) mapped to effective width
    const pan = useRef(new Animated.ValueXY({ x: initialValue * effectiveWidth, y: 0 })).current;

    // Update pan value if initialValue changes (e.g. loaded from storage after mount)
    useEffect(() => {
        // We only update the visual position if the prop changes significantly differently from current visual state
        // to avoid fighting with the user gesture if they are currently dragging.
        // However, typically initialValue changes only on mount or external reset.
        const currentVisualX = (pan.x as any)._value; // Access internal value (hacky but standard in RN legacy animation)
        const targetX = initialValue * effectiveWidth;

        // Simple check to see if update is needed (sanity check)
        if (Math.abs(currentVisualX - targetX) > 1) {
            pan.setValue({ x: targetX, y: 0 });
        }
    }, [initialValue]);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                // Capture current value to avoid jumping when starting a new gesture
                pan.setOffset({
                    x: (pan.x as any)._value,
                    y: 0
                });
                pan.setValue({ x: 0, y: 0 });
            },
            onPanResponderMove: Animated.event(
                [
                    null,
                    { dx: pan.x }
                ],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: (_, gestureState) => {
                pan.flattenOffset();

                // Clamping manually after release to ensure it stays in bounds visually and logically
                // This prevents the knob from being dragged outside the bar
                let currentValue = (pan.x as any)._value;
                if (currentValue < 0) currentValue = 0;
                if (currentValue > effectiveWidth) currentValue = effectiveWidth;

                pan.setValue({ x: currentValue, y: 0 });

                // Normalize value to 0-1 range for volume control
                const newVol = currentValue / effectiveWidth;
                onValueChange(newVol);
            }
        })
    ).current;

    // We also want to update the volume LIVE while dragging, so the user hears the change.
    useEffect(() => {
        const listenerId = pan.x.addListener(({ value }) => {
            let currentValue = value;

            if (currentValue < 0) currentValue = 0;
            if (currentValue > effectiveWidth) currentValue = effectiveWidth;

            const newVol = currentValue / effectiveWidth;
            onValueChange(newVol);
        });
        return () => pan.x.removeListener(listenerId);
    }, []);

    const translateX = pan.x.interpolate({
        inputRange: [0, effectiveWidth],
        outputRange: [0, effectiveWidth],
        extrapolate: 'clamp'
    });

    const fillWidth = pan.x.interpolate({
        inputRange: [0, effectiveWidth],
        outputRange: [0, SLIDER_WIDTH],
        extrapolate: 'clamp'
    });


    return (
        <View style={styles.volumeControl}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.sliderContainer}>

                <Image source={{ uri: CLOUDINARY_URLS.volumeBarEmpty }} style={styles.trackImage} resizeMode="contain" />


                <Animated.View style={[styles.fillContainer, { width: fillWidth }]}>
                    <Image source={{ uri: CLOUDINARY_URLS.volumeBarFill }} style={styles.fillImage} resizeMode="stretch" />
                </Animated.View>


                <Animated.View
                    {...panResponder.panHandlers}
                    style={[styles.knobContainer, { transform: [{ translateX }] }]}
                >
                    <Image source={{ uri: knobImage }} style={styles.knobImage} resizeMode="contain" />
                </Animated.View>
            </View>
        </View>
    );
};

const SettingsScreen: React.FC<Props> = ({ onBack }) => {
    const insets = useSafeAreaInsets();

    // Initial values
    // Note: soundManager settings might be loaded async. If they strictly load on app start, this is fine.
    // If we want reactivity to external changes, we'd need a listener in soundManager or context.
    // For now, we assume this component mounts AFTER settings are loaded or uses current values.
    const initialMusicVol = soundManager.getMusicVolume();
    const initialSoundVol = soundManager.getSoundVolume();

    return (
        <ImageBackground source={{ uri: CLOUDINARY_URLS.settingsBg1 }} style={styles.container} resizeMode="cover">
            <View style={[styles.header, { top: Math.max(insets.top + 10, 20) }]}>
                <BounceButton
                    onPress={() => { soundManager.playSound('button'); onBack(); }}
                    style={styles.backButton}
                >
                    <Image source={{ uri: CLOUDINARY_URLS.closeButton }} style={styles.backButtonImage} resizeMode="contain" />
                </BounceButton>
            </View>


            <View style={styles.titleContainer}>
                <Image source={{ uri: CLOUDINARY_URLS.settingsTile }} style={styles.settingsTile} resizeMode="contain" />
            </View>

            <View style={styles.controlsContainer}>
                <CustomSlider
                    label="Music"
                    initialValue={initialMusicVol}
                    onValueChange={(val) => {
                        soundManager.setMusicVolume(val);
                    }}
                    knobImage={CLOUDINARY_URLS.musicButton}
                />

                <CustomSlider
                    label="Sound VFX"
                    initialValue={initialSoundVol}
                    onValueChange={(val) => {
                        soundManager.setSoundVolume(val);
                    }}
                    knobImage={CLOUDINARY_URLS.soundButton}
                />
            </View>

        </ImageBackground>
    );
};

export default SettingsScreen;
