import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './FormInput.Styles';
/**
 * @file Form Component
 * @author Nitin Patel
 */
/**
 * Form Component Module
 * @module ComponentForm
 */
/**
 * form input component
 * @param {string} title - Title from props
 * @param {Function} onChangeText - On Change function
 * @param {BigInteger} value - style property
 * @param {string} containerStyle - style property
 * @param {string} inputStyle - style property
 * @param {string} keyboardType - Keyboard type
 * @returns {JSX.Element}
 */

const Component = ({
  title,
  onChangeText,
  value,
  containerStyle,
  inputStyle,
  keyboardType }) => {
  return (
    <View style={[styles.container, containerStyle ? containerStyle : {}]}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        numberOfLines={1}
        onChangeText={onChangeText}
        keyboardType={keyboardType ? keyboardType : "default"}
        style={[styles.input, inputStyle ? inputStyle : {}]} value={value} />
    </View>
  );
};

export default Component;
