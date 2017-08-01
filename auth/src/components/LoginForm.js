import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
    state = {
        email: '',
        password: '',
        error: '',
        loadding: false
    };

    onButtonPress() {
        const { email, password } = this.state;

        this.setState({ 
            error: '',
            loadding: true
        });

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            this.onLoginSuccess();
        })
        .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                this.onLoginSuccess();
            })
            .catch(() => {
                this.onLoginFail();
            });
        });
    }

    onLoginSuccess() {
        this.setState({ 
            email: '',
            password: '',
            loadding: false
        });
    }

    onLoginFail() {
        this.setState({ 
            error: 'Authentication Failed.',
            loadding: false
        });
    }

    renderButton() {
        if (this.state.loadding) {
            return (
                <Spinner size="small" />
            );
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Log in
            </Button>
        );
    }

    render() {
        const { errorTextStyle } = styles;

        return (
            <Card>
                <CardSection>
                    <Input 
                        label="Email"
                        value={this.state.email} 
                        onChangeText={(email) => this.setState({ email })} 
                        placeholder="user@mail.com" 
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </CardSection>

                <CardSection>
                    <Input 
                        secureTextEntry
                        label="Password"
                        value={this.state.password} 
                        onChangeText={(password) => this.setState({ password })} 
                        placeholder="Password" 
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </CardSection>

                <Text style={errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

export default LoginForm;
