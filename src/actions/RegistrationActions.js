
import PropTypes, { object } from 'prop-types';
import { history as historyPropTypes } from 'history-prop-types';
import { getConfig, methods, urls, urlTypes, getTypes } from ".";

export const checkIfExist = ({data}) => {
    const types = getTypes({baseType: urlTypes.checkIfExist})
    const config = getConfig({method: methods.post, data})
    
    return function(dispatch) {
      dispatch({type: types.base});
      fetch(urls.checkIfExist, config)
          .then(response => response.json())
          .then((data => {
              console.log(data);
              return dispatch({type: types.success})
            }))
          .catch(error => dispatch({
                type: types.error,
                payload: error
          }))
    }
};

checkIfExist.propTypes = {
    data: object.isRequired
};

export const confirmCode = ({data}) => {
    const types = getTypes({baseType: urlTypes.confirmCode})
    const config = getConfig({method: methods.post, data})
    return function(dispatch) {
      dispatch({type: types.base});
      fetch(urls.confirmCode, config)
          .then(response => response.json())
          .then((data => dispatch({
            type: types.success,
            payload: data
           })))
          .catch(error => dispatch({
                type: types.error,
                payload: error
          }))
    }
};

confirmCode.propTypes = {
    data: object.isRequired
};

export const confirmAccount = ({data}) => {
    const types = getTypes({baseType: urlTypes.confirmAccount})
    const config = getConfig({method: methods.post, data})
    
    return function(dispatch) {
      dispatch({type: types.base});
      fetch(urls.confirmAccount, config)
          .then(response => response.json())
          .then((data => dispatch({
            type: types.success,
            payload: data
           })))
          .catch(error => dispatch({
                type: types.error,
                payload: error
          }))
    }
};

confirmAccount.propTypes = {
    data: object.isRequired
};
