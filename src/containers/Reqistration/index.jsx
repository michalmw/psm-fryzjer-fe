import React from 'react';
import { Link } from 'react-router-dom';
import {Button, Drawer, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import './Registration.scss'
import labels from '../../assets/labels'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons'

const Registration  = () => {
    const [openLogin, setLoginOpen] = React.useState(false);
    const [openRegistration, setRegistrationOpen] = React.useState(false);
    return (
        <div className='registration'>
            <Link to="/calendar"><h1>{labels.joinTitle}<strong>{labels.appTitle}</strong></h1></Link>
            <p>{labels.startTitle}</p>
            <p>{labels.startCopy}</p>
            <List>
                <ListItem>
                    <ListItemIcon>
                        <FontAwesomeIcon icon={faCircle} />
                    </ListItemIcon>
                    <ListItemText primary={labels.yourAccount} />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <FontAwesomeIcon icon={faCircle} />
                    </ListItemIcon>
                    <ListItemText primary={labels.yourCompanyAccount} />
                </ListItem>
            </List>
            <p className="primary-info">{labels.accountCreationTime}</p>
            <Button variant="contained" color="primary" onClick={() => setRegistrationOpen(true)}>
                {labels.createAccountButtonLabel}
            </Button>
            <Drawer anchor="right" open={openLogin} onClose={() => setLoginOpen(false)}>
                <div className='drawer-middle'>
                    <div className="drawer-header">
                    </div>
                    <div className='drawer-content'>
                        <LoginForm />
                    </div>
                </div>
            </Drawer>
            <Drawer anchor="right" open={openRegistration} onClose={() => setRegistrationOpen(false)}>
                <div className='drawer-middle'>
                    <div className="drawer-header">
                    </div>
                    <div className='drawer-content'>
                        <RegistrationForm />
                    </div>
                </div>
            </Drawer>
        </div>
    )
}

export default Registration;
