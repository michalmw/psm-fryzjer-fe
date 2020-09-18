import { 
    GET_CLIENTS, 
    GET_CLIENTS_SUCCESS, 
    GET_CLIENTS_ERROR,
    DELETE_CLIENT,
    DELETE_CLIENT_ERROR,
    DELETE_CLIENT_SUCCESS,
    POST_CLIENT,
    POST_CLIENT_ERROR,
    POST_CLIENT_SUCCESS,
    PUT_CLIENT,
    PUT_CLIENT_ERROR,
    PUT_CLIENT_SUCCESS,
    GET_CLIENT,
    GET_CLIENT_SUCCESS,
    GET_CLIENT_ERROR
} from '../actions/actionTypes';
import { statusType } from '../constants';

const initialState = {
    data: [],
    status: null,
    deleteStatus: null,
    changeStatus: null,
    client: null
};

const services = (state = initialState, action) => {
    switch (action.type) {
        case GET_CLIENTS || POST_CLIENT || PUT_CLIENT || DELETE_CLIENT: {
            return {
                ...state,
                data: [],
                status: statusType.loading,
                changeStatus: statusType.loading
            };
        }
        case GET_CLIENTS_SUCCESS: {
            return {
                ...state,
                data: action.payload,
                status: statusType.success
            };
        }
        case GET_CLIENTS_ERROR: {
            return {
                ...state,
                data: [],
                status: statusType.error
            };
        }
        case GET_CLIENT: {
            return {
                ...state,
                client: null,
                status: statusType.loading
            };
        }
        case GET_CLIENT_SUCCESS: {
            return {
                ...state,
                client: action.payload,
                status: statusType.success
            };
        }
        case GET_CLIENT_ERROR: {
            return {
                ...state,
                client: null,
                status: statusType.error
            };
        }
        case POST_CLIENT_SUCCESS: {
            return {
                ...state,
                changeStatus: statusType.success
            };
        }
        case POST_CLIENT_ERROR: {
            return {
                ...state,
                changeStatus: statusType.error
            };
        }
        case PUT_CLIENT_SUCCESS: {
            return {
                ...state,
                changeStatus: statusType.success
            };
        }
        case PUT_CLIENT_ERROR: {
            return {
                ...state,
                changeStatus: statusType.error
            };
        }
        case DELETE_CLIENT_SUCCESS: {
            return {
                ...state,
                deleteStatus: statusType.success
            };
        }
        case DELETE_CLIENT_ERROR: {
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
