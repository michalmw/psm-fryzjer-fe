import * as React from 'react';
import {render} from 'react-dom';
import {Formik, Form, Field} from 'formik';
import {
    Button,
    LinearProgress,
    MenuItem,
    FormControl,
    InputLabel,
    FormControlLabel,
} from '@material-ui/core';
import MuiTextField from '@material-ui/core/TextField';
import {
    fieldToTextField,
    TextField,
    TextFieldProps,
    Select,
    Switch,
} from 'formik-material-ui';
import {
    TimePicker,
    DatePicker,
    DateTimePicker,
} from 'formik-material-ui-pickers';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'
import {useMutation} from "@apollo/react-hooks";
import labels from '../../../assets/labels';
import {ADD_USER} from "../../Calendar/components/constants";
import withStyles from "@material-ui/core/styles/withStyles";

const RegistrationForm = () => {
    const [addUser, {  loading, error, data }] = useMutation(ADD_USER, { onError(err) { console.log(err) }});
    const ValidationTextField = withStyles({
        root: {
            '& input:valid + fieldset': {
                borderColor: 'green',
                borderWidth: 2,
            },
            '& input:invalid + fieldset': {
                borderColor: 'red',
                borderWidth: 2,
            }
        },
    })(TextField);
    return (
        <Formik
            initialValues={{
                phone: '+ 48',
                activationCode: '',
                name: '',
                surname: '',
                password: ''
            }}
            validate={values => {
                const errors = {};
                if (!values.phone) {
                    errors.phone = labels.phoneRequiredError;
                } else if (
                    values.phone.length !== 9
                ) {
                    console.log(values.phone.length)
                    errors.phone = labels.phoneFormatError;
                }
                return errors;
            }}
            onSubmit={(values) => {
               console.log(values)
            }}
            render={({submitForm, isSubmitting, values, setFieldValue, errors}) => (
                <Form>
                    <Field
                        component={ValidationTextField}
                        autoFocus
                        fullWidth
                        variant="outlined"
                        name="phone"
                        type="pone"
                        label={labels.phoneNumber}
                        onKeyUp={() => {!errors.phone && addUser({variables: {newUserInput: {phone: values.phone}}})}}
                    />
                    {/*<Button*/}
                    {/*    variant="contained"*/}
                    {/*    color="primary"*/}
                    {/*    disabled={isSubmitting}*/}
                    {/*    onClick={submitForm}*/}
                    {/*>*/}
                    {/*    Submit*/}
                    {/*</Button>*/}
                </Form>
            )}
        />
    );
}

export default RegistrationForm;
