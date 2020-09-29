import React, { useState } from 'react';
import { View, SafeAreaView, StatusBar, Text, Alert } from 'react-native';
import styles from './Profile.styles';
import Button from '../../components/Button/Button.component';
import Input from '../../components/FormInput/FormInput.component'
import Header from '../../components/HeaderBasic/HeaderBasic.component'
import Colors from '../../utills/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSelector } from 'react-redux'
import firestore from '@react-native-firebase/firestore';
export default function Login(props) {
  const user = useSelector(state => state.Auth.user)
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [city, setCity] = useState(user.city);
  const [country, setCountry] = useState(user.country);
  const [address, setAddress] = useState(user.address);
  const onPressSave = () => {
    if (fullName.trim() != '' && email.trim() != ''
      && city.trim() != '' && country.trim() != '' && address.trim() != ''
    ) {
      if (ValidateEmail(email)) {
        const userData = { email, fullName, country, city, address }
        firestore()
          .collection('Users')
          .doc(user.uid)
          .update(userData)
          .then(() => {
            props.navigation.navigate("Dashboard")
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
          <Header title="Authentication" hideBackIcon showMenu
            onLeftPress={() => props.navigation.openDrawer()} />
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.body}>
              {/* <Logo /> */}
              <Text style={styles.enterText}>
                Edit Profile
            </Text>
              <View style={styles.inputsContainer}>
                <Input
                  containerStyle={styles.inputContainer}
                  value={fullName} onChangeText={(val) => setFullName(val)}
                  title={"Enter Full Name"} inputStyle={styles.input}
                />
                <Input
                  containerStyle={styles.inputContainer}
                  value={email} onChangeText={(val) => setEmail(val)}
                  title={"Enter Email Address"} inputStyle={styles.input}
                />
                <Input
                  containerStyle={styles.inputContainer}
                  value={country} onChangeText={(val) => setCountry(val)}
                  title={"Enter Country Name"} inputStyle={styles.input}
                />
                <Input
                  containerStyle={styles.inputContainer}
                  value={city} onChangeText={(val) => setCity(val)}
                  title={"Enter City Name"} inputStyle={styles.input}
                />
                <Input
                  containerStyle={styles.inputContainer}
                  value={address} onChangeText={(val) => setAddress(val)}
                  title={"Enter Complete Address"} inputStyle={styles.input}
                />
              </View>
              <Button
                title="Save"
                onPress={onPressSave}
                containerStyle={styles.buttonContainer} />
            </View>
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};