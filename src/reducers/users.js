import { 
    GET_USERS, 
    GET_USERS_SUCCESS, 
    GET_USERS_ERROR,
    DELETE_USER,
    DELETE_USER_ERROR,
    DELETE_USER_SUCCESS,
    POST_USER,
    POST_USER_ERROR,
    POST_USER_SUCCESS,
    PUT_USER,
    PUT_USER_ERROR,
    PUT_USER_SUCCESS,
    GET_USER,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
    GET_ME,
    GET_ME_ERROR,
    GET_ME_SUCCESS,
    POST_USER_AVATAR,
    POST_USER_AVATAR_SUCCESS,
    POST_USER_AVATAR_ERROR
} from '../actions/actionTypes';
import { statusType } from '../constants';

const initialState = {
    data: [],
    status: null,
    deleteStatus: null,
    user: null,
    me: null
};

const services = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS || POST_USER || PUT_USER || DELETE_USER: {
            return {
                ...state,
                data: [],
                status: statusType.loading
            };
        }
        case GET_USERS_SUCCESS: {
            return {
                ...state,
                data: action.payload,
                status: statusType.success
            };
        }
        case GET_USERS_ERROR: {
            return {
                ...state,
                data: [],
                status: statusType.error
            };
        }
        case GET_ME: {
            return {
                ...state,
                me: null,
                status: statusType.loading
            };
        }
        case GET_ME_SUCCESS: {
            return {
                ...state,
                me: action.payload,
                status: statusType.success
            };
        }
        case GET_ME_ERROR: {
            return {
                ...state,
                status: statusType.error
            };
        }
        case GET_USER: {
            return {
                ...state,
                user: null,
                status: statusType.loading
            };
        }
        case GET_USER_SUCCESS: {
            return {
                ...state,
                user: action.payload,
                status: statusType.success
            };
        }
        case GET_USER_ERROR: {
            return {
                ...state,
                user: null,
                status: statusType.error
            };
        }
        case POST_USER_SUCCESS: {
            return {
                ...state,
                status: statusType.success
            };
        }
        case POST_USER_ERROR: {
            return {
                ...state,
                status: statusType.error
            };
        }
        case PUT_USER_SUCCESS: {
            return {
                ...state,
                status: statusType.success
            };
        }
        case PUT_USER_ERROR: {
            return {
                ...state,
                status: statusType.error
            };
        }
        case DELETE_USER_SUCCESS: {
            return {
                ...state,
                deleteStatus: statusType.success
            };
        }
        case DELETE_USER_ERROR: {
            return {
                ...state,
                deleteStatus: statusType.error
            };
        }
        case POST_USER_AVATAR: {
            return {
                ...state,
                status: statusType.loading,
                me: null
            };
        }
        default:
            return state;
    }
};

export default services;
