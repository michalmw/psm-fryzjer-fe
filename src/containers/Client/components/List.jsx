import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { history as historyPropTypes } from 'history-prop-types';
import { withRouter, useRouteMatch, Link } from 'react-router-dom';

import { Button, IconButton, Paper, CircularProgress, Avatar } from '@material-ui/core';
import { KeyboardBackspace, MoreVert } from "@material-ui/icons";

import { getClients, deleteClient } from '../../../actions/ClientsActions'
import { deleteAlertError, deleteAlertSuccess } from '../../../components/Form/Alerts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSms, faPhone } from '@fortawesome/free-solid-svg-icons'
import { url, statusType } from '../../../constants';
import CustomAvatar from '../../../components/Form/CustomAvatar';
import labels from '../../../assets/labels';
import Navbar from '../../../components/layout/Navbar';

const List  = ({ history, deleteStatus, isLoading, clients, getClientList, deleteClientItem }) => {
  const match = useRouteMatch();

  const [deleteError, setDeleteError] = React.useState(false);
  const [deleteSuccess, setDeleteSuccess] = React.useState(false);
 
  React.useEffect(() => {
    getClientList();
  }, []);

  React.useEffect(() => {
    if (deleteStatus === statusType.success) {
        setDeleteError(false);
        setDeleteSuccess(true);
    }
    if (deleteStatus === statusType.error) {
      setDeleteError(true);
      setDeleteSuccess(false);

    }
}, [deleteStatus]);

  return (
    <div className="client">{ isLoading
      ? <div className="loader"><CircularProgress /></div>
      : <div>
        <div className="drawer-subheader">
          <IconButton onClick={ () => history.push(url.calendar) }><KeyboardBackspace /></IconButton>
          <h5>{ labels.appTitle }</h5>
          <IconButton><MoreVert /></IconButton>
        </div>
        <div className="list-subtitle">
          <h2>{ labels.clientList }</h2>
          <Button onClick={() => history.push(`${url.clients}${url.add}`)} className="font-button font-button--small">{ labels.addClientButton }</Button>
        </div>

        { deleteSuccess && deleteAlertSuccess({onClose: () => setDeleteSuccess(false)}) }
        { deleteError &&  deleteAlertError({onClose: () => setDeleteError(false)}) }
        {console.log(clients)}
        { clients?.length ? clients.sort((a,b) => a.name > b.name ? 1 : -1).map(({ _id, name, surname, phone, avatar, additionalInfo }) => (
          <Paper className="user-card" key={ _id } elevation={ 0 }>
            <CustomAvatar avatar={avatar} name={name} surname={surname} />
            <Link to={`${ match.url }/${ _id }`}>
              <div className="client-info">
                <p><strong>{ name } { surname }</strong></p>
                <p>{ additionalInfo }</p>
              </div>
            </Link>
                <div className='special-buttons'>
                  <a href={`sms:${phone}`}><IconButton disabled={ isLoading }><FontAwesomeIcon icon={ faSms } /></IconButton></a>
                  <a href={`tel:${phone}`}><IconButton disabled={ isLoading }><FontAwesomeIcon icon={ faPhone } /></IconButton></a>
                </div>
            </Paper>
         )) : <div className="user-card"><p>{labels.noClients}</p></div>}
        </div>}
        <Navbar/>
    </div>
  )
}

List.propTypes = {
  history: PropTypes.shape(historyPropTypes)
};

const mapStateToProps = (state) => ({
  clients: state.clients.data,
  isLoading: state.services.status === statusType.loading,
  deleteStatus: state.services.deleteStatus
});

const mapDispatchToProps = (dispatch) => ({
  getClientList: () => dispatch(getClients()),
  deleteClientItem: (id) => dispatch(deleteClient({id}))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List));
