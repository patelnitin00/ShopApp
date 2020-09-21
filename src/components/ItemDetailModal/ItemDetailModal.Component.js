import React, { } from 'react';
import { View, Text, Image } from 'react-native';
import Modal from 'react-native-modal';
import styles from './ItemDetailModal.Styles';
import Button from '../Button/Button.component'
export default function WrapperComponent({ isVisible, onPressApply, onRequestClose }) {
    const item = {
        clicked: 10,
        createdAt: 1599065650340,
        image: "https://www.onlinepumpstore.com/home/image/cache/catalog/Products/LFP-228x228.jpg",
        inStock: 15,
        price: 10499,
        title: "LUBI 1 H.P (1PH) LFP Series Sewage Pump LFP-2115"
    }

    return (<Modal isVisible={true}
        onBackButtonPress={onRequestClose}
        onBackdropPress={onRequestClose}>
        <View style={styles.container}>
            <Image
                source={{ uri: item.image }}
                style={styles.image}
            />
            <Text style={styles.head}>{item.title}</Text>
            <Button title={"Add to Cart"} onPress={() => onPressApply(sortBy)} />
        </View>
    </Modal >
    )
}