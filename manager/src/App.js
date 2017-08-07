import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
    componentWillMount() {
        const config = {
            apiKey: 'AIzaSyCJmDC5x43e_A332hQ_pGzd1fcP8OTAMFU',
            authDomain: 'manager-e38e4.firebaseapp.com',
            databaseURL: 'https://manager-e38e4.firebaseio.com',
            projectId: 'manager-e38e4',
            storageBucket: '',
            messagingSenderId: '887817009891'
        };

        firebase.initializeApp(config);
    }

    render() {
        const store = createStore(
            reducers, 
            {}, 
            applyMiddleware(ReduxThunk)
        );

        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

export default App;
