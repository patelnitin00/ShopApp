/**
 * @file Cart Screen
 * @author Nitin Patel
 */

import React, { } from 'react';
import {
  View, SafeAreaView, StatusBar, FlatList, Text,
  Image
} from 'react-native';
import styles from './MyCart.styles';
import Button from '../../components/Button/Button.component';
import Colors from '../../utills/Colors';
import Header from '../../components/HeaderBasic/HeaderBasic.component'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useDispatch, useSelector } from 'react-redux';
import { incrementQty, decrementQty } from '../../Redux/Actions/MyCart';
import { height } from 'react-native-dimension';
import moment from 'moment'
/**
 * Shopping Cart Screen
 * @module ScreenCart
 */

/**
 * Shopping Cart where all the items are displayed
 * @param {props} props - Mainly Navigation props are passed to this screen
 * @returns {JSX.Element}
 * @function
 */
export default function MyCartScreen(props) {
  const dispatch = useDispatch()
  const myCart = useSelector(state => state.MyCart.myCart)
  const renderItem = ({ item, index }) => {
    let price = item.price
    let specialOfferWithMinOrder = item.specialOffer.minOrder != null && item.specialOffer.discount != null && moment().isBetween(item.specialOffer.from, item.specialOffer.to);
    if (specialOfferWithMinOrder && (item.quantity >= Number(item.specialOffer.minOrder))) {
      price = item.price - ((item.specialOffer.discount * price) / 100);
    }
    if (item.quantity >= 10) {
      price = price - ((10 * price) / 100);
    }
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
      <View style={styles.itemMainContainer}>
        <Image
          style={styles.itemImage}
          source={{ uri: item.image }} />
        <View style={styles.dataContainer}>
          <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
          <Text style={styles.inStock}>In Stock: {item.inStock}</Text>
          <View style={styles.priceQuantityContainer}>
            <View style={styles.quantityContainer}>
              <AntDesign name={"minussquare"} color={Colors.primaryPink} size={height(3)}
                onPress={() => { dispatch(decrementQty(item)) }} />
              <Text style={styles.quantity}>qty: {item.quantity}</Text>
              <AntDesign name={"plussquare"} color={Colors.primaryPink} size={height(3)}
                onPress={() => { dispatch(incrementQty(item)) }} />
            </View>
            <View>
              <Text style={styles.title}>Price: {(item.quantity * price).toFixed(2)}</Text>
              {item.quantity >= 10 && <Text style={styles.bulk}>Bulk order 10% discount added</Text>}
            </View>
          </View>
        </View>
      </View>
    )
  }
  return (
    <>
      <SafeAreaView backgroundColor={Colors.darkPink} />
      <StatusBar barStyle={"light-content"} backgroundColor={Colors.darkPink} />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Header title="My Cart" showMenu
            onLeftPress={() => { props.navigation.openDrawer() }} />
          <FlatList
            style={styles.flatList}
            data={myCart}
            renderItem={renderItem}
            ListEmptyComponent={() => (
              <View style={styles.listEmptyContainer}>
                <Text style={styles.emptyText}>My Cart is Empty!</Text>
              </View>
            )}
          />
          <Button
            onPress={() => props.navigation.navigate("Checkout")}
            disabled={myCart.length < 1}
            title="CheckOut"
            containerStyle={styles.buttonContainer} />
        </View>
      </SafeAreaView>
    </>
  );
};