import React, { useEffect } from 'react';
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
export default function MyCartScreen(props) {
  const dispatch = useDispatch()
  const myCart = useSelector(state => state.MyCart.myCart)
  useEffect(() => {
  }, [])
  const renderItem = ({ item, index }) => {
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
            <Text style={styles.title}>Price: {(item.quantity * item.price).toFixed(2)}</Text>
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