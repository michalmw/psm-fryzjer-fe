import * as React from 'react';
import PropTypes from 'prop-types';
import { history as historyPropTypes } from 'history-prop-types';
import { withRouter } from'react-router-dom';

import { KeyboardBackspace } from "@material-ui/icons";
import { Button, Drawer, IconButton } from '@material-ui/core';
import { url } from '../constants';
import labels from '../assets/labels';

const QuickAdd = ({ open, history, onClose }) => (
    <Drawer anchor="right" open={ open }>
        <div className='drawer-middle'>
        <div className="drawer-subheader">
              {onClose && <IconButton onClick={onClose}><KeyboardBackspace /></IconButton>}
              <h5>{ labels.appTitle }</h5>
          </div>
            <div className='drawer-content quick-add'>
                <h2 className="drawer-content__title">{ labels.whatDoYouWantToDo }</h2>
                <div className="button-group">
                    <p>{ labels.goToProfile }</p>
                    <Button variant="contained" color="secondary" onClick={ () => history.push(`${url.users}/me`) }>
                        { labels.goToProfileButton }
                    </Button>
                </div>
                <div className="button-group">
                    <p>{ labels.goToDashboard }</p>
                    <Button variant="contained" color="secondary" onClick={ () => history.push(url.calendar) }>
                        { labels.goToDashboardButton }
                    </Button>
                </div>
                <div className="button-group">
                    <p>{ labels.addVisit }</p>
                    <Button variant="contained" color="secondary">
                        { labels.addVisitButton }
                    </Button>
                </div>
                <div className="button-group">
                    <p>{ labels.addProducts }</p>
                    <Button variant="contained" color="secondary" onClick={ () => history.push(url.products) }>
                        { labels.goToWarehouse }
                    </Button>
                </div>
                <div className="button-group">
                    <p>{ labels.addUsers }</p>
                    <Button variant="contained" color="secondary" onClick={ () => history.push(`${ url.users }${ url.invite }`) }>
                        { labels.addUsersButton }
                    </Button>
                </div>
            </div>
        </div>
    </Drawer>
);

QuickAdd.propTypes = {
    open: PropTypes.bool.isRequired,
    handleOpen: PropTypes.func,
    history: PropTypes.shape(historyPropTypes)
};

export default withRouter(QuickAdd);
