import { 
    GET_VISITS, 
    GET_VISITS_SUCCESS, 
    GET_VISITS_ERROR,
    DELETE_VISIT,
    DELETE_VISIT_ERROR,
    DELETE_VISIT_SUCCESS,
    POST_VISIT,
    POST_VISIT_ERROR,
    POST_VISIT_SUCCESS,
    PUT_VISIT,
    PUT_VISIT_ERROR,
    PUT_VISIT_SUCCESS,
    GET_VISIT,
    GET_VISIT_SUCCESS,
    GET_VISIT_ERROR
} from '../actions/actionTypes';
import { statusType } from '../constants';

const initialState = {
    data: [],
    status: null,
    deleteStatus: null,
    changeStatus: null,
    visit: null
};

const services = (state = initialState, action) => {
    switch (action.type) {
        case GET_VISITS || POST_VISIT || PUT_VISIT || DELETE_VISIT: {
            return {
                ...state,
                data: [],
                status: statusType.loading,
                changeStatus: statusType.loading
            };
        }
        case GET_VISITS_SUCCESS: {
            return {
                ...state,
                data: action.payload,
                status: statusType.success
            };
        }
        case GET_VISITS_ERROR: {
            return {
                ...state,
                data: [],
                status: statusType.error
            };
        }
        case GET_VISIT: {
            return {
                ...state,
                visit: null,
                status: statusType.loading
            };
        }
        case GET_VISIT_SUCCESS: {
            return {
                ...state,
                visit: action.payload,
                status: statusType.success
            };
        }
        case GET_VISIT_ERROR: {
            return {
                ...state,
                visit: null,
                status: statusType.error
            };
        }
        case POST_VISIT_SUCCESS: {
            return {
                ...state,
                changeStatus: statusType.success
            };
        }
        case POST_VISIT_ERROR: {
            return {
                ...state,
                changeStatus: statusType.error
            };
        }
        case PUT_VISIT_SUCCESS: {
            return {
                ...state,
                changeStatus: statusType.success
            };
        }
        case PUT_VISIT_ERROR: {
            return {
                ...state,
                changeStatus: statusType.error
            };
        }
        case DELETE_VISIT_SUCCESS: {
            return {
                ...state,
                deleteStatus: statusType.success
            };
        }
        case DELETE_VISIT_ERROR: {
            return {
                ...state,
                deleteStatus: statusType.error
            };
        }
        default:
            return state;
    }
};

export default services;
