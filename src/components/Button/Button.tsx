import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {RectButton, type RectButtonProps} from 'react-native-gesture-handler';

interface Props extends RectButtonProps {
  title: string;
  variant?: 'primary' | 'default';
}

function Button({title, variant = 'default', ...otherProps}: Props) {
  const color = variant === 'primary' ? 'white' : '#0C0D34';
  const backgroundColor =
    variant === 'primary' ? '#2CB9B0' : 'rgba(12, 13, 52, 0.05)';

  return (
    <RectButton
      style={[styles.container, {backgroundColor}, otherProps.style]}
      {...otherProps}>
      <Text style={[styles.title, {color}]}>{title}</Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    height: 50,
    width: 245,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default Button;
