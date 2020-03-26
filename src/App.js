import React from 'react';
import PropTypes from 'prop-types';
import labels from './labels';
import {Paper, Tabs, Tab, Typography, Box} from '@material-ui/core';

import Dnd from './containers/calendar/dnd'
import Tui from './containers/calendar/tui'
import Time from './containers/calendar/timeline'
import './assets/styles.scss';
import 'react-big-calendar/lib/css/react-big-calendar.css';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const App  = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Paper className="app">
            <h1>{labels.appTitle}</h1>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="Big Calendar">
                </Tab>
                <Tab label="Toast Calendar" />
                <Tab label="Timeline" />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Dnd />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Tui />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Time />
            </TabPanel>
        </Paper>
    );
};

export default App;
