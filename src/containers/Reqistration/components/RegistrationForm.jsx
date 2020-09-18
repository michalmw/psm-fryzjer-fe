import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Formik, Form } from 'formik';
import { KeyboardBackspace } from '@material-ui/icons';
import { Button, IconButton, Drawer } from '@material-ui/core';

import CustomValidationField, { formatPhone } from '../../../components/Form/ValidationTextField';
import { statusType } from '../../../constants';
import labels from '../../../assets/labels';
import '../Registration.scss';
import { checkIfExist } from '../../../actions/RegistrationActions';
import { addUser } from '../../../actions/UserActions';

const RegistrationForm = ({ open, handleOpen, isExistLoading, checkIfExist, userExistChecking, addUser }) => {
    const onRegister = (values) => {
        addUser({ phone: formatPhone(values.phone) })
        handleOpen('activation', true);
        localStorage.setItem('phone', formatPhone(values.phone));   
    };

    const checkUser = (values) => {
        userExistChecking({ phone: formatPhone(values.phone) });
    }

    const onKeyUp = (values, errors) => {
        if (values.phone && !errors.phone) {
            checkUser(values);
        }
    }

    checkUser.propTypes = {
        values: PropTypes.shape({
            phone: PropTypes.string
        }).isRequired,
        errors: PropTypes.shape({
            phone: PropTypes.string
        }).isRequired
    };

    onKeyUp.propTypes = {
        values: PropTypes.shape({
            phone: PropTypes.string
        }).isRequired,
        errors: PropTypes.shape({
            phone: PropTypes.string
        }).isRequired
    };

    return (
        <Drawer anchor="right" open={open}>
            <div className='drawer-middle'>
                <div className="drawer-header">
                    <IconButton onClick={ () => handleOpen('registration', false) }><KeyboardBackspace /></IconButton>
                    <h1 className="registration__title">{ labels.joinTitle }<strong>{ labels.appTitle }</strong></h1>
                </div>

                <div className='drawer-content'>
                    <p>{labels.phoneNumberCopy}</p>
                    <Formik
                        initialValues={{ phone: '' }}
                        validate={ values => {
                            const errors = {}

                            if (!values.phone) {
                                errors.phone = labels.phoneRequiredError;
                            } else if (formatPhone(values.phone).length !== 12) {
                                errors.phone = labels.phoneFormatError;
                            }
                            return errors;
                        }}
                        render={({ values, errors, touched }) => {
                            return (
                                <Form className="form">
                                    <CustomValidationField
                                        touched={ touched.phone }
                                        name="phone" 
                                        error={ !!errors.phone }
                                        onKeyUp={() => onKeyUp(values, errors)}
                                        isPhoneField
                                    />
                                    { false && <div className="error-button">
                                        <p>{  }</p>
                                        <Button onClick={ () => handleOpen('login', true) } className="font-button font-button--small">{ labels.loginSpecial }</Button>
                                    </div>}
                                    <div className="registration__button-container">
                                        <Button
                                            disabled={ !!errors.phone || !values.phone || isExistLoading }
                                            variant="contained"
                                            color="primary"
                                            onClick={ () => onRegister(values) }
                                        >
                                            { labels.getActivateCodeButton }
                                        </Button>
                                        <Button onClick={ () => handleOpen('activation') } className="font-button font-button--small">{ labels.iGotSmsLabel }</Button>
                                    </div>
                                </Form>
                            )
                        }}
                    />
                </div>
                
                <div className="registration__footer">
                    <div className="registration__footer__button">
                        <p>{ labels.loginCopy }</p>
                        <Button onClick={ () => handleOpen('login', true) } className="font-button font-button--big">{ labels.loginButtonLabel }</Button>
                    </div>
                </div>
            </div>
        </Drawer>
    );
}

RegistrationForm.propTypes = {
    open: PropTypes.bool.isRequired,
    handleOpen: PropTypes.func.isRequired,
    client: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    checkIfExist: state.checkIfExist?.data,
    isExistLoading: state.checkIfExist?.status === statusType.loading
});
  
const mapDispatchToProps = (dispatch) => ({
    userExistChecking: (data) => dispatch(checkIfExist({data})),
    addUser: (data) => dispatch(addUser({data}))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
