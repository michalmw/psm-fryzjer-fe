import { 
    LOGIN,
    LOGIN_ERROR,
    LOGIN_SUCCESS
} from '../actions/actionTypes';
import { statusType } from '../constants';

const initialState = {
    data: [],
    status: null
};

const login = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                data: [],
                status: statusType.loading
            };
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                data: action.payload,
                status: statusType.success
            };
        }
        case LOGIN_ERROR: {
            return {
                ...state,
                data: [],
                status: statusType.error
            };
        }
        default:
            return state;
    }
};

export default login;
