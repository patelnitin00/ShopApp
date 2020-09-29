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
    marginTop: height(2),
    alignItems: 'center',
  },
  inputContainer: {
  },
  inputsContainer: {
    marginTop: height(1),
    alignItems: 'center'
  },
  input: {
  },
  enterText: {
    marginTop: height(2),
    fontSize: width(4.5),
    width: width(70),
    textAlign: 'center'
  }
});
export default styles;
