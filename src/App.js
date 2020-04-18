import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Calendar from './containers/Calendar';
import Report from './containers/Reports';
import Warehouse from './containers/Warehouse';
import './App.scss';

const App  = () => (
    <div className="page-container">
        <Router>
            <Switch>
                <div className="wrapper">
                    <Route path="/calendar"><Calendar /></Route>
                    <Route path="/report"><Report /></Route>
                    <Route path="/warehouse"><Warehouse /></Route>
                    <Route path="/"><Redirect to="/calendar" /></Route>
                </div>
            </Switch>
            <Navbar/>
        </Router>
    </div>
);

export default App;
