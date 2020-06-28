import React from 'react';
<<<<<<< HEAD
import {Button, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton} from "@material-ui/core";
=======
import { Link } from 'react-router-dom';
import {Button, Drawer, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
>>>>>>> 4cce0e4906c5703f44bf7333f530a6a9f20bcc11
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import './Registration.scss'
import labels from '../../assets/labels'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
import ActivationForm from "./components/ActivationForm";
import ProfileForm from './components/ProfileForm';

const Registration  = () => {
    const initialState = {
        login: false,
        registration: false,
        activation: false,
        profile: false
    }
    const [open, setOpen] = React.useState(initialState);

    const handleOpen = (sectionName, isOpen = true) => setOpen({ ...open, [sectionName]: isOpen });

    return (
<<<<<<< HEAD
        <div className="registration">
            <h1 className="registration__title">{labels.joinTitle}<strong>{labels.appTitle}</strong></h1>

            <div className="registration__copy">
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
            </div>

=======
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
>>>>>>> 4cce0e4906c5703f44bf7333f530a6a9f20bcc11
            <p className="primary-info">{labels.accountCreationTime}</p>

            <div className="registration__button-container">
                <Button variant="contained" color="primary" onClick={() => handleOpen('registration')}>
                    {labels.createAccountButtonLabel}
                </Button>
                <Button onClick={() => handleOpen('activation')} className="font-button font-button--small">{labels.iGotSmsLabel}</Button>
            </div>

            <div className="registration__footer">
                <div className="registration__footer__button">
                    <p>{labels.loginCopy}</p>
                    <Button onClick={() => handleOpen('login')} className="font-button font-button--big">{labels.loginButtonLabel}</Button>
                </div>
            </div>

            <LoginForm open={open.login} handleOpen={handleOpen} />
            <RegistrationForm open={open.registration} handleOpen={handleOpen} />
            <ActivationForm open={open.activation} handleOpen={handleOpen} />
            <ProfileForm open={open.profile} handleOpen={handleOpen} />
        </div>
    )
}

export default Registration;
