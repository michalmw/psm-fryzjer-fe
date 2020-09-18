import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { BottomNavigation, BottomNavigationAction, Avatar } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faPlusSquare } from '@fortawesome/free-regular-svg-icons'
import { faCog, faUsers } from '@fortawesome/free-solid-svg-icons'

import { url } from '../../../constants';
import QuickAdd from '../../QuikAdd';
import Settings from '../../Settings';
import CustomAvatar from '../../Form/CustomAvatar';
import { getMe } from '../../../actions/UserActions';
import './Navbar.scss';

const useStyles = makeStyles((theme) => ({
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        marginTop: '-0.4rem'
    }
}));

export const LabelBottomNavigation = ({me, getMyAccount}) => {
    const classes = useStyles();
    const [value, setValue] = React.useState('calendar');
    const [quickAddOpen, handleOpen] = React.useState(false);
    const [settingsOpen, openSettings] = React.useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    React.useEffect(() => {
        if (!me?.company) {
          getMyAccount();
        }
      }, []);

    return (
        <>
            <BottomNavigation value={value} onChange={ handleChange } className="bottom-nav">
                <BottomNavigationAction value="calendar" icon={ <Link to={ url.calendar }><FontAwesomeIcon icon={ faCalendarAlt } /></Link> } />
                <BottomNavigationAction value="clients" icon={ <Link to={ url.clients }><FontAwesomeIcon icon={ faUsers } /></Link> } />
                <BottomNavigationAction value="account" icon={ <Link to={ `${url.users}/me` }><CustomAvatar className={classes.small} avatar={me?.avatar} name={me?.name} surname={me?.surname} /></Link> } />
                <BottomNavigationAction value="add" onClick={ () => handleOpen(true) } icon={ <FontAwesomeIcon icon={ faPlusSquare } /> } />
                <BottomNavigationAction value="settings" onClick={ () => openSettings(true) } icon={ <FontAwesomeIcon icon={ faCog } /> }/>
            </BottomNavigation>
            <QuickAdd open={quickAddOpen} onClose={() => handleOpen(false)} />
            <Settings open={settingsOpen} handleClose={() => openSettings(false)} />
        </>
    );
}

const mapStateToProps = (state) => ({
    me: state.users?.me
  });
  
  const mapDispatchToProps = (dispatch) => ({
    getMyAccount: () => dispatch(getMe())
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(LabelBottomNavigation);
  