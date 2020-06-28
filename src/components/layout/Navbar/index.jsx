import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { BottomNavigation, BottomNavigationAction, Avatar } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faPlusSquare, faChartBar } from '@fortawesome/free-regular-svg-icons'
import { faCog, faBoxOpen } from '@fortawesome/free-solid-svg-icons'
import './Navbar.scss';

const useStyles = makeStyles((theme) => ({
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        marginTop: '-0.4rem'
    }
}));

export default function LabelBottomNavigation() {
    const classes = useStyles();
    const [value, setValue] = React.useState('calendar');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <BottomNavigation value={value} onChange={ handleChange } className="bottom-nav">
            <BottomNavigationAction value="calendar" icon={<Link to="/calendar"><FontAwesomeIcon icon={faCalendarAlt} /></Link>} />
            <BottomNavigationAction value="report" icon={<Link to="/report"><FontAwesomeIcon icon={faChartBar} /></Link>} />
            <BottomNavigationAction value="account" icon={<Avatar className={classes.small} />} />
            <BottomNavigationAction value="add" icon={<FontAwesomeIcon icon={faPlusSquare} />} />
            <BottomNavigationAction value="settings" icon={<Link to="/clients"><FontAwesomeIcon icon={faCog} /></Link>}/>
        </BottomNavigation>
    );
}
