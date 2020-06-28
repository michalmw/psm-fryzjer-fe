import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Calendar from './containers/Calendar';
import Registration from './containers/Reqistration';
import Report from './containers/Reports';
import Clients from './containers/Client';
import Warehouse from './containers/Warehouse';
import './App.scss';

const App  = () => (
    <div className="page-container">
        <Router>
            <Switch>
                <div className="wrapper">
                    <Route path="/registration"><Registration /></Route>
                    <Route path="/calendar"><Calendar /></Route>
                    <Route path="/report"><Report /></Route>
                    <Route path="/clients"><Clients /></Route>
                    <Route path="/warehouse"><Warehouse /></Route>
                    <Route path="/"><Redirect to="/registration" /></Route>
                </div>
            </Switch>
        </Router>
    </div>
);

export default App;
