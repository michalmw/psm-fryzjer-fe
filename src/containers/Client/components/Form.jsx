import * as React from 'react';
import PropTypes from 'prop-types';
import { history as historyPropTypes } from 'history-prop-types';

import { connect } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';

import { Formik, Form } from 'formik';
import { KeyboardBackspace } from "@material-ui/icons";
import { Button, Grid, Select, MenuItem, FormControl, IconButton, CircularProgress} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';

import { url, statusType } from '../../../constants';
import { addClient, getClient, updateClient } from '../../../actions/ClientsActions';
import CustomValidationField, { formatPhone, getPhoneNumber } from '../../../components/Form/ValidationTextField';
import { createAlertError, createAlertSuccess } from '../../../components/Form/Alerts';

import FileUpload from '../../../components/Form/FileUpload';
import labels from '../../../assets/labels';
import '../Client.scss';
import { imageApi } from '../../../enviroments/config';

const EditForm  = ({ history, addingStatus, createClientItem, isLoading, getClientItem, client, updateClientItem }) => {
    const emptyData = { 
        name: client?.name || '', 
        phone: client?.phone && getPhoneNumber(client.phone) ||' ', 
        surname: client?.surname ||  '', 
        rodo: client?.rodo ? `${imageApi}${client?.rodo}` : '', 
        avatar: client?.avatar ? `${imageApi}${client.avatar}` : '', 
        additionalInfo: client?.additionalInfo || '', 
        sex: client?.sex || 'female', 
        email: client?.email || '', 
        city: client?.city || '', 
        streetNr: client?.streetNr || null, 
        houseNr: client?.houseNr || null, 
        street: client?.street || '',
        postCode: client?.postCode || '',
        birthDate: client?.birthDate || null
    };
    const { id } = useParams();
    const [showAlert, setAlert] = React.useState(false);
    const [showSuccessAlert, setSuccessAlert] = React.useState(false);

    React.useEffect(() => {
        if (addingStatus === statusType.success) {
            setAlert(false);
            setSuccessAlert(true);
        }
        if (addingStatus === statusType.error) {
            setAlert(true);
            setSuccessAlert(false);

        }
    }, [addingStatus]);

    React.useEffect(() => {
        window.scrollTo(0, 0);
       if (id) {
           getClientItem(id);
       }
    }, []);

    return (
        <>
            <div className="drawer-subheader">
              <IconButton onClick={() => history.push(`${url.clients}/${id}`)}><KeyboardBackspace /></IconButton>
              <h5>{ labels.appTitle }</h5>
            </div>
            <div className='drawer-content client-content'>
                {isLoading ? <div className="loader"><CircularProgress /></div>
                : <>
                <h2 className="title">{ id ? labels.updateClient : labels.addClientButton }</h2>
                <Formik
                    initialValues={ emptyData }
                    onSubmit={(values, {resetForm}) => {
                        if (id) {
                            updateClientItem(id, {...values, avatar: null, rodo: null, phone: formatPhone(values.phone)}, values.avatar, values.rodo);
                            history.push(`${url.clients}/${id}`);
                            getClientItem(id);
                        } else {
                            createClientItem({...values, avatar: null, rodo: null, phone: formatPhone(values.phone)}, values.avatar, values.rodo);
                            resetForm();
                        }
                        window.scrollTo(0, 0);
                    }}
                    validate={ values => {
                        const errors = {}

                        if (!values.phone) {
                            errors.phone = labels.phoneRequiredError;
                        } else if (formatPhone(values.phone).length !== 12) {
                            errors.phone = labels.phoneFormatError;
                        }

                        if (!values.name) {
                            errors.name = labels.nameRequiredError;
                        }

                        if (!values.surname) {
                            errors.surname = labels.surnameRequiredError;
                        }

                        if (!values) {
                            errors.surname = labels.surnameRequiredError;
                        }
                        return errors;
                    }}
                    render={({ values, errors, touched, setFieldValue }) => (
                        <Form className="form">
                            {showAlert && touched.name && createAlertError({onClose: () => setAlert(false)})}
                            {showSuccessAlert && touched.name && createAlertSuccess({onClose: () => setSuccessAlert(false)})}

                            <h3>{labels.requiredInformation}</h3>
                            <Grid container spacing={ 1 }>
                                <Grid item xs={ 12 }>
                                    <CustomValidationField
                                        placeholder={ labels.phone }
                                        error={ errors.phone }
                                        touched={ touched.phone }
                                        value={ values.phone }
                                        name="phone"
                                        isPhoneField
                                    />
                                </Grid>
                                <Grid item xs={ 12 }>
                                    <CustomValidationField
                                        placeholder={ labels.name }
                                        error={ errors.name }
                                        touched={ touched.name }
                                        value={ values.name }
                                        name="name"
                                    />
                                </Grid>
                                <Grid item xs={ 12 }>
                                    <CustomValidationField
                                        placeholder={ labels.surname }
                                        error={ errors.surname }
                                        touched={ touched.surname }
                                        value={ values.surname }
                                        name="surname"
                                    />
                                </Grid>
                                <Grid item xs={ 12 }>
                                    <h3>{labels.privacyDocuments}</h3>
                                </Grid>
                                <Grid item xs={ 12 }>
                                    <FileUpload 
                                        id="rodo" 
                                        name="rodo" 
                                        label={labels.addScan}
                                        setImage={value => {setFieldValue('rodo', value)}} 
                                        onDelete={() => {setFieldValue('rodo', undefined)}} 
                                        value={values.rodo}
                                    />
                                </Grid>
                                <Grid item xs={ 12 }>
                                    <h3>{labels.additionalInfo}</h3>
                                </Grid>
                                <Grid item xs={ 12 }>
                                    <FileUpload 
                                        id="avatar"
                                        name="avatar"
                                        label={labels.addPhoto}
                                        setImage={value => {setFieldValue('avatar', value)}} 
                                        onDelete={() => {setFieldValue('avatar', undefined)}} 
                                        value={values.avatar}
                                    />
                                </Grid>
                                <Grid className='small-field' item xs={ 12 }>
                                    <CustomValidationField
                                        placeholder={ labels.additionalInfo }
                                        error={ errors.additionalInfo }
                                        touched={ values.additionalInfo && touched.additionalInfo }
                                        value={ values.additionalInfo }
                                        name="additionalInfo"
                                        multiline
                                        simple
                                    />
                                </Grid>
                                <Grid className='small-field' item xs={ 12 }>
                                    <CustomValidationField
                                        placeholder={ labels.email }
                                        error={ errors.email }
                                        touched={ values.email && touched.email }
                                        value={ values.email }
                                        name="email"
                                        type="email"
                                        simple
                                    />
                                </Grid>
                                <Grid item xs={ 12 }>
                                    <DatePicker
                                        className="date-picker"
                                        placeholder={labels.birthDate}
                                        variant="outlined"
                                        format="dd.MM.yyyy"
                                        value={values.birthDate}
                                        onChange={(date) => setFieldValue('birthDate', date)}
                                        name="birthDate"
                                        animateYearScrolling
                                    />
                                </Grid>
                                <FormControl fullWidth>
                                    <Select
                                        name="sex"
                                        value={values.sex}
                                        onChange={({target}) => setFieldValue('sex', target.value)}
                                        fullWidth
                                    >
                                        <MenuItem value='female'>Kobieta</MenuItem>
                                        <MenuItem value='male'>Mężczyzna</MenuItem>
                                        <MenuItem value='other'>Inna</MenuItem>
                                    </Select>
                                </FormControl>
                                <Grid className='small-field' item xs={ 6 }>
                                    <CustomValidationField
                                        value={ values.city }
                                        error={ errors.city }
                                        touched={ values.city && touched.city }
                                        placeholder={ labels.city }
                                        name="city"
                                        simple
                                    />
                                </Grid>
                                <Grid className='small-field' item xs={ 6 }>
                                    <CustomValidationField
                                        value={ values.postCode }
                                        error={ errors.postCode }
                                        touched={ values.postCode && touched.postCode }
                                        placeholder={ labels.postCode }
                                        name="postCode"
                                        isPostCodeField
                                        simple
                                    />
                                </Grid>
                                <Grid className='small-field' item xs={ 6 }>
                                    <CustomValidationField
                                        value={ values.street }
                                        error={ errors.street }
                                        touched={ values.street && touched.street }
                                        placeholder={ labels.street }
                                        name="street"
                                        simple
                                    />
                                </Grid>
                                <Grid className='small-field' item xs={ 2 }>
                                    <CustomValidationField
                                        value={ values.streetNr }
                                        error={ errors.streetNr }
                                        touched={ touched.streetNr }
                                        name="streetNr"
                                        type="number"
                                        simple
                                    />
                                </Grid>
                                <Grid className="nr-break" item xs={ 1 }>/</Grid>
                                <Grid className='small-field' item xs={ 2 }>
                                    <CustomValidationField
                                        value={ values.houseNr }
                                        error={ errors.houseNr }
                                        touched={ touched.houseNr }
                                        name="houseNr"
                                        type="number"
                                        simple
                                    />
                                </Grid>
                            </Grid>

                            <div className="button-container">
                                <Button
                                    disabled={!values.phone || !values.name || !values.surname || isLoading}
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                >
                                    {id ? labels.save : labels.addClientButton}
                                </Button>
                            </div>
                        </Form>
                    )}
                /></>}
            </div>
        </>
    )
}

EditForm.propTypes = {
    history: PropTypes.shape(historyPropTypes)
};

const mapStateToProps = (state) => ({
    isLoading: state.clients?.status === statusType.loading,
    addingStatus: state.clients?.changeStatus,
    client: state.clients?.client
});

const mapDispatchToProps = (dispatch) => ({
    createClientItem: (data, avatar, rodo) => dispatch(addClient({data, avatar, rodo})),
    updateClientItem: (id, data, avatar, rodo) => dispatch(updateClient({id, data, avatar, rodo})),
    getClientItem: (id) => dispatch(getClient({id}))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditForm));