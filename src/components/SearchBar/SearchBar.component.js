import React from 'react';
import { View, TextInput } from 'react-native';
import styles from './SearchBar.Styles';

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
