
import PropTypes, { object, number } from 'prop-types';
import { history as historyPropTypes } from 'history-prop-types';
import { getConfig, methods, urls, urlTypes } from ".";
import { getActionCreator, getTypes } from '.';
import http from "../http-commons";

export const getUsers = () => getActionCreator({url: urls.users, type: urlTypes.users});
export const getUser = ({id}) => getActionCreator({url: `${urls.users}/getById/${id}`, type: urlTypes.user});
export const getMe = () => getActionCreator({url: `${urls.users}/me`, type: urlTypes.me});

const addAvatar = ({ data }) => {
  const types = getTypes({baseType: urlTypes.userAvatar, method: methods.post})

  return function(dispatch) {
    dispatch({type: types.base});
    let formData = new FormData();

    formData.append("avatar", data);
    return http.post(`${urls.users}/upload-avatar`,  formData).then(() => dispatch(getMe()));
  }
}

export const addUser = ({data}) => {
    const types = getTypes({baseType: urlTypes.user})
    const config = getConfig({method: methods.post, data})
    
    return function(dispatch) {
      dispatch({type: types.base});
      fetch(urls.users, config)
          .then(response => response.json())
          .then(data => {
              localStorage.setItem('activationCode', data.activationCode);
              return dispatch({type: types.success})
            })
          .catch(error => dispatch({
                type: types.error,
                payload: error
              })
          );
    }
};

addUser.propTypes = {
    history: PropTypes.shape(historyPropTypes).isRequired,
    data: object.isRequired
};

export const updateUser = ({data, avatar}) => {
    const types = getTypes({baseType: urlTypes.user, method: methods.put})
    const config = getConfig({method: methods.put, data})
    
    return function(dispatch) {
      dispatch({type: types.base});
      fetch(`${urls.users}/me`, config)
          .then(response => response.json())
          .then(data => {
            console.log('yeah', avatar, data._id)
            if (avatar && typeof avatar !== 'string') {
                dispatch(addAvatar({ data: avatar }));
            }
              dispatch(getUsers());
              return dispatch({type: types.success})
            })
          .catch(error => dispatch({
                type: types.error,
                payload: error
              })
          );
    }
};

updateUser.propTypes = {
    id: number.isRequired,
    data: object.isRequired
};

export const deleteUser = ({id}) => {
    const types = getTypes({baseType: urlTypes.user})
    const config = getConfig({method: methods.delete})
    
    return function(dispatch) {
      dispatch({type: types.base});
      fetch(`${urls.users}/${id}`, config)
          .then(response => response.json())
          .then(() => {
              getUsers();
              return dispatch({type: types.success})
            })
          .catch(error => dispatch({
                type: types.error,
                payload: error
              })
          );
    }
};

deleteUser.propTypes = {
    id: number.isRequired
};
