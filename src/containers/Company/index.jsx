import React from 'react';
import {Switch, Route } from 'react-router-dom';

import Form from './components/Form';
import Details from './components/Details';
import {url} from '../../constants';

const Company  = () => {
    return(
      <Switch>
        <Route path={`${url.companies}/edit/:id`}><Form /></Route>
        <Route path={`${url.companies}/:id`}><Details /></Route>
      </Switch>
    );
}

export default Company;
