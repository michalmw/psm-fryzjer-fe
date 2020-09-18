import { string, object } from 'prop-types';
import { api } from "../enviroments/config";

export const methods = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  delete: 'DELETE'
}

export const methodStatus= {
  success: 'SUCCESS',
  error: 'ERROR'
}

export const urlTypes = {
  clientRodo: 'client_rodo',
  clientAvatar: 'client_avatar',
  userAvatar: 'user_avatar',
  me: 'ME',
  services: 'services',
  service: 'service',
  products: 'products',
  product: 'product',
  companies: 'companies',
  company: 'company',
  invitations: 'invitations',
  invitation: 'invitation',
  users: 'users',
  user: 'user',
  clients: 'clients',
  client: 'client',
  categories: 'categories',
  category: 'category',
  visits: 'visists',
  visit: 'visit',
  login: 'login',
  confirmCode: 'confirm_code',
  checkIfExist: 'check_if_exist',
  confirmAccount: 'confirm_account'
}

export const urls = {
    users: `${api}/${urlTypes.users}`,
    login: `${api}/${urlTypes.users}/${urlTypes.login}`,
    checkIfExist: `${api}/${urlTypes.users}/userExist`,
    confirmCode: `${api}/${urlTypes.users}/confirmCode`,
    confirmAccount: `${api}/${urlTypes.users}/confirmAccount`,
    invitations: `${api}/${urlTypes.invitations}/my`,
    services: `${api}/${urlTypes.services}`,
    categories: `${api}/servicesCategory`,
    visits: `${api}/${urlTypes.visits}`,
    products: `${api}/${urlTypes.products}`,
    clients: `${api}/${urlTypes.clients}`,
    companies: `${api}/${urlTypes.company}`
};

export const getTypes = ({baseType, method}) => {
  const type = `${method ? method + '_' : ''}${baseType.toUpperCase()}`;
  return {
      success: `${type}_${methodStatus.success}`,
      error: `${type}_${methodStatus.error}`,
      base: type
  }
}

getTypes.propTypes = {
  baseType: string.isRequired,
  method: string
};

export const getConfig = ({data, method}) => {
  return  { 
    method: method || methods.get, body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.token,
    }
  };
}

export const fileConfig = ({body}) => {
  console.log(body)
  return  { 
    method: methods.post, body,
    headers: {
      'Authorization': 'Bearer ' + localStorage.token,
    }
  };
}

getConfig.propTypes = {
  data: object,
  method: string
};

getConfig.defaultProps = {
  method: methods.get,
  data: null
};


export const getActionCreator = ({url, type}) => {
  const selectedType = type?.toUpperCase();
  const baseType = `${methods.get}_${selectedType}`
  const config = getConfig({});
  const types = {
    success: `${baseType}_SUCCESS`,
    error: `${baseType}_ERROR`,
    base: baseType
  }

  return function(dispatch) {
    dispatch({type: types.base});
    fetch(url, config)
        .then(response => response.json())
        .then(data => dispatch({
          type: types.success,
          payload: data
        }))
        .catch(error => dispatch({
              type: types.error,
              payload: error
            })
        );
  }
};

getActionCreator.propTypes = {
  url: string.isRequired,
  type: string.isRequired
};
