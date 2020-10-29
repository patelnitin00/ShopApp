import { StyleSheet } from 'react-native';
import Colors from '../../utills/Colors';
import { width, height, totalSize } from 'react-native-dimension';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  body: {
    flex: 1,
    marginTop: height(5),
    alignItems: 'center',
  },
  aboutText: {
    fontSize: width(4.5),
    color: Colors.black,
    marginLeft: width(3),
    textAlign:'left',
    paddingHorizontal: width(5),
  },
});
export default styles;
