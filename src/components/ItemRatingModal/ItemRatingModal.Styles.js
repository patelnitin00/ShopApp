
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
        fontSize: width(4),
        textAlign: 'center',
        maxWidth: '70%',
        alignSelf: 'center'
    },
    image: {
        width: width(60),
        height: height(20),
        borderRadius: width(5),
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    dataHead: {
        fontWeight: 'bold',
        fontSize: width(4.5),
        alignSelf: 'center',
        color: Colors.primaryYellow,
        marginVertical: height(2)
    },
});
export default styles;