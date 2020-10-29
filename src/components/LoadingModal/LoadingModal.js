import React, { Fragment } from 'react';
import {
    ActivityIndicator
} from 'react-native';
import Modal from 'react-native-modal';
import Colors from '../../utills/Colors';
import { useSelector } from 'react-redux'
export default function SuccessModal() {
    const isVisible = useSelector(state => state.Main.loading)
    return (
        <Fragment>
            <Modal isVisible={isVisible}
                backdropColor={'black'}
                backdropOpacity={0.3}>
                <ActivityIndicator size="large" color={Colors.backgroundWhite} />
            </Modal>
        </Fragment>
    );
}
