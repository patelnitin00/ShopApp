import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './Button.Styles';
import Colors from '../../utills/Colors'

const Component = ({ title, onPress, containerStyle, textStyle, disabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={[styles.container, { backgroundColor: disabled ? Colors.darkGray : Colors.primaryPink },
      containerStyle ? containerStyle : {}]}
    >
      <Text style={[styles.text, textStyle ? textStyle : {}]}>{title}</Text>
    </TouchableOpacity>)
};
export default Component;
