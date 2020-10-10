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
  listEmptyContainer: {
    marginTop: height(5)
  },
  emptyText: {
    fontSize: width(4),
    fontWeight: 'bold'
  },
  flatList: {
    marginTop: height(2),
  },
  buttonContainer: {
    marginTop: 0
  },
  itemMainContainer: {
    width: width(90),
    paddingVertical: height(1),
    paddingHorizontal: width(3),
    backgroundColor: Colors.backgroundWhite,
    borderRadius: width(3),
    marginTop: height(2),
    borderWidth: 1,
    borderColor: Colors.primaryYellow
  },
  headingText: {
    fontSize: width(4),
    fontWeight: 'bold',
    color: Colors.black,
    marginLeft: width(3),
  },
  row: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height(1),
    justifyContent: 'space-between'
  },
  labelText: {
    marginLeft: width(4),
    fontSize: width(3.2),
    width: '40%',
  },
  valueText: {
    fontWeight: 'bold',
    marginLeft: width(10),
    fontSize: width(3.2),
    width: '70%'
  },
  productContainer: {
    flexDirection: 'row',
    width: '95%',
    marginTop: width(1),
    alignItems: 'flex-start'
  },
  productImage: {
    width: width(15),
    height: width(15),
    borderColor: Colors.primaryPink,
    borderWidth: 1,
    borderRadius: width(2)
  }
});
export default styles;
