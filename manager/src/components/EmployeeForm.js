import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { employeeModification } from '../actions';
import { CardSection, Input } from './common';

class EmployeeForm extends Component {
    onNameChanged(name) {
        this.props.employeeModification({ 
            prop: 'name', 
            value: name 
        });
    }

    onPhoneChanged(phone) {
        this.props.employeeModification({ 
            prop: 'phone', 
            value: phone 
        });
    }

    onShiftChanged(shift) {
        this.props.employeeModification({ 
            prop: 'shift', 
            value: shift 
        });
    }

    renderShift() {
        const weekdays = [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
        ];

        const shiftDays = weekdays.map((weekday) => 
            <Picker.Item key={weekday} label={weekday} value={weekday} />
        );

        const { pickerStyle } = styles;

        return (
            <Picker 
                style={pickerStyle}
                selectedValue={this.props.shift}
                onValueChange={this.onShiftChanged.bind(this)}
            >
                {shiftDays}
            </Picker>
        );
    }

    render() {
        const { pickerTextStyle } = styles;

        return (
            <View>
                <CardSection>
                    <Input
                        label="Name"
                        placeholder="David Chan"
                        onChangeText={this.onNameChanged.bind(this)}
                        value={this.props.name}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Phone"
                        placeholder="12345678"
                        onChangeText={this.onPhoneChanged.bind(this)}
                        value={this.props.phone}
                    />
                </CardSection>

                <CardSection style={{ borderBottomWidth: 0 }}>
                    <Text style={pickerTextStyle}>Shift</Text>
                </CardSection>

                <CardSection>
                    {this.renderShift()}
                </CardSection>
            </View>
        );
    }
}

const styles = {
    pickerStyle: {
        flex: 1
    },
    pickerTextStyle: {
        fontSize: 18,
        paddingLeft: 5,
        paddingTop: 5
    }
};

const mapStateToProps = (state) => {
    const { 
        name, 
        phone, 
        shift 
    } = state.employeeForm;

    return { 
        name, 
        phone, 
        shift 
    };
};

export default connect(mapStateToProps, { employeeModification })(EmployeeForm);
