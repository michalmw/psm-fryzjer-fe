import React from 'react';
import PropTypes from 'prop-types';
import { history as historyPropTypes } from 'history-prop-types';

import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { Button, IconButton, Paper, CircularProgress } from '@material-ui/core';
import { KeyboardBackspace } from "@material-ui/icons";

import { getServices, deleteService } from '../../../actions/ServiceActions';
import { getCategories } from '../../../actions/CategoryActions';
import { getMe } from '../../../actions/UserActions';
import { url, statusType } from '../../../constants';
import labels from '../../../assets/labels';
import Navbar from '../../../components/layout/Navbar';
import { deleteAlertError, deleteAlertSuccess } from '../../../components/Form/Alerts';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash} from '@fortawesome/free-solid-svg-icons'

const List = ({ history, isLoading, services, categories, getServiceList, deleteServiceItem, getCategoryList, deleteStatus, me, getMyAccount }) => {
  const [deleteError, setDeleteError] = React.useState(false);
  const [deleteSuccess, setDeleteSuccess] = React.useState(false);

  React.useEffect(() => {
    if (me?.company) {
      getServiceList(me.company);
      getCategoryList(me.company);
    } else {
      getMyAccount();
    }
  }, []);

  React.useEffect(() => {
    if (me?.company && ! categories?.length) {
      getServiceList(me.company);
      getCategoryList(me.company);
    }
  }, [me]);

  const handleDelete = (id) => {
    deleteServiceItem(id);
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (deleteStatus === statusType.success && !isLoading) {
        setDeleteError(false);
        setDeleteSuccess(true);
    }
    if (deleteStatus === statusType.error && !isLoading) {
      setDeleteError(true);
      setDeleteSuccess(false);

    }
}, [deleteStatus]);
    
  return(
    <div>{ isLoading
      ? <div className="loader"><CircularProgress /></div>
      : <div>
        <div className="drawer-subheader">
          
        {console.log(localStorage)}
            <IconButton onClick={() => history.push(url.calendar)}><KeyboardBackspace /></IconButton>
            <h5>{ labels.appTitle }</h5>
        </div>
        <div className="list-subtitle">
          <h2>{ labels.serviceList }</h2>
          <Button onClick={() => history.push(`${ url.services }${ url.add }`)} className="font-button font-button--small">{ labels.addServiceButton }</Button>
        </div>

        { deleteSuccess && deleteAlertSuccess({onClose: () => setDeleteSuccess(false)}) }
        { deleteError &&  deleteAlertError({onClose: () => setDeleteError(false)}) }

        { services?.length ? services.sort((a, b) => a.name > b.name ? 1 : -1).map(({ _id, name, priceFrom, priceTo, timeFrom, timeTo, category }) => {
          const selectedCategory = categories?.length && categories.find(categoryItem => categoryItem._id === category)?.name || labels.noCategory;
          const showPrice = priceFrom && priceTo;
          const showTime = timeFrom && timeTo;
          return (
            <Paper className="user-card" key={ _id } elevation={ 0 }>
              <div className="service-element">
                <div>
                  <Link to={`${ url.services }/${ _id }`}>
                    <h3>{ name }</h3>
                    <p>
                      {showPrice && `${priceFrom}zł - ${ priceTo }zł` || priceFrom && `${priceFrom}zł` || priceTo && `${priceTo}zł`} {showPrice && showTime ? '|' : ''} 
                      <strong>{showTime && `${ timeFrom }h - ${ timeTo }h` || timeFrom && `${timeFrom}h` || timeTo && `${timeTo}h`}</strong>
                    </p>
                  </Link>
                </div>
                <div className="inline-action">
                  <IconButton disabled={ isLoading } onClick={() => handleDelete(_id)}><FontAwesomeIcon icon={ faTrash } /></IconButton>
                  <p>{ selectedCategory }</p>
                </div>
              </div>
            </Paper>
        )}) : <div className="user-card"><p>{labels.noServices}</p></div>}
      </div>}
    <Navbar/>
    </div>
  );
};

List.propTypes = {
  history: PropTypes.shape(historyPropTypes).isRequired,
  services: PropTypes.array,
  isLoading: PropTypes.bool,
  getServiceList: PropTypes.func.isRequired,
  deleteServiceItem: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  me: state.users?.me,
  services: state.services?.data,
  categories: state.categories?.data,
  isLoading: state.services?.status === statusType.loading,
  deleteStatus: state.services?.deleteStatus
});

const mapDispatchToProps = (dispatch) => ({
  getServiceList: (companyId) => dispatch(getServices({companyId})),
  getCategoryList: (companyId) => dispatch(getCategories({companyId})),
  getMyAccount: () => dispatch(getMe()),
  deleteServiceItem: (id, companyId) => dispatch(deleteService({id, companyId}))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List));
