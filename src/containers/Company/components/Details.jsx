import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { history as historyPropTypes } from 'history-prop-types';
import { withRouter, useParams, Link } from 'react-router-dom';

import { IconButton, CircularProgress, Button, Grid} from '@material-ui/core';
import { KeyboardBackspace } from "@material-ui/icons";

import { getCompany } from '../../../actions/CompanyActions';
import { getMe } from '../../../actions/UserActions';
import Navbar from '../../../components/layout/Navbar'
import labels from '../../../assets/labels';
import { url, statusType, week, weekDays } from '../../../constants'; 
import CustomAvatar from '../../../components/Form/CustomAvatar';
import { displayPhone } from '../../../components/Form/ValidationTextField'

const Details  = ({ history, company, isLoading, getCompanyItem, me, getMyAccount }) => {
  const [isMe, setMe] = React.useState(false);
  const { id } = useParams();

  React.useEffect(() => {
    if (!me?._id) {
      getMyAccount();
    }
  }, []);

  React.useEffect(() => {
    if (me?._id === company?.admin) {
      setMe(true);
    }
  }, [me]);

  React.useEffect(() => {
    getCompanyItem(id);
  }, []);

  const showHours =  company?._id 
    && (company?.monActive
    || company?.tueActive
    || company?.wedActive
    || company?.thuActive
    || company?.friActive
    || company?.satActive
    || company?.sunActive);
  
  return (
    <div className="company">
      {isLoading
        ? <div className="loader"><CircularProgress /></div>
        : <div>
            <div className="client-subheader" >
              <div className="client-subheader__content">
                  <IconButton onClick={() => history.push(url.calendar)}><KeyboardBackspace /></IconButton>
                  <CustomAvatar avatar={company?.avatar} name={company?.name} surname={company?.surname} />
                  <div className="client-info">
                    <h2>{ company?.name }</h2>
                    <p><strong>{ displayPhone(company?.phone) || labels.noPhone }</strong></p>
                    <p>{ company?.additionalInfo || labels.noAdditionalInfo}</p>
                    <div className="new-section">
                      <i><p>{ company?.street && company?.streetNr 
                      && `${labels.address}: ${company.street} ${company.streetNr} ${company.houseNr ? '/ ' + company.houseNr : ''}`}</p></i>
                      <i><p>{ company?.city && `${company.postcode || ''} ${company.city}`}</p></i>
                    </div>
                  </div>
              </div>
              <div className="action">
                {isMe && 
                <Link to={`${url.companies}/edit/${id}`}>
                    <Button>{labels.editCompany}</Button>
                </Link>
                }
              </div>
            </div>
            { showHours ? <div className="user-card">
                <h3>{labels.userWorkingHours}</h3>
            { week.map(day => (
              <div className="hour-group">                
                  <Grid container item key={ day } spacing={ 2 }>
                      <Grid xs={ 5 }>
                          <p><strong>{ weekDays[day] }</strong></p>
                      </Grid>
                      <Grid item xs={ 3 }>
                        <p>{company?.[`${day}From`]}</p>
                      </Grid>
                      <Grid item xs={ 1 }> - </Grid>
                      <Grid item xs={ 3 }>
                        <p>{company?.[`${day}To`]}</p>
                      </Grid>
                  </Grid>
              </div>
          ))}
            </div> : <div className="user-card">{labels.noWorkinHours}</div>}
          </div>}
        <Navbar/>
    </div>
  )
}

Details.propTypes = {
  history: PropTypes.shape(historyPropTypes)
};

const mapStateToProps = (state) => ({
  company: state.companies.company,
  isLoading: state.companies.status === statusType.loading,
  deleteStatus: state.companies.deleteStatus,
  me: state.users?.me
});

const mapDispatchToProps = (dispatch) => ({
  getCompanyItem: (id) => dispatch(getCompany({id})),
  getMyAccount: () => dispatch(getMe())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Details));
