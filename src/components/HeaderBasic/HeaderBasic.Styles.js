import { StyleSheet } from 'react-native';
import Colors from '../../utills/Colors';
import { width, height, totalSize } from 'react-native-dimension';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.primaryPink,
    width: width(100),
    height: height(8),
    paddingHorizontal: width(3)
  },
  headText: {
    color: Colors.backgroundWhite,
    fontSize: width(5),
    letterSpacing: width(0.7)
  }
});
export default styles;
