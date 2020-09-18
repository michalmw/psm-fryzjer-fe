
import { object, number } from 'prop-types';
import { getConfig, methods, urls, urlTypes, getTypes, getActionCreator } from ".";
import http from "../http-commons";

export const getClients= () => getActionCreator({url: urls.clients, type: urlTypes.clients});
export const getClient = ({id}) => getActionCreator({url: `${urls.clients}/${id}`, type: urlTypes.client});

const addAvatar = ({id, data}) => {
    const types = getTypes({baseType: urlTypes.clientAvatar, method: methods.post})

    return function(dispatch) {
      dispatch({type: types.base});
      let formData = new FormData();

      formData.append("avatar", data);
      return http.post(`${urls.clients}/${id}/upload-avatar`,  formData)
    }
}

const addRodo = ({id, data}) => {
  const types = getTypes({baseType: urlTypes.clientRodo, method: methods.post})

  return function(dispatch) {
    dispatch({type: types.base});
    let formData = new FormData();

    formData.append("rodo", data);
    return http.post(`${urls.clients}/${id}/upload-rodo`,  formData)
  }
}

export const addClient = ({data, avatar, rodo}) => {
    const types = getTypes({baseType: urlTypes.client, method: methods.post})
    const config = getConfig({method: methods.post, data})
  
    return function(dispatch) {
      dispatch({type: types.base});
      fetch(urls.clients, config)
          .then(response => response.json())
          .then(data => {
              if (data.error || data.message) {
                return dispatch({type: types.error})
              }
              if (avatar && typeof avatar !== 'string' && data._id) {
                  dispatch(addAvatar({id: data._id, data: avatar}));
              }
              if (rodo && typeof rodo !== 'string' && data._id) {
                  dispatch(addRodo({id: data._id, data: rodo}));
              }
              return dispatch({type: types.success})
            })
          .catch(error => dispatch({
                type: types.error,
                payload: error
              })
          );
    }
};

addClient.propTypes = {
    data: object.isRequired
};

export const updateClient = ({id, data, avatar, rodo}) => {
    const types = getTypes({baseType: urlTypes.client, method: methods.put})
    const config = getConfig({method: methods.put, data})
    
    return function(dispatch) {
      dispatch({type: types.base});
      fetch(`${urls.clients}/${id}`, config)
          .then(response => response.json())
          .then(data => {
              if (data.error || data.message) {
                return dispatch({type: types.error})
              }
              if (avatar && typeof avatar !== 'string' && data._id) {
                  dispatch(addAvatar({id: data._id, data: avatar}));
              }
              if (rodo && typeof rodo !== 'string' && data._id) {
                  dispatch(addRodo({id: data._id, data: rodo}));
              }
              dispatch(getClients());
              return dispatch({type: types.success})
            })
          .catch(error => dispatch({
                type: types.error,
                payload: error
              })
          );
    }
};

updateClient.propTypes = {
    id: number.isRequired,
    data: object.isRequired
};

export const deleteClient = ({id}) => {
    const types = getTypes({baseType: urlTypes.clients, method: methods.delete})
    const config = getConfig({method: methods.delete})
    
    return function(dispatch) {
      dispatch({type: types.base});
      fetch(`${urls.products}/${id}`, config)
          .then(response => response.json())
          .then(data => {
              if (data.error || data.message) {
                return dispatch({type: types.error})
              }
              
              dispatch(getClients());
              return dispatch({type: types.success})
            })
          .catch(error => dispatch({
                type: types.error,
                payload: error
              })
          );
    }
};

deleteClient.propTypes = {
    id: number.isRequired
};
