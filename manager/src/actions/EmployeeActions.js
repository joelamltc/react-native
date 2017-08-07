import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
    EMPLOYEE_MODIFICATION,
    EMPLOYEE_CREATE,
    EMPLOYEE_FETCH,
    EMPLOYEE_SAVE_SUCCESS,
    EMPLOYEE_FIRE
} from './types';

export const employeeModification = ({ prop, value }) => {
    return {
        type: EMPLOYEE_MODIFICATION,
        payload: { 
            prop, 
            value 
        }
    };
};

export const cleanForm = () => {
    return (dispatch) => dispatch({ type: EMPLOYEE_CREATE });
};

export const employeeCreate = ({ name, phone, shift }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees`)
        .push({ name, phone, shift })
        .then(() => {
            dispatch({ type: EMPLOYEE_CREATE });
            Actions.pop();
        });
    };
};

export const employeesFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees`)
        .on('value', (snapshot) => {
            dispatch({
                type: EMPLOYEE_FETCH,
                employees: snapshot.val()
            });
        });
    };
};

export const employeeSave = ({ name, phone, shift, key }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees/${key}`)
        .set({ name, phone, shift })
        .then(() => {
            dispatch({ type: EMPLOYEE_SAVE_SUCCESS });
            Actions.pop();
        });
    };
};

export const employeeDelete = ({ key }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees/${key}`)
        .remove()
        .then(() => {
            dispatch({ type: EMPLOYEE_FIRE });
            Actions.pop();
        });
    };
};
