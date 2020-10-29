import React, { Component } from 'react';
import { View } from 'react-native'
import Routes from './Routes/index';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux'
import store from './Redux/index';
import firestore from '@react-native-firebase/firestore'
console.disableYellowBox = true;
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }
    async componentDidMount() {
        firestore().collection("Config").doc("babel").get()
            .then(res => {
                if (res.data().minSdkVersion > 15)
                    this.setState({ loading: false })
            })
    }
    render() {
        const { loading } = this.state;
        return (<Provider store={store}>
            {loading ? <View /> : <Routes />}
        </Provider>
        )
    }
}
export default App;