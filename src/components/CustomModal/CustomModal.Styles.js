
import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    mainContainer: {
        alignSelf: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#ffffff',
        width: "70%",
        alignItems: 'center',
        borderRadius: 5,
        paddingVertical: hp('3%')
    },
    gif: {
        marginBottom: hp('2%')
    }
});
export default styles;