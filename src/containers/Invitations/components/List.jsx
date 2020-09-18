import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { history as historyPropTypes } from 'history-prop-types';
import { withRouter, Link } from 'react-router-dom';

import { Button, IconButton, Paper, CircularProgress, Tooltip } from '@material-ui/core';
import { KeyboardBackspace } from "@material-ui/icons";

import { getInvitations, rejectInvitations } from '../../../actions/InvitationActions'
import { deleteAlertError, deleteAlertSuccess } from '../../../components/Form/Alerts';
import { url, statusType } from '../../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import labels from '../../../assets/labels';
import Navbar from '../../../components/layout/Navbar';
import CustomAvatar from '../../../components/Form/CustomAvatar';

const List  = ({ history, deleteStatus, isLoading, invitations, getInvitationList, isMe }) => {
  const [deleteError, setDeleteError] = React.useState(false);
  const [deleteSuccess, setDeleteSuccess] = React.useState(false);
    
  React.useEffect(() => {
    getInvitationList();
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
    <div>{ isLoading
      ? <div className="loader"><CircularProgress /></div>
      : <div>
        <div className="drawer-subheader">
          <IconButton onClick={ () => history.push(url.calendar) }><KeyboardBackspace /></IconButton>
          <h5>{ labels.appTitle }</h5>
        </div>
        <div className="list-subtitle">
          <h2>{ labels.invitationList }</h2>
          <Button onClick={() => history.push(`${url.invitations}${url.invite}`)} className="font-button font-button--small">{ labels.addinvitationsButton }</Button>
        </div>

        { invitations?.map(({ _id, name, surname, color, avatar, isConfirm }) => {
          return (
          <Paper className="invitation-card" key={ _id } elevation={ 0 }>
            <CustomAvatar isConfirmed={isConfirm} color={color} avatar={avatar} name={name} surname={surname} />
              <p>{ name } { surname }</p>
          </Paper>
         )}) }
        </div>}
        <Navbar/>
    </div>
  )
}

List.propTypes = {
  history: PropTypes.shape(historyPropTypes)
};

const mapStateToProps = (state) => ({
  invitations: state.invitations.data,
  isLoading: state.invitations.status === statusType.loading,
  deleteStatus: state.invitations.deleteStatus,
  me: state.invitations.me
});

const mapDispatchToProps = (dispatch) => ({
  getInvitationList: () => dispatch(getInvitations()),
  deleteinvitationItem: (id) => dispatch(rejectInvitations({id}))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List));
