import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Formik, Form } from 'formik';
import { KeyboardBackspace } from '@material-ui/icons';
import { Button, IconButton, Drawer } from '@material-ui/core';

import CustomValidationField, { formatPhone, formatCode } from '../../../components/Form/ValidationTextField';
import { addUser } from '../../../actions/UserActions';
import { confirmCode, checkIfExist } from '../../../actions/RegistrationActions';
import { statusType } from '../../../constants';
import labels from '../../../assets/labels';
import '../Registration.scss';

const ActivationForm = ({open, handleOpen, userExistChecking, confirmActivationCode, createUser, confirmationStatus, confirmationCode, isLoading}) => {
    const [isDisabled, setDisabled] = React.useState(false);
    const [counter, setCounter] = React.useState(0);
    let codeError = confirmationCode?.error && confirmationCode.message;

    React.useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
      }, [counter]);

    React.useEffect(() => {
        if (confirmationStatus === statusType.success) {
            handleOpen('profile');
        }
    }, [confirmationStatus]);

    const activateCode = (values, errors) => {
        const { phone, activationCode } = values;

        if (!errors.activationCode && values.activationCode) {
            confirmActivationCode({ phone: localStorage.phone || formatPhone(phone), activationCode: parseFloat(formatCode(activationCode))})
        }
    }

    const checkUser = ({phone}) => {
        userExistChecking({ phone: formatPhone(phone) });
    }

    checkUser.propTypes = {
        phone: PropTypes.string
    };

    const getActivateCode = ({phone}) => {
        createUser({ phone: localStorage.phone || formatPhone(phone) });
        setDisabled(true);
        setCounter(60);
        setTimeout(() => { setDisabled(false) }, 60000);
    }

    getActivateCode.propTypes = {
        phone: PropTypes.string
    };
    
    activateCode.propTypes = {
        values: PropTypes.shape({
            phone: PropTypes.string,
            activateCode: PropTypes.string
        }).isRequired,
        errors: PropTypes.shape({
            phone: PropTypes.string,
            activateCode: PropTypes.string
        }).isRequired
    };

    return (
        <Drawer anchor="right" open={open}>
            <div className='drawer-middle activation-form'>
                <div className="drawer-header">
                    <IconButton onClick={() => handleOpen('activation', false)}><KeyboardBackspace /></IconButton>
                    <h1 className="registration__title">{ labels.joinTitle }<strong>{ labels.appTitle }</strong></h1>
                </div>
                <div className='drawer-content'>
                    <p>{ labels.provideCodeLabel }</p>
                    <Formik
                        initialValues={{
                            activationCode: '',
                            phone: ''
                        }}
                        validate={ values => {
                            const errors = {};
                            const { activationCode, phone } = values;
                            if (!activationCode) {
                                errors.activationCode = labels.codeRequiredError;
                            } else if (formatCode(activationCode).length !== 6) {
                                errors.activationCode = labels.codeValidError;
                            }
                            if (!phone) {
                                errors.phone = labels.phoneRequiredError;
                            } else if (formatPhone(phone).length !== 12) {
                                errors.phone = labels.phoneFormatError;
                            }
                            return errors;
                        }}
                        render={({ values, errors, touched }) => (
                            <Form className="form">
                                {!localStorage.phone && (
                                    <CustomValidationField
                                        name="phone"
                                        error={ errors.phone } 
                                        touched={ touched.phone }
                                        onKeyUp={ () => values.phone && checkUser() } 
                                        isPhoneField 
                                    />
                                )}
                                <CustomValidationField
                                    name="activationCode"
                                    error={ errors.activationCode || codeError}
                                    touched={ touched.activationCode }
                                    onClick={() => {codeError = null}}
                                    isCodeField 
                                />
                                {codeError && <div className="error-button"><p>{codeError}</p></div>}
                                <p>{localStorage.activationCode}</p>
                                <div className="registration__button-container">
                                    <Button
                                        disabled={ !!errors.activationCode || !!codeError || isLoading }
                                        variant="contained"
                                        color="primary"
                                        onClick={ () => activateCode(values, errors) }
                                    >
                                        { labels.codeButtonLabel }
                                    </Button>
                                    <div className='activation-container'>
                                        <p>{ labels.haveNotGetCodeLabel } { isDisabled ? `(${counter})` : '' }</p>
                                        <Button 
                                            className="font-button font-button--small" 
                                            disabled={ isDisabled } 
                                            onClick={ () => getActivateCode({phone: values.phone})}
                                        >
                                                { labels.sentCodeAgainLabel }
                                        </Button>
                                    </div>
                                </div>
                            </Form>)
                        }
                    />
                </div>
                <div className="registration__footer">
                    <div className="registration__footer__button">
                        <p>{ labels.loginCopy }</p>
                        <Button onClick={ () => handleOpen('login') } className="font-button font-button--big">{ labels.loginButtonLabel }</Button>
                    </div>
                </div>
            </div>
        </Drawer>
    );
}

ActivationForm.propTypes = {
    open: PropTypes.bool.isRequired,
    handleOpen: PropTypes.func.isRequired,
    setUserData: PropTypes.func.isRequired,
    client: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    checkIfExist: state.checkIfExist?.data,
    isLoading: state.checkIfExist?.status === statusType.loading || state.confirmCode?.status === statusType.loading,
    confirmationCode: state.confirmCode?.data,
    confirmationStatus: state.confirmCode?.status,
});

const mapDispatchToProps = (dispatch) => ({
    confirmActivationCode: (data) => dispatch(confirmCode({data})),
    createUser: (data) => dispatch(addUser({data})),
    userExistChecking: (data) => dispatch(checkIfExist({data}))
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivationForm);
