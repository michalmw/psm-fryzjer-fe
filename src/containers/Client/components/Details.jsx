import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { connect } from 'react-redux';
import { history as historyPropTypes } from 'history-prop-types';
import { withRouter, useParams, Link } from 'react-router-dom';

import { IconButton, CircularProgress, Avatar, Button} from '@material-ui/core';
import { KeyboardBackspace } from "@material-ui/icons";

import { getClient, deleteClient } from '../../../actions/ClientsActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSms, faPhone, faPlus, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import Navbar from '../../../components/layout/Navbar'
import VisitList from '../../../components/Form/VisitList';
import labels from '../../../assets/labels';
import { url, statusType } from '../../../constants'; 
import { imageApi } from '../../../enviroments/config';
import { getVisits } from '../../../actions/VisitActions';
import CustomAvatar from '../../../components/Form/CustomAvatar';

const Details  = ({ history, client, isLoading, getClientItem, getVisits, visits, deleteStatus }) => {
  const { id } = useParams();
  const [filteredVisits, setVisits] = React.useState([]);
 
  React.useEffect(() => {
    getClientItem(id);
    getVisits();
  }, []);
 
  React.useEffect(() => {
    const list = visits?.filter(visit => visit.client?._id === id);
    setVisits(list);
  }, [visits]);

  React.useEffect(() => {
    if (deleteStatus === statusType.success) {
        history.push(url.services);
    }
}, [deleteStatus]);

  return (
    <div>
      {isLoading
        ? <div className="loader"><CircularProgress /></div>
        : <div>
            <div className="client-subheader">
              <div className="client-subheader__content">
                  <IconButton onClick={() => history.push(url.clients)}><KeyboardBackspace /></IconButton>
                  <CustomAvatar avatar={client?.avatar} name={client?.name} surname={client?.surname} />

                  <div className="client-info">
                    <h2>{ client?.name } { client?.surname }</h2>
                    <p>{ client?.additionalInfo || labels.noAdditionalInfo}</p>
                    {client?.birthDate || client?.street || client?.rodo || client?.city && <div className="new-section">
                      <i><p>{ client?.birthDate && `${labels.birthDate}: ${moment(client.birthDate).format('DD.MM.YYYY')}` }</p></i>
                      <i><p>{ client?.street && client?.streetNr 
                      && `${labels.address}: ${client.street} ${client.streetNr} ${client.houseNr ? '/ ' + client.houseNr : ''}`}</p></i>
                      <i><p>{ client?.city && `${client.posCode || ''} ${client.city}`}</p></i>
                      {client?.rodo && <a href={`${imageApi}${client?.rodo}`} target="_blank" rel="noopener noreferrer" download><strong>{ labels.downloadRodo }</strong></a>}
                    </div>}
                  </div>
              </div>
              <div className="action">
                <Link to={`${ url.clients }/edit/${ id }`}>
                  <Button>{labels.editClient}</Button>
                </Link>
              </div>
          </div>
          <div className='details'>
            <div className='special-buttons'>
              <a href={`sms:${client?.phone}`}><IconButton disabled={ isLoading }><FontAwesomeIcon icon={ faSms } /></IconButton></a>
              <a href={`tel:${client?.phone}`}><IconButton disabled={ isLoading }><FontAwesomeIcon icon={ faPhone } /></IconButton></a>
              {client?.email && <a href={`mailto:${client?.email}`}><IconButton disabled={ isLoading }><FontAwesomeIcon icon={ faPaperPlane } /></IconButton></a>}
              <IconButton><FontAwesomeIcon icon={ faPlus } /></IconButton>
            </div>
            <div>
              <p>{labels.income}</p>
              <p>{client?.income || 0}zł</p>
            </div>
          </div>
            <VisitList visits={filteredVisits} />
        </div>}
        <Navbar/>
    </div>
  )
}

Details.propTypes = {
  history: PropTypes.shape(historyPropTypes)
};

const mapStateToProps = (state) => ({
  client: state.clients.client,
  isLoading: state.clients.status === statusType.loading,
  deleteStatus: state.clients.deleteStatus,
  visits: state.visits?.data
});

const mapDispatchToProps = (dispatch) => ({
  getClientItem: (id) => dispatch(getClient({id})),
  getVisits: () => dispatch(getVisits()),
  deleteClientItem: (id) => dispatch(deleteClient({id}))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Details));
