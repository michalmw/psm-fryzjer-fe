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
import DateFnsUtils from '@date-io/date-fns';
import {ADD_USER} from "./constants";
import {useMutation} from "@apollo/react-hooks";

const SearchUser = () => {
    const [addUser] = useMutation(ADD_USER);
    return (
        <Formik
            initialValues={{
                phone: ''
            }}
            onSubmit={(values) => {
                addUser({variables: {newUserInput: values}})
            }}
            render={({submitForm, isSubmitting, values, setFieldValue}) => (
                <Form>
                    <Field
                        component={TextField}
                        variant="outlined"
                        name="phone"
                        type="phone"
                        label="phone"
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

export default SearchUser;
