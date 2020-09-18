import * as React from 'react';
import PropTypes from 'prop-types';

import { Button, Drawer } from '@material-ui/core';
import labels from '../../../assets/labels';
import '../Registration.scss';

const YourInvitations = ({ open, handleOpen }) => {
    return (
        <Drawer anchor="right" open={ open }>
            <div className="congratulations__header">
                <h5>{ labels.appTitle }</h5>
            </div>
            <div className="invitations__content">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpen('createCompany')}
                >
                    { labels.createCompanyAccountButton }
                </Button>
            </div>
            <div className="congratulations__footer">
                <h2>{ labels.createCompanyAccountCopy }</h2>
            </div>
        </Drawer>
    );
}

YourInvitations.propTypes = {
    open: PropTypes.bool.isRequired,
    handleOpen: PropTypes.func.isRequired
};

export default YourInvitations;
