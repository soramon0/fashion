import React, {useRef} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

import PaginationIndicator from './pagination-indicator';
import Slide, {SLIDER_HEIGHT} from './slide';
import SubSlide from './sub-slide';

const {width} = Dimensions.get('window');

const BORDER_RADIUS = 75;
const slides = [
  {
    title: 'Relaxed',
    color: '#BFEAF5',
    subtitle: 'Find Your Outfits',
    description:
      "Confused about your outfit? Don't worry! Find the best outfit here!",
  },
  {
    title: 'Playful',
    color: '#BEECC4',
    subtitle: 'Hear it First, Wear it First',
    description:
      'Hating the clothes in your wardrobe ? Explore hundreds of outfit ideas',
  },
  {
    title: 'Excentric',
    color: '#FFE4D9',
    subtitle: 'Your Style, Your Way',
    description:
      'Create your individual & unique style and look amazing everyday',
  },
  {
    title: 'Funky',
    color: '#FFDDDD',
    subtitle: 'Look Good, Feel Good',
    description:
      'Discover the latest trends in fashion and explore your personality',
  },
];

interface SlideWrapperProps {
  title: string;
  right?: boolean;
  index: number;
}

function SlideWrapper({title, right}: SlideWrapperProps) {
  return <Slide key={title} title={title} right={right} />;
}

function OnBoarding() {
  const scroll = useRef<Animated.ScrollView>(null);
  const xOffset = useSharedValue(0);
  const onScrollHandler = useAnimatedScrollHandler({
    onScroll({contentOffset}) {
      xOffset.value = contentOffset.x;
    },
  });
  const backgroundColor = useDerivedValue(() =>
    interpolateColor(
      xOffset.value,
      slides.map((_, i) => i * width),
      slides.map(slide => slide.color),
    ),
  );
  const background = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value,
  }));
  const footerXOffset = useAnimatedStyle(() => ({
    transform: [{translateX: -xOffset.value}],
  }));
  const currentIndex = useDerivedValue(() => xOffset.value / width);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, background]}>
        <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onScroll={onScrollHandler}
          scrollEventThrottle={16}>
          {slides.map((slide, i) => (
            <SlideWrapper
              key={slide.title}
              title={slide.title}
              right={i % 2 !== 0}
              index={i}
            />
          ))}
        </Animated.ScrollView>
      </Animated.View>

      <View style={styles.footer}>
        <Animated.View style={[StyleSheet.absoluteFillObject, background]} />
        <View style={[styles.footerContent]}>
          <View style={styles.pagination}>
            {slides.map((slide, i) => (
              <PaginationIndicator
                key={slide.title}
                index={i}
                currentIndex={currentIndex}
              />
            ))}
          </View>
          <Animated.View style={[styles.subslides, footerXOffset]}>
            {slides.map((slide, i) => (
              <SubSlide
                key={slide.subtitle}
                subtitle={slide.subtitle}
                description={slide.description}
                last={i === slides.length - 1}
                onPress={() => {
                  const last = i === slides.length - 1;
                  if (last) {
                    console.log('last');
                  } else {
                    scroll.current?.scrollTo({
                      x: width * (i + 1),
                      animated: true,
                    });
                  }
                }}
              />
            ))}
          </Animated.View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  slider: {
    height: SLIDER_HEIGHT,
    borderBottomRightRadius: BORDER_RADIUS,
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: BORDER_RADIUS,
  },
  pagination: {
    width,
    height: BORDER_RADIUS * 0.8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subslides: {
    flex: 1,
    flexDirection: 'row',
    width: width * slides.length,
  },
});

export default OnBoarding;
