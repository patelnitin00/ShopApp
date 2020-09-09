import React from 'react';
import { View, Image } from 'react-native';
import styles from './Logo.Styles';

const Logo = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/splash/splash.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

export default Logo;
