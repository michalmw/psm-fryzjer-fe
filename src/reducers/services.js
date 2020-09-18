import { 
    GET_SERVICES, 
    GET_SERVICES_SUCCESS, 
    GET_SERVICES_ERROR,
    DELETE_SERVICE,
    DELETE_SERVICE_ERROR,
    DELETE_SERVICE_SUCCESS,
    POST_SERVICE,
    POST_SERVICE_ERROR,
    POST_SERVICE_SUCCESS,
    PUT_SERVICE,
    PUT_SERVICE_ERROR,
    PUT_SERVICE_SUCCESS,
    GET_SERVICE,
    GET_SERVICE_SUCCESS,
    GET_SERVICE_ERROR
} from '../actions/actionTypes';
import { statusType } from '../constants';

const initialState = {
    data: [],
    status: null,
    deleteStatus: null,
    changeStatus: null,
    service: null
};

const services = (state = initialState, action) => {
    switch (action.type) {
        case GET_SERVICES || POST_SERVICE || PUT_SERVICE || DELETE_SERVICE: {
            return {
                ...state,
                data: [],
                status: statusType.loading,
                changeStatus: statusType.loading
            };
        }
        case GET_SERVICES_SUCCESS: {
            return {
                ...state,
                data: action.payload,
                status: statusType.success
            };
        }
        case GET_SERVICES_ERROR: {
            return {
                ...state,
                data: [],
                status: statusType.error
            };
        }
        case GET_SERVICE: {
            return {
                ...state,
                service: null,
                status: statusType.loading
            };
        }
        case GET_SERVICE_SUCCESS: {
            return {
                ...state,
                service: action.payload,
                status: statusType.success
            };
        }
        case GET_SERVICE_ERROR: {
            return {
                ...state,
                service: null,
                status: statusType.error
            };
        }
        case POST_SERVICE_SUCCESS: {
            return {
                ...state,
                changeStatus: statusType.success
            };
        }
        case POST_SERVICE_ERROR: {
            return {
                ...state,
                changeStatus: statusType.error
            };
        }
        case PUT_SERVICE_SUCCESS: {
            return {
                ...state,
                changeStatus: statusType.success
            };
        }
        case PUT_SERVICE_ERROR: {
            return {
                ...state,
                changeStatus: statusType.error
            };
        }
        case DELETE_SERVICE_SUCCESS: {
            return {
                ...state,
                deleteStatus: statusType.success
            };
        }
        case DELETE_SERVICE_ERROR: {
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
