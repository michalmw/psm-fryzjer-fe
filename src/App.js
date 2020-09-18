import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Calendar from './containers/Calendar';
import Registration from './containers/Reqistration';
import Clients from './containers/Client';
import Users from './containers/Users';
import Warehouse from './containers/Warehouse';
import Services from './containers/Service';
import Company from './containers/Company';
import ServiceCategories from './containers/ServiceCategory';
import Invitations from './containers/Invitations';

import { url } from './constants';
import './App.scss';

const App  = () => {
    return (
        <div className="page-container">
            <Router>
                <Switch>
                    <div className="wrapper">
                        <Route path={ url.clients }><Clients /></Route>
                        <Route path={ url.users }><Users /></Route>
                        <Route path={ url.services }><Services /></Route>
                        <Route path={ url.categories }><ServiceCategories /></Route>
                        <Route path={ url.products }><Warehouse /></Route>
                        <Route path={ url.calendar }><Calendar /></Route>
                        <Route path={ url.invitations }><Invitations /></Route>
                        <Route path={ url.companies }><Company /></Route>
                        <Route exact path="/">
                            <Registration />
                        </Route>
                    </div>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
