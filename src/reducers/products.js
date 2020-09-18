import { 
    GET_PRODUCTS, 
    GET_PRODUCTS_SUCCESS, 
    GET_PRODUCTS_ERROR,
    DELETE_PRODUCT,
    DELETE_PRODUCT_ERROR,
    DELETE_PRODUCT_SUCCESS,
    POST_PRODUCT,
    POST_PRODUCT_ERROR,
    POST_PRODUCT_SUCCESS,
    PUT_PRODUCT,
    PUT_PRODUCT_ERROR,
    PUT_PRODUCT_SUCCESS,
    GET_PRODUCT,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_ERROR
} from '../actions/actionTypes';
import { statusType } from '../constants';

const initialState = {
    data: [],
    status: null,
    deleteStatus: null,
    changeStatus: null,
    product: null
};

const services = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS || POST_PRODUCT || PUT_PRODUCT || DELETE_PRODUCT: {
            return {
                ...state,
                data: [],
                status: statusType.loading,
                changeStatus: statusType.loading
            };
        }
        case GET_PRODUCTS_SUCCESS: {
            return {
                ...state,
                data: action.payload,
                status: statusType.success
            };
        }
        case GET_PRODUCTS_ERROR: {
            return {
                ...state,
                data: [],
                status: statusType.error
            };
        }
        case GET_PRODUCT: {
            return {
                ...state,
                product: null,
                status: statusType.loading
            };
        }
        case GET_PRODUCT_SUCCESS: {
            return {
                ...state,
                product: action.payload,
                status: statusType.success
            };
        }
        case GET_PRODUCT_ERROR: {
            return {
                ...state,
                product: null,
                status: statusType.error
            };
        }
        case POST_PRODUCT_SUCCESS: {
            return {
                ...state,
                changeStatus: statusType.success
            };
        }
        case POST_PRODUCT_ERROR: {
            return {
                ...state,
                changeStatus: statusType.error
            };
        }
        case PUT_PRODUCT_SUCCESS: {
            return {
                ...state,
                changeStatus: statusType.success
            };
        }
        case PUT_PRODUCT_ERROR: {
            return {
                ...state,
                changeStatus: statusType.error
            };
        }
        case DELETE_PRODUCT_SUCCESS: {
            return {
                ...state,
                deleteStatus: statusType.success
            };
        }
        case DELETE_PRODUCT_ERROR: {
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
