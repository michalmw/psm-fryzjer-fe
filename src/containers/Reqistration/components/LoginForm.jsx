import * as React from 'react';
import PropTypes from 'prop-types';
import { history as historyPropTypes } from 'history-prop-types';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import md5 from 'md5';

import { Formik, Form } from 'formik';
import { KeyboardBackspace } from '@material-ui/icons';
import { Button, IconButton, Drawer } from '@material-ui/core';

import { login } from '../../../actions/LoginActions';
import CustomValidationField, { formatPhone } from '../../../components/Form/ValidationTextField';
import { url, statusType } from '../../../constants';
import labels from '../../../assets/labels';
import '../Registration.scss';

const LoginForm = ({ open, handleOpen, login, history, isLoading, loginStatus}) => {
    React.useEffect(() => {
        if (loginStatus === statusType.success) {
            history.push(url.calendar);
            handleOpen('login', false);
        }
    }, [loginStatus]);

    return (
        <Drawer anchor="right" open={ open }>
            <div className='drawer-middle'>
                <div className="drawer-subheader">
                    <IconButton onClick={ () => handleOpen('login', false) }><KeyboardBackspace /></IconButton>
                    <h5>{ labels.appTitle }</h5>
                </div>
                <div className='drawer-content'>
                    <h2 className="drawer-content__title">{ labels.login }</h2>
                    <p>{ labels.loginSubtitle }</p>
                    <Formik
                        initialValues={{ phone: '', password: '' }}
                        validate={ values => {
                            const errors = {}

                            if (!values.phone) {
                                errors.phone = labels.phoneRequiredError;
                            } else if (formatPhone(values.phone).length !== 12) {
                                errors.phone = labels.phoneFormatError;
                            }

                            if (!values.password) {
                                errors.password = labels.passwordRequiredError;
                            }
                            return errors;
                        }}
                        render={({ values, errors, touched }) => {
                            return (
                                <Form className="form">
                                    <CustomValidationField
                                        name="phone"
                                        placeholder={ labels.phone }
                                        touched={ touched.phone }
                                        error={ errors.phone || loginStatus === statusType.error}
                                        onClick={() => {loginStatus = null}}
                                        isPhoneField
                                    />
                                    <CustomValidationField
                                        name="password"
                                        type="password"
                                        touched={ touched.password }
                                        placeholder={ labels.password }
                                        onClick={() => {loginStatus = null}}
                                        error={ errors.password || loginStatus === statusType.error}
                                    />
                                    { loginStatus === statusType.error && <div className="error-button"><p>{labels.loginError}</p></div> }
                                    <div className="registration__button-container">
                                        <Button
                                            disabled={ !values.phone || !values.password || isLoading}
                                            variant="contained"
                                            color="primary"
                                            onClick={ () => login({ data: {password: md5(values.password), phone: formatPhone(values.phone)}, history}) }
                                        >
                                            { labels.loginButtonLabel }
                                        </Button>
                                    </div>
                                </Form>
                            )
                        }}
                    />
                </div>
                <div className="registration__footer">
                    <div className="registration__footer__button">
                        <p>{ labels.registrationCopy }</p>
                        <Button onClick={ () => handleOpen('registration', true) } className="font-button font-button--big">{ labels.registerButton }</Button>
                    </div>
                </div>
            </div>
        </Drawer>
    );
}


LoginForm.propTypes = {
    open: PropTypes.bool.isRequired,
    handleOpen: PropTypes.func.isRequired,
    history: PropTypes.shape(historyPropTypes)
};

const mapStateToProps = (state) => ({
    isLoading: state.login?.status === statusType.loading,
    loginStatus: state.login?.status,
    loginData: state.login?.data
});

const mapDispatchToProps = (dispatch) => ({
    login: (data) => dispatch(login(data))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
