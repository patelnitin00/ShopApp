import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './HeaderBasic.Styles';
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Colors from '../../utills/Colors';
import { width, height, totalSize } from 'react-native-dimension';
/**
 * @file Header Component
 * @author Nitin Patel
 */
/**
 * Header Component Module
 * @module ComponentHeader
 */
/**
 * Header of the app where the Navigation drawer used this component to trigger events
 * @param {string} title - Title from props
 * @param {Function} onLeftPress - Fucntion that Trigger menu bar
 * @param {Function} onPressFilter - Function that send props to filter component
 * @param {string} showFilter - style property
 * @param {string} hideBackIcon - style property
 * @param {Function} showMenu - Toggle function
 * @returns {JSX.Element}
 */

const Component = ({ title, onLeftPress, onPressFilter, showFilter, hideBackIcon, showMenu }) => {
  return (<View style={styles.container}>
    {showMenu ?
      <TouchableOpacity onPress={showMenu && onLeftPress} >
        <Entypo name={"menu"} color={Colors.backgroundWhite} size={height(4)} />
      </TouchableOpacity>
      :
      <TouchableOpacity onPress={!hideBackIcon && onLeftPress} >
        <Entypo name={"chevron-left"} color={
          hideBackIcon ? Colors.primaryPink : Colors.backgroundWhite} size={height(4)} />
      </TouchableOpacity>
    }
    <Text style={styles.headText}>{title}</Text>
    <TouchableOpacity onPress={showFilter && onPressFilter}>
      <MaterialCommunityIcons name={"filter-outline"}
        color={showFilter ? Colors.backgroundWhite : Colors.primaryPink} size={height(5)} />
    </TouchableOpacity>
  </View>);
};

export default Component;
