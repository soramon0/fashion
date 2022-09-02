import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from '../../components/Button';

interface Props {
  subtitle: string;
  description: string;
  last?: boolean;
  onPress(): void;
}

function SubSlide({subtitle, description, last = false, onPress}: Props) {
  return (
    <View style={style.container}>
      <Text style={style.subtitle}>{subtitle}</Text>
      <Text style={style.description}>{description}</Text>
      <Button
        title={last ? "Let's get started" : 'Next'}
        variant={last ? 'primary' : 'default'}
        onPress={onPress}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 44,
  },
  subtitle: {
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 30,
    color: '#0C0D34',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#0C0D34',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default SubSlide;
