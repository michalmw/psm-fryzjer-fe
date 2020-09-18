import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';

import Form from './components/Form';
import Details from './components/Details';
import List from './components/List';
import { url } from '../../constants';

const Client  = () => {
  let match = useRouteMatch();

    return(
      <Switch>
        <Route path={`${match.path}${url.add}`}><Form /></Route>
        <Route path={`${match.path}/edit/:id`}><Form /></Route>
        <Route path={`${match.path}/:id`}><Details /></Route>
        <Route path={`${match.path}`}><List /></Route>
      </Switch>
    );
}

export default Client;
