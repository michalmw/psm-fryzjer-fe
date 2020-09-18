import * as React from 'react';

import { Field } from 'formik';
import { Checkbox } from 'formik-material-ui';
import { Grid } from '@material-ui/core';

import { weekDays, week } from '../../constants';
import labels from '../../assets/labels';
import CustomValidationField from './ValidationTextField';
import './Registration.scss';

const CompanyHoursForm = ({values, touched, errors, setFieldValue}) => (
    <>
        { week.map(day => (
            <div className="hour-group">                
                <Grid container item key={ day } spacing={ 3 }>
                    <Grid xs={ 6 }>
                        <Field 
                            name={`${ day }Active`} 
                            component={ Checkbox } 
                            checked={ values[`${ day }Active`] } 
                            onChange={ () => setFieldValue(`${ day }Active`, !values[`${ day }Active`]) }
                            type="checkbox"
                        />
                        { weekDays[day] }
                    </Grid>
                    <Grid className='small-field' item xs={ 3 }>
                        <CustomValidationField
                            name={ `${ day }From` } 
                            value={ values[`${day}From`] }
                            placeholder={ labels.from }
                            touched={ touched[`${ day }From`]}
                            error={ errors[`${ day }From`]}
                            onChange={value => { setFieldValue(`${ day }From`, value)}}
                            simple
                        />
                    </Grid>
                    <Grid className='small-field' item xs={ 3 }>
                    <CustomValidationField
                            name={ `${ day }To` } 
                            value={ values[`${day}To`] }
                            placeholder={ labels.from }
                            touched={ touched[`${ day }To`]}
                            error={ errors[`${ day }To`]}
                            onChange={value => { setFieldValue(`${ day }To`, value)}}
                            simple
                        />
                    </Grid>
                </Grid>
            </div>
        ))}
    </>
);

export default CompanyHoursForm;
