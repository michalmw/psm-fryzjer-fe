import { 
    GET_INVITATIONS, 
    GET_INVITATIONS_SUCCESS, 
    GET_INVITATIONS_ERROR,
    DELETE_INVITATION,
    DELETE_INVITATION_ERROR,
    DELETE_INVITATION_SUCCESS,
    POST_INVITATION,
    POST_INVITATION_ERROR,
    POST_INVITATION_SUCCESS,
    PUT_INVITATION,
    PUT_INVITATION_ERROR,
    PUT_INVITATION_SUCCESS,
} from '../actions/actionTypes';
import { statusType } from '../constants';

const initialState = {
    data: [],
    status: null,
    deleteStatus: null,
    changeStatus: null,
    invitation: null
};

const invitation = (state = initialState, action) => {
    switch (action.type) {
        case GET_INVITATIONS || POST_INVITATION || PUT_INVITATION || DELETE_INVITATION: {
            return {
                ...state,
                data: [],
                status: statusType.loading,
                changeStatus: statusType.loading
            };
        }
        case GET_INVITATIONS_SUCCESS: {
            return {
                ...state,
                data: action.payload,
                status: statusType.success
            };
        }
        case GET_INVITATIONS_ERROR: {
            return {
                ...state,
                data: [],
                status: statusType.error
            };
        }
        case POST_INVITATION_SUCCESS: {
            return {
                ...state,
                changeStatus: statusType.success
            };
        }
        case POST_INVITATION_ERROR: {
            return {
                ...state,
                changeStatus: statusType.error
            };
        }
        case PUT_INVITATION_SUCCESS: {
            return {
                ...state,
                changeStatus: statusType.success
            };
        }
        case PUT_INVITATION_ERROR: {
            return {
                ...state,
                changeStatus: statusType.error
            };
        }
        case DELETE_INVITATION_SUCCESS: {
            return {
                ...state,
                deleteStatus: statusType.success
            };
        }
        case DELETE_INVITATION_ERROR: {
            return {
                ...state,
                deleteStatus: statusType.error
            };
        }
        default:
            return state;
    }
};

export default invitation;
