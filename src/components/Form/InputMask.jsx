import * as React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';

const code = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
const phone = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
const phoneSign = '\u2000';
const codeSign = 'x';

const InputMask = ({ isCodeMask, inputRef, ...other }) => (
    <MaskedInput
        { ...other }
        ref={(ref) => { inputRef(ref ? ref.inputElement : null) }}
        mask={ isCodeMask ? code : phone }
        placeholderChar={ isCodeMask ? codeSign : phoneSign }
        showMask
    />
);

InputMask.propTypes = {
    isCodeMask: PropTypes.bool,
    inputRef: PropTypes.func
};

export default InputMask;
