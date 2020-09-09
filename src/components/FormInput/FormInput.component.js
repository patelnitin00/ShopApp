import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './FormInput.Styles';

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
