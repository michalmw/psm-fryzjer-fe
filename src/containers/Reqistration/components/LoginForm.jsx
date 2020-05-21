import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, IconButton, Drawer } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { KeyboardBackspace } from "@material-ui/icons";

const LoginForm = ({open, handleOpen}) => {
    return (
        <Drawer anchor="right" open={open}>
            <div className='drawer-middle'>
                <div className="drawer-header">
                    <IconButton onClick={() => handleOpen('login', false)}><KeyboardBackspace /></IconButton>
                </div>
                <div className='drawer-content'>
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
                </div>
            </div>
        </Drawer>
    );
}

export default LoginForm;
