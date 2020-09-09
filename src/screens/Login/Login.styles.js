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
  inputsContainer: {
    marginTop: height(4),
    alignItems: 'center'
  },
  input: {
    marginBottom: height(5)
  },
  enterText: {
    marginTop: height(2),
    fontSize: width(4.5),
    width: width(70),
    textAlign: 'center'
  }
});
export default styles;
