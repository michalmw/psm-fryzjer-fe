import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/layout/Header';
import Navbar from './components/layout/Navbar';

import Calendar from './containers/Calendar';
import Dashboard from './containers/Dashboard';
import Report from './containers/Reports';
import Warehouse from './containers/Warehouse';

import './assets/styles/styles.scss';

const App  = () => (
    <div className="app">
        <Router >
            <Header />
            <Navbar />
            <Switch>
                <Route path="/calendar"><Calendar /></Route>
                <Route path="/report"><Report /></Route>
                <Route path="/warehouse"><Warehouse /></Route>
                <Route path="/"><Dashboard /></Route>
            </Switch>
        </Router>
    </div>
);

export default App;
