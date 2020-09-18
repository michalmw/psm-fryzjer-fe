import * as React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';

import CustomValidationField from './ValidationTextField';
import labels from '../../assets/labels';
import './Registration.scss';

const CompanyDetailsForm = ({ errors, touched}) => (
     <>
        <Grid container spacing={ 3 }>
            <Grid className='small-field' item xs={ 12 }>
                <CustomValidationField
                    error={ errors.name }
                    touched={ touched.name }
                    placeholder={ labels.companyName }
                    name="name"
                />
            </Grid>
            <Grid className='small-field' item xs={ 12 }>
                <CustomValidationField
                    error={ errors.phone }
                    touched={ touched.phone }
                    placeholder={ labels.companyPhone }
                    name="phone"
                    isPhoneField
                />
            </Grid>
            <Grid className='small-field' item xs={ 7 }>
                <CustomValidationField
                    error={ errors.city }
                    touched={ touched.city }
                    placeholder={ labels.city }
                    name="city"
                    simple
                />
            </Grid>
            <Grid className='small-field' item xs={ 5 }>
                <CustomValidationField
                    error={ errors.postCode }
                    touched={ touched.postCode }
                    placeholder={ labels.postCode }
                    name="postcode"
                    simple
                />
            </Grid>
            <Grid className='small-field' item xs={ 7 }>
                <CustomValidationField
                    error={ errors.street }
                    touched={ touched.street }
                    placeholder={ labels.street }
                    name="street"
                    simple
                />
            </Grid>
            <Grid className='small-field' item xs={ 2 }>
                <CustomValidationField
                    error={ errors.streetNr }
                    touched={ touched.streetNr }
                    placeholder={ labels.nr }
                    name="streetNr"
                    simple
                />
            </Grid>
            <Grid className='small-field nr-break' item xs={ 0.5 }>/</Grid>
            <Grid item xs={ 2 }>
                <CustomValidationField
                    error={ errors.houseNr }
                    touched={ touched.houseNr }
                    placeholder={ labels.nr }
                    name="houseNr"
                    simple
                />
            </Grid>
            <Grid className='small-field' item xs={ 12 }>
                <CustomValidationField
                    error={ errors.nip }
                    touched={ touched.nip }
                    placeholder={ labels.nip }
                    name="nip"
                    simple
                />
            </Grid>
        </Grid>
    </>
);


CompanyDetailsForm.propTypes = {
    errors: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired
};

export default CompanyDetailsForm;
