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

const LoginForm = () => {
    return (
        <Formik
            initialValues={{
                login: '',
                password: ''
            }}
            onSubmit={(values) => {
               console.log(values)
            }}
            render={({submitForm, isSubmitting, values, setFieldValue}) => (
                <Form>
                    <Field
                        component={TextField}
                        variant="outlined"
                        name="login"
                        type="login"
                        label="login"
                    />
                    <Field
                        component={TextField}
                        variant="outlined"
                        name="password"
                        type="password"
                        label="password"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        onClick={submitForm}
                    >
                        Submit
                    </Button>
                </Form>
            )}
        />
    );
}

export default LoginForm;
