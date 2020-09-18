import React from 'react';
import PropTypes from 'prop-types';
import { history as historyPropTypes } from 'history-prop-types';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Button, IconButton, Paper, CircularProgress } from '@material-ui/core';
import { KeyboardBackspace } from "@material-ui/icons";

import { getCategories, deleteCategory, updateCategory } from '../../../actions/CategoryActions'
import { url, statusType } from '../../../constants';
import labels from '../../../assets/labels';
import Navbar from '../../../components/layout/Navbar';
import CustomValidationField from '../../../components/Form/ValidationTextField';
import { Formik, Form } from 'formik';
import { updateAlertError, updateAlertSuccess, deleteAlertError, deleteAlertSuccess } from '../../../components/Form/Alerts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash} from '@fortawesome/free-solid-svg-icons'
import { getMe } from '../../../actions/UserActions';

const List = ({ history, isLoading, categories, getServiceCategoryList, updateServiceCategory, deleteServiceCategory, deleteStatus, updateStatus, getMyAccount, me }) => {
  const [deleteError, setDeleteError] = React.useState(false);
  const [deleteSuccess, setDeleteSuccess] = React.useState(false);

  const [updateError, setUpdateError] = React.useState(false);
  const [updateSuccess, setUpdateSuccess] = React.useState(false);

  const [editingId, setId] = React.useState(null);
  const [value, setValue] = React.useState(null);
 
  React.useEffect(() => {
    if (me?.company) {
      getServiceCategoryList(me.company);
    } else {
      getMyAccount();
    }
  }, []);

  React.useEffect(() => {
    if (me?.company && ! categories?.length) {
      getServiceCategoryList(me.company);
    }
  }, [me]);

  const handleUpdate = (id, data) => {
    updateServiceCategory(id, data, me?.company);
    setId(null);
  };

  const handleDelete = (id) => {
    deleteServiceCategory(id, me?.company);
    window.scrollTo(0, 0);
  };

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

  React.useEffect(() => {
    if (updateStatus === statusType.success) {
        setUpdateError(false);
        setUpdateSuccess(true);
    }
    if (updateStatus === statusType.error) {
      setUpdateError(true);
      setUpdateSuccess(false);

    }
}, [updateStatus]);

    
  return (
    <div>{ isLoading
      ? <div className="loader"><CircularProgress /></div>
      : <div>
        <div className="drawer-subheader">
            <IconButton onClick={() => history.push(url.calendar)}><KeyboardBackspace /></IconButton>
            <h5>{ labels.appTitle }</h5>
        </div>
        <div className="list-subtitle">
          <h2>{ labels.serviceCategoryList }</h2>
          <Button onClick={() => history.push(`${ url.categories }${ url.add }`)} className="font-button font-button--small">{ labels.addServiceCategoryButton }</Button>
        </div>

        { deleteSuccess && deleteAlertSuccess({onClose: () => setDeleteSuccess(false)}) }
        { deleteError &&  deleteAlertError({onClose: () => setDeleteError(false)}) }
        { updateSuccess && updateAlertSuccess({onClose: () => setUpdateSuccess(false)}) }
        { updateError && updateAlertError({onClose: () => setUpdateError(false)}) }

        { categories?.length ? categories.sort((a,b) => a.name < b.name ? 1 : -1).map(({ _id, name }) => (
            <Paper className="user-card" key={ _id } elevation={ 0 }>
              {editingId !== _id && (
                <div className="category-element">
                <h3 onClick={() => { setValue(name); setId(_id)}}>{ name }</h3>
                <IconButton onClick={() => handleDelete(_id)}><FontAwesomeIcon icon={ faTrash } /></IconButton>
                </div>
              )}
              {editingId === _id && <Formik
                  initialValues={{ name: value}}
                  render={({ values, errors, touched }) => {
                      return (
                          <Form className="form inline-form">
                              <CustomValidationField
                                  placeholder={ labels.name }
                                  error={ errors.name }
                                  touched={ touched.name }
                                  name="name"
                              />
                              <Button
                                  disabled={ !values.name }
                                  variant="contained"
                                  color="secondary"
                                  onClick={() => handleUpdate(_id, values)}
                              >
                                  { labels.save }
                              </Button>
                          </Form>
                      )
                  }}
              />}
            </Paper>
        )) : <div className="user-card"><p>{labels.noCategories}</p></div>}
      </div>}
    <Navbar/>
    </div>
  );
}

const mapStateToProps = (state) => ({
  categories: state.categories?.data,
  isLoading: state.categories?.status === statusType.loading,
  deleteStatus: state.categories?.deleteStatus,
  updateStatus: state.categories?.updateStatus,
  me: state.users?.me,
});

const mapDispatchToProps = (dispatch) => ({
  getServiceCategoryList: (companyId) => dispatch(getCategories({companyId})),
  deleteServiceCategory: (id, companyId) => dispatch(deleteCategory({id, companyId})),
  updateServiceCategory: (id, data, companyId) => dispatch(updateCategory({id, data, companyId})),
  getMyAccount: () => dispatch(getMe()),
});

List.propTypes = {
  history: PropTypes.shape(historyPropTypes)
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List));
