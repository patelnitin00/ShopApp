/**
 * @file Product Comparision Screen
 * @author Krutik Parikh & Nitin Patel
 */
import React, { useEffect, useState } from 'react';
import {
  View, SafeAreaView, StatusBar, Image, Text,
} from 'react-native';
import styles from './ProductComparison.styles';
import Button from '../../components/Button/Button.component';
import Colors from '../../utills/Colors';
import Header from '../../components/HeaderBasic/HeaderBasic.component'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux';
import { height } from 'react-native-dimension';
/**
 * Product Comparision Screen
 * @module ScreenProductComparision
 */

/**
 * Product Comparision screen
 * @param {props} props - Mainly Navigation props are passed to this screen
 * @returns {JSX.Element}
 * @function
 */
export default function MyCartScreen(props) {
  const dispatch = useDispatch()
  const items = props.route.params?.items;
  console.log(items[0])
   /**
         * item
         * @typedef {Object} item
         * @property {number} id - Item ID
         * @property {String} title - Item Name
         * @property {string} image - Item Image URL
         * @property {string} price - Item Price
         * @property {string} inStock - Item InStock
         * @property {string} category - Item Category
         * @property {string} quantity - Item Quantity
         */
  return (
    <>
      <SafeAreaView backgroundColor={Colors.darkPink} />
      <StatusBar barStyle={"light-content"} backgroundColor={Colors.darkPink} />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Header title="Product Comparison"
            onLeftPress={() => { props.navigation.goBack() }} />
          <View style={styles.body}>
            <View style={styles.itemContainer}>
              <Image
                source={{ uri: items[0].image }}
                style={styles.itemImage}
              />
              <Text style={styles.itemName}>{items[0].title}</Text>
              <View style={styles.row}>
                <Text style={styles.itemName}>Price</Text>
                <Text style={styles.text}>{items[0].price.toFixed(0)}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.itemName}>In Stock</Text>
                <Text style={styles.text}>{items[0].inStock}</Text>
              </View>
            </View>
            <View style={styles.itemContainer}>
              <Image
                source={{ uri: items[1].image }}
                style={styles.itemImage}
              />
              <Text style={styles.itemName}>{items[1].title}</Text>
              <View style={styles.row}>
                <Text style={styles.itemName}>Price</Text>
                <Text style={styles.text}>{items[1].price.toFixed(0)}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.itemName}>In Stock</Text>
                <Text style={styles.text}>{items[1].inStock}</Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};