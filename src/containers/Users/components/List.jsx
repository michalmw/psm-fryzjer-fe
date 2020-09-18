import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { history as historyPropTypes } from 'history-prop-types';
import { withRouter, useRouteMatch, Link } from 'react-router-dom';

import { Button, IconButton, Paper, CircularProgress, Tooltip } from '@material-ui/core';
import { KeyboardBackspace } from "@material-ui/icons";

import { getUsers, deleteUser, getMe } from '../../../actions/UserActions'
import { deleteAlertError, deleteAlertSuccess } from '../../../components/Form/Alerts';
import { url, statusType } from '../../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import labels from '../../../assets/labels';
import Navbar from '../../../components/layout/Navbar';
import CustomAvatar from '../../../components/Form/CustomAvatar';

const List  = ({ history, deleteStatus, isLoading, users, getUserList, getMyAccount, me }) => {
  const match = useRouteMatch();

  const [deleteError, setDeleteError] = React.useState(false);
  const [deleteSuccess, setDeleteSuccess] = React.useState(false);

  const myAccontInfo = (id) => me?._id === id ? labels.myAccount : ''
    
  React.useEffect(() => {
    if (!me?._id) {
      getMyAccount();
    }
    getUserList();
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
          <h2>{ labels.userList }</h2>
          <Button onClick={() => history.push(`${url.users}${url.invite}`)} className="font-button font-button--small">{ labels.addUsersButton }</Button>
        </div>

        { deleteSuccess && deleteAlertSuccess({onClose: () => setDeleteSuccess(false)}) }
        { deleteError &&  deleteAlertError({onClose: () => setDeleteError(false)}) }

        { users?.map(({ _id, name, surname, color, avatar, isConfirm }) => {
          return (
          <Paper className="user-card" key={ _id } elevation={ 0 }>
            <CustomAvatar isConfirmed={isConfirm} color={color} avatar={avatar} name={name} surname={surname} />
            <Link to={`${ match.url }/${myAccontInfo(_id) ? 'me' : _id}`} className={!isConfirm ? 'disabled-link user-info' : 'user-info'}>
              <p>{ name } { surname } {myAccontInfo(_id)}</p>
            </Link>
            {!isConfirm && <Tooltip title={labels.notConfirmed} placement="top">
              <IconButton><FontAwesomeIcon icon={ faQuestion } /></IconButton>
            </Tooltip>}
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
  users: state.users.data,
  isLoading: state.users.status === statusType.loading,
  deleteStatus: state.users.deleteStatus,
  me: state.users.me
});

const mapDispatchToProps = (dispatch) => ({
  getUserList: () => dispatch(getUsers()),
  deleteUserItem: (id) => dispatch(deleteUser({id})),
  getMyAccount: () => dispatch(getMe())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List));
