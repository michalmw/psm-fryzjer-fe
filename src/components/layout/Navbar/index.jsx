import React from 'react';
import { Link } from 'react-router-dom';

import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faPlusSquare, faChartBar } from '@fortawesome/free-regular-svg-icons'
import { faCog, faBoxOpen } from '@fortawesome/free-solid-svg-icons'
import './Navbar.scss';

export default function LabelBottomNavigation() {
    const [value, setValue] = React.useState('calendar');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <BottomNavigation value={value} onChange={ handleChange } className="bottom-nav">
            <BottomNavigationAction value="calendar" icon={<Link to="/calendar"><FontAwesomeIcon icon={faCalendarAlt} /></Link>} />
            <BottomNavigationAction value="report" icon={<Link to="/report"><FontAwesomeIcon icon={faChartBar} /></Link>} />
            <BottomNavigationAction value="add" icon={<FontAwesomeIcon icon={faPlusSquare} />} />
            <BottomNavigationAction value="warehouse" icon={<Link to="/warehouse"><FontAwesomeIcon icon={faBoxOpen} /></Link>} />
            <BottomNavigationAction value="settings" icon={<FontAwesomeIcon icon={faCog} />}/>
        </BottomNavigation>
    );
}
