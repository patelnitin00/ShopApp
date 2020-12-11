/**
 * @file Checkout Screen
 * @author Nitin Patel & Krutik Parikh
 */

import React, { useEffect, useState } from 'react';
import {
  View, SafeAreaView, StatusBar, Text, Alert
} from 'react-native';
import styles from './Checkout.styles';
import Button from '../../components/Button/Button.component';
import Colors from '../../utills/Colors';
import Header from '../../components/HeaderBasic/HeaderBasic.component'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
import { emptyCart } from '../../Redux/Actions/MyCart'
import firestore from '@react-native-firebase/firestore';
import { setLoading } from '../../Redux/Actions/Main'
import stripe from 'tipsi-stripe'
stripe.setOptions({
  publishableKey: 'pk_test_51HWBj3IWw1tn8IKQnYV866tYHwrdwaLPq06ewQKojgbxXG6xEIVziBpk0v2BldINWfAvID2YfM8EkMvtG5iqw6oM001A9RjKwY',
  // merchantId: 'MERCHANT_ID', // Optional
  androidPayMode: 'test', // Android only
})

/**
 * Checkout Screen
 * @module ScreenCheckout
 */

/**
 * Checkout screen where the user place the orders
 * @param {props} props - Mainly Navigation props are passed to this screen
 * @returns {JSX.Element}
 * @function
 */
export default function MyCartScreen(props) {
  const dispatch = useDispatch();

  const myCart = useSelector(state => state.MyCart.myCart)
  const user = useSelector(state => state.Auth.user)

  const [totalAmount, setTotalAmount] = useState(0)
  useEffect(() => {
    let newAmount = 0;
    myCart.map(item => {
      newAmount += item.price * item.quantity;
    })
    setTotalAmount(newAmount)
  }, [])
        /**
         * Options Billing Info
         * @typedef {Object} options
         * @property {string} requiredBillingAddressFields - Error msg when field is empty
         * @property {Object} billingAddress - Billing Address object passed to option object
         */

          /**
         * Billing Address option
         * @typedef {Object} billingAddress
         * @property {string} name - User Name 
         * @property {string} line1 - User line1 
         * @property {string} line2 - User line2 
         * @property {string} city - User city 
         * @property {string} state - User state 
         * @property {string} country - User country 
         * @property {string} postalCode - User postalCode 
         */
  const proceedtoPayment = () => {
    const options = {
      requiredBillingAddressFields: 'full',
      prefilledInformation: {
        billingAddress: {
          name: 'Gunilla Haugeh',
          line1: 'Canary Place',
          line2: '3',
          city: 'Macon',
          state: 'Georgia',
          country: 'US',
          postalCode: '31217',
        },
      },
    }
    stripe
      .paymentRequestWithCardForm(options)
      .then(stripeTokenInfo => {
        dispatch(setLoading(true))
        let items = [];
        myCart.map(item => {
          items.push({
            ...item,
            totalPrice: item.price * item.quantity,
          })
        })
         /**
         * items
         * @typedef {Object} items
         * @property {number} id - Item ID
         * @property {String} title - Item Name
         * @property {string} image - Item Image URL
         * @property {string} price - Item Price
         * @property {string} inStock - Item InStock
         * @property {string} category - Item Category
         * @property {string} quantity - Item Quantity
         */

        /**
         * Order
         * @typedef {Object} order
         * @property {Object} user - User stored in the State it gets from Redux
         * @property {number} totalBillPayed - Bill Payed
         * @property {string} orderStatus - Order Status 
         * @property {any} orderId
         * @property {any} userID 
         * @property {Object} items 
         */
        const order = {
          user: { ...user },
          totalBillPayed: totalAmount,
          timeStamp: moment().valueOf(),
          orderStatus: 'In Process',
          orderId: (stripeTokenInfo.tokenId).toString().replace("tok_", ""),
          userId: user.uid,
          items
        }
        firestore()
          .collection('Orders')
          .doc((stripeTokenInfo.tokenId).toString().replace("tok_", ""))
          .set(order)
          .then(() => {
            dispatch(emptyCart())
            props.navigation.goBack()
            dispatch(setLoading(false))
          })
          .catch((err) => {
            Alert.alert(err.message)
            dispatch(setLoading(false))
          });
      })
      .catch(error => {
        Alert.alert(null, 'Payment cancelled.');
        dispatch(setLoading(false))
      });
  }
  return (
    <>
      <SafeAreaView backgroundColor={Colors.darkPink} />
      <StatusBar barStyle={"light-content"} backgroundColor={Colors.darkPink} />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Header title="Checkout"
            onLeftPress={() => { props.navigation.goBack() }} />
          <View style={styles.body}>
            <View style={styles.deliveryDetailsContainer}>
              <Text style={styles.headingText}>Delivery Details</Text>
              <View style={styles.row}>
                <Text style={styles.labelText}>Name</Text>
                <Text style={styles.valueText}>{user.fullName}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.labelText}>Email</Text>
                <Text style={styles.valueText}>{user.email}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.labelText}>Mobile No.</Text>
                <Text style={styles.valueText}>{user.phoneNumber}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.labelText}>Address</Text>
                <Text style={styles.valueText}>{user.address}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.labelText}>City</Text>
                <Text style={styles.valueText}>{user.city}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.labelText}>Country</Text>
                <Text style={styles.valueText}>{user.country}</Text>
              </View>
            </View>
            <View style={styles.deliveryDetailsContainer}>
              <Text style={styles.headingText}>Bill Details</Text>
              <View style={styles.row}>
                <Text style={styles.labelText}>Total</Text>
                <Text style={styles.valueText}>{totalAmount} CAD</Text>
              </View>
            </View>
          </View>
          <Button
            disabled={myCart.length < 1}
            title="Proceed to Payment"
            onPress={proceedtoPayment}
            containerStyle={styles.buttonContainer} />
        </View>
      </SafeAreaView>
    </>
  );
};