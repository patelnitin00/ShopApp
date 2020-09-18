import React, { } from 'react';
import {
    Image,
    StyleSheet,
    View,
    Text
} from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import Colors from '../utills/Colors'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/Actions/Auth';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
export default function CustomDrawerContentComponent(props) {
    const user = useSelector(state => state.Auth.user);
    const dispatch = useDispatch();
    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem
                    label="Logout"
                    icon={(({ focused, color, size }) => (<AntDesign name="logout" color={color} size={size} />))}
                    onPress={() => {
                        dispatch(logout())
                    }}
                />
            </DrawerContentScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.drawerBackground,
        height: '100%'
    },
    logoutContainer: {
        flexDirection: 'row',
        marginLeft: width(2.5)
    }
});