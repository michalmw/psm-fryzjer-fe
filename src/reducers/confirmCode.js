import {
    CONFIRM_CODE,
    CONFIRM_CODE_ERROR,
    CONFIRM_CODE_SUCCESS 
} from '../actions/actionTypes';
import { statusType } from '../constants';

const initialState = {
    data: [],
    status: null
};

const confirmCode = (state = initialState, action) => {
    switch (action.type) {
        case CONFIRM_CODE: {
            return {
                ...state,
                data: [],
                status: statusType.loading
            };
        }
        case CONFIRM_CODE_SUCCESS: {
            return {
                ...state,
                data: action.payload,
                status: statusType.success
            };
        }
        case CONFIRM_CODE_ERROR: {
            return {
                ...state,
                data: action.payload,
                status: statusType.error
            };
        }
        default:
            return state;
    }
};

export default confirmCode;
