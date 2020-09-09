import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StatusBar, Text, Alert } from 'react-native';
import styles from './VerifyOtp.styles';
import Button from '../../components/Button/Button.component';
import { useDispatch } from 'react-redux';
import { login } from '../../Redux/Actions/Auth';
import Header from '../../components/HeaderBasic/HeaderBasic.component'
import Logo from '../../components/Logo/Logo.component'
import Colors from '../../utills/Colors';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
export default function Login(props) {
  const dispatch = useDispatch()
  const phone = props.route?.params.phone;
  const [confirmation, setConfirmation] = useState(null);
  const [code, setCode] = useState(null);
  useEffect(() => {
    auth().signInWithPhoneNumber(phone)
      .then((confirmResult) => {
        setConfirmation(confirmResult);
      })
      .catch(error => {
        alert("Phone no. is Incorrect")
        console.log(error)
        props.navigation.goBack();
      });
  }, [])
  const confirmCode = async () => {
    try {
      await confirmation.confirm(code)
        .then(async (data) => {
          const user = await firestore()
            .collection('Users')
            .doc(data.user.uid)
            .get();
          if (user.exists) {
            dispatch(login(user.data()))
          }
          else {
            props.navigation.navigate("Signup", { uid: data.user.uid })
          }
        })
    } catch (error) {
      Alert.alert("Incorrect verfication code.")
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
                Enter verification code received via text message
            </Text>
              <View style={styles.inputsContainer}>
                <OTPInputView
                  style={styles.input}
                  pinCount={6}
                  onCodeChanged={code => setCode(code)}
                  autoFocusOnLoad
                  codeInputFieldStyle={styles.underlineStyleBase}
                  codeInputHighlightStyle={styles.underlineStyleHighLighted}
                />
              </View>
              <Button
                title="Confirm"
                onPress={confirmCode}
                containerStyle={styles.buttonContainer} />
              <Text style={styles.didnot}>Didn't get verification code?
              <Text style={styles.resend}> Resend</Text></Text>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};