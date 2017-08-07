import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';

const RouterComponent = () => {
    return (
        <Router>
            <Scene hideNavBar key="root" tabs={false}>
                <Scene key="authentication">
                    <Scene key="login" component={LoginForm} title="Login" />
                </Scene>

                <Scene key="main">
                    <Scene 
                        initial 
                        key="employeeList" 
                        component={EmployeeList} 
                        title="Employees" 
                        rightTitle="+"
                        onRight={() => Actions.employeeCreate()}
                    />
                    <Scene 
                        key="employeeCreate" 
                        component={EmployeeCreate} 
                        title="Create Employee" 
                    />
                    <Scene 
                        key="employeeEdit" 
                        component={EmployeeEdit} 
                        title="Edit Employee"
                    />
                </Scene>
            </Scene>
        </Router>
    );
};

export default RouterComponent;
