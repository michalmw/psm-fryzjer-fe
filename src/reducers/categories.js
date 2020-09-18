import { 
    GET_CATEGORIES, 
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_ERROR,
    POST_CATEGORY,
    POST_CATEGORY_ERROR,
    POST_CATEGORY_SUCCESS,
    PUT_CATEGORY,
    PUT_CATEGORY_ERROR,
    PUT_CATEGORY_SUCCESS,
    DELETE_CATEGORY,
    DELETE_CATEGORY_ERROR,
    DELETE_CATEGORY_SUCCESS
} from '../actions/actionTypes';
import { statusType } from '../constants';

const initialState = {
    data: [],
    status: null,
    addingStatus: null,
    deleteStatus: null,
    updateStatus: null
};

const categories = (state = initialState, action) => {
    console.log(action.type)
    switch (action.type) {
        case GET_CATEGORIES || PUT_CATEGORY || DELETE_CATEGORY: {
            return {
                ...state,
                data: [],
                status: statusType.loading
            };
        }
        case GET_CATEGORIES_SUCCESS: {
            return {
                ...state,
                data: action.payload,
                status: statusType.success
            };
        }
        case GET_CATEGORIES_ERROR: {
            return {
                ...state,
                data: [],
                status: statusType.error
            };
        }
        case POST_CATEGORY: {
            return {
                ...state,
                addingStatus: statusType.loading
            };
        }
        case POST_CATEGORY_SUCCESS: {

            return {
                ...state,
                addingStatus: statusType.success
            };
        }
        case POST_CATEGORY_ERROR: {
            return {
                ...state,
                addingStatus: statusType.error
            };
        }
        case PUT_CATEGORY_SUCCESS: {
            return {
                ...state,
                updateStatus: statusType.success
            };
        }
        case PUT_CATEGORY_ERROR: {
            return {
                ...state,
                updateStatus: statusType.error
            };
        }
        case DELETE_CATEGORY_SUCCESS: {
            return {
                ...state,
                deleteStatus: statusType.success,
            };
        }
        case DELETE_CATEGORY_ERROR: {
            return {
                ...state,
                deleteStatus: statusType.error
            };
        }
        default:
            return state;
    }
};

export default categories;
