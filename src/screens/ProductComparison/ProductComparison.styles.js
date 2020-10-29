import { StyleSheet } from 'react-native';
import Colors from '../../utills/Colors';
import { width, height, totalSize } from 'react-native-dimension';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    flexDirection:'row',
  },
  itemContainer:{
    width: width(50),
    paddingTop: height(1),
    borderColor: Colors.black,
    borderRightWidth: 1,
  },
  itemImage:{
    width: width(48),
    height: height(30),
    alignSelf:'center'
  },
  itemName:{
    fontWeight:'bold',
    fontSize:width(4),
    alignSelf:'center',
    paddingHorizontal: width(2),
    marginVertical: height(2),
    lineHeight:width(7)
  },
  row: {
    width: '90%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'space-between'
  },
  text:{
    fontSize:width(4),
    alignSelf:'center',
    paddingHorizontal: width(2),
    marginVertical: height(2)
  },
});
export default styles;
