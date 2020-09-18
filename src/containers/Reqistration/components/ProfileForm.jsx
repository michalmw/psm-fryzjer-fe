import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'md5';

import { Formik, Form } from 'formik';
import { Button, Drawer } from '@material-ui/core';

import CustomValidationField from '../../../components/Form/ValidationTextField';
import { statusType } from '../../../constants';
import { confirmAccount } from '../../../actions/RegistrationActions';
import labels from '../../../assets/labels';
import '../Registration.scss'


const ProfileForm = ({ open, handleOpen, confirmationStatus, accountConfirmation, confirmationAccount, user, isLoading }) => {
    React.useEffect(() => {
        if (confirmationStatus === statusType.success) {
            localStorage.setItem('token', confirmationAccount.access_token)
            handleOpen('congratulations');
        }
    }, [confirmationStatus]);

    const createProfile = ({ name, surname, password }) => {
        accountConfirmation({
            _id: user?._id,
            password: md5(password),
            name,
            surname
        });
    };

    createProfile.propTypes = {
        name: PropTypes.string.isRequired,
        surname: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    };

    return (
        <Drawer anchor="right" open={ open }>
            {console.log(user, confirmationStatus)}
            <div className='drawer-middle profile-form'>
                <div className="drawer-header">
                    <h1 className="registration__title">{ labels.joinTitle }<strong>{ labels.appTitle }</strong></h1>
                </div>
                <div className='drawer-content-details'>
                <p>{labels.profileDataCopy}</p>
                    <Formik
                        initialValues={{
                            name: '',
                            surname: '',
                            password: '',
                            repetedPassword: ''
                        }}
                        validate={values => {
                            const errors = {}
                            const passwordRegex = new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");

                            let { name, surname, password, repetedPassword } = values;
                            if (!name) {
                                errors.name = labels.nameRequiredError;
                            }
                            if (!surname) {
                                errors.surname = labels.surnameRequiredError;
                            }
                            if (!password) {
                                errors.password = labels.passwordRequiredError;
                            } else if (!passwordRegex.test(password)){
                                errors.password = labels.weakPasswordError;
                            }
                            if (!repetedPassword) {
                                errors.repetedPassword = labels.repetedPasswordRequiredError;
                            } else if (repetedPassword !== password) {
                                errors.repetedPassword = labels.passwordsDontMatchError;
                            }
                            return errors;
                        }}
                        render={({ values, errors, touched }) => {
                            const isButtonDisabled = !!errors.name || !values.name 
                                || !!errors.surname || !values.surname 
                                || !!errors.password || !values.password 
                                || !!errors.repetedPassword || !values.repetedPassword
                                || isLoading;
                            return (
                                <Form className="form">
                                    <CustomValidationField
                                        error={ errors.name }
                                        touched={ touched.name }
                                        name="name"
                                        placeholder={ labels.name }
                                    />
                                    <CustomValidationField
                                        error={ errors.surname }
                                        touched={ touched.surname }
                                        name="surname"
                                        placeholder={ labels.surname }
                                    />
                                    <div className="section">
                                        <p>{ labels.passwordCopy }</p>
                                        <CustomValidationField
                                            name="password"
                                            type="password"
                                            error={ errors.password }
                                            touched={ touched.password }
                                            placeholder={ labels.password }
                                        />
                                    </div>
                                    <div className="section">
                                        <p>{ labels.repeatPasswordCopy }</p>
                                        <CustomValidationField
                                            error={ errors.repetedPassword }
                                            touched={ touched.repetPassword }
                                            name="repetedPassword"
                                            type="password"
                                            placeholder={ labels.repetPassword }
                                        />
                                    </div>
                                    <div className="drawer__button-container">
                                        <Button
                                            disabled={ isButtonDisabled }
                                            variant="contained"
                                            color="primary"
                                            onClick={ () => createProfile(values) }
                                        >
                                            { labels.createAccountButton }
                                        </Button>
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

ProfileForm.propTypes = {
    open: PropTypes.bool.isRequired,
    handleOpen: PropTypes.func.isRequired,
    userId: PropTypes.number
};

const mapStateToProps = (state) => ({
    isLoading: state.confirmAccount?.status === statusType.loading,
    confirmationAccount: state.confirmAccount?.data,
    confirmationStatus: state.confirmAccount?.status,
    user: state.confirmCode?.data
});

const mapDispatchToProps = (dispatch) => ({
    accountConfirmation: (data) => dispatch(confirmAccount({data}))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);

