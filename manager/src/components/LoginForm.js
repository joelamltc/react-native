import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { emailChanged, passwordChanged, loginUser } from '../actions';

class LoginForm extends Component {
    onEmailChange(email) {
        this.props.emailChanged(email);
    }

    onPasswordChange(password) {
        this.props.passwordChanged(password);
    }

    onSignIn() {
        const { email, password } = this.props;

        this.props.loginUser({ email, password });
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner size="large" />;
        }

        return (
            <Button onPress={this.onSignIn.bind(this)}>
                Login
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
                        placeholder="user@email.com"
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </CardSection>
                    
                <CardSection>
                    <Input 
                        secureTextEntry 
                        label="Password"
                        placeholder="password"
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
                    />
                </CardSection>

                <Text style={errorTextStyle}>
                    {this.props.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    const { 
        email, 
        password, 
        error,
        loading
    } = state.authentication;

    return {
        email,
        password,
        error,
        loading
    };
};

const styles = {
    errorTextStyle: {
        fontSize: 20,
        color: 'red',
        alignSelf: 'center'
    }
};

export default connect(mapStateToProps, { 
    emailChanged, 
    passwordChanged, 
    loginUser 
})(LoginForm);
