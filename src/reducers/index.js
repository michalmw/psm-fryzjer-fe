import { combineReducers } from 'redux';
import services from './services';
import categories from './categories';
import users from './users';
import clients from './clients';
import companies from './company';
import products from './products';
import confirmCode from './confirmCode';
import confirmAccount from './confirmAccount';
import checkIfExist from './checkifExists';
import visits from './visits';
import invitations from './invitations';
import login from './login';

export default combineReducers({
    services,
    users,
    clients,
    products,
    categories,
    confirmCode,
    checkIfExist,
    confirmAccount,
    invitations,
    companies,
    visits,
    login
});
