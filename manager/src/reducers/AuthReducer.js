import { 
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_USER
} from '../actions/types';

const INITIAL_STATE = {
    email: '',
    password: '',
    user: null,
    error: '',
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
            return {
                ...state,
                email: action.email
            };
        case PASSWORD_CHANGED:
            return {
                ...state,
                password: action.password
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...INITIAL_STATE,
                user: action.user
            };
        case LOGIN_FAIL:
            return {
                ...state,
                error: 'Authentication Failed.',
                password: '',
                loading: false
            };
        case LOGIN_USER:
            return {
                ...state,
                loading: true,
                error: ''
            };
        default: 
            return state;
    }
};
