import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Formik, Form } from 'formik';
import { Button, Drawer, Grid } from '@material-ui/core';

import { formatPhone } from '../../../components/Form/ValidationTextField';
import { addCompany } from '../../../actions/CompanyActions';
import { statusType } from '../../../constants';
import labels from '../../../assets/labels';
import CompanyDetails from '../../../components/Form/CompanyDetails';
import '../Registration.scss';

const CompanyDetailsForm = ({ open, handleOpen,companyStatus, userId, isLoading, createCompany }) => {
    const addCompanyDetails = (values) => {
        createCompany({ ...values, admin: userId });
        handleOpen('createCompanyHours');
    };

    React.useEffect(() => {
        if (companyStatus === statusType.success) {
            handleOpen('createCompanyHours');
        }
    }, [companyStatus]);

    return (
        <Drawer anchor="right" open={ open }>
            <div className='drawer-middle'>
                <div className="drawer-subheader">
                    <h5>{ labels.appTitle }</h5>
                </div>
                <div className='drawer-content'>
                    <h2 className="details-title">{ labels.companyDetailsTitle }</h2>
                    <p>{ labels.companyDetailsCopy }</p>
                    <Formik
                        initialValues={{
                            name: '',
                            phone: '',
                            city: '',
                            postcode: '',
                            street: '',
                            streetNr: '',
                            houseNr: '',
                            nip: ''
                        }}
                        validate={ values => {
                            const errors = {}
                            if (!values.name) {
                                errors.name = labels.companyNameRequiredError;
                            }
                            if (formatPhone(values.phone).length !== 12) {
                                errors.phone = labels.phoneFormatError;
                            }
                            return errors;
                        }}
                        render={(props) => {
                            return (
                                <Form className="form company-details">
                                     <CompanyDetails {...props} />
                                    <div className="registration__button-container">
                                        <Button
                                            disabled={ !props.values.name || isLoading}
                                            variant="contained"
                                            color="primary"
                                            onClick={ () => addCompanyDetails(props.values) }
                                        >
                                            { labels.workingHours }
                                        </Button>
                                    </div>
                                </Form>
                            )
                        }}
                    />
                </div>
                <div className="registration__footer">
                    <div className="registration__footer__button">
                        <p>{ labels.loginCopy }</p>
                        <Button onClick={ () => handleOpen('login', true) } className="font-button font-button--big">{ labels.loginButtonLabel }</Button>
                    </div>
                </div>
            </div>
        </Drawer>
    );
}

CompanyDetailsForm.propTypes = {
    open: PropTypes.bool.isRequired,
    handleOpen: PropTypes.func.isRequired,
    setCompany: PropTypes.func.isRequired,
    userId: PropTypes.string
};

const mapStateToProps = (state) => ({
    company: state.company?.data,
    isLoading: state.company?.status === statusType.loading,
    companyStatus: state.company?.status,
});

const mapDispatchToProps = (dispatch) => ({
    createCompany: (data) => dispatch(addCompany({data}))
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDetailsForm);
