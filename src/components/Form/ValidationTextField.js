import withStyles from "@material-ui/core/styles/withStyles";
import {TextField} from "formik-material-ui";

export const ValidationTextField = withStyles({
    root: {
        '& input:valid + fieldset': {
            borderColor: 'green',
            borderWidth: 5,
        },
        '& input:invalid + fieldset': {
            borderColor: 'red',
            borderWidth: 5,
        }
    },
})(TextField);
