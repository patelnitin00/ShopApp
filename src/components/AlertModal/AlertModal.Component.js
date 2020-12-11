import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import styles from './AlertModal.Styles';
import AntDesign from 'react-native-vector-icons/AntDesign'
/**
 * @file Alert Modal Component
 * @author Nitin Patel
 */

/**
 * Alert Component Module
 * @module ComponentAlert
 */

/**
 * Alert Modal component
 * @param {boolean} this.props.isVisible - Boolean is passed as prop to display the Visibility
 * @param {boolean} this.props.onClose - Boolean is passed as prop to trigger on Close function
 * @param {string} this.props.Text - String is passed as prop to display the Text
 * @returns {JSX.Element}
 */
class CustomModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (<Modal isVisible={this.props.isVisible} >
            <View style={styles.mainContainer}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.closeContainer} onPress={this.props.onClose}>
                        <AntDesign name="closecircleo" size={25} color="#99A3A4" />
                    </TouchableOpacity>
                </View>
                <Image source={require('../../assets/images/info.gif')}
                    style={styles.gif} resizeMode={"contain"} />
                <Text numberOfLines={1}>{this.props.Text}</Text>
            </View>
        </Modal>)
    }
}
export default CustomModal;