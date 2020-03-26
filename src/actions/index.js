const urls = {};

const getActionCreator = (url, type, errorType, successType) => {
  return function(dispatch) {
    dispatch({type});

    fetch(url)
        .then(response => response.json())
        .then(data => dispatch({
          type: successType,
          payload: data
        }))
        .catch(error => dispatch({
              type: errorType,
              payload: error
            })
        );
  }
};
