import {gql} from "apollo-boost";
import {api} from "../enviroments/config";
import * as types from './actionTypes';

const urls = {
    users: `${api}users`,
    events: '',
    clients: '',
    companies: ''
};

const getActionCreator = (url, type, errorType, successType) => {
  return function(dispatch) {
    dispatch({type});

    // fetch(url)
    //     .then(response => response.json())
    //     .then(data => dispatch({
    //       type: successType,
    //       payload: data
    //     }))
    //     .catch(error => dispatch({
    //           type: errorType,
    //           payload: error
    //         })
    //     );

};

export const getEvents = () => getActionCreator(urls.users, types.GET_USERS, types.GET_USERS_SUCCESS, types.GET_USERS_ERROR);
