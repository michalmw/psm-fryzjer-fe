import {createMuiTheme} from '@material-ui/core/styles';

export const colors = {
    primary: '#FF2366',
    secondary: '#5900FF',
    disabled: 'rgba(0, 0, 0, 0.25)',
    light: 'rgba(0, 0, 0, 0.15)',
}

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: colors.primary
        },
        secondary: {
            main: colors.secondary
        }
    },
});
