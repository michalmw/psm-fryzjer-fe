import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { history as historyPropTypes } from 'history-prop-types';
import { withRouter, useParams, Link } from 'react-router-dom';

import { IconButton, CircularProgress, Avatar, Button } from '@material-ui/core';
import { KeyboardBackspace } from "@material-ui/icons";

import { getUser, getMe } from '../../../actions/UserActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSms, faPhone, faPlus } from '@fortawesome/free-solid-svg-icons'
import Navbar from '../../../components/layout/Navbar'
import VisitList from '../../../components/Form/VisitList';
import labels from '../../../assets/labels';
import { colors } from '../../../assets/theme';
import { url, statusType } from '../../../constants'; 
import CustomAvatar from '../../../components/Form/CustomAvatar';
import { getVisits } from '../../../actions/VisitActions';

const Details  = ({ history, user, isLoading, getUserItem, getVisits, visits, deleteStatus, getMyAccount }) => {
  const { id } = useParams();
  const [filteredVisits, setVisits] = React.useState([]);
  const isMe = id === "me";

  React.useEffect(() => {
    getMyAccount();
    getVisits();
  }, []);

  React.useEffect(() => {
    const list = visits?.filter(visit => visit.user?._id === id);
    setVisits(list);
  }, [visits]);

  React.useEffect(() => {
    if (deleteStatus === statusType.success) {
        history.push(url.services);
    }
}, [deleteStatus]);

  return (
    <div>
      {isLoading
        ? <div className="loader"><CircularProgress /></div>
        : <div>
            <div className="user-subheader" style={{background: user?.color || colors.secondary}}>
              <div className="user-subheader__content">
                  <IconButton onClick={() => history.push(url.users)}><KeyboardBackspace /></IconButton>
                  <CustomAvatar avatar={user?.avatar} name={user?.name} surname={user?.surname} />
                  <div className="user-info">
                    <h2>{ user?.name } { user?.surname }</h2>
                  </div>
              </div>
              <div className="action">
                {isMe && 
                <Link to={`${ url.users }/edit`}>
                    <Button>{labels.editUser}</Button>
                </Link>
                }
              </div>
          </div>
          <div className='special-buttons'>
              <a href={`sms:${user?.phone}`}><IconButton disabled={ isLoading }><FontAwesomeIcon icon={ faSms } /></IconButton></a>
              <a href={`tel:${user?.phone}`}><IconButton disabled={ isLoading }><FontAwesomeIcon icon={ faPhone } /></IconButton></a>
              <IconButton><FontAwesomeIcon icon={ faPlus } /></IconButton>
            </div>
          <VisitList visits={filteredVisits} />
        </div>}
        <Navbar/>
    </div>
  )
}

Details.propTypes = {
  history: PropTypes.shape(historyPropTypes)
};

const mapStateToProps = (state) => ({
  user: state.users.user || state.users.me,
  isLoading: state.users.status === statusType.loading,
  deleteStatus: state.users.deleteStatus,
  visits: state.visits?.data
});

const mapDispatchToProps = (dispatch) => ({
  getUserItem: (id) => dispatch(getUser({id})),
  getMyAccount: () => dispatch(getMe()),
  getVisits: () => dispatch(getVisits())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Details));
