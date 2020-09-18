import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Modal from 'react-native-modal';
import styles from './FilterModal.Styles';
import { Picker } from '@react-native-community/picker';
import Button from '../Button/Button.component'
export default function WrapperComponent({ isVisible, onPressApply, onRequestClose }) {
    const sortingOptions = [
        { label: "None", val: "none" },
        { label: "Price", val: "byPrice" },
        { label: "Name", val: "byName" },
    ]
    const [sortBy, setSortBy] = useState("none");

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
            <Button title={"Apply"} onPress={() => onPressApply(sortBy)} />
        </View>
    </Modal >
    )
}