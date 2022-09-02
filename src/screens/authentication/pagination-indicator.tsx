import {StyleSheet} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  type SharedValue,
} from 'react-native-reanimated';

interface Props {
  index: number;
  currentIndex: SharedValue<number>;
}

function PaginationIndicator({currentIndex, index}: Props) {
  const animation = useAnimatedStyle(() => ({
    opacity: interpolate(
      currentIndex.value,
      [index - 1, index, index + 1],
      [0.5, 1, 0.5],
      Extrapolate.CLAMP,
    ),
    transform: [
      {
        scale: interpolate(
          currentIndex.value,
          [index - 1, index, index + 1],
          [1, 1.25, 1],
          Extrapolate.CLAMP,
        ),
      },
    ],
  }));

  return <Animated.View style={[styles.container, animation]} />;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2CB9B0',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 4,
  },
});

export default PaginationIndicator;
