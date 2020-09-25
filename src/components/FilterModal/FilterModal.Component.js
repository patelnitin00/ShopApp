import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Modal from 'react-native-modal';
import styles from './FilterModal.Styles';
import { Picker } from '@react-native-community/picker';
import Button from '../Button/Button.component'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { height } from 'react-native-dimension';
import Colors from '../../utills/Colors'
export default function WrapperComponent({ isVisible, onPressApply, onRequestClose }) {
    const sortingOptions = [
        { label: "None", val: "none" },
        { label: "Price", val: "byPrice" },
        { label: "Name", val: "byName" },
        { label: "Category", val: "byCat" },
    ]
    const [sortBy, setSortBy] = useState("none");
    const [showCategories, setShowCategories] = useState(false);

    return (<Modal isVisible={isVisible}
        onBackButtonPress={onRequestClose}
        onBackdropPress={onRequestClose}>
        <View style={styles.container}>
            <Text style={styles.head}>Filter</Text>
            <View style={styles.horizontalLine} />
            <View style={styles.sortRow}>
                <Text style={styles.catHead}>Sort By</Text>
                <Picker
                    selectedValue={sortBy}
                    style={styles.picker}
                    mode={"dropdown"}
                    onValueChange={(itemValue, itemIndex) =>
                        setSortBy(itemValue)
                    }>
                    {sortingOptions.map(item =>
                        <Picker.Item label={item.label} value={item.val} />
                    )}
                </Picker>
            </View>
            {/* <View style={styles.sortRow}>
                <Text style={styles.catHead}>Show Categories</Text>
                <View style={styles.checkButtonContainer}>
                    <FontAwesome name={showCategories ? "dot-circle-o" : "circle-o"}
                        size={height(4)} color={Colors.primaryPink} onPress={() => setShowCategories(!showCategories)} />
                </View>
            </View> */}
            <Button title={"Apply"} onPress={() => onPressApply(sortBy, showCategories)} />
        </View>
    </Modal >
    )
}