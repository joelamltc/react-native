import { 
    EMPLOYEE_MODIFICATION,
    EMPLOYEE_CREATE,
    EMPLOYEE_SAVE_SUCCESS,
    EMPLOYEE_FIRE
} from '../actions/types';

const INITIAL_STATE = {
    name: '',
    phone: '',
    shift: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMPLOYEE_MODIFICATION:
            return {
                ...state,
                [action.payload.prop]: action.payload.value
            };
        case EMPLOYEE_CREATE:
        case EMPLOYEE_SAVE_SUCCESS:
        case EMPLOYEE_FIRE:
            return INITIAL_STATE;
        default:
            return state;
    }
};
