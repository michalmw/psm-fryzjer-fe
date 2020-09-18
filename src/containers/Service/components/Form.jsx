import * as React from 'react';
import PropTypes from 'prop-types';
import { history as historyPropTypes } from 'history-prop-types';

import { connect } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { Button, IconButton, Grid } from '@material-ui/core';
import { TextField } from 'formik-material-ui'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { KeyboardBackspace } from "@material-ui/icons";

import { addService, getService, updateService } from '../../../actions/ServiceActions';
import { url } from '../../../constants';
import CustomValidationField from '../../../components/Form/ValidationTextField';
import { getMe } from '../../../actions/UserActions';
import { getCategories, addCategory } from '../../../actions/CategoryActions';
import { createAlertError, createAlertSuccess } from '../../../components/Form/Alerts';
import { statusType } from '../../../constants';
import labels from '../../../assets/labels';
import '../Service.scss'

const filter = createFilterOptions();

const EditForm  = ({ 
    history, 
    createServiceItem, 
    addingStatus, 
    isLoading, 
    getCategoryList, 
    categories, 
    createCategory, 
    categoryStatus, 
    getServiceItem, 
    service, 
    changeService, 
    me, 
    getMyAccount
 }) => {
    const { id } = useParams();
    const emptyData = { 
        name: service?.name || '', 
        priceFrom: service?.priceFrom || '', 
        priceTo: service?.priceTo || '', 
        timeFrom: service?.timeFrom || '', 
        timeTo: service?.timeTo || '', 
        category: service?.category || '' 
    };
    
    const [showAlert, setAlert] = React.useState(false);
    const [showSuccessAlert, setSuccessAlert] = React.useState(false);

    const handleCreate = (values) => {
        createServiceItem(values);
        if (addingStatus === statusType.error) {
            setAlert(true);
        }
    }
    React.useEffect(() => {
        if (id) {
            getServiceItem(id);
        }
        if (me?.company) {
          getCategoryList(me.company);
        } else {
          getMyAccount();
        }
      }, []);
    
      React.useEffect(() => {
        if (me?.company) {
          getCategoryList(me.company);
        }
      }, [me]);    

    React.useEffect(() => {
        if (addingStatus === statusType.success) {
            if (id) {
                history.push(url.services)
            } else {
                setAlert(false);
                setSuccessAlert(true);
            }
        }
        if (addingStatus === statusType.error) {
            setAlert(true);
            setSuccessAlert(false);
            
        }
        if (isLoading) {
            setAlert(false);
            setSuccessAlert(false);
        }
    }, [addingStatus, isLoading]);
    
    React.useEffect(() => {
        if (categoryStatus === statusType.success) {
            getCategoryList();
        }
    }, [categoryStatus]);

    return (
        <div>
           <div className="drawer-subheader">
              <IconButton onClick={() => history.push(url.services)}><KeyboardBackspace /></IconButton>
              <h5>{ labels.appTitle }</h5>
          </div>
            <div className='drawer-content service-content'>
                <h2 className="title">{ id ? labels.updateService : labels.addServiceButton }</h2>
                <Formik
                    enableReinitialize
                    initialValues={ emptyData }
                    onSubmit={(values, {resetForm}) => {
                        if (id) {
                            changeService(id, values);
                        } else {
                            handleCreate(values);
                            resetForm();
                        }
                      }}
                    render={({ values, errors, touched, setFieldValue }) => {
                        return (
                            <Form className="form">
                                {showAlert && !id && createAlertError({onClose: () => setAlert(false)})}
                                {showSuccessAlert && !id && createAlertSuccess({onClose: () => setSuccessAlert(false), label: labels.createServiceSuccess})}
                                <Grid container spacing={ 1 }>
                                    <Grid item xs={ 12 }>
                                        <CustomValidationField
                                            placeholder={ labels.serviceName }
                                            error={ errors.name }
                                            touched={ touched.name }
                                            name="name"
                                            value={values.name}
                                        />
                                    </Grid>
                                    <Grid item xs={ 12 }>
                                        <Autocomplete
                                            name="category"
                                            value={values.category}
                                            options={categories}
                                            getOptionLabel={option => {
                                                if (typeof option === 'string') {
                                                    return option;
                                                }
                                                if (option.inputValue) {
                                                    return option.inputValue;
                                                }
                                                return option.name;
                                            }}
                                            onChange={(e, newValue) => {
                                                if (newValue && newValue.inputValue) {
                                                    createCategory({name: newValue.inputValue})
                                                } else {
                                                    setFieldValue("category", newValue?._id)
                                                }
                                            }}
                                            renderOption={(option) => option.name}
                                            freeSolo
                                            filterOptions={(options, params) => {
                                            const filtered = filter(options, params);
                                    
                                            if (params.inputValue !== '') {
                                                filtered.push({
                                                    inputValue: params.inputValue,
                                                    name: `Dodaj "${params.inputValue}"`,
                                                });
                                            }
                                    
                                            return filtered;
                                            }}
                                            renderInput={params => (
                                                <Field
                                                    {...params}
                                                    inputProps={{...params.inputProps, value: values.category && categories?.find(item => item._id === values.category || item._id === service?.category)?.name}}
                                                    component={TextField}
                                                    placeholder={ labels.category } 
                                                    name="category" 
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={ 3 }><p>{labels.price}</p></Grid>
                                    <Grid className='small-field' item xs={ 4 }>
                                    <CustomValidationField
                                        error={ errors.priceFrom }
                                        touched={ touched.priceFrom }
                                        name="priceFrom"
                                        value={values.priceFrom}
                                        type="number"
                                        simple
                                    />
                                    </Grid>
                                    <Grid item xs={ 1 }><p>-</p></Grid>
                                    <Grid className='small-field' item xs={ 4 }>
                                    <CustomValidationField
                                        error={ errors.priceTo }
                                        touched={ touched.priceTo }
                                        value={values.priceTo}
                                        name="priceTo"
                                        type="number"
                                        simple
                                    />
                                    </Grid>
                                    <Grid item xs={ 3 } sm={ 3 }><p>{labels.time}</p></Grid>
                                    <Grid className='small-field' item xs={ 4 }>
                                    <CustomValidationField
                                        error={ errors.timeFrom }
                                        touched={ touched.timeFrom }
                                        value={values.timeFrom}
                                        name="timeFrom"
                                        type="number"
                                        simple
                                    />
                                    </Grid>
                                    <Grid item xs={ 1 }><p>-</p></Grid>
                                    <Grid className='small-field' item xs={ 4 }>
                                    <CustomValidationField
                                        error={ errors.timeTo }
                                        touched={ touched.timeTo }
                                        value={values.timeTo}
                                        name="timeTo"
                                        type="number"
                                        simple
                                    />
                                    </Grid>
                                </Grid>
                                
                                <div className="button-container">
                                    <Button
                                        type="submit"
                                        disabled={ !values.name || isLoading }
                                        variant="contained"
                                        color="primary"
                                    >
                                        { id ? labels.updateService : labels.addServiceButton }
                                    </Button>
                                </div> 
                            </Form>
                        )
                    }}
                />
            </div>
        </div>
    )
}

EditForm.propTypes = {
    history: PropTypes.shape(historyPropTypes).isRequired,
    createService: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    isLoading: state.services?.addingStatus === statusType.loading,
    addingStatus: state.services?.changeStatus,
    categories: state.categories?.data,
    me: state.users?.me,
    service: state.services?.service,
    categoryStatus: state.categories?.addingStatus
});

const mapDispatchToProps = (dispatch) => ({
    createServiceItem: (data) => dispatch(addService({data})),
    getCategoryList: (companyId) => dispatch(getCategories({companyId})),
    getServiceItem: (id) => dispatch(getService({id})),
    getMyAccount: () => dispatch(getMe()),
    createCategory: (data) => dispatch(addCategory({data})),
    changeService: (id, data) => dispatch(updateService({id, data}))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditForm));
