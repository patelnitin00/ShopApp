/**
 * @file Item Detail Modal component where all the list items are displays
 * @author Krutik Parikh
 */
import React, { } from 'react';
import { View, Text, Image } from 'react-native';
import Modal from 'react-native-modal';
import styles from './ItemDetailModal.Styles';
import Button from '../Button/Button.component'
import { useDispatch } from 'react-redux'
import { addItemToCart } from '../../Redux/Actions/MyCart'
import { addItemToWishList } from '../../Redux/Actions/WishList'
/**
 * Item Component Module
 * @module ComponentItemDetail
 */
/**
 * Item
 * @typedef {Object} Item
 * @property {number} id - Item ID
 * @property {String} title - Item Name
 * @property {string} image - Item Image URL
 * @property {string} price - Item Price
 * @property {string} inStock - Item InStock
 * @property {string} category - Item Category
 */
/**
 * Item Detail component where we click on any list item and this component popups
 * @param {boolean} isVisible - Visibility passed as props 
 * @param {Function} onRequestClose - Function that close the modal on click
 * @param {Item} Item - Item Object gets from firebase
 * @param {boolean} hideWishListButton - Toggle the Wishlist button
 * @returns {JSX.Element}
 */
export default function WrapperComponent({ isVisible, onRequestClose, item, hideWishListButton }) {
    const dispatch = useDispatch()
    return (<Modal isVisible={isVisible}
        onBackButtonPress={onRequestClose}
        onBackdropPress={onRequestClose}>
        <View style={styles.container}>
            <Image
                source={{ uri: item?.image }}
                style={styles.image}
            />
            <Text style={styles.head}>{item?.title}</Text>
            <View style={styles.dataRow}>
                <Text style={styles.dataHead}>Price</Text>
                <Text style={styles.dataVal}>{item?.price.toFixed(0)}</Text>
            </View>
            <View style={styles.dataRow}>
                <Text style={styles.dataHead}>Category</Text>
                <Text style={styles.dataVal}>{item?.category}</Text>
            </View>
            <View style={styles.dataRow}>
                <Text style={styles.dataHead}>In Stock</Text>
                <Text style={styles.dataVal}>{item?.inStock}</Text>
            </View>
            <Button title={"Add to Cart"} onPress={() => {
                dispatch(addItemToCart(item))
                onRequestClose()
            }} />
            {!hideWishListButton &&
                <>
                    <Button title={"Add to Wishlist"} onPress={() => {
                        dispatch(addItemToWishList(item))
                        onRequestClose()
                    }} />
                    <Text style={styles.comparisonText}>Product Comparison is available in wishlist.</Text>
                </>}
        </View>
    </Modal >
    )
}