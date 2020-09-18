import React from 'react';
import { withRouter } from 'react-router-dom';

import { Button, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons'

import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import ActivationForm from "./components/ActivationForm";
import ProfileForm from './components/ProfileForm';
import Congratulations from './components/Congratulations';
import YourInvitations from './components/YourInvitations';
import CompanyDetailsForm from './components/CompanyDetailsForm';
import CompanyHoursForm from './components/CompanyHoursForm';
import QuickAdd from '../../components/QuikAdd';

import { url } from '../../constants';
import labels from '../../assets/labels'
import './Registration.scss'

const Registration  = ({history}) => {
    const initialState = {
        login: false,
        registration: false,
        activation: false,
        profile: false,
        congratulations: false,
        yourInvitations: false,
        createCompany: false,
        createCompanyHours: false,
        congratulationsCompany: false,
        addModal: false
    }
    const [open, setOpen] = React.useState(initialState);
    const [user, setUserData] = React.useState(null);
    const [company, setCompany] = React.useState(null);

    React.useEffect(() => {
        if (localStorage.token) {
            history.push(url.calendar)
        }
    }, []);

    const handleOpen = (sectionName, isOpen = true) => setOpen({ ...open, [sectionName]: isOpen });
    const setUser = (data) => {
        setUserData(data);
    }

    return (
        <div className="registration">
            <h1 className="registration__title">{ labels.joinTitle }<strong>{ labels.appTitle }</strong></h1>

            <div className="registration__copy">
                <p>{ labels.startTitle }</p>
                <p>{ labels.startCopy }</p>

                <List>
                    <ListItem>
                        <ListItemIcon>
                            <FontAwesomeIcon icon={ faCircle } />
                        </ListItemIcon>
                        <ListItemText primary={ labels.yourAccount } />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <FontAwesomeIcon icon={ faCircle } />
                        </ListItemIcon>
                        <ListItemText primary={ labels.yourCompanyAccount } />
                    </ListItem>
                </List>
            </div>

            <p className="primary-info">{ labels.accountCreationTime }</p>

            <div className="registration__button-container">
                <Button variant="contained" color="primary" onClick={ () => handleOpen('registration') }>
                    { labels.createAccountButtonLabel }
                </Button>
                <Button onClick={ () => handleOpen('activation') } className="font-button font-button--small">{ labels.iGotSmsLabel }</Button>
            </div>

            <LoginForm open={ open.login } handleOpen={ handleOpen } />
            <RegistrationForm open={ open.registration && !open.activation } handleOpen={ handleOpen } />
            <ActivationForm open={ open.activation && !open.profile } handleOpen={ handleOpen } setUserData={ setUser } />
            <ProfileForm open={ open.profile } userId={ user?.id } handleOpen={ handleOpen } />
            <Congratulations open={ open.congratulations } name={ user?.name } handleOpen={ () => handleOpen('yourInvitations') } title={labels.congratulationsTitle } copy={ labels.congratulationsCopy } />
            <YourInvitations open={ open.yourInvitations } handleOpen={ handleOpen } />
            <CompanyDetailsForm open={ open.createCompany } userId={ user?.id } handleOpen={ handleOpen } setCompany={ setCompany } />
            <CompanyHoursForm open={ open.createCompanyHours } handleOpen={ handleOpen } name={ company?.name } userId={ user?.id } />
            <Congratulations open={ open.congratulationsCompany } name={ user?.name } handleOpen={ () => handleOpen('addModal') } title={labels.congratulationsCompanyTitle} copy={ labels.congratulationsCompanyCopy } />
            <QuickAdd open={ open.addModal } handleOpen={ handleOpen } />
            
            <div className="registration__footer">
                <div className="registration__footer__button">
                    <p>{ labels.loginCopy }</p>
                    <Button onClick={ () => handleOpen('login') } className="font-button font-button--big">{ labels.loginButtonLabel }</Button>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Registration);
