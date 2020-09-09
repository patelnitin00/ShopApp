import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, StatusBar, Text, Alert } from 'react-native';
import styles from './Signup.styles';
import Button from '../../components/Button/Button.component';
import RNBootSplash from "react-native-bootsplash";
import Input from '../../components/FormInput/FormInput.component'
import Header from '../../components/HeaderBasic/HeaderBasic.component'
import Logo from '../../components/Logo/Logo.component'
import Colors from '../../utills/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch } from 'react-redux'
import { login } from '../../Redux/Actions/Auth';
import firestore from '@react-native-firebase/firestore';
export default function Login(props) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const uid = props.route?.params.uid;
  const dispatch = useDispatch()
  useEffect(() => {
    RNBootSplash.hide({ duration: 500 });
  }, []);
  const onPressRegister = () => {
    if (fullName.trim() != '' && email.trim() != '') {
      if (ValidateEmail(email)) {
        const userData = { email, fullName, uid }
        firestore()
          .collection('Users')
          .doc(uid)
          .set(userData)
          .then(() => {
            console.log('User added!');
            dispatch(login(userData))
          })
          .catch((err) => {
            Alert.alert(err.message)
          });
      }
    }
    else {
      Alert.alert("Please fill all the  fields.")
    }
  }
  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    alert("You have entered an invalid email address!")
    return (false)
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
                Register your Profile
            </Text>
              <View style={styles.inputsContainer}>
                <Input
                  value={fullName} onChangeText={(val) => setFullName(val)}
                  title={"Enter Full Name"} inputStyle={styles.input}
                />
                <Input
                  value={email} onChangeText={(val) => setEmail(val)}
                  title={"Enter Email Address"} inputStyle={styles.input}
                />
              </View>
              <Button
                title="Register"
                onPress={onPressRegister}
                containerStyle={styles.buttonContainer} />
            </View>
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};