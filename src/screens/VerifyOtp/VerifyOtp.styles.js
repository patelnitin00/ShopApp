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
    paddingBottom: height(3)
  },
  inputsContainer: {
    marginTop: height(2),
    alignItems: 'center'
  },
  input: {
    width: width(90),
    height: height(15),
    marginBottom: height(5),
  },
  underlineStyleBase: {
    width: height(7),
    height: height(7),
    borderColor: Colors.primaryPink,
    borderWidth: 1,
    color: Colors.black,
    fontSize: height(3),
    padding: 0
  },
  underlineStyleHighLighted: {
    borderColor: Colors.primaryPink,
  },
  didnot: {
    marginTop: height(2),
    fontSize: width(3.8),
    color: Colors.black
  },
  resend: {
    fontSize: width(3.8),
    color: Colors.primaryPink
  },
  enterText: {
    marginTop: height(2),
    fontSize: width(4.5),
    width: width(70),
    textAlign: 'center'
  }
});
export default styles;
