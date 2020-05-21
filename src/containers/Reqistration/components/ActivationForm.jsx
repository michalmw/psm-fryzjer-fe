import * as React from 'react';
import {Formik, Form, Field} from 'formik';
import {Done, Close, KeyboardBackspace} from "@material-ui/icons";
import {Button,InputAdornment, IconButton, Drawer} from '@material-ui/core';
import {useMutation} from "@apollo/react-hooks";
import labels from '../../../assets/labels';
import {ADD_USER} from "../../Calendar/components/constants";
import MaskedInput from 'react-text-mask';
import "../Registration.scss"
import {ValidationTextField} from "../../../components/Form/ValidationTextField";

const ActivationForm = ({open, handleOpen}) => {
    const [addUser, {  loading, error, data }] = useMutation(ADD_USER, { onError(err) { console.log(err) }});

    function TextMaskCustom(props) {
        const {inputRef, ...other} = props;

        return (
            <MaskedInput
                {...other}
                ref={(ref) => {
                    inputRef(ref ? ref.inputElement : null);
                }}
                mask={[/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                placeholderChar={'x'}
                showMask
            />
        );
    }

    const checkUser = (values, errors, touched) => {
        if (!errors.activationCode && touched.activationCode && values.activationCode) {
            const {phone} = values;
            const value = formatPhone(phone);
            // addUser({variables: {newUserInput: {phone: value}}})
        }
    }

    const formatPhone = (phone) => phone.replace(/-/g, '').replace(/x/g, '');

    return (
        <Drawer anchor="right" open={open}>
            <div className='drawer-middle'>
                <div className="drawer-header">
                    <IconButton onClick={() => handleOpen('activation', false)}><KeyboardBackspace /></IconButton>
                    <h1 className="registration__title">{labels.joinTitle}<strong>{labels.appTitle}</strong></h1>
                </div>
                <div className='drawer-content'>
                    <p>{labels.provideCodeLabel}</p>
                    <Formik
                        initialValues={{
                            activationCode: ''
                        }}
                        validate={values => {
                            const errors = {}
                            let {activationCode} = values;
                            if (!values.activationCode) {
                                errors.activationCode = labels.phoneRequiredError;
                            } else if (formatPhone(activationCode).length !== 6) {
                                errors.activationCode = labels.phoneFormatError;
                            }
                            return errors;
                        }}
                        onSubmit={(values) => {
                            console.log(values)
                        }}
                        render={({submitForm, isSubmitting, values, setFieldValue, errors, touched}) => {
                            const inputClass = touched.activationCode
                                && (!errors.activationCode && " success-field" || errors.activationCode && " error-field") || '';
                            return (
                                <Form className="form">
                                    <Field
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">
                                                {!errors.activationCode && touched.activationCode && <Done className="success-icon" />
                                                || errors.activationCode && touched.activationCode && <Close className="error-icon" /> || ''}
                                            </InputAdornment>,
                                            inputComponent: TextMaskCustom,
                                        }}
                                        className={"full-width" + inputClass}
                                        component={ValidationTextField}
                                        color="secondary"
                                        autoFocus
                                        variant="outlined"
                                        name="activationCode"
                                        type="activationCode"
                                        onKeyUp={() => values.phone && checkUser(values, errors, touched)}
                                    />
                                    <div className="registration__button-container">
                                        <Button
                                            disabled={!!errors.activationCode || !values.activationCode}
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleOpen('profile', true)}
                                        >
                                            {labels.codeButtonLabel}
                                        </Button>
                                        <div className='activation-container'>
                                            <p>{labels.haveNotGetCodeLabel} (60s)</p>
                                            <Button className="font-button font-button--small">{labels.sentCodeAgainLabel}</Button>
                                        </div>
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

export default ActivationForm;
