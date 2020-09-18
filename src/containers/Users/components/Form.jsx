import * as React from 'react';
import PropTypes from 'prop-types';
import { history as historyPropTypes } from 'history-prop-types';

import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { KeyboardBackspace } from '@material-ui/icons';
import { Formik, Form } from 'formik';
import { Button, IconButton } from '@material-ui/core';

import { url, statusType } from '../../../constants';
import CustomValidationField, { formatPhone } from '../../../components/Form/ValidationTextField';
import { createAlertError, createAlertSuccess } from '../../../components/Form/Alerts';
import labels from '../../../assets/labels';
import '../Users.scss'
import { addInvitation } from '../../../actions/InvitationActions';

const emptyData = { name: '', surname: '', phone: '' };

const EditForm  = ({ history, addingStatus, createUserItem, isLoading }) => {
    const [showAlert, setAlert] = React.useState(false);
    const [showSuccessAlert, setSuccessAlert] = React.useState(false);

    const sendInvite = (values) => {
        createUserItem(values);
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
        <>
            <div className="drawer-subheader">
                <IconButton onClick={() => history.push(url.users)}><KeyboardBackspace /></IconButton>
                <h5>{ labels.appTitle }</h5>
            </div>
            <div className='drawer-content category-content'>
                <h2 className="title">{ labels.addUsersButton }</h2>
                <Formik
                    initialValues={ emptyData }
                    onSubmit={(values, {resetForm}) => {
                        sendInvite(values);
                        resetForm();
                    }}
                    validate={ values => {
                        const errors = {}

                        if (!values.phone) {
                            errors.phone = labels.phoneRequiredError;
                        } else if (formatPhone(values.phone).length !== 12) {
                            errors.phone = labels.phoneFormatError;
                        }

                        if (!values.name) {
                            errors.name = labels.nameRequiredError;
                        }

                        if (!values.surname) {
                            errors.surname = labels.surnameRequiredError;
                        }
                        return errors;
                    }}
                    render={({ values, errors, touched }) => (
                        <Form className="form">
                            {showAlert && createAlertError({onClose: () => setAlert(false)})}
                            {showSuccessAlert && createAlertSuccess({onClose: () => setSuccessAlert(false), label: labels.addUserSuccess})}
                            <CustomValidationField
                                placeholder={ labels.phone }
                                error={ errors.phone }
                                touched={ touched.phone }
                                value={ values.phone }
                                name="phone"
                                isPhoneField
                            />
                            <CustomValidationField
                                placeholder={ labels.name }
                                error={ errors.name }
                                touched={ touched.name }
                                value={ values.name }
                                name="name"
                            />
                            <CustomValidationField
                                placeholder={ labels.surname }
                                error={ errors.surname }
                                touched={ touched.surname }
                                value={ values.surname }
                                name="surname"
                            />
                            
                            <div className="button-container">
                                <Button
                                    disabled={!values.phone || !values.name || !values.surname || isLoading}
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                >
                                    {labels.inviteButton}
                                </Button>
                            </div>
                        </Form>
                    )}
                />
                <div className="registration__footer">
                    <div className="registration__footer__button">
                    <Link to={`${ url.invitations }`}>
                        <Button className="font-button font-button--small">{ labels.goToInvitesList }</Button>
                    </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

EditForm.propTypes = {
    history: PropTypes.shape(historyPropTypes)
};

const mapStateToProps = (state) => ({
    isLoading: state.invitations?.status === statusType.loading,
    addingStatus: state.invitations?.changeStatus,
});

const mapDispatchToProps = (dispatch) => ({
    createUserItem: (data) => dispatch(addInvitation({data}))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditForm));