import React from 'react';
import { View, Image } from 'react-native';
import styles from './Logo.Styles';
/**
 * @file Logo Component
 * @author Nitin Patel
 */
/**
 * LOGO Component Module
 * @module ComponentLogo
 */

/**
 * First component that renders when the app is open
 * @returns {JSX.Element}
 * @function
 */
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
