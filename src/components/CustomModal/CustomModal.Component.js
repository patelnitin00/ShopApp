import React from 'react';
import { View, Image, Text } from 'react-native';
import Modal from 'react-native-modal';
import styles from './CustomModal.Styles';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
class CustomModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (<Modal isVisible={this.props.isVisible}>
            <View style={styles.mainContainer}>
                <Image source={this.props.success ?
                    require('../../assets/images/success.png') :
                    this.props.failure ?
                        require('../../assets/images/close_1.png') :
                        require('../../assets/images/loading.gif')}
                    style={[styles.gif, {
                        height: this.props.success || this.props.failure ? hp('8%') : hp("20%")
                    }]} resizeMode={"contain"} />
                <Text>{this.props.Text}</Text>
            </View>
        </Modal>)
    }
}
export default CustomModal;