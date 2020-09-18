import * as React from 'react';
import { string, bool } from 'prop-types';

import { Avatar } from '@material-ui/core';

import { colors } from '../../assets/theme';
import { imageApi } from '../../enviroments/config';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile } from '@fortawesome/free-solid-svg-icons'
import FaceIcon from '@material-ui/icons/Face';

const CustomAvatar  = ({ name, surname, color, avatar, isConfirmed=true }) => {
    const useStyles = makeStyles({
        avatar: { 
            backgroundColor: isConfirmed ? (color || colors.secondary) : colors.disabled,
            color: !isConfirmed && colors.light
         }
    });
    const classes = useStyles()

    const getUserAvatar = (name, surname) => `${name.substring(0, 1)}${surname.substring(0, 1)}`

    return <Avatar className={classes.avatar} icon={!avatar && (!name || !surname) && <FaceIcon />} src={`${imageApi}/${avatar}`}>{!avatar && name && surname && getUserAvatar(name, surname)}</Avatar>
}

CustomAvatar.propTypes = {
    name: string,
    surname: string,
    color: string,
    avatar: string,
    isConfirmed: bool,
};

export default CustomAvatar;