
import { object, number } from 'prop-types';
import { getConfig, methods, urls, urlTypes, getTypes, getActionCreator } from ".";

export const getCategories = ({companyId}) => getActionCreator({url: `${urls.categories}/getByCompany/${companyId}`, type: urlTypes.categories});

export const addCategory = ({data}) => {
    const types = getTypes({baseType: urlTypes.category, method: methods.post})
    const config = getConfig({method: methods.post, data})
    
    return function(dispatch) {
      dispatch({type: types.base});
      fetch(urls.categories, config)
          .then(response => response.json())
          .then(data => {
            if (data.error || data.message) {
              return dispatch({type: types.error})
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

addCategory.propTypes = {
    data: object.isRequired
};

export const updateCategory = ({id, data, companyId}) => {
    const types = getTypes({baseType: urlTypes.category, method: methods.put})
    const config = getConfig({method: methods.put, data})
    
    return function(dispatch) {
      dispatch({type: types.base});
      fetch(`${urls.categories}/${id}`, config)
          .then(response => response.json())
          .then(data => {
            if (data.error || data.message) {
              return dispatch({type: types.error})
            }
            
            dispatch(getCategories({companyId}))
            return dispatch({type: types.success})
          })
          .catch(error => dispatch({
                type: types.error,
                payload: error
              })
          );
    }
};

updateCategory.propTypes = {
    id: number.isRequired,
    data: object.isRequired
};

export const deleteCategory = ({id, companyId}) => {
    const types = getTypes({baseType: urlTypes.category, method: methods.delete})
    const config = getConfig({method: methods.delete})
    
    return function(dispatch) {
      dispatch({type: types.base});
      fetch(`${urls.categories}/${id}`, config)
          .then(response => response.json())
          .then(data => {
              if (data.error || data.message) {
                return dispatch({type: types.error})
              }

              dispatch(getCategories({companyId}))
              return dispatch({type: types.success})
            })
          .catch(error => dispatch({
                type: types.error,
                payload: error
              })
          );
    }
};

deleteCategory.propTypes = {
    id: number.isRequired
};
