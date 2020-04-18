import React, { useState } from "react";
import { DatePicker } from "@material-ui/pickers";
import {Collapse, IconButton, Select, MenuItem} from "@material-ui/core";
import Calendar from 'short-react-calendar';
// import WeekView from "week-view/src/js/week-view";
import WeekView from 'react-calendar-mobile';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarAlt} from "@fortawesome/free-regular-svg-icons";
import "./Calendar.scss"


const StaticDatePicker = (props) => {
    const [date, changeDate] = useState(new Date());
    const [open, changeOpen] = useState(true);
    const handleExpandClick = () => {
        changeOpen(!open);
    };
    const handleChangeDate = (date) => {
        changeDate(date);
        props.handleChangeDate(date)
    };
    return (
        <div>
            <div className="picker-toolbar">
                <Select value={0}>
                    <MenuItem value={0}>Sabina</MenuItem>
                    <MenuItem value={1}>Michał</MenuItem>
                    <MenuItem value={2}>Paulina</MenuItem>
                </Select>
                <IconButton size="small" onClick={handleExpandClick}><FontAwesomeIcon icon={faCalendarAlt}/></IconButton>
            </div>

            <Collapse in={open} className="picker-container">
                <DatePicker
                    autoOk
                    variant="static"
                    value={date}
                    onChange={handleChangeDate}
                    disableToolbar
                    animateYearScrolling
                />
            </Collapse>
        </div>

    );
};

export default StaticDatePicker;
