import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import {
    StyleSheet,
    View,
    ViewStyle,
    useWindowDimensions,
} from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';

const AnimatedLinearGradient =
  Animated.createAnimatedComponent(LinearGradient);

interface SkeletonUiProps {
  style?: ViewStyle;
}

const SkeletonUi: React.FC<SkeletonUiProps> = ({ style }) => {
  const { width } = useWindowDimensions();
  const translateX = useSharedValue(-width);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(width, {
        duration: 1200,
        easing: Easing.linear,
      }),
      -1,
      false
    );

    return () => {
      translateX.value = -width;
    };
  }, [width]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={[styles.container, style]}>
      <AnimatedLinearGradient
        colors={['#E9F8EB', '#F6FDF7', '#E9F8EB']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.gradient, animatedStyle]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E9F8EB',
    overflow: 'hidden',
  },
  gradient: {
    width: '200%',
    height: '100%',
  },
});

export default SkeletonUi;
