import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from '../screens/Login/Login.screen';
import VerifyOtp from '../screens/VerifyOtp/VerifyOtp.screen';
import Signup from '../screens/Signup/Signup.screen';
import Dashboard from '../screens/Dashboard/Dashboard.screen';
import Colors from '../utills/Colors'
import { connect } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather'
import CustomDrawer from './CustomDrawer';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
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
                    <Drawer.Navigator initialRouteName="App"
                        drawerType={"slide"}
                        drawerContent={(props) => <CustomDrawer {...props} />}
                        overlayColor={'transparent'}
                        // drawerStyle={{ height: '80%' }}
                        drawerContentOptions={{
                            activeTintColor: Colors.primaryPink
                        }
                        }>
                        <Drawer.Screen name="Dashboard" component={Dashboard}
                            options={{
                                drawerIcon: (({ focused, color, size }) => (<Feather name="home" color={color} size={size} />))
                            }}
                        />
                    </Drawer.Navigator>
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