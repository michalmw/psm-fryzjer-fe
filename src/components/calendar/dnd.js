import React from 'react'
import moment from "moment";
import events from './events'
import {Calendar, Views, momentLocalizer} from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'

import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const DragAndDropCalendar = withDragAndDrop(Calendar);

class Dnd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: events,
        };

        this.moveEvent = this.moveEvent.bind(this)
        this.newEvent = this.newEvent.bind(this)
    }

    moveEvent({ event, start, end, isAllDay: droppedOnAllDaySlot }) {
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

    newEvent(event) {
        let idList = this.state.events.map(a => a.id)
        let newId = Math.max(...idList) + 1
        let hour = {
          id: newId,
          title: 'New Event',
          allDay: event.slots.length === 1,
          start: event.start,
          end: event.end,
        };
        this.setState({
          events: this.state.events.concat([hour]),
        })
    }

    render() {
        const localizer = momentLocalizer(moment);
        return (
            <DragAndDropCalendar
                selectable
                localizer={localizer}
                events={this.state.events}
                onEventDrop={this.moveEvent}
                resizable
                style={{minHeight: '100vh'}}
                onEventResize={this.resizeEvent}
                onSelectSlot={this.newEvent}
                onDragStart={() => null}
                defaultView={Views.WEEK}
                defaultDate={new Date(2015, 3, 12)}
            />
        )
    }
}

export default Dnd
