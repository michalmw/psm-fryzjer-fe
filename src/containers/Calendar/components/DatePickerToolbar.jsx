import React, { useState } from "react";
import { DatePicker } from "@material-ui/pickers";
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from "@material-ui/core";
import ReactWeeklyDayPicker from 'react-weekly-day-picker';
import { useSwipeable } from "react-swipeable";
import * as moment from 'moment';
import '../Calendar.scss'
import './DatePickerToolbar.scss'


const StaticDatePicker = (props) => {
    const [date, changeDate] = useState(new Date());
    const [startDate, changeStartDate] = useState(new Date());
    const [expanded, changeOpen] = useState(false);
    const handleExpandClick = (open) => {
        changeOpen(open);
    };
    const handleChangeDate = (date) => {
        changeDate(date);
        props.handleChangeDate(date)
    };

    const prevWeek = (element) => {
        console.log('prev')
        changeStartDate(moment(element).clone().add(-7, 'days'));
    }

    const nextWeek = (element) => {
        changeStartDate(moment(element).clone().add(7, 'days'));
    }

    const handlers = useSwipeable({
        onSwipedDown: () => handleExpandClick(true),
        onSwipedUp: () => handleExpandClick(false),
    });

    const weeklyPickerHandlers = useSwipeable({
        onSwipedRight: () => prevWeek(startDate),
        onSwipedLeft: () => nextWeek(startDate),
    });

    const classNames = {
        container : 'weekly-container',
        prevWeekArrow: 'prev-week-arrow',
        nextWeekArrow: 'next-week-arrow',
        dayBox: 'day-box',
        dayCircleContainer: 'day-circle-container',
        dayCicle: 'day-cicle',
        dayCircleTodayText: 'day-circle-today-text',
        dayCircleUnavailable: 'day-circle-unavailable',
        dayCircleUnavailableText: 'day-circle-unavailable-text',
        dayCicleSelected: 'day-cicle-selected',
    }
    console.log(startDate);
    return (
        <div {...handlers}>
            <ExpansionPanel expanded={expanded}>
                <ExpansionPanelSummary />
                <ExpansionPanelDetails className="picker-container">
                    <DatePicker
                        autoOk
                        variant="static"
                        value={date}
                        onChange={handleChangeDate}
                        disableToolbar
                        animateYearScrolling
                    />
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel expanded={!expanded}>
                <ExpansionPanelSummary />
                <ExpansionPanelDetails {...weeklyPickerHandlers} className="picker-container">
                <ReactWeeklyDayPicker
                    classNames={classNames}
                    secondLineFormat={'D'}
                    multipleDaySelect={false}
                    onPrevClick={prevWeek}
                    onNextClick={nextWeek}
                    startDate={startDate}
                />
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>

    );
};

export default StaticDatePicker;
