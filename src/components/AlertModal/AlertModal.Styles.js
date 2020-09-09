
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
        width: wp("70%"),
        alignItems: 'center',
        borderRadius: 5,
        paddingTop: hp('1%'),
        paddingBottom: hp("3%")
    },
    gif: {
        height: hp("8%"),
        marginBottom: hp("2%")
    },

    closeContainer: {
        marginRight: wp("2%"),
        width: wp("70%"),
        alignItems: 'flex-end',
        height: hp("3%")
    },
});
export default styles;