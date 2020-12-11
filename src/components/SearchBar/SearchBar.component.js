import React from 'react';
import { View, TextInput } from 'react-native';
import styles from './SearchBar.Styles';
/**
 * @file Search Component
 * @author Nitin Patel
 */
/**
 * Search Component Module
 * @module ComponentScreen
 */
/**
 * Search bar which takes the parameter and display to the screen
 * @param {Function} onChangeText - Function which triggers on text change
 * @param {string} value - value which shows the input value
 * @returns {JSX.Element}
 * @function
 */
const SearchBar = ({ onChangeText, value }) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search..."
        onChangeText={onChangeText} style={styles.input} value={value} />
    </View>
  );
};

export default SearchBar;
