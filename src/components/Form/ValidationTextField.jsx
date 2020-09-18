import * as React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';

import { TextField } from "formik-material-ui";
import { Field } from 'formik';
import { Done, Close } from "@material-ui/icons";
import { InputAdornment } from '@material-ui/core';
import withStyles from "@material-ui/core/styles/withStyles";

const numberStart = '+48';
const code = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
const postCode = [/\d/, /\d/, '-', /\d/, /\d/, /\d/];
const phone = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

export const displayPhone = (phone) => {
    if (!phone) return '';
    const num = getPhoneNumber(phone);
    return `${numberStart} ${num.substring(0, 3)} - ${num.substring(3, 6)} - ${num.substring(6)}`
};
export const formatPhone = (phone) => numberStart + phone?.replace(/-/g, '').replace(/\s/g, '');
export const getPhoneNumber = (phone) => phone?.substring(3);
export const formatCode = (code) => code.replace(/-/g, '').replace(/x/g, '');
export const ValidationTextField = withStyles({
    root: {
        '& input:valid + fieldset': {
            borderColor: 'green',
            borderWidth: 5,
        },
        '& input:invalid + fieldset': {
            borderColor: 'red',
            borderWidth: 5,
        }
    },
})(TextField);

const InputCodeMask = ({inputRef, ...other }) => (
    <MaskedInput
        { ...other }
        ref={(ref) => { inputRef(ref ? ref.inputElement : null) }}
        mask={ code }
        placeholderChar={' '}
    />
);

const InputPhoneMask = ({inputRef, ...other }) => (
    <MaskedInput
        { ...other }
        ref={(ref) => { inputRef(ref ? ref.inputElement : null) }}
        mask={ phone }
        placeholderChar={' '}
    />
);

const InputPostCodeMask = ({inputRef, ...other }) => (
    <MaskedInput
        { ...other }
        ref={(ref) => { inputRef(ref ? ref.inputElement : null) }}
        mask={ postCode }
        placeholderChar={' '}
    />
);

const CustomValidationField = ({ error, touched, isCodeField, isPhoneField, isPostCodeField, simple, value, ...other }) => {
    const inputClass = touched && ((!value && !error) && '' || (!error && ' success-field' || ' error-field')) || '';
    return (
        <Field
            { ...other }
            InputProps={{
                value: value,
                endAdornment: touched && !simple && <InputAdornment position="end">
                    { !error && <Done className="success-icon" />
                    || error && <Close className="error-icon" />
                    || '' }
                </InputAdornment>,
                startAdornment: isPhoneField && <div className="start-adornment">{ numberStart }</div>,
                inputComponent: isCodeField && InputCodeMask || isPhoneField && InputPhoneMask || isPostCodeField && InputPostCodeMask,
            }}
            className={ 'full-width' + inputClass }
            component={ ValidationTextField }
            color="secondary"
            variant="outlined"
        />
    );
}

CustomValidationField.propTypes = {
    isCodeField: PropTypes.bool,
    isPhoneField: PropTypes.bool,
    error: PropTypes.bool,
    onKeyUp: PropTypes.func,
    name: PropTypes.string,
    type: PropTypes.string
};

export default CustomValidationField;
