import { StyleSheet } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import Colors from '../../utills/Colors';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: height(25),
    width: width(80),
    tintColor: Colors.primaryPink
  },
});
export default styles;
