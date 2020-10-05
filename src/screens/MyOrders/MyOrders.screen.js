import React, { useEffect, useState } from 'react';
import {
  View, SafeAreaView, StatusBar, FlatList, Text, ActivityIndicator
} from 'react-native';
import styles from './MyOrders.styles';
import Colors from '../../utills/Colors';
import Header from '../../components/HeaderBasic/HeaderBasic.component'
import { useDispatch, useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { width, height, totalSize } from 'react-native-dimension';
import moment from 'moment'
export default function MyCartScreen(props) {
  const dispatch = useDispatch()
  const user = useSelector(state => state.Auth.user)
  const [myOrders, setMyOrders] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getOrders()
  }, [])
  const getOrders = () => {
    try {
      firestore()
        .collection('Orders')
        .where("userId", '==', user.uid)
        .onSnapshot(querySnapshot => {
          const updatedMyOrders = [];
          querySnapshot.forEach(documentSnapshot => {
            updatedMyOrders.push(documentSnapshot.data());
          });
          setMyOrders(updatedMyOrders)
          setLoading(false)
        })
    } catch (err) {
      Alert.alert(err)
      setLoading(false)
    };
  }
  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.itemMainContainer}>
        <Text style={styles.headingText}>{item.orderId}</Text>
        <View style={styles.row}>
          <Text style={styles.labelText}>Items Purchased</Text>
          <Text style={styles.labelText}>{item.items.length} items</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.labelText}>Amount</Text>
          <Text style={styles.labelText}>{item.totalBillPayed} CAD</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.labelText}>Order Date</Text>
          <Text style={styles.labelText}>{moment(item.timeStamp).format("hh:mm A DD-MM-YY")}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.labelText}>Order Status</Text>
          <Text style={styles.labelText}>{item.orderStatus}</Text>
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
          <Header title="My Orders" showMenu
            onLeftPress={() => { props.navigation.openDrawer() }} />
          {loading ?
            <ActivityIndicator style={{ marginTop: height(10) }} size="large" color={Colors.primaryPink} />
            :
            <FlatList
              style={styles.flatList}
              data={myOrders}
              renderItem={renderItem}
              ListEmptyComponent={() => (
                <View style={styles.listEmptyContainer}>
                  <Text style={styles.emptyText}>No orders placed yet!</Text>
                </View>
              )}
            />}
        </View>
      </SafeAreaView>
    </>
  );
};