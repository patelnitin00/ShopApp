import { StyleSheet } from 'react-native';
import Colors from '../../utills/Colors'
import { width, height, totalSize } from 'react-native-dimension';
const styles = StyleSheet.create({
  container: {
    height: height(6),
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.primaryPink,
    borderWidth: 1,
    marginTop: 12
  },
  input: {
    height: '100%',
    fontSize: 15,
    color: 'gray',
    padding: 0
  }
});
export default styles;
