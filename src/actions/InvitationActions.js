
import { object, number } from 'prop-types';
import { getConfig, methods, urls, urlTypes, getTypes, getActionCreator } from ".";

export const getInvitations = () => getActionCreator({url: urls.invitations, type: urlTypes.invitations});

export const addInvitation = ({data}) => {
    const types = getTypes({baseType: urlTypes.invitation, method: methods.post})
    const config = getConfig({method: methods.post, data})
    
    return function(dispatch) {
      dispatch({type: types.base});
      fetch(urls.invitations, config)
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

addInvitation.propTypes = {
    data: object.isRequired
};

export const rejectInvitations = ({id, data}) => {
    const types = getTypes({baseType: urlTypes.invitation, method: methods.put})
    const config = getConfig({method: methods.put, data})
    
    return function(dispatch) {
      dispatch({type: types.base});
      fetch(`${urls.invitations}/reject/${id}`, config)
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

rejectInvitations.propTypes = {
    id: number.isRequired,
    data: object.isRequired
};

export const confirmInvitation = ({id}) => {
    const types = getTypes({baseType: urlTypes.invitation, method: methods.post})
    const config = getConfig({method: methods.post})
    
    return function(dispatch) {
      dispatch({type: types.base});
      fetch(`${urls.invitations}/confirm/${id}`, config)
          .then(response => response.json())
          .then(() => {
              dispatch(getInvitations());
              return dispatch({type: types.success})
            })
          .catch(error => dispatch({
                type: types.error,
                payload: error
              })
          );
    }
};

confirmInvitation.propTypes = {
    id: number.isRequired
};
