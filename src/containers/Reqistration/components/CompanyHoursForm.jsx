import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Formik, Form } from 'formik';
import { KeyboardBackspace } from '@material-ui/icons';
import { Button, IconButton, Drawer } from '@material-ui/core';

import { addCompany } from '../../../actions/CompanyActions';
import { statusType } from '../../../constants';
import CompanyHours from '../../../components/Form/CompanyHours';
import labels from '../../../assets/labels';
import '../Registration.scss';

const initialValues = {
    monActive: false,
    tueActive: false,
    wedActive: false,
    thuActive: false,
    friActive: false,
    satActive: false,
    sunActive: false,
    monFrom: null,
    monTo: null,
    wedFrom: null,
    wedTo: null,
    tueFrom: null,
    tueTo: null,
    thuFrom: null,
    thuTo: null,
    friFrom: null,
    friTo: null,
    satFrom: null,
    satTo: null,
    sunFrom: null,
    sunTo: null
}

const CompanyHoursForm = ({ open, handleOpen, userId, createCompany, companyStatus }) => {
    const addCompanyHour = (values) => {
        createCompany({ ...values, admin: userId });
        handleOpen('congratulationsCompany');
    };

    React.useEffect(() => {
        if (companyStatus === statusType.success) {
            handleOpen('congratulationsCompany');
        }
    }, [companyStatus]);

    return (
        <Drawer anchor="right" open={ open }>
            <div className='drawer-middle'>
                <div className="drawer-subheader">
                    <IconButton onClick={ () => handleOpen('login', false) }><KeyboardBackspace /></IconButton>
                    <h5>{ labels.appTitle }</h5>
                </div>
                <div className='drawer-content'>
                    <h2 className="details-title">{ labels.companyHoursTitle }</h2>
                    <p>{ labels.companyHoursCopy }</p>
                    <Formik
                        initialValues={ initialValues }
                        render={ (props) => {
                            return (
                                <Form className="form company-details">
                                    <CompanyHours {...props} />
                                    <div className="registration__button-container">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={ () => addCompanyHour(props.values) }
                                        >
                                            { labels.createProfileButton }
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

CompanyHoursForm.propTypes = {
    open: PropTypes.bool.isRequired,
    handleOpen: PropTypes.func.isRequired,
    name: PropTypes.string,
    userId: PropTypes.number,
};

const mapStateToProps = (state) => ({
    company: state.company?.data,
    isLoading: state.company?.status === statusType.loading,
    companyStatus: state.company?.status,
});

const mapDispatchToProps = (dispatch) => ({
    createCompany: (data) => dispatch(addCompany({data}))
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyHoursForm);
