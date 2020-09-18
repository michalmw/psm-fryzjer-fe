import {
    CONFIRM_ACCOUNT_ERROR,
    CONFIRM_ACCOUNT_SUCCESS, 
    CONFIRM_ACCOUNT
} from '../actions/actionTypes';
import { statusType } from '../constants';

const initialState = {
    data: [],
    status: null
};

const confirmAccount = (state = initialState, action) => {
    switch (action.type) {
        case CONFIRM_ACCOUNT: {
            return {
                ...state,
                data: [],
                status: statusType.loading
            };
        }
        case CONFIRM_ACCOUNT_SUCCESS: {
            return {
                ...state,
                data: action.payload,
                status: statusType.success
            };
        }
        case CONFIRM_ACCOUNT_ERROR: {
            return {
                ...state,
                status: statusType.error
            };
        }
        default:
            return state;
    }
};

export default confirmAccount;
