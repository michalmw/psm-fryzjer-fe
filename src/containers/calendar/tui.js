import React, { useCallback, useRef } from "react";
import {Button} from "@material-ui/core"

import TUICalendar from "@toast-ui/react-calendar";

import "tui-calendar/dist/tui-calendar.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";

const theme = {
    'common.border': '1px solid #e5e5e5',
    'common.backgroundColor': 'white',
    'common.holiday.color': '#ff4040',
    'common.saturday.color': '#333',
    'common.dayname.color': '#333',
    'common.today.color': '#333',

// creation guide style
    'common.creationGuide.backgroundColor': 'rgba(81, 92, 230, 0.05)',
    'common.creationGuide.border': '1px solid #515ce6',

// month header 'dayname'
    'month.dayname.height': '31px',
    'month.dayname.borderLeft': '1px solid #e5e5e5',
    'month.dayname.paddingLeft': '10px',
    'month.dayname.paddingRight': '10px',
    'month.dayname.backgroundColor': 'inherit',
    'month.dayname.fontSize': '12px',
    'month.dayname.fontWeight': 'normal',
    'month.dayname.textAlign': 'left',

// month day grid cell 'day'
    'month.holidayExceptThisMonth.color': 'rgba(255, 64, 64, 0.4)',
    'month.dayExceptThisMonth.color': 'rgba(51, 51, 51, 0.4)',
    'month.weekend.backgroundColor': 'inherit',
    'month.day.fontSize': '14px',

// month schedule style
    'month.schedule.borderRadius': '2px',
    'month.schedule.height': '24px',
    'month.schedule.marginTop': '2px',
    'month.schedule.marginLeft': '8px',
    'month.schedule.marginRight': '8px',

// month more view
    'month.moreView.border': '1px solid #d5d5d5',
    'month.moreView.boxShadow': '0 2px 6px 0 rgba(0, 0, 0, 0.1)',
    'month.moreView.backgroundColor': 'white',
    'month.moreView.paddingBottom': '17px',
    'month.moreViewTitle.height': '44px',
    'month.moreViewTitle.marginBottom': '12px',
    'month.moreViewTitle.backgroundColor': 'inherit',
    'month.moreViewTitle.borderBottom': 'none',
    'month.moreViewTitle.padding': '12px 17px 0 17px',
    'month.moreViewList.padding': '0 17px',

// week header 'dayname'
    'week.dayname.height': '42px',
    'week.dayname.borderTop': '1px solid #e5e5e5',
    'week.dayname.borderBottom': '1px solid #e5e5e5',
    'week.dayname.borderLeft': 'inherit',
    'week.dayname.paddingLeft': '0',
    'week.dayname.backgroundColor': 'inherit',
    'week.dayname.textAlign': 'left',
    'week.today.color': '#333',
    'week.pastDay.color': '#bbb',

// week vertical panel 'vpanel'
    'week.vpanelSplitter.border': '1px solid #e5e5e5',
    'week.vpanelSplitter.height': '3px',

// week daygrid 'daygrid'
    'week.daygrid.borderRight': '1px solid #e5e5e5',
    'week.daygrid.backgroundColor': 'inherit',

    'week.daygridLeft.width': '72px',
    'week.daygridLeft.backgroundColor': 'inherit',
    'week.daygridLeft.paddingRight': '8px',
    'week.daygridLeft.borderRight': '1px solid #e5e5e5',

    'week.today.backgroundColor': 'rgba(81, 92, 230, 0.05)',
    'week.weekend.backgroundColor': 'inherit',

// week timegrid 'timegrid'
    'week.timegridLeft.width': '72px',
    'week.timegridLeft.backgroundColor': 'inherit',
    'week.timegridLeft.borderRight': '1px solid #e5e5e5',
    'week.timegridLeft.fontSize': '11px',
    'week.timegridLeftTimezoneLabel.height': '40px',
    'week.timegridLeftAdditionalTimezone.backgroundColor': 'white',

    'week.timegridOneHour.height': '52px',
    'week.timegridHalfHour.height': '26px',
    'week.timegridHalfHour.borderBottom': 'none',
    'week.timegridHorizontalLine.borderBottom': '1px solid #e5e5e5',

    'week.timegrid.paddingRight': '8px',
    'week.timegrid.borderRight': '1px solid #e5e5e5',
    'week.timegridSchedule.borderRadius': '2px',
    'week.timegridSchedule.paddingLeft': '2px',

    'week.currentTime.color': '#515ce6',
    'week.currentTime.fontSize': '11px',
    'week.currentTime.fontWeight': 'normal',

    'week.pastTime.color': '#bbb',
    'week.pastTime.fontWeight': 'normal',

    'week.futureTime.color': '#333',
    'week.futureTime.fontWeight': 'normal',

    'week.currentTimeLinePast.border': '1px dashed #515ce6',
    'week.currentTimeLineBullet.backgroundColor': '#515ce6',
    'week.currentTimeLineToday.border': '1px solid #515ce6',
    'week.currentTimeLineFuture.border': 'none',

// week creation guide style
    'week.creationGuide.color': '#515ce6',
    'week.creationGuide.fontSize': '11px',
    'week.creationGuide.fontWeight': 'bold',

// week daygrid schedule style
    'week.dayGridSchedule.borderRadius': '2px',
    'week.dayGridSchedule.height': '24px',
    'week.dayGridSchedule.marginTop': '2px',
    'week.dayGridSchedule.marginLeft': '8px',
    'week.dayGridSchedule.marginRight': '8px'
};
const start = new Date();
const end = new Date(new Date().setMinutes(start.getMinutes() + 30));
const schedules = [
    {
        calendarId: "1",
        category: "time",
        isVisible: true,
        title: "Study",
        id: "1",
        body: "Test",
        start,
        end
    },
    {
        calendarId: "2",
        category: "time",
        isVisible: true,
        title: "Meeting",
        id: "2",
        body: "Description",
        start: new Date(new Date().setHours(start.getHours() + 1)),
        end: new Date(new Date().setHours(start.getHours() + 2))
    }
];

const calendars = [
    {
        id: "1",
        name: "My Calendar",
        color: "#ffffff",
        bgColor: "#9e5fff",
        dragBgColor: "#9e5fff",
        borderColor: "#9e5fff"
    },
    {
        id: "2",
        name: "Company",
        color: "#ffffff",
        bgColor: "#00a9ff",
        dragBgColor: "#00a9ff",
        borderColor: "#00a9ff"
    }
];

const Tui = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const cal = useRef(null);

    const onClickSchedule = useCallback(e => {
    }, []);

    const onBeforeCreateSchedule = useCallback(scheduleData => {
        const schedule = {
            id: String(Math.random()),
            title: scheduleData.title,
            isAllDay: scheduleData.isAllDay,
            start: scheduleData.start,
            end: scheduleData.end,
            category: scheduleData.isAllDay ? "allday" : "time",
            dueDateClass: "",
            location: scheduleData.location,
            raw: {
                class: scheduleData.raw["class"]
            },
            state: scheduleData.state
        };

        cal.current.calendarInst.createSchedules([schedule]);
    }, []);

    const onBeforeDeleteSchedule = useCallback(res => {
        const { id, calendarId } = res.schedule;

        cal.current.calendarInst.deleteSchedule(id, calendarId);
    }, []);

    const onBeforeUpdateSchedule = useCallback(e => {
        const { schedule, changes } = e;

        cal.current.calendarInst.updateSchedule(
            schedule.id,
            schedule.calendarId,
            changes
        );
    }, []);

    function _getFormattedTime(time) {
        const date = new Date(time);
        const h = date.getHours();
        const m = date.getMinutes();

        return `${h}:${m}`;
    }

    function _getTimeTemplate(schedule, isAllDay) {
        var html = [];

        if (!isAllDay) {
            html.push("<strong>" + _getFormattedTime(schedule.start) + "</strong> ");
        }
        if (schedule.isPrivate) {
            html.push('<span class="calendar-font-icon ic-lock-b"></span>');
            html.push(" Private");
        } else {
            if (schedule.isReadOnly) {
                html.push('<span class="calendar-font-icon ic-readonly-b"></span>');
            } else if (schedule.recurrenceRule) {
                html.push('<span class="calendar-font-icon ic-repeat-b"></span>');
            } else if (schedule.attendees.length) {
                html.push('<span class="calendar-font-icon ic-user-b"></span>');
            } else if (schedule.location) {
                html.push('<span class="calendar-font-icon ic-location-b"></span>');
            }
            html.push(" " + schedule.title);
        }

        return html.join("");
    }

    const templates = {
        time: function(schedule) {
            return _getTimeTemplate(schedule, false);
        }
    };

    const handleClickNextButton = () => {
        cal.current.calendarInst.next();
    };
    const handleClickPrevButton = () => {
        cal.current.calendarInst.prev();
    };

    return (
        <div>
            <Button onClick={handleClickPrevButton}>Prev</Button>
            <Button onClick={handleClickNextButton}>Next</Button>

            <Button color="secondary" onClick={() => handleChange('day')}>Daily</Button>
            <Button color="secondary" onClick={() => handleChange('week')}>Weekly</Button>
            <Button color="secondary" onClick={() => handleChange('month')}>Monthly</Button>

            <TUICalendar
                ref={cal}
                height="1000px"
                useCreationPopup={true}
                useDetailPopup={true}
                view={value}
                template={templates}
                theme={theme}
                calendars={calendars}
                schedules={schedules}
                onClickSchedule={onClickSchedule}
                onBeforeCreateSchedule={onBeforeCreateSchedule}
                onBeforeDeleteSchedule={onBeforeDeleteSchedule}
                onBeforeUpdateSchedule={onBeforeUpdateSchedule}
            />
        </div>

    );
}

export default Tui;
