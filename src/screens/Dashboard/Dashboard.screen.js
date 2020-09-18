import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, Image, ScrollView, ActivityIndicator } from 'react-native';
import styles from './Dashboard.styles';
import Button from '../../components/Button/Button.component';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Redux/Actions/Auth';
import Colors from '../../utills/Colors'
import Header from '../../components/HeaderBasic/HeaderBasic.component'
import data from '../../DummyData/Products'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import SearchBar from '../../components/SearchBar/SearchBar.component'
import firestore from '@react-native-firebase/firestore';
import moment from 'moment'
export default function Dashboard(props) {
  const user = useSelector(state => state.Auth.user);
  const dispatch = useDispatch();
  const [allProducts, setAllProducts] = useState([]);
  const [newProdutcs, setNewProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [searchValue, setSearchValue] = useState([]);
  // const products = data.allProducts;

  useEffect(() => {
    getProducts()
  }, [])
  const getProducts = () => {
    const fetchedProducts = [];
    firestore()
      .collection('Products')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          fetchedProducts.push(documentSnapshot.data());
        });
        let fetchedPopularProducts = ([...fetchedProducts].sort((a, b) => b.clicked - a.clicked)).splice(0, 5)
        let fetchedNewProducts = ([...fetchedProducts].sort((a, b) => b.createdAt - a.createdAt)).splice(0, 5)
        setNewProducts(fetchedNewProducts)
        setPopularProducts(fetchedPopularProducts)
        setAllProducts(fetchedProducts)
        window.products = [...fetchedProducts]
      });
  }
  const search = (val) => {
    setSearchValue(val)
    const newData = window.products.filter(item => {
      const itemData = `${item.title.toUpperCase()} ${item.title.toUpperCase()} ${item.title.toUpperCase()} `;
      const textData = val.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    // if (newData.length != 0) {
    let fetchedPopularProducts = (newData.sort((a, b) => b.clicked - a.clicked)).splice(0, 5)
    let fetchedNewProducts = (newData.sort((a, b) => b.createdAt - a.createdAt)).splice(0, 5)
    setNewProducts(fetchedNewProducts)
    setPopularProducts(fetchedPopularProducts)
    setAllProducts(newData)
    // }
  }
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
        <Text style={styles.priceLableText}>In Stock:</Text>
        {/* <Text style={styles.priceText}>{moment(item.createdAt).format("DD-MM-YY")}</Text> */}
        <Text style={styles.priceText}>{item.inStock}</Text>
      </View>
    </TouchableOpacity>
  )
  const renderAllProduct = ({ item, index }) => (
    <TouchableOpacity style={styles.productContainerAll}
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
        <Text style={styles.priceLableText}>In Stock:</Text>
        <Text style={styles.priceText}>{item.inStock}</Text>
      </View>
    </TouchableOpacity>
  )
  const renderEmptyListComponent = () => (
    <View style={styles.loaderContainer}>
      <ActivityIndicator color={Colors.primaryPink} size={"large"} />
    </View>
  )
  return (
    <>
      <SafeAreaView backgroundColor={Colors.darkPink} />
      <StatusBar barStyle={"light-content"} backgroundColor={Colors.darkPink} />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Header title="Shop Now" showMenu showFilter onPressFilter={() => { }} onLeftPress={() => { }} />
          <SearchBar value={searchValue} onChangeText={search} />
          <ScrollView showsVerticalScrollIndicator={true}>
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryTitle}>New Products</Text>
              <FlatList
                data={newProdutcs}
                renderItem={renderProduct}
                horizontal
                ListEmptyComponent={renderEmptyListComponent}
              />
            </View>
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryTitle}>Popular Products</Text>
              <FlatList
                data={popularProducts}
                renderItem={renderProduct}
                horizontal
                ListEmptyComponent={renderEmptyListComponent}
              />
            </View>
            <Text style={styles.categoryTitle}>All Products</Text>
            <FlatList
              data={allProducts}
              renderItem={renderAllProduct}
              numColumns={3}
              ListEmptyComponent={renderEmptyListComponent}
            />
            <Button title="Logout" onPress={() => dispatch(logout())} />
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};
