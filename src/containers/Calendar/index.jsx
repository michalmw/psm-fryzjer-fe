import React from 'react'
import moment from "moment";
import events from './events'
import {Calendar, Views, momentLocalizer} from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import {Avatar} from '@material-ui/core'
import Toolbar from './toolbar';

import 'react-big-calendar/lib/css/react-big-calendar.css'
import '../../containers/Calendar/Calendar.scss';
import { makeStyles } from '@material-ui/core/styles';
import CalendarToolbar from "./components/CalendarToolbar";



const DragAndDropCalendar = withDragAndDrop(Calendar);

class Dnd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: events,
            date: new Date()
        };
    }
    getResourceMap = () => {
        return [
            { resourceId: 1, resourceTitle: 'Sabina', },
            { resourceId: 2, resourceTitle: 'Michał' },
            { resourceId: 3, resourceTitle: 'Paulina' }
        ];
    }

    moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
        const { events } = this.state;

        const idx = events.indexOf(event);
        let allDay = event.allDay;

        if (!event.allDay && droppedOnAllDaySlot) {
            allDay = true
        } else if (event.allDay && !droppedOnAllDaySlot) {
            allDay = false
        }

        const updatedEvent = { ...event, start, end, allDay };

        const nextEvents = [...events];
        nextEvents.splice(idx, 1, updatedEvent);

        this.setState({
            events: nextEvents,
        });
    }

    resizeEvent = ({ event, start, end }) => {
        const { events } = this.state;

        const nextEvents = events.map(existingEvent => {
            return existingEvent.id === event.id
                ? { ...existingEvent, start, end }
                : existingEvent
        });

        this.setState({
            events: nextEvents,
        })

    };

    newEvent = (event) => {
        let idList = this.state.events.map(a => a.id)
        let newId = Math.max(...idList) + 1
        let hour = {
            id: newId,
            title: 'Koloryzacja z Magdą',
            allDay: event.slots.length === 1,
            start: event.start,
            end: event.end,
            resourceId: event.resourceId
        };
        this.setState({
            events: this.state.events.concat([hour]),
        })
    }

    handleChangeDate = (date) => {
        this.setState({date})
    }

    render() {
        const localizer = momentLocalizer(moment);
        const {date, events} = this.state;
        return (
            <DragAndDropCalendar
                selectable
                localizer={localizer}
                events={events}
                onEventDrop={this.moveEvent}
                resizable
                components={{
                    toolbar: ()=><Toolbar handleChangeDate={this.handleChangeDate}/>,
                    resourceHeader: ({resource}) => <CalendarToolbar employee={resource} />,
                    timeGutterHeader:  () => null
                }}
                style={{minHeight: '100vh'}}
                onEventResize={this.resizeEvent}
                onSelectSlot={this.newEvent}
                onDragStart={() => null}
                defaultView={Views.DAY}
                defaultDate={new Date()}
                min={new Date('2020-04-18T08:00:00')}
                max={new Date('2020-04-18T20:00:00')}
                resources={this.getResourceMap()}
                resourceIdAccessor="resourceId"
                resourceTitleAccessor="resourceTitle"
            />
        )
    }
}

export default Dnd
