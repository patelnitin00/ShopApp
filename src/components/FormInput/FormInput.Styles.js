import { StyleSheet } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import Colors from '../../utills/Colors';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginVertical: height(1)
  },
  title: {
    color: Colors.grey,
    fontSize: 15,
    marginBottom: height(1),
    fontWeight: 'bold'
  },
  input: {
    borderColor: Colors.grey,
    borderWidth: 0.4,
    borderRadius: width(1),
    width: width(70),
  }
});
export default styles;
