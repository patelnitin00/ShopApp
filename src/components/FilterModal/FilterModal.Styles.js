
import { StyleSheet } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import Colors from '../../utills/Colors'
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.backgroundWhite,
        paddingVertical: height(2),
        paddingHorizontal: width(2),
        borderRadius: width(2)
    },
    head: {
        fontWeight: 'bold',
        fontSize: width(4.5),
    },
    catHead: {
        fontWeight: 'bold',
        fontSize: width(3.8),
    },
    horizontalLine: {
        width: '100%',
        height: 0.5,
        backgroundColor: Colors.black,
        marginBottom: height(1)
    },
    sortRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    picker: {
        width: width(30),
        height: height(8),
    }
});
export default styles;