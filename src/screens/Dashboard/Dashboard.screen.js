import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, Image, ScrollView, ActivityIndicator } from 'react-native';
import styles from './Dashboard.styles';
import Button from '../../components/Button/Button.component';
import Colors from '../../utills/Colors'
import Header from '../../components/HeaderBasic/HeaderBasic.component'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import SearchBar from '../../components/SearchBar/SearchBar.component'
import firestore from '@react-native-firebase/firestore';
import FilterModal from '../../components/FilterModal/FilterModal.Component'
export default function Dashboard(props) {
  const [allProducts, setAllProducts] = useState([]);
  const [newProdutcs, setNewProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [searchValue, setSearchValue] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
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
  const toggleFilter = () => setIsFilterVisible(!isFilterVisible);
  const applyFilter = (sortBy) => {
    if (sortBy == "byPrice") {
      setAllProducts(allProducts.sort((a, b) => b.price - a.price))
      setPopularProducts(popularProducts.sort((a, b) => b.price - a.price))
      setNewProducts(newProdutcs.sort((a, b) => b.price - a.price))
    }
    else if (sortBy == "byName") {
      setAllProducts(allProducts.sort(function (a, b) {
        var nameA = a.title.toLowerCase(), nameB = b.title.toLowerCase();
        if (nameA < nameB) //sort string ascending
          return -1;
        if (nameA > nameB)
          return 1;
        return 0; //default return value (no sorting)
      }))
      setPopularProducts(popularProducts.sort(function (a, b) {
        var nameA = a.title.toLowerCase(), nameB = b.title.toLowerCase();
        if (nameA < nameB) //sort string ascending
          return -1;
        if (nameA > nameB)
          return 1;
        return 0; //default return value (no sorting)
      }))
      setNewProducts(newProdutcs.sort(function (a, b) {
        var nameA = a.title.toLowerCase(), nameB = b.title.toLowerCase();
        if (nameA < nameB) //sort string ascending
          return -1;
        if (nameA > nameB)
          return 1;
        return 0; //default return value (no sorting)
      }))
    }
    toggleFilter()
  }
  return (
    <>
      <SafeAreaView backgroundColor={Colors.darkPink} />
      <StatusBar barStyle={"light-content"} backgroundColor={Colors.darkPink} />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Header title="Shop Now" showMenu showFilter onPressFilter={toggleFilter}
            onLeftPress={() => { props.navigation.openDrawer() }} />
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
          </ScrollView>
          <FilterModal isVisible={isFilterVisible} onRequestClose={toggleFilter} onPressApply={applyFilter} />
        </View>
      </SafeAreaView>
    </>
  );
};
