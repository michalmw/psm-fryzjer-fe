import * as React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { history as historyPropTypes } from 'history-prop-types';

import { withRouter } from 'react-router-dom';

import { Formik, Form } from 'formik';
import { KeyboardBackspace } from '@material-ui/icons';
import { Button, IconButton } from '@material-ui/core';

import { url } from '../../../constants';
import { addCategory } from '../../../actions/CategoryActions';
import CustomValidationField from '../../../components/Form/ValidationTextField';
import { createAlertError, createAlertSuccess } from '../../../components/Form/Alerts';
import { statusType } from '../../../constants';
import labels from '../../../assets/labels';
import '../Service.scss'

const emptyData = { name: '' };

const EditForm  = ({ history, createServiceCategory, isLoading, addingStatus }) => {
    const [showAlert, setAlert] = React.useState(false);
    const [showSuccessAlert, setSuccessAlert] = React.useState(false);

    const handleCreate = (values) => {
        createServiceCategory(values);
        if (addingStatus === statusType.error) {
            setAlert(true);
        }
    }

    React.useEffect(() => {
        if (addingStatus === statusType.success) {
            setAlert(false);
            setSuccessAlert(true);
        }
        if (addingStatus === statusType.error) {
            setAlert(true);
            setSuccessAlert(false);

        }
    }, [addingStatus]);

    return (
        <div>
            <div className="drawer-subheader">
              <IconButton onClick={() => history.push(url.categories)}><KeyboardBackspace /></IconButton>
              <h5>{ labels.appTitle }</h5>
          </div>
            <div className='drawer-content category-content'>
                <h2 className="title">{ labels.addServiceCategoryButton }</h2>
                <Formik
                    initialValues={emptyData}
                    onSubmit={(values, {resetForm}) => {
                        handleCreate(values);
                        resetForm();
                    }}
                    validate={ values => {
                        const errors = {}
                        if (!values.name) {
                            errors.name = labels.categoryNameRequiredError;
                        }
                        return errors;
                    }}
                    render={({ values, errors, touched }) => {
                        return (
                            <Form className="form">
                                {showAlert && touched.name && createAlertError({onClose: () => setAlert(false)})}
                                {showSuccessAlert && touched.name && createAlertSuccess({onClose: () => setSuccessAlert(false), label: labels.createCategorySuccess})}
                                <CustomValidationField
                                    placeholder={ labels.categoryName }
                                    error={ errors.name }
                                    touched={ touched.name }
                                    name="name"
                                    />
                                <div className="button-container">
                                    <Button
                                        disabled={ !values.name || isLoading }
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleCreate(values)}
                                    >
                                        { labels.addServiceCategoryButton }
                                    </Button>
                                </div>
                            </Form>
                        )
                    }}
                />
            </div>
        </div>
    )
}

EditForm.propTypes = {
    history: PropTypes.shape(historyPropTypes).isRequired,
    createServiceCategory: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    isLoading: state.categories?.addingStatus === statusType.loading,
    addingStatus: state.categories?.addingStatus,
});

const mapDispatchToProps = (dispatch) => ({
    createServiceCategory: (data) => dispatch(addCategory({data}))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditForm));
