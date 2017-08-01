import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ 
    label, 
    value, 
    onChangeText, 
    placeholder, 
    secureTextEntry,
    autoCapitalize,
    autoCorrect
}) => {
    const { 
        inputStyle,
        labelStyle,
        containerStyle
    } = styles;

    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{label}</Text>
            <TextInput 
                style={inputStyle} 
                value={value} 
                onChangeText={onChangeText} 
                autoCorrect={autoCorrect}
                placeholder={placeholder}
                autoCapitalize={autoCapitalize}
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
};

const styles = {
    inputStyle: {
        paddingLeft: 5,
        paddingRight: 5,
        color: '#000',
        fontSize: 18,
        lineHeight: 23,
        flex: 3
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 5,
        flex: 1
    },
    containerStyle: {
        flex: 1,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center'
    }
};

export { Input };
