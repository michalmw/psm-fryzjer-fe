import * as React from 'react';
import PropTypes from 'prop-types';
import { Paper, Avatar } from '@material-ui/core';
import { imageApi } from '../../enviroments/config';
import labels from '../../assets/labels';
import "./VisitList.scss"

const statusType = {
    planned: 'planned',
    done: 'done',
    canceled: 'canceled',
    absence: 'absence' 
}

const VisitList = ({ visits }) => {
    const [active, setActive] = React.useState(statusType.planned);
    const [filteredContent, filterContent] = React.useState([]);

    const getVisitsByStatus = (status) => visits?.length ? visits.filter(visit => visit.status === status) : [];

    React.useEffect(() => {
        const list = getVisitsByStatus(active);
        filterContent(list);
    }, [active]);

    return visits?.length ? (
        <div>
            <div className="visit-menu">
                <Paper onClick={() => {setActive(statusType.planned)}} className={active === statusType.planned ? 'active' : ''}>
                    <h3>{getVisitsByStatus(statusType.planned).length}</h3>
                    <p>Zaplanowane</p>
                </Paper>
                <Paper onClick={() => {setActive(statusType.done)}} className={active === statusType.done ? 'active' : ''}>
                    <h3>{getVisitsByStatus(statusType.done).length}</h3>
                    <p>Zrealizowane</p>
                </Paper>
                <Paper onClick={() => {setActive(statusType.canceled)}} className={active === statusType.canceled ? 'active' : ''}>
                    <h3>{getVisitsByStatus(statusType.canceled).length}</h3>
                    <p>Anulowane</p>
                </Paper>
                <Paper onClick={() => {setActive(statusType.absence)}} className={active === statusType.absence ? 'active error' : 'error'}>
                    <h3>{getVisitsByStatus(statusType.absence).length}</h3>
                    <p>Nieobecność</p>
                </Paper>
            </div>
            <div className="visit">
                {filteredContent?.length ? filteredContent.sort((a,b) => a.date > b.date ? 1 : -1).map(({image, date, additionalInfo, status, start, end, services, price, priceFrom, priceTo, _id}) => (
                    <Paper className={status === statusType.canceled || status === statusType.absence ? "user-card canceled" : 'user-card'} key={ _id } elevation={ 0 }>
                        <div className="card-header">
                            <p>{date && start && end && `${date} ${start} - ${end}`}</p>
                            <p className="price"><strong>{price || priceFrom && priceTo && `${priceFrom} - ${priceTo}` || 0}zł</strong></p>
                        </div>
                            <Avatar src={`${imageApi}${image}`} />
                        <div className="client-info">
                            {services?.length && <ul>
                                <li>{services[0].name}</li>
                                {services[1] && <li>{services[1].name} {services.length > 2 ? '...' : ''}</li>}
                            </ul>}
                            <p>{ additionalInfo }</p>
                        </div>
                  </Paper>
                )) : <div className="user-card"><p>{labels.noVisits}</p></div>}
            </div>
        </div>  
    ) : <div className="user-card"><p>{labels.noVisits}</p></div>;
}


VisitList.propTypes = {
    errors: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired
};

export default VisitList;
