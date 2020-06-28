import React from 'react';
import { BrowserRouter as Router, useRouteMatch, Link, BrowserRouter,  Switch, Route, Redirect, useParams } from 'react-router-dom';

import ClientForm from './components/Form';
import ClientsList from './components/List';

const Clients  = () => {
  let match = useRouteMatch();

    return(
      <Switch>
        <Route path={`${match.path}/:id`}>
          <ClientForm />
        </Route>
        <Route path={`${match.path}`}>
          <ClientsList />
        </Route>
      </Switch>
    );
}

export default Clients;
