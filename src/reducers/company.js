import {
    POST_COMPANY,
    POST_COMPANY_ERROR,
    POST_COMPANY_SUCCESS,
    GET_COMPANY,
    GET_COMPANY_ERROR,
    GET_COMPANY_SUCCESS 
} from '../actions/actionTypes';
import { statusType } from '../constants';

const initialState = {
    company: null,
    status: null,
    data: []
};

const companies = (state = initialState, action) => {
    switch (action.type) {
        case GET_COMPANY: {
            return {
                ...state,
                company: null,
                status: statusType.loading
            };
        }
        case GET_COMPANY_SUCCESS: {
            return {
                ...state,
                company: action.payload,
                status: statusType.success
            };
        }
        case GET_COMPANY_ERROR: {
            return {
                ...state,
                status: statusType.error
            };
        }
        case POST_COMPANY: {
            return {
                ...state,
                data: null,
                status: statusType.loading
            };
        }
        case POST_COMPANY_SUCCESS: {
            return {
                ...state,
                data: action.payload,
                status: statusType.success
            };
        }
        case POST_COMPANY_ERROR: {
            return {
                ...state,
                status: statusType.error
            };
        }
        default:
            return state;
    }
};

export default companies;
