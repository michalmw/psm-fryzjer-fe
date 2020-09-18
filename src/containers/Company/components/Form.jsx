import * as React from 'react';
import PropTypes from 'prop-types';
import { history as historyPropTypes } from 'history-prop-types';

import { connect } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';

import { Formik, Form } from 'formik';
import { KeyboardBackspace } from "@material-ui/icons";
import { Button, Grid, IconButton, CircularProgress} from '@material-ui/core';

import { url, statusType } from '../../../constants';
import { getCompany, updateCompany } from '../../../actions/CompanyActions';
import { formatPhone } from '../../../components/Form/ValidationTextField';
import CompanyHours from '../../../components/Form/CompanyHours';
import CompanyDetails from '../../../components/Form/CompanyDetails';

import labels from '../../../assets/labels';
import '../Company.scss';

const defaultStart = '9:00';
const defaultEnd = '16:00';

const EditForm  = ({ history, isLoading, getCompanyItem, company, updateCompanyItem }) => {
    const emptyData = { 
        name: company?.name || '',
        phone: company?.phone || '',
        city: company?.city || '',
        postcode: company?.postcode || '',
        street: company?.street || '',
        streetNr: company?.streetNr || '',
        houseNr: company?.houseNr || '',
        nip: company?.nip || '',
        monActive: company?._id ? company?.monActive : true,
        tueActive: company?._id ? company?.tueActive : true,
        wedActive: company?._id ? company?.wedActive : true,
        thuActive: company?._id ? company?.thuActive : true,
        friActive: company?._id ? company?.friActive : true,
        satActive: company?._id ? company?.satActive : true,
        sunActive: company?._id ? company?.sunActive : true,
        monFrom: company?.monFrom || defaultStart,
        monTo: company?.monTo || defaultEnd,
        wedFrom: company?.wedFrom || defaultStart,
        wedTo: company?.wedTo || defaultEnd,
        tueFrom: company?.tueFrom || defaultStart,
        tueTo: company?.tueTo || defaultEnd,
        thuFrom: company?.thuFrom || defaultStart,
        thuTo: company?.thuTo || defaultEnd,
        friFrom: company?.friFrom || defaultStart,
        friTo: company?.friTo || defaultEnd,
        satFrom: company?.satFrom || defaultStart,
        satTo: company?.satTo || defaultEnd,
        sunFrom: company?.sunFrom || defaultStart,
        sunTo: company?.sunTo || defaultEnd
    };
    const { id } = useParams();

    React.useEffect(() => {
        window.scrollTo(0, 0);
       if (id) {
           getCompanyItem(id);
       }
    }, []);

    return (
        <>
            <div className="drawer-subheader">
              <IconButton onClick={() => history.push(`${url.companies}/${id}`)}><KeyboardBackspace /></IconButton>
              <h5>{ labels.appTitle }</h5>
            </div>
            <div className='drawer-content company-content'>
                {isLoading ? <div className="loader"><CircularProgress /></div>
                : <>
                <h2 className="title">{ id ? labels.editCompany : labels.addCompany }</h2>
                <Formik
                        initialValues={emptyData}
                        onSubmit={(values) => {
                            updateCompanyItem(id, {...values, phone: formatPhone(values.phone)});
                            history.push(`${url.companies}/${id}`);
                            getCompanyItem(id)
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
                                    <div className="user-hours">
                                        <Grid item xs={ 12 }>
                                            <h3>{labels.userWorkingHours}</h3>
                                        </Grid>
                                    </div>
                                    <CompanyHours {...props} />
                                    <div className="registration__button-container">
                                        <Button
                                            disabled={ !props.values.name || isLoading}
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                        >
                                            { labels.save }
                                        </Button>
                                    </div>
                                </Form>
                            )
                        }}
                    />
                </>}
            </div>
        </>
    )
}

EditForm.propTypes = {
    history: PropTypes.shape(historyPropTypes)
};

const mapStateToProps = (state) => ({
    isLoading: state.companys?.status === statusType.loading,
    addingStatus: state.companys?.changeStatus,
    company: state.companys?.company
});

const mapDispatchToProps = (dispatch) => ({
    updateCompanyItem: (id, data, avatar, rodo) => dispatch(updateCompany({id, data, avatar, rodo})),
    getCompanyItem: (id) => dispatch(getCompany({id}))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditForm));