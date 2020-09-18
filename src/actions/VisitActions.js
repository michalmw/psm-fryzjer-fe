
import { object, number } from 'prop-types';
import { getConfig, methods, urls, urlTypes, getTypes, getActionCreator } from ".";

export const getVisits = () => getActionCreator({url: urls.visits, type: urlTypes.visits});
export const getVisit = ({id}) => getActionCreator({url: `${urls.visits}/${id}`, type: urlTypes.visit});

export const addVisit = ({data}) => {
    const types = getTypes({baseType: urlTypes.visit, method: methods.post})
    const config = getConfig({method: methods.post, data})
    
    return function(dispatch) {
      dispatch({type: types.base});
      fetch(urls.visits, config)
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

addVisit.propTypes = {
    data: object.isRequired
};

export const updateVisit = ({id, data}) => {
    const types = getTypes({baseType: urlTypes.visit, method: methods.put})
    const config = getConfig({method: methods.put, data})
    
    return function(dispatch) {
      dispatch({type: types.base});
      fetch(`${urls.visits}/${id}`, config)
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

updateVisit.propTypes = {
    id: number.isRequired,
    data: object.isRequired
};

export const deleteVisit = ({id}) => {
    const types = getTypes({baseType: urlTypes.visit, method: methods.delete})
    const config = getConfig({method: methods.delete})
    
    return function(dispatch) {
      dispatch({type: types.base});
      fetch(`${urls.visits}/${id}`, config)
          .then(response => response.json())
          .then(() => {
              dispatch(getVisits());
              return dispatch({type: types.success})
            })
          .catch(error => dispatch({
                type: types.error,
                payload: error
              })
          );
    }
};

deleteVisit.propTypes = {
    id: number.isRequired
};
