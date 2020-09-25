import React, { } from 'react';
import { View, Text, Image } from 'react-native';
import Modal from 'react-native-modal';
import styles from './ItemDetailModal.Styles';
import Button from '../Button/Button.component'
import { useDispatch } from 'react-redux'
import { addItemToCart } from '../../Redux/Actions/MyCart'
export default function WrapperComponent({ isVisible, onRequestClose, item }) {
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
                <Text style={styles.dataVal}>{item?.price}</Text>
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
        </View>
    </Modal >
    )
}