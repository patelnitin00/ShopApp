import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Modal from 'react-native-modal';
import styles from './FilterModal.Styles';
import { Picker } from '@react-native-community/picker';
import Button from '../Button/Button.component'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { height } from 'react-native-dimension';
import Colors from '../../utills/Colors'
/**
 * @file Filter Modal Component
 * @author Nitin Patel
 */
/**
 * Filter Component Module
 * @module ComponentFilterModal
 */

/**
 * Filter Component which sort and search the list on press
 * @param {boolean} isVisible - Props of visible passed  
 * @param {object} onPressApply - Props of on pressed passed which trigger the fucntion 
 * @param {object} onRequestClose - Props of close request are passed
 * @returns {JSX.Element}
 * @function
 */

export default function WrapperComponent({ isVisible, onPressApply, onRequestClose }) {
    const sortingOptions = [
        { label: "None", val: "none" },
        { label: "Price", val: "byPrice" },
        { label: "Name", val: "byName" },
    ]
    const [sortBy, setSortBy] = useState("none");
    const [showCategories, setShowCategories] = useState(false);
    useEffect(() => {
        setSortBy("none")
    }, [isVisible])
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