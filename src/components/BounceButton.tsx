import React, { useRef } from 'react';
import { Animated, TouchableWithoutFeedback, StyleProp, ViewStyle, View, Vibration } from 'react-native';

interface Props {
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    children: React.ReactNode;
    scaleTo?: number;
    disabled?: boolean;
}

const BounceButton: React.FC<Props> = ({
    onPress,
    style,
    children,
    scaleTo = 0.95,
    disabled = false
}) => {
    const scaleValue = useRef(new Animated.Value(1)).current;

    const onPressIn = () => {
        if (disabled) return;
        Vibration.vibrate(50);
        Animated.spring(scaleValue, {
            toValue: scaleTo,
            useNativeDriver: true,
            speed: 50,
            bounciness: 10,
        }).start();
    };

    const onPressOut = () => {
        if (disabled) return;
        Animated.spring(scaleValue, {
            toValue: 1,
            useNativeDriver: true,
            speed: 50,
            bounciness: 10,
        }).start();
    };

    return (
        <TouchableWithoutFeedback
            onPress={onPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            disabled={disabled}
        >
            <Animated.View style={[style, { transform: [{ scale: scaleValue }] }]}>
                {children}
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

export default BounceButton;
