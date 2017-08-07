import React, { Component } from 'react';
import { connect } from 'react-redux';
import { employeeModification, employeeCreate, cleanForm } from '../actions';
import { Card, CardSection, Button } from './common';
import EmployeeForm from './EmployeeForm';

class EmployeeCreate extends Component {
    componentWillMount() {
        this.props.cleanForm();
    }

    onCreate() {
        const {
            name,
            phone,
            shift
        } = this.props;

        this.props.employeeCreate({
            name,
            phone,
            shift: shift || 'Monday'
        });
    }

    render() {
        return (
            <Card>
                <EmployeeForm {...this.props} />
                <CardSection>
                    <Button onPress={this.onCreate.bind(this)}>
                        Create
                    </Button>
                </CardSection>
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
    employeeCreate,
    cleanForm  
})(EmployeeCreate);
