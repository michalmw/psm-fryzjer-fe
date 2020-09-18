
import { object, number } from 'prop-types';
import { getConfig, methods, urls, urlTypes, getTypes, getActionCreator } from ".";

export const getCompany = ({id}) => getActionCreator({url: `${urls.companies}/${id}`, type: urlTypes.company});
export const getCompanies = () => getActionCreator({url: `${urls.companies}`, type: urlTypes.companies});

export const addCompany = ({data}) => {
    const types = getTypes({baseType: urlTypes.company, method: methods.post})
    const config = getConfig({method: methods.post, data})
    
    return function(dispatch) {
      dispatch({type: types.base});
      fetch(urls.companies, config)
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

addCompany.propTypes = {
    data: object.isRequired
};

export const updateCompany = ({id, data}) => {
    const types = getTypes({baseType: urlTypes.company, method: methods.put})
    const config = getConfig({method: methods.put, data})
    
    return function(dispatch) {
      dispatch({type: types.base});
      fetch(`${urls.companies}/${id}`, config)
          .then(response => response.json())
          .then(() => {
              getCompany({id});
              return dispatch({type: types.success})
            })
          .catch(error => dispatch({
                type: types.error,
                payload: error
              })
          );
    }
};

updateCompany.propTypes = {
    id: number.isRequired,
    data: object.isRequired
};

