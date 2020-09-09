import React, { Component } from 'react';
import Routes from './Routes/index';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux'
import store from './Redux/index';
import LinearGradient from 'react-native-linear-gradient';
console.disableYellowBox = true;
class App extends Component {
    componentDidMount() {
    }
    render() {
        return (<Provider store={store}>
            <Routes />
        </Provider>
        )
    }
}
export default App;