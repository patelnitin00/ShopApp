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
    marginHorizontal: width(2),
    flexDirection: 'row',
    borderColor: Colors.primaryPink,
    borderWidth: 1,
    borderRadius: width(3),
    backgroundColor: Colors.backgroundWhite,
    marginVertical: height(1),
    width: width(95)
  },
  itemImage: {
    width: width(22),
    height: height(10),
    borderRadius: width(3)
  },
  dataContainer: {
    marginLeft: width(2),
    maxWidth: '72%',
  },
  title: {
    fontWeight: "bold",
    fontSize: width(3.5)
  },
  bulk: {
    fontSize: width(2.3)
  },
  inStock: {
    fontSize: width(3.5)
  },
  quantity: {
    fontSize: width(3.8),
    paddingHorizontal: width(2)
  },
  priceQuantityContainer: {
    width: '100%',
    flexDirection: "row",
    marginTop: height(1),
    justifyContent: "space-between"
  },
  quantityContainer: {
    flexDirection: "row",
    marginHorizontal: width(2)
  }
});
export default styles;
