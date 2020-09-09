import { StyleSheet } from 'react-native';
import Colors from '../../utills/Colors';
import { width, height, totalSize } from 'react-native-dimension';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width(1),
    backgroundColor: Colors.primaryPink,
    width: width(70),
    alignSelf: 'center',
    paddingVertical: height(1.7),
    elevation: 7,
    borderColor: Colors.primaryPink,
    marginVertical: height(1.5),
    marginHorizontal: 6,
    shadowOffset: { width: width(2), height: height(0.7) },
    shadowColor: Colors.primaryPink,
    shadowOpacity: 0.25,
    shadowRadius: width(2)
  },
  text: {
    color: "white",
    fontSize: width(4),
  }
});
export default styles;
