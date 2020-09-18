import React from 'react'
import { Drawer, IconButton, Button, Paper, } from '@material-ui/core'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import '../../../containers/Calendar/Calendar.scss';
import { faTimes, faPlus, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { KeyboardDatePicker, TimePicker } from "@material-ui/pickers";
import labels from '../../../assets/labels';
import SearchUser from "./SearchUser";


const AddVisit = ({toggleDrawer, newEvent}) => {
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState(new Date());

    return (
        <div className='drawer'>
            <Drawer anchor="bottom" open={open}>
                <div className='drawer-middle'>
                    <div className="drawer-header">
                        <p>Fryzjer</p>
                        <IconButton onClick={() => setOpen(false)}><FontAwesomeIcon icon={faChevronDown} /></IconButton>
                    </div>
                    <div className='drawer-content'>
                        <SearchUser />
                    </div>
                </div>
            </Drawer>
            <IconButton onClick={() => toggleDrawer(false)}><FontAwesomeIcon icon={faTimes} /></IconButton>
            <div className='drawer-content'>
                <KeyboardDatePicker
                    autoOk
                    inputVariant="outlined"
                    variant="inline"
                    label={labels.selectDate}
                    format="MM/dd/yyyy"
                    value={date}
                    InputAdornmentProps={{ position: "start" }}
                    onChange={date => setDate(date)}
                    fullWidth
                />
                <div className="time-pickers">
                    <TimePicker
                        inputVariant="outlined"
                        variant="inline"
                        label={labels.selectStart}
                        value={date}
                        onChange={setDate}
                    />
                    <TimePicker
                        inputVariant="outlined"
                        variant="inline"
                        label={labels.selectEnd}
                        value={date}
                        onChange={setDate}
                    />
                </div>
                <div className="service-container">
                    <Button variant="contained" color="primary" fullWidth>Dodaj usługę</Button>
                    <Paper>
                        <p>Strzyrzenie</p>
                        <p>Koloryzacja</p>
                        <p>Regeneracja</p>
                    </Paper>
                </div>
                <div className="client-container">
                    <div>
                        <IconButton onClick={() => setOpen(true)}><FontAwesomeIcon icon={faPlus} /></IconButton>
                        <Button color="primary">Zmień</Button>
                    </div>
                    <div>
                        <IconButton onClick={() => setOpen(true)}><FontAwesomeIcon icon={faPlus} /></IconButton>
                        <Button color="primary">Zmień</Button>
                    </div>
                </div>
                <Button
                    onClick={newEvent}
                    className="add-button"
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Dodaj wizytę
                </Button>
            </div>
        </div>
    )
}

export default AddVisit
