import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { text } from 'react-native-communications';
import EmployeeForm from './EmployeeForm';
import { 
    employeeModification, 
    employeeSave, 
    employeeDelete 
} from '../actions';
import { Card, CardSection, Button, Confirm } from './common';

class EmployeeEdit extends Component {
    state = {
        showModal: false
    };

    componentWillMount() {
        _.each(this.props.employee, (value, prop) => {
            this.props.employeeModification({
                prop,
                value
            });
        });
    }

    onSave() {
        const {
            name,
            phone, 
            shift
        } = this.props;

        const { key } = this.props.employee;

        this.props.employeeSave({ name, phone, shift, key });
    }

    onText() {
        const {
            phone, 
            shift
        } = this.props;

        text(phone, `Your upcoming shift is on ${shift}`);
    }

    onFire() {
        this.setState({
            showModal: !this.state.showModal
        });
    }

    onAccept() {
        const { key } = this.props.employee;

        this.props.employeeDelete({ key });
        this.dismissModal();
    }

    onDecline() {
        this.dismissModal();
    }

    dismissModal() {
        this.setState({
            showModal: false
        });
    }

    render() {
        return (
            <Card>
                <EmployeeForm />

                <CardSection>
                    <Button onPress={this.onSave.bind(this)}>
                        Save Changes
                    </Button>
                </CardSection>

                <CardSection>
                    <Button onPress={this.onText.bind(this)}>
                        Text Schedule
                    </Button>
                </CardSection>

                <CardSection>
                    <Button onPress={this.onFire.bind(this)}>
                        Fire Employee
                    </Button>
                </CardSection>

                <Confirm 
                    visible={this.state.showModal}
                    onAccept={this.onAccept.bind(this)}
                    onDecline={this.onDecline.bind(this)}
                >
                    Are you sure to fire this employee?
                </Confirm>
            </Card>
        );
    }
}

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

export default connect(mapStateToProps, { 
    employeeModification,
    employeeSave,
    employeeDelete 
})(EmployeeEdit);
