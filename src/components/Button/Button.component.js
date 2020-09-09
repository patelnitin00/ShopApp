import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './Button.Styles';

const Component = ({ title, onPress, containerStyle, textStyle }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.container, containerStyle ? containerStyle : {}]}
    >
      <Text style={[styles.text, textStyle ? textStyle : {}]}>{title}</Text>
    </TouchableOpacity>)
};
export default Component;
