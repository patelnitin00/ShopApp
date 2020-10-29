import React, { useEffect, useState } from 'react';
import {
  View, SafeAreaView, StatusBar, FlatList, Text,
  Image
} from 'react-native';
import styles from './MyWishlist.styles';
import Button from '../../components/Button/Button.component';
import Colors from '../../utills/Colors';
import Header from '../../components/HeaderBasic/HeaderBasic.component'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux';
import { height } from 'react-native-dimension';
export default function MyCartScreen(props) {
  const dispatch = useDispatch()
  const myWishList = useSelector(state => state.Wishlist.wishList)
  const [wishList, setWishList] = useState(myWishList)
  const [selectedCount, setSelectedCount] = useState(0)
  useEffect(() => {
    setWishList(myWishList)
    var selectedCountArray = myWishList.filter(item => item.isSelected)
    setSelectedCount(selectedCountArray.length)
  }, [myWishList])
  const toggleSelection = (index) => {
    var newWishList = [...wishList];
    setSelectedCount(newWishList[index].isSelected ? selectedCount - 1 : selectedCount + 1)
    newWishList[index].isSelected = newWishList[index].isSelected ? false : true;
    var selectedCountArray = newWishList.filter(item => item.isSelected)
    if (selectedCountArray.length > 2) {
      for (var i = 0; i < newWishList.length; i++) {
        if (newWishList[i].isSelected && i != index) {
          newWishList[i].isSelected = false
          break;
        }
      }
      selectedCountArray = newWishList.filter(item => item.isSelected)
    }
    setWishList(newWishList)
    setSelectedCount(selectedCountArray.length)
  }
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
            <Text style={styles.title}>Price: {(item.quantity * item.price).toFixed(2)}</Text>
            <MaterialCommunityIcons onPress={() => toggleSelection(index)}
              name={item.isSelected ? "checkbox-marked" : "checkbox-blank-outline"} size={height(5)} color={Colors.primaryPink} />
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
          <Header title="My Wishlist" showMenu
            onLeftPress={() => { props.navigation.openDrawer() }} />
          <FlatList
            style={styles.flatList}
            data={wishList}
            renderItem={renderItem}
            ListEmptyComponent={() => (
              <View style={styles.listEmptyContainer}>
                <Text style={styles.emptyText}>My Wishlist is Empty!</Text>
              </View>
            )}
          />
          <Button
            onPress={() => {
              var selectedArray = wishList.filter(item => item.isSelected)
              props.navigation.navigate("ProductComparison",{items: selectedArray})
            }}
            disabled={selectedCount != 2}
            title="Compare"
            containerStyle={styles.buttonContainer} />
        </View>
      </SafeAreaView>
    </>
  );
};