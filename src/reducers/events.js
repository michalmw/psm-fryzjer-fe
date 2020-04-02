import { GET_EVENTS, GET_EVENTS_SUCCESS, GET_EVENTS_ERROR } from '../actions/actionTypes';
import { statusType } from '../constants';

const initialState = {
    data: [],
    status: null
};

const heroes = (state = initialState, action) => {
    switch (action.type) {
        case GET_EVENTS: {
            return {
                ...state,
                data: [],
                status: statusType.loading
            };
        }
        case GET_EVENTS_SUCCESS: {
            return {
                ...state,
                data: action.payload,
                status: statusType.success
            };
        }
        case GET_EVENTS_ERROR: {
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

export default heroes;
