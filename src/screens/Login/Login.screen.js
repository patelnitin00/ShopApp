import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, StatusBar, Text, Alert } from 'react-native';
import styles from './Login.styles';
import Button from '../../components/Button/Button.component';
import RNBootSplash from "react-native-bootsplash";
import Input from '../../components/FormInput/FormInput.component'
import Header from '../../components/HeaderBasic/HeaderBasic.component'
import Logo from '../../components/Logo/Logo.component'
import Colors from '../../utills/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from 'react-redux';
import { login } from '../../Redux/Actions/Auth';
export default function Login(props) {
  const dispatch = useDispatch()
  const [phone, setPhone] = useState('+1');
  const onAuthStateChanged = async (data) => {
    if (data != null) {
      const user = await firestore()
        .collection('Users')
        .doc(data.uid)
        .get();
      if (user.exists) {
        dispatch(login(user.data()))
        RNBootSplash.hide({ duration: 500 });
      }
      else {
        auth()
          .then(() => {
            RNBootSplash.hide({ duration: 500 })
          });
      }
    }
    else {
      RNBootSplash.hide({ duration: 500 });
    }
  }
  useEffect(() => {
    const authChangeSubscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return authChangeSubscriber;
  }, [])
  const onPressLogin = () => {
    if (phone.trim() != '' && phone.trim().length > 11) {
      props.navigation.navigate('VerifyOtp', { phone })
    }
    else {
      Alert.alert("Please fill phone number field.")
    }
  }
  return (
    <>
      <SafeAreaView backgroundColor={Colors.darkPink} />
      <StatusBar barStyle={"light-content"} backgroundColor={Colors.darkPink} />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Header title="Authentication" hideBackIcon />
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.body}>
              <Logo />
              <Text style={styles.enterText}>
                Verify Phone Number
            </Text>
              <View style={styles.inputsContainer}>
                <Input
                  value={phone} onChangeText={(val) => setPhone(val)}
                  title={"Enter Phone Number"} inputStyle={styles.input}
                  keyboardType={"numeric"}
                />
              </View>
              <Button
                title="Login"
                onPress={onPressLogin}
                containerStyle={styles.buttonContainer} />
            </View>
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};