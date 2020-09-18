
import PropTypes, { object } from 'prop-types';
import { history as historyPropTypes } from 'history-prop-types';
import { getConfig, methods, urls, urlTypes, getTypes } from ".";
import { url } from '../constants';

export const login = ({data, history}) => {
    const types = getTypes({baseType: urlTypes.login})
    const config = getConfig({method: methods.post, data})
    
    return function(dispatch) {
      dispatch({type: types.base});
      fetch(urls.login, config)
          .then(response => response.json())
          .then((data => {
            if (data.error) {
              return dispatch({type: types.error})
            }
              localStorage.setItem('token', data.access_token)
              return dispatch({type: types.success})
            }))
          .catch(error => dispatch({
                type: types.error,
                payload: error
          }))
    }
};

login.propTypes = {
    history: PropTypes.shape(historyPropTypes).isRequired,
    data: object.isRequired
};
