import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';
import metrics from '../config/metrics';
import { styles } from './styles/TimeBarStyles';

interface Props {
  isGameRunning: boolean;
  duration: number;
  onTimeExpired?: () => void;
}

const TimeBar: React.FC<Props> = ({ isGameRunning, duration }) => {
  const animateValue = useRef(new Animated.Value(duration)).current;
  const currentValueRef = useRef(duration);


  useEffect(() => {
    const id = animateValue.addListener(({ value }) => {
      currentValueRef.current = value;
    });
    return () => animateValue.removeListener(id);
  }, [animateValue]);


  useEffect(() => {
    animateValue.setValue(duration);
    currentValueRef.current = duration;
  }, [duration, animateValue]);

  useEffect(() => {
    if (isGameRunning) {

      Animated.timing(animateValue, {
        duration: currentValueRef.current,
        easing: Easing.linear,
        toValue: 0,
        useNativeDriver: false,
      }).start();
    } else {
      animateValue.stopAnimation();
    }
  }, [isGameRunning, animateValue]);


  const backgroundColor = animateValue.interpolate({
    inputRange: [0, duration * 0.4, duration],
    outputRange: ['rgba(255,0,0, 1)', 'rgba(52, 152, 219, 1)', 'rgba(52, 152, 219, 1)'],
    extrapolate: 'clamp',
  });


  const width = animateValue.interpolate({
    inputRange: [0, duration],
    outputRange: [0, metrics.DEVICE_WIDTH],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <View style={styles.backgroundBar} />
      <Animated.View style={[styles.content, { width, backgroundColor }]} />
    </View>
  );
};

export default TimeBar;
