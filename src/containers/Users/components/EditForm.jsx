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
import { getMe, updateUser } from '../../../actions/UserActions';
import CustomValidationField, { formatPhone, getPhoneNumber } from '../../../components/Form/ValidationTextField';
import { createAlertError, createAlertSuccess } from '../../../components/Form/Alerts';
import CompanyHours from '../../../components/Form/CompanyHours';

import FileUpload from '../../../components/Form/FileUpload';
import labels from '../../../assets/labels';
import '../Users.scss';
import { imageApi } from '../../../enviroments/config';

const defaultStart = '9:00';
const defaultEnd = '16:00';

const EditForm  = ({ history, addingStatus, isLoading, getMyAccount, user, updateUserItem }) => {
    const emptyData = { 
        name: user?.name || '', 
        phone: user?.phone && getPhoneNumber(user.phone) ||' ', 
        surname: user?.surname ||  '', 
        avatar: user?.avatar ? `${imageApi}${user.avatar}` : '', 
        sex: user?.sex || 'female', 
        email: user?.email || '', 
        city: user?.city || '', 
        streetNr: user?.streetNr || null, 
        houseNr: user?.houseNr || null, 
        street: user?.street || '',
        postCode: user?.postCode || '',
        birthDate: user?.birthDate || null,
        monActive: user?._id ? user?.monActive : true,
        tueActive: user?._id ? user?.tueActive : true,
        wedActive: user?._id ? user?.wedActive : true,
        thuActive: user?._id ? user?.thuActive : true,
        friActive: user?._id ? user?.friActive : true,
        satActive: user?._id ? user?.satActive : true,
        sunActive: user?._id ? user?.sunActive : true,
        monFrom: user?.monFrom || defaultStart,
        monTo: user?.monTo || defaultEnd,
        wedFrom: user?.wedFrom || defaultStart,
        wedTo: user?.wedTo || defaultEnd,
        tueFrom: user?.tueFrom || defaultStart,
        tueTo: user?.tueTo || defaultEnd,
        thuFrom: user?.thuFrom || defaultStart,
        thuTo: user?.thuTo || defaultEnd,
        friFrom: user?.friFrom || defaultStart,
        friTo: user?.friTo || defaultEnd,
        satFrom: user?.satFrom || defaultStart,
        satTo: user?.satTo || defaultEnd,
        sunFrom: user?.sunFrom || defaultStart,
        sunTo: user?.sunTo || defaultEnd
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
        getMyAccount();
    }, []);

    return (
        <>
            <div className="drawer-subheader">
              <IconButton onClick={() => history.push(`${url.users}/me`)}><KeyboardBackspace /></IconButton>
              <h5>{ labels.appTitle }</h5>
            </div>
            <div className='drawer-content user-content'>
                {isLoading ? <div className="loader"><CircularProgress /></div>
                : <>
                <h2 className="title">{ labels.editUser }</h2>
                <Formik
                    initialValues={ emptyData }
                    onSubmit={(values) => {
                        updateUserItem(id, {...values, avatar: null, rodo: null, phone: formatPhone(values.phone)}, values.avatar, values.rodo);
                        history.push(`${url.users}/me`);
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

                            <div className="user-hours">
                                <h3>{labels.requiredInformation}</h3>
                            </div>
                            <Grid container spacing={ 1 }>
                                <Grid item xs={ 12 }>
                                    <CustomValidationField
                                        placeholder={ labels.phone }
                                        error={ errors.phone }
                                        touched={ touched.phone }
                                        value={ values.phone }
                                        name="phone"
                                        isPhoneField
                                        disabled
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
                            <div className="user-hours">
                                <Grid item xs={ 12 }>
                                    <h3>{labels.userWorkingHours}</h3>
                                </Grid>
                            </div>
                            <CompanyHours values={values} touched={touched} errors={errors} setFieldValue={setFieldValue} />

                            <div className="button-container">
                                <Button
                                    disabled={!values.phone || !values.name || !values.surname || isLoading}
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                >
                                    {labels.save}
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
    isLoading: state.users?.status === statusType.loading,
    addingStatus: state.users?.changeStatus,
    user: state.users?.me
});

const mapDispatchToProps = (dispatch) => ({
    updateUserItem: (id, data, avatar, rodo) => dispatch(updateUser({id, data, avatar, rodo})),
    getMyAccount: () => dispatch(getMe())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditForm));