import * as React from 'react';
import PropTypes from 'prop-types';
import { history as historyPropTypes } from 'history-prop-types';

import { connect } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { Button, IconButton, Grid } from '@material-ui/core';
import { KeyboardBackspace } from "@material-ui/icons";

import { addProduct, getProduct, updateProduct } from '../../../actions/ProductActions';
import { url } from '../../../constants';
import CustomValidationField from '../../../components/Form/ValidationTextField';
import { createAlertError, createAlertSuccess } from '../../../components/Form/Alerts';
import { statusType } from '../../../constants';
import labels from '../../../assets/labels';
import '../Warehouse.scss'

const EditForm  = ({ history, createProductItem, addingStatus, isLoading, getProductItem, product, changeProduct }) => {
    const { id } = useParams();
    const emptyData = { 
        name: product?.name || '', 
        priceBuy: product?.priceBuy || '', 
        priceBuyVat: product?.priceBuyVat || '', 
        priceSell: product?.priceSell || '', 
        priceSellVat: product?.priceSellVat || '', 
        quantity: product?.quantity || '' 
    };

    const [showAlert, setAlert] = React.useState(false);
    const [showSuccessAlert, setSuccessAlert] = React.useState(false);

    const handleCreate = (values) => {
        createProductItem(values);
        if (addingStatus === statusType.error) {
            setAlert(true);
        }
    }

    const getBuyPrice = (price, vat) => price && vat && parseFloat(price) + (parseFloat(vat) * parseFloat(price) / 100) || 0;

    React.useEffect(() => {
        if (id) {
            getProductItem(id);
        }
      }, []);

    React.useEffect(() => {
        if (addingStatus === statusType.success) {
            if (id) {
                history.push(url.products)
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

    return (
        <div>
           <div className="drawer-subheader">
              <IconButton onClick={() => history.push(url.products)}><KeyboardBackspace /></IconButton>
              <h5>{ labels.appTitle }</h5>
          </div>
            <div className='drawer-content product-content'>
                <h2 className="title">{ id ? labels.updateProduct : labels.addProductButton }</h2>
                <Formik
                    enableReinitialize
                    initialValues={ emptyData }
                    onSubmit={(values, {resetForm}) => {
                        if (id) {
                            changeProduct(id, values);
                        } else {
                            handleCreate(values);
                            resetForm();
                            window.scrollTo(0, 0);
                        }
                      }}
                    render={({ values, errors, touched }) => {
                        return (
                            <Form className="form">
                                {showAlert && !id && createAlertError({onClose: () => setAlert(false)})}
                                {showSuccessAlert && !id && createAlertSuccess({onClose: () => setSuccessAlert(false), label: labels.createProductSuccess})}
                                <Grid container spacing={ 3 }>
                                    <Grid item xs={ 12 }>
                                        <CustomValidationField
                                            placeholder={ labels.productName }
                                            error={ errors.name }
                                            touched={ touched.name }
                                            value={ values.name }
                                            name="name"
                                        />
                                    </Grid>
                                    <Grid item xs={ 6 }><p>{labels.buyNetto}</p></Grid>
                                    <Grid className='small-field' item xs={ 4 }>
                                        <CustomValidationField
                                            error={ errors.priceBuy }
                                            touched={ touched.priceBuy }
                                            value={ values.priceBuy }
                                            name="priceBuy"
                                            type="number"
                                            simple
                                        />
                                    </Grid>
                                    <Grid item xs={ 1 }><p>zł</p></Grid>
                                    <Grid item xs={ 6 }><p>{labels.vat}</p></Grid>
                                    <Grid className='small-field' item xs={ 4 }>
                                        <CustomValidationField
                                            error={ errors.priceBuyVat }
                                            touched={ touched.priceBuyVat }
                                            value={ values.priceBuyVat }
                                            name="priceBuyVat"
                                            type="number"
                                            simple
                                        />
                                    </Grid>
                                    <Grid item xs={ 1 }><p>%</p></Grid>
                                    <Grid item xs={ 8 }><p>{labels.buyBrutto}</p></Grid>
                                    <Grid item xs={ 2 }><p>{getBuyPrice(values.priceBuy, values.priceBuyVat)}</p></Grid>
                                    <Grid item xs={ 1 }><p>zł</p></Grid>
                                    <Grid item xs={ 6 }><p>{labels.sellNetto}</p></Grid>
                                    <Grid className='small-field' item xs={ 4 }>
                                        <CustomValidationField
                                            error={ errors.priceSell }
                                            touched={ touched.priceSell }
                                            value={ values.priceSell }
                                            name="priceSell"
                                            type="number"
                                            simple
                                        />
                                    </Grid>
                                    <Grid item xs={ 1 }><p>zł</p></Grid>
                                    <Grid item xs={ 6 }><p>{labels.vat}</p></Grid>
                                    <Grid className='small-field' item xs={ 4 }>
                                    <CustomValidationField
                                        error={ errors.priceSellVat }
                                        touched={ touched.priceSellVat }
                                        value={ values.priceSellVat }
                                        name="priceSellVat"
                                        type="number"
                                        simple
                                    />
                                    </Grid>
                                    <Grid item xs={ 1 }><p>%</p></Grid>
                                    <Grid item xs={ 8 }><p>{labels.sellBrutto}</p></Grid>
                                    <Grid item xs={ 2 }><p>{getBuyPrice(values.priceSell, values.priceSellVat)}</p></Grid>
                                    <Grid item xs={ 1 }><p>zł</p></Grid>
                                    <Grid item xs={ 6 }><p>{labels.quantity}</p></Grid>
                                    <Grid className='small-field' item xs={ 4 }>
                                    <CustomValidationField
                                        error={ errors.quantity }
                                        touched={ touched.quantity }
                                        value={ values.quantity }
                                        name="quantity"
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
                                        { id ? labels.updateProduct : labels.addProductButton }
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
    createProduct: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    isLoading: state.products?.addingStatus === statusType.loading,
    addingStatus: state.products?.changeStatus,
    product: state.products?.product
});

const mapDispatchToProps = (dispatch) => ({
    createProductItem: (data) => dispatch(addProduct({data})),
    getProductItem: (id) => dispatch(getProduct({id})),
    changeProduct: (id, data) => dispatch(updateProduct({id, data}))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditForm));
