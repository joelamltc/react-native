import {
    EMPLOYEE_FETCH
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMPLOYEE_FETCH:
            return action.employees;
        default:
            return state;
    }
};
