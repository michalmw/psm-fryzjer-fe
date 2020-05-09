import React from 'react'
import moment from "moment";
import events from './events'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import { Drawer, IconButton, Button, Paper } from '@material-ui/core'
import Toolbar from './components/DatePickerToolbar';

import 'react-big-calendar/lib/css/react-big-calendar.css'
import '../../containers/Calendar/Calendar.scss';
import CalendarToolbar from "./components/CalendarToolbar";
import AddVisit from "./components/AddVisit";
import {BrowserRouter as Router, Switch} from "react-router-dom";
import Navbar from "../../components/layout/Navbar";


const DragAndDropCalendar = withDragAndDrop(Calendar);

class Dnd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: events,
            date: new Date(),
            open: false,
            slotInfo: undefined
        };
    }
    getResourceMap = () => {
        return [
            { resourceId: 1, resourceTitle: 'Sabina', },
            { resourceId: 2, resourceTitle: 'Michał', },
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

    newEvent = (event = this.state.slotInfo) => {
        let idList = this.state.events.map(a => a.id)
        let newId = Math.max(...idList) + 1
        let hour = {
            id: newId,
            title: 'Koloryzacja z Magdą',
            start: event.start,
            end: event.end,
            resourceId: event.resourceId
        };
        this.setState({
            events: this.state.events.concat([hour]),
        })
        this.toggleDrawer(false);
    }

    handleChangeDate = (date) => {
        this.setState({date})
    }

    toggleDrawer = (open = true, slotInfo) => {
        console.log(slotInfo)
        this.setState({open});
        if (slotInfo) {
            this.setState({slotInfo});
        }
    };

    render() {
        const localizer = momentLocalizer(moment);
        const {date, events, open} = this.state;
        return (
            <div>
                <Drawer anchor="bottom" open={open}>
                    <AddVisit toggleDrawer={this.toggleDrawer} newEvent={this.newEvent} />
                </Drawer>
                <DragAndDropCalendar
                    selectable
                    localizer={localizer}
                    events={events}
                    onEventDrop={this.moveEvent}
                    resizable
                    step={30}
                    components={{
                        toolbar: ()=><Toolbar handleChangeDate={this.handleChangeDate}/>,
                        resourceHeader: ({resource}) => <CalendarToolbar employee={resource} />,
                        timeGutterHeader:  () => null
                    }}
                    style={{minHeight: '100vh'}}
                    onEventResize={this.resizeEvent}
                    onSelectSlot={(slotInfo) => this.toggleDrawer(true, slotInfo)}
                    onDragStart={() => null}
                    defaultView={Views.DAY}
                    defaultDate={new Date()}
                    resources={this.getResourceMap()}
                    resourceIdAccessor="resourceId"
                    resourceTitleAccessor="resourceTitle"
                />
                <Navbar/>
            </div>
        )
    }
}

export default Dnd
