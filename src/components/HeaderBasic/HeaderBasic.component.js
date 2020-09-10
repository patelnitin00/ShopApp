import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './HeaderBasic.Styles';
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Colors from '../../utills/Colors';
import { width, height, totalSize } from 'react-native-dimension';

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
