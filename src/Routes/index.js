import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login/Login.screen';
import VerifyOtp from '../screens/VerifyOtp/VerifyOtp.screen';
import Signup from '../screens/Signup/Signup.screen';
import Dashboard from '../screens/Dashboard/Dashboard.screen';
import { connect } from 'react-redux';
const Stack = createStackNavigator();
class Routes extends Component {
    render() {
        return (
            <NavigationContainer>
                {!this.props.isLogin ?
                    <Stack.Navigator initialRouteName="Login" headerMode="none">
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
                        <Stack.Screen name="Signup" component={Signup} />
                    </Stack.Navigator>
                    :
                    <Stack.Navigator initialRouteName="Dashboard" headerMode="none">
                        <Stack.Screen name="Dashboard" component={Dashboard} />
                    </Stack.Navigator>
                }
            </NavigationContainer>
        )
    }
}
function mapStatetoProps(state) {
    return {
        user: state.Auth.user,
        isLogin: state.Auth.isLogin,
    }
}
export default connect(mapStatetoProps)(Routes);