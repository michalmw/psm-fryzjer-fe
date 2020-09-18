
import { object, number } from 'prop-types';
import { getConfig, methods, urls, urlTypes, getTypes, getActionCreator } from ".";

export const getProducts = () => getActionCreator({url: urls.products, type: urlTypes.products});
export const getProduct = ({id}) => getActionCreator({url: `${urls.products}/${id}`, type: urlTypes.product});

export const addProduct = ({data}) => {
    const types = getTypes({baseType: urlTypes.product, method: methods.post})
    const config = getConfig({method: methods.post, data})
    
    return function(dispatch) {
      dispatch({type: types.base});
      fetch(urls.products, config)
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

addProduct.propTypes = {
    data: object.isRequired
};

export const updateProduct = ({id, data}) => {
    const types = getTypes({baseType: urlTypes.product, method: methods.put})
    const config = getConfig({method: methods.put, data})
    
    return function(dispatch) {
      dispatch({type: types.base});
      fetch(`${urls.products}/${id}`, config)
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

updateProduct.propTypes = {
    id: number.isRequired,
    data: object.isRequired
};

export const deleteProduct = ({id}) => {
    const types = getTypes({baseType: urlTypes.product, method: methods.delete})
    const config = getConfig({method: methods.delete})
    
    return function(dispatch) {
      dispatch({type: types.base});
      fetch(`${urls.products}/${id}`, config)
          .then(response => response.json())
          .then(() => {
              dispatch(getProducts());
              return dispatch({type: types.success})
            })
          .catch(error => dispatch({
                type: types.error,
                payload: error
              })
          );
    }
};

deleteProduct.propTypes = {
    id: number.isRequired
};
