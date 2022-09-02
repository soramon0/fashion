import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

interface Props {
  title: string;
  right?: boolean;
}

const {width, height} = Dimensions.get('window');

export const SLIDER_HEIGHT = 0.61 * height;

function Slide({title, right}: Props) {
  const transform = [
    {translateY: (SLIDER_HEIGHT - 100) / 2},
    {translateX: right ? width / 2 - 50 : -width / 2 + 50},
    {rotate: right ? '-90deg' : '90deg'},
  ];

  return (
    <View style={style.container}>
      <View style={[style.titleContainer, {transform}]}>
        <Text style={style.title}>{title}</Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width,
  },
  titleContainer: {
    height: 100,
    justifyContent: 'center',
  },
  title: {
    fontSize: 80,
    lineHeight: 80,
    color: 'white',
    textAlign: 'center',
  },
});

export default Slide;
