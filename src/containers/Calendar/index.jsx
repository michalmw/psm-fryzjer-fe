import React from 'react';
import PropTypes from 'prop-types';

import { Tabs, Tab, Typography, Box } from '@material-ui/core';

import BigCalendar from '../../components/calendar/dnd';
import TuiCalendar from '../../components/calendar/tui';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
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


export default function FullWidthTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
            >
                <Tab label="Big Calendar" />
                <Tab label="TUI Calendar" />
            </Tabs>
            <TabPanel value={value} index={0}>
                <BigCalendar />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TuiCalendar />
            </TabPanel>
        </div>
    );
}
