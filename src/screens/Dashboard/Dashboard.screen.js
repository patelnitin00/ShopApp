import React, { useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, Image } from 'react-native';
import styles from './Dashboard.styles';
import Button from '../../components/Button/Button.component';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Redux/Actions/Auth';
import Colors from '../../utills/Colors'
import Header from '../../components/HeaderBasic/HeaderBasic.component'
import data from '../../DummyData/Products'
import { FlatList, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
export default function Dashboard(props) {
  const user = useSelector(state => state.Auth.user);
  const dispatch = useDispatch();

  const renderProduct = ({ item, index }) => (
    <TouchableOpacity style={styles.productContainer}
      onPress={() => { }}>
      <View>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <Text numberOfLines={1} style={styles.productTitle}>{item.title}</Text>
      </View>
      <View style={styles.priceConainer}>
        <Text style={styles.priceLableText}>Price:</Text>
        <Text style={styles.priceText}>{item.price}</Text>
      </View>
      <View style={styles.priceConainer}>
        <Text style={styles.priceLableText}>Price:</Text>
        <Text style={styles.priceText}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  )
  return (
    <>
      <SafeAreaView backgroundColor={Colors.darkPink} />
      <StatusBar barStyle={"light-content"} backgroundColor={Colors.darkPink} />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Header title="Shop Now" showMenu onLeftPress={() => { }} />
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>New Products</Text>
            <FlatList
              data={data.newProducts}
              renderItem={renderProduct}
              horizontal
            />
          </View>
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>Recommended Products</Text>
            <FlatList
              data={data.recommendations}
              renderItem={renderProduct}
              horizontal
            />
          </View>
          <Button title="Logout" onPress={() => dispatch(logout())} />
        </View>
      </SafeAreaView>
    </>
  );
};
