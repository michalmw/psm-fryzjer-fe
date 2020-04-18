import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import '../Calendar.scss'

const useStyles = makeStyles((theme) => ({
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    }
}));

const CalendarToolbar = ({employee}) => {
    const classes = useStyles();

    return (
        <div className="calendar-toolbar">
            <Avatar alt={employee.reportTitle} src="/static/images/avatar/1.jpg" className={classes.small}/>
            <span>{employee.resourceTitle}</span>
        </div>
    );
}

export default CalendarToolbar;
