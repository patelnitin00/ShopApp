import React, { } from 'react';
import {
  View, SafeAreaView, StatusBar, Text, ScrollView
} from 'react-native';
import styles from './About.styles';
import Colors from '../../utills/Colors';
import Header from '../../components/HeaderBasic/HeaderBasic.component'
var AboutText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fermentum dui a imperdiet dignissim. Donec ultricies, urna id ullamcorper accumsan, ligula nunc vestibulum orci, sit amet accumsan risus mauris non eros.\n\n Nulla nec scelerisque massa, id varius erat. Nunc non lacinia nunc. Fusce ac imperdiet nunc. Vivamus rhoncus accumsan dolor et aliquet. Maecenas dapibus quam mauris, vitae aliquet libero tempus in.\n\n Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam eget nunc vitae lacus rutrum finibus. Proin lacinia maximus sem, at volutpat felis lobortis convallis. Etiam egestas libero non orci commodo laoreet. Praesent ac nisl lacinia, interdum enim quis, ultricies lorem. Curabitur sit amet blandit libero. In vitae porttitor quam.\n\n\n Nullam urna quam, rutrum sit amet arcu vel, condimentum pretium mi. Cras iaculis vehicula lacus, et facilisis diam venenatis at.\n\nCurabitur sit amet blandit libero. In vitae porttitor quam.\n\n\n Nullam urna quam, rutrum sit amet arcu vel, condimentum pretium mi. Cras iaculis vehicula lacus, et facilisis diam venenatis at.\n\n"
export default function MyCartScreen(props) {
 
  return (
    <>
      <SafeAreaView backgroundColor={Colors.darkPink} />
      <StatusBar barStyle={"light-content"} backgroundColor={Colors.darkPink} />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Header title="About Us"
            onLeftPress={() => { props.navigation.openDrawer() }} showMenu/>
            <ScrollView>
          <View style={styles.body}>
              <Text style={styles.aboutText}>{AboutText}</Text>
          </View>
        </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};