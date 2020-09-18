import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { history as historyPropTypes } from 'history-prop-types';
import { withRouter, Link } from'react-router-dom';

import { KeyboardBackspace } from "@material-ui/icons";
import { Button, Drawer, Paper, IconButton } from '@material-ui/core';
import { getMe } from '../actions/UserActions';
import labels from '../assets/labels';
import { url } from '../constants';
import './Settings.scss';

const Settings = ({ open, handleClose, history, me, getMyAccount }) => {
    const logout = () => {
        localStorage.clear();
        history.push('../');
    }

    React.useEffect(() => {
        if (!me?.company) {
          getMyAccount();
        }
      }, []);
    
    return (
        <Drawer anchor="bottom" open={ open } onClose={ handleClose }>
            <div className="drawer-subheader">
                <IconButton onClick={handleClose}><KeyboardBackspace /></IconButton>
                <h5>{ labels.appTitle }</h5>
            </div>
            <div className="list-subtitle">
                <h2>{ labels.settings }</h2>
                <Button className="font-button font-button--small">{ labels.saveOnDesktop }</Button>
            </div>
            <Paper className="user-card" elevation={ 0 }>
                <Link to={`${ url.users }/edit`}>
                    <h3>{labels.userWorkingHours}</h3>
                </Link>
            </Paper>
            <Paper onClick={logout} className="user-card" elevation={ 0 }>
                <h3>{labels.logoutButton}</h3>
            </Paper>
            <Paper className="user-card" elevation={ 0 }>
                <h3>{labels.changePassword}</h3>
            </Paper>
            <Paper className="user-card" elevation={ 0 }>
                <Link to={`${ url.users }/invite`}>
                    <h3>{labels.addUsersButton}</h3>
                </Link>
            </Paper>
            <Paper className="user-card" elevation={ 0 }>
                <Link to={`${ url.invitations }`}>
                    <h3>{labels.goToInvitesList}</h3>
                </Link>
            </Paper>
            <Paper className="user-card" elevation={ 0 }>
                <Link to={`${ url.users }/edit`}>
                    <h3>{labels.editUser}</h3>
                </Link>
            </Paper>
            <Paper className="user-card" elevation={ 0 }>
                <Link to={`${ url.copanies }/${me?.company}`}>
                    <h3>{labels.editCompany}</h3>
                </Link>
            </Paper>
            <Paper className="user-card" elevation={ 0 }>
                <Link to={`${ url.users }`}>
                    <h3>{labels.editUsers}</h3>
                </Link>
            </Paper>
            <Paper className="user-card" elevation={ 0 }>
                <Link to={`${ url.services }`}>
                    <h3>{labels.editServices}</h3>
                </Link>
            </Paper>
            <Paper className="user-card" elevation={ 0 }>
                <Link to={`${ url.products }`}>
                    <h3>{labels.editProducts}</h3>
                </Link>
            </Paper>
        </Drawer>
    );
}

Settings.propTypes = {
    open: PropTypes.bool.isRequired,
    handleOpen: PropTypes.func,
    history: PropTypes.shape(historyPropTypes)
};

const mapStateToProps = (state) => ({
    me: state.users?.me
  });
  
  const mapDispatchToProps = (dispatch) => ({
    getMyAccount: () => dispatch(getMe())
  });
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Settings));
  