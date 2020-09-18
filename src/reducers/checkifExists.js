import { 
    CHECK_IF_EXIST, 
    CHECK_IF_EXIST_SUCCESS, 
    CHECK_IF_EXIST_ERROR
} from '../actions/actionTypes';
import { statusType } from '../constants';

const initialState = {
    data: [],
    status: null
};

const checkIfExist = (state = initialState, action) => {
    switch (action.type) {
        case CHECK_IF_EXIST: {
            return {
                ...state,
                data: [],
                status: statusType.loading
            };
        }
        case CHECK_IF_EXIST_SUCCESS: {
            return {
                ...state,
                data: action.payload,
                status: statusType.success
            };
        }
        case CHECK_IF_EXIST_ERROR: {
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

export default checkIfExist;
