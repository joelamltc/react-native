import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
    state = {
        loggedIn: null
    };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyAmtQXl87h5KCUXOHj_KUfCCSQ8PAce-qc',
            authDomain: 'auth-2b95c.firebaseapp.com',
            databaseURL: 'https://auth-2b95c.firebaseio.com',
            projectId: 'auth-2b95c',
            storageBucket: 'auth-2b95c.appspot.com',
            messagingSenderId: '694818588640'
        });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    loggedIn: true
                });
            }
            else {
                this.setState({
                    loggedIn: false
                });
            }
        });
    }

    onSignOut() {
        firebase.auth().signOut();
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <CardSection>
                        <Button onPress={this.onSignOut.bind(this)}>Log Out</Button>
                    </CardSection>
                );

            case false:
                return <LoginForm />;

            default:
                return (
                    <CardSection>
                        <Spinner size="large" />
                    </CardSection>
                );
        }
    }

    render() {
        return (
            <View>
                <Header text="Authentication" />
                {this.renderContent()}
            </View>
        );      
    }
}

export default App;
