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
  const proceedtoPayment = () => {
    stripe
      .paymentRequestWithCardForm()
      .then(stripeTokenInfo => {
        try {
          dispatch(setLoading(true))
          let items = [];
          myCart.map(item => {
            items.push({
              ...item,
              totalPrice: item.price * item.quantity,
            })
          })
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
        }
        catch (err) {
          Alert.alert('Payment cancelled', { error });
          dispatch(setLoading(false))
        }
      })
      .catch(error => {
        Alert.alert('Payment failed', { error });
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