import * as React from 'react';
import PropTypes from 'prop-types';

import { ArrowRightAlt } from '@material-ui/icons';
import { IconButton, Drawer } from '@material-ui/core';

import labels from '../../../assets/labels';
import '../Registration.scss';

const Congratulations = ({ open, handleOpen, title, name, copy }) => {
    return (
        <Drawer anchor="right" open={ open }>
            <div className="congratulations__content">
                <h1 className="congratulations__title">{ labels.appTitle }</h1>
            </div>
            <div className="congratulations__footer">
                <h2>{ title }, { name }</h2>
                <h2>
                    { copy }
                    <div className="congratulations__icon">
                        <IconButton onClick={handleOpen}><ArrowRightAlt /></IconButton>
                    </div>
                </h2>
            </div>
        </Drawer>
    );
}

Congratulations.propTypes = {
    open: PropTypes.bool.isRequired,
    handleOpen: PropTypes.func.isRequired,
    name: PropTypes.string
};

export default Congratulations;
