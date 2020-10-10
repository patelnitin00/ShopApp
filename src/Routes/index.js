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
import AntDesign from 'react-native-vector-icons/AntDesign'
import CustomDrawer from './CustomDrawer';
import MyCartScreen from '../screens/MyCart/MyCart.screen';
import MyWishlist from '../screens/MyWishlist/MyWishlist.screen';
import Checkout from '../screens/Checkout/Checkout.screen';
import Profile from '../screens/Profile/Profile.screen';
import MyOrders from '../screens/MyOrders/MyOrders.screen';
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
                        <Drawer.Screen name="Home" component={Dashboard}
                            options={{
                                drawerIcon: (({ focused, color, size }) => (<Feather name="home" color={color} size={size} />))
                            }}
                        />
                        <Drawer.Screen name="My Cart"
                            options={{
                                drawerIcon: (({ focused, color, size }) => (<AntDesign name="shoppingcart" color={color} size={size} />))
                            }}
                        >
                            {() => (
                                <Stack.Navigator initialRouteName="My Cart" headerMode="none">
                                    <Stack.Screen name="My Cart" component={MyCartScreen} />
                                    <Stack.Screen name="Checkout" component={Checkout} />
                                </Stack.Navigator>)}
                        </Drawer.Screen>
                        <Drawer.Screen name="My Wishlist" component={MyWishlist}
                            options={{
                                drawerIcon: (({ focused, color, size }) => (<Feather name="heart" color={color} size={size} />))
                            }}
                        />
                        <Drawer.Screen name="My Orders" component={MyOrders}
                            options={{
                                drawerIcon: (({ focused, color, size }) => (<Feather name="list" color={color} size={size} />))
                            }}
                        />
                        <Drawer.Screen name="Profile" component={Profile}
                            options={{
                                drawerIcon: (({ focused, color, size }) => (<Feather name="user" color={color} size={size} />))
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