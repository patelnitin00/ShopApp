import React, { Fragment } from 'react';
import {
    ActivityIndicator
} from 'react-native';
import Modal from 'react-native-modal';
import Colors from '../../utills/Colors';
import { useSelector } from 'react-redux'
/**
 * @file Loading Modal Component
 * @author Nitin Patel
 */
/**
 * Loading Component Module
 * @module ComponentLoading
 */

/**
 * Loading component renders when the screen is being load
 * @returns {JSX.Element}
 * @function
 */
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
