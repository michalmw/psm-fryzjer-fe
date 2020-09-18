import * as React from 'react';
import {Formik, Form, Field} from 'formik';
import {
    Button
} from '@material-ui/core';
import {
    TextField
} from 'formik-material-ui';
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
