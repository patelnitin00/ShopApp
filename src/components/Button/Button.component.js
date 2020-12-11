import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './Button.Styles';
import Colors from '../../utills/Colors'
/**
 * @file Button Component
 * @author Nitin Patel
 */
/**
 * Button Component Module
 * @module ComponentButton
 */
/**
 * Custom button component
 * @param {string} title - Props of title passed  
 * @param {boolean} onPress - Props of on Press function passed 
 * @param {string} containerStyle - Props of Container passed as Style 
 * @param {string} textStyle - Props of title passed as style
 * @param {boolean} disabled - Boolean is passed as props
 * @returns {JSX.Element}
 */

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
