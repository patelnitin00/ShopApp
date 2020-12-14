/**
 * @file Dashboard Screen
 * @author Nitin Patel & Krutik Parikh 
 */
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, Image, ScrollView, ActivityIndicator } from 'react-native';
import styles from './Dashboard.styles';
import ItemDetailModal from '../../components/ItemDetailModal/ItemDetailModal.Component'
import Colors from '../../utills/Colors'
import Header from '../../components/HeaderBasic/HeaderBasic.component'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import SearchBar from '../../components/SearchBar/SearchBar.component'
import firestore from '@react-native-firebase/firestore';
import FilterModal from '../../components/FilterModal/FilterModal.Component'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { height } from 'react-native-dimension';
import moment from 'moment'
import ModalDropdown from 'react-native-modal-dropdown';
/**
 * Dashboard Screen
 * @module ScreenDashboard
 */

/**
 * Dashboard screen homepage of the App 
 * @param {props} props - Mainly Navigation props are passed to this screen
 * @returns {JSX.Element}
 * @function
 */
export default function Dashboard(props) {
  const [allProducts, setAllProducts] = useState([]);
  const [newProdutcs, setNewProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [selectedCategoryProducts, setSelectedCategoryProducts] = useState([]);
  const [searchValue, setSearchValue] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isItemDetailVisible, setIsItemDetailVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null)
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("All")
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
    const newCategories = ["All"];
    firestore()
      .collection('Categories')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          newCategories.push(documentSnapshot.data().name);
        });
        setCategories(newCategories)
      });
  }
  const search = (val) => {
    setSearchValue(val)
    if (selectedCategory == "All") {
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
    }
    else {
      const newData = window.selectedCategoryProducts.filter(item => {
        const itemData = `${item.title.toUpperCase()} ${item.title.toUpperCase()} ${item.title.toUpperCase()} `;
        const textData = val.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setSelectedCategoryProducts(newData)
    }
    // }
  }
  const renderProduct = ({ item, index }) => {
    let price = item.price
    let specialOffer = item.specialOffer.discount != null && moment().isBetween(item.specialOffer.from, item.specialOffer.to);
    if (specialOffer && item.specialOffer.minOrder == null) {
      price = item.price - ((item.specialOffer.discount * price) / 100);
    }
    return (
      <TouchableOpacity style={styles.productContainer}
        onPress={() => { setSelectedItem({ ...item, price }); setIsItemDetailVisible(!isItemDetailVisible) }}>
        <View>
          <Image source={{ uri: item.image }} style={styles.productImage} />
          <Text numberOfLines={1} style={styles.productTitle}>{item.title}</Text>
          {item.rating && <View style={styles.rateContainer}>
            <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
            <Ionicons name="ios-star" color={Colors.primaryYellow} size={height(2)} />
          </View>}
          {item.bestSelling && <View style={styles.bestContainer}>
            <MaterialIcons name="verified-user" color={Colors.green} size={height(2)} />
          </View>}
          {specialOffer &&
            <View style={styles.specialOfferContainer}>
              <Text style={styles.specialOfferText}>{item.specialOffer.discount}% Off
          {item.specialOffer.minOrder != null && " at " + item.specialOffer.minOrder}</Text>
            </View>}
        </View>
        <View style={styles.priceConainer}>
          <Text style={styles.priceLableText}>Price:</Text>
          <Text style={styles.priceText}>{price.toFixed(0)}</Text>
        </View>
        <View style={styles.priceConainer}>
          <Text style={styles.priceLableText}>In Stock:</Text>
          <Text style={styles.priceText}>{item.inStock}</Text>
        </View>
      </TouchableOpacity>
    )
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
  const renderAllProduct = ({ item, index }) => {
    let price = item.price
    let specialOffer = item.specialOffer.discount != null && moment().isBetween(item.specialOffer.from, item.specialOffer.to);
    if (specialOffer) {
      price = item.price - ((item.specialOffer.discount * price) / 100);
    }
    return (
      <TouchableOpacity style={styles.productContainerAll}
        onPress={() => { setSelectedItem({ ...item, price }); setIsItemDetailVisible(!isItemDetailVisible) }}>
        <View>
          <Image source={{ uri: item.image }} style={styles.productImage} />
          <Text numberOfLines={1} style={styles.productTitle}>{item.title}</Text>
          {item.rating && <View style={styles.rateContainer}>
            <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
            <Ionicons name="ios-star" color={Colors.primaryYellow} size={height(2)} />
          </View>}
          {item.bestSelling && <View style={styles.bestContainer}>
            <MaterialIcons name="verified-user" color={Colors.green} size={height(2)} />
          </View>}
          {specialOffer &&
            <View style={styles.specialOfferContainer}>
              <Text style={styles.specialOfferText}>{item.specialOffer.discount}% Off
          {item.specialOffer.minOrder != null && "at " + item.specialOffer.minOrder}</Text>
            </View>}
        </View>
        <View style={styles.priceConainer}>
          <Text style={styles.priceLableText}>Price:</Text>
          <Text style={styles.priceText}>{price}</Text>
        </View>
        <View style={styles.priceConainer}>
          <Text style={styles.priceLableText}>In Stock:</Text>
          <Text style={styles.priceText}>{item.inStock}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  const renderEmptyListComponent = () => (
    <View style={styles.loaderContainer}>
      {searchValue == '' ?
        <ActivityIndicator color={Colors.primaryPink} size={"large"} />
        :
        <Text>No products found with "{searchValue}"</Text>
      }
    </View>
  )
  const toggleFilter = () => setIsFilterVisible(!isFilterVisible);
  const applyFilter = (sortBy) => {
    if (sortBy == "byPrice") {
      if (selectedCategory == "All") {
        setAllProducts(allProducts.sort((a, b) => a.price - b.price))
        setPopularProducts(popularProducts.sort((a, b) => a.price - b.price))
        setNewProducts(newProdutcs.sort((a, b) => a.price - b.price))
      }
      else {
        setSelectedCategoryProducts(selectedCategoryProducts.sort((a, b) => a.price - b.price))
      }
    }
    else if (sortBy == "byName") {
      if (selectedCategory == "All") {
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
      else {
        setSelectedCategoryProducts(selectedCategoryProducts.sort(function (a, b) {
          var nameA = a.title.toLowerCase(), nameB = b.title.toLowerCase();
          if (nameA < nameB) //sort string ascending
            return -1;
          if (nameA > nameB)
            return 1;
          return 0; //default return value (no sorting)
        }))
      }
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
          <View style={styles.searchRow}>
            <SearchBar value={searchValue} onChangeText={search} />
            <View style={styles.dropDownContainer}>
              <ModalDropdown options={categories} defaultIndex={0}
                onSelect={(index, val) => {
                  setSelectedCategory(val)
                  var newProducts = window.products.filter(item => item.category == val)
                  setSelectedCategoryProducts(newProducts)
                  window.selectedCategoryProducts = newProducts
                }}>
                <View style={styles.categoryRow}>
                  <Text numberOfLines={2} style={styles.selectedCategoryText}>{selectedCategory}</Text>
                  <Ionicons name="caret-down" size={height(2.5)} color={'black'} />
                </View>
              </ModalDropdown>
            </View>
          </View>
          <ScrollView showsVerticalScrollIndicator={true}>
            {selectedCategory == 'All' &&
              <View style={styles.categoryContainer}>
                <Text style={styles.categoryTitle}>New Products</Text>
                <FlatList
                  data={newProdutcs}
                  renderItem={renderProduct}
                  horizontal
                  ListEmptyComponent={renderEmptyListComponent}
                />
              </View>}
            {selectedCategory == 'All' &&
              <View style={styles.categoryContainer}>
                <Text style={styles.categoryTitle}>Popular Products</Text>
                <FlatList
                  data={popularProducts}
                  renderItem={renderProduct}
                  horizontal
                  ListEmptyComponent={renderEmptyListComponent}
                />
              </View>}
            <Text style={styles.categoryTitle}>{selectedCategory == 'All' ? "All Products" : selectedCategory}</Text>
            <FlatList
              data={selectedCategory == "All" ? allProducts : selectedCategoryProducts}
              renderItem={renderAllProduct}
              numColumns={3}
              ListEmptyComponent={renderEmptyListComponent}
            />
          </ScrollView>
          <FilterModal isVisible={isFilterVisible} onRequestClose={toggleFilter} onPressApply={applyFilter} />
          <ItemDetailModal isVisible={isItemDetailVisible} item={selectedItem}
            onRequestClose={() => setIsItemDetailVisible(!isItemDetailVisible)} />
        </View>
      </SafeAreaView>
    </>
  );
};
