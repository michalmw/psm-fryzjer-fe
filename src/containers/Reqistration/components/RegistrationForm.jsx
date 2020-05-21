import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import { Done, Close, KeyboardBackspace } from "@material-ui/icons";
import { Button, IconButton, Drawer, InputAdornment } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { useMutation } from "@apollo/react-hooks";
import labels from '../../../assets/labels';
import { ADD_USER } from "../../Calendar/components/constants";
import withStyles from "@material-ui/core/styles/withStyles";
import MaskedInput from 'react-text-mask';
import "../Registration.scss"
import {ValidationTextField} from "../../../components/Form/ValidationTextField";

const RegistrationForm = ({open, handleOpen}) => {
    const [addUser, {  loading, error, data }] = useMutation(ADD_USER, { onError(err) { console.log(err) }});

    const TextMaskCustom = ({inputRef, ...other}) => (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={[/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );

    const checkUser = (values, errors, touched) => {
        if (!errors.phone && touched.phone && values.phone) {
            const {phone} = values;
            const value = '+48' + formatPhone(phone);
            // addUser({variables: {newUserInput: {phone: value}}})
        }
    }

    const formatPhone = (phone) => phone.replace(/-/g, '').replace(/\s/g, '');

    return (
        <Drawer anchor="right" open={open}>
            <div className='drawer-middle'>
                <div className="drawer-header">
                    <IconButton onClick={() => handleOpen('registration', false)}><KeyboardBackspace /></IconButton>
                    <h1 className="registration__title">{labels.joinTitle}<strong>{labels.appTitle}</strong></h1>
                </div>
                <div className='drawer-content'>
                    <p>{labels.phoneNumberCopy}</p>
                    <Formik
                        initialValues={{phone: '',}}
                        validate={values => {
                            const errors = {}
                            let {phone} = values;
                            if (!values.phone) {
                                errors.phone = labels.phoneRequiredError;
                            } else if (formatPhone(phone).length !== 9) {
                                errors.phone = labels.phoneFormatError;
                            }
                            return errors;
                        }}
                        onSubmit={(values) => {
                            console.log(values)
                        }}
                        render={({submitForm, isSubmitting, values, setFieldValue, errors, touched}) => {
                            const inputClass = touched.phone && (!errors.phone && " success-field" || errors.phone && " error-field") || '';
                            return (
                                <Form className="form">
                                    <Field
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">+48</InputAdornment>,
                                            endAdornment: <InputAdornment position="end">
                                                {!errors.phone && touched.phone && <Done className="success-icon" />
                                                || errors.phone && touched.phone && <Close className="error-icon" /> || ''}
                                            </InputAdornment>,
                                            inputComponent: TextMaskCustom,
                                        }}
                                        className={"full-width" + inputClass}
                                        component={ValidationTextField}
                                        color="secondary"
                                        autoFocus
                                        variant="outlined"
                                        name="phone"
                                        type="phone"
                                        onKeyUp={() => {
                                            if (values.phone) {
                                                checkUser(values, errors, touched);
                                                touched = true;
                                            }
                                        }}
                                    />
                                    <div className="registration__button-container">
                                        <Button
                                            disabled={!!errors.phone || !values.phone}
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleOpen('activation', true)}
                                        >
                                            {labels.getActivateCodeButton}
                                        </Button>
                                        <Button className="font-button font-button--small">{labels.iGotSmsLabel}</Button>
                                    </div>

                                    <div className="registration__footer">
                                        <div className="registration__footer__button">
                                            <p>{labels.loginCopy}</p>
                                            <Button onClick={() => handleOpen('login', true)} className="font-button font-button--big">{labels.loginButtonLabel}</Button>
                                        </div>
                                    </div>
                                </Form>
                            )
                        }}
                    />
                </div>
            </div>
        </Drawer>
    );
}

export default RegistrationForm;
