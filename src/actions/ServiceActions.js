
import { object, number } from 'prop-types';
import { getConfig, methods, urls, urlTypes, getTypes, getActionCreator } from ".";

export const getServices = ({companyId}) => getActionCreator({url: `${urls.services}/getByCompany/${companyId}`, type: urlTypes.services});
export const getService = ({id}) => getActionCreator({url: `${urls.services}/${id}`, type: urlTypes.service});

export const addService = ({data}) => {
    const types = getTypes({baseType: urlTypes.service, method: methods.post})
    const config = getConfig({method: methods.post, data})
    
    return function(dispatch) {
      dispatch({type: types.base});
      fetch(urls.services, config)
          .then(response => response.json())
          .then(() => {
              return dispatch({type: types.success})
            })
          .catch(error => dispatch({
                type: types.error,
                payload: error
              })
          );
    }
};

addService.propTypes = {
    data: object.isRequired
};

export const updateService = ({id, data}) => {
    const types = getTypes({baseType: urlTypes.service, method: methods.put})
    const config = getConfig({method: methods.put, data})
    
    return function(dispatch) {
      dispatch({type: types.base});
      fetch(`${urls.services}/${id}`, config)
          .then(response => response.json())
          .then(() => {
              return dispatch({type: types.success})
            })
          .catch(error => dispatch({
                type: types.error,
                payload: error
              })
          );
    }
};

updateService.propTypes = {
    id: number.isRequired,
    data: object.isRequired
};

export const deleteService = ({id, companyId}) => {
    const types = getTypes({baseType: urlTypes.service, method: methods.delete})
    const config = getConfig({method: methods.delete})
    
    return function(dispatch) {
      dispatch({type: types.base});
      fetch(`${urls.services}/${id}`, config)
          .then(response => response.json())
          .then(() => {
              dispatch(getServices({companyId}))
              return dispatch({type: types.success})
            })
          .catch(error => dispatch({
                type: types.error,
                payload: error
              })
          );
    }
};

deleteService.propTypes = {
    id: number.isRequired
};
