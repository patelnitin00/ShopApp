import React, { useState } from 'react';
import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import styles from './Dashboard.styles';
import Button from '../../components/Button/Button.component';
import { connect, useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../Redux/Actions/Auth';
import Colors from '../../utills/Colors'
export default function Dashboard(props) {
  const user = useSelector(state => state.Auth.user);
  const dispatch = useDispatch();
  return (
    <>
      <SafeAreaView backgroundColor={Colors.darkPink} />
      <StatusBar barStyle={"light-content"} backgroundColor={Colors.darkPink} />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text>Dashboard</Text>
          <Text>{user.fullName}</Text>
          <Button title="Logout" onPress={() => dispatch(logout())} />
        </View>
      </SafeAreaView>
    </>
  );
};
