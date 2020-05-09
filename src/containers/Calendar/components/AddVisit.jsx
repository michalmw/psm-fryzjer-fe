import React from 'react'
import { Drawer, IconButton, Button, Paper, TextField } from '@material-ui/core'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import '../../../containers/Calendar/Calendar.scss';
import { faTimes, faPlus, faChevronDown, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { KeyboardDatePicker, TimePicker } from "@material-ui/pickers";
import labels from '../../../assets/labels';
import SearchUser from "./SearchUser";


class AddVisit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            open: false,
        };
    }

    handleChangeDate = (date) => {
        this.setState({date})
    }

    handleChangeOpen = (open = true) => {
        this.setState({open})
    }

    render() {
        const {date, events, open} = this.state;
        return (
            <div className='drawer'>
                <Drawer anchor="bottom" open={open}>
                    <div className='drawer-middle'>
                        <div className="drawer-header">
                            <p>Fryzjer</p>
                            <IconButton onClick={() => this.handleChangeOpen(false)}><FontAwesomeIcon icon={faChevronDown} /></IconButton>
                        </div>
                        <div className='drawer-content'>
                            <SearchUser />
                        </div>
                    </div>
                </Drawer>
                <IconButton onClick={() => this.props.toggleDrawer(false)}><FontAwesomeIcon icon={faTimes} /></IconButton>
                <div className='drawer-content'>
                    <KeyboardDatePicker
                        autoOk
                        inputVariant="outlined"
                        variant="inline"
                        label={labels.selectDate}
                        format="MM/dd/yyyy"
                        value={date}
                        InputAdornmentProps={{ position: "start" }}
                        onChange={date => this.handleChangeDate(date)}
                        fullWidth
                    />
                    <div className="time-pickers">
                        <TimePicker
                            inputVariant="outlined"
                            variant="inline"
                            label={labels.selectStart}
                            value={date}
                            onChange={this.handleChangeDate}
                        />
                        <TimePicker
                            inputVariant="outlined"
                            variant="inline"
                            label={labels.selectEnd}
                            value={date}
                            onChange={this.handleChangeDate}
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
                            <IconButton onClick={this.handleChangeOpen}><FontAwesomeIcon icon={faPlus} /></IconButton>
                            <Button color="primary">Zmień</Button>
                        </div>
                        <div>
                            <IconButton onClick={this.handleChangeOpen}><FontAwesomeIcon icon={faPlus} /></IconButton>
                            <Button color="primary">Zmień</Button>
                        </div>
                    </div>
                    <Button
                        onClick={this.props.newEvent}
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
}

export default AddVisit
