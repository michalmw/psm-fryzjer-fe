import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';

import Form from './components/Form';
import List from './components/List';
import { url } from '../../constants';

const Warehouse  = () => {
  let match = useRouteMatch();

    return(
      <Switch>
        <Route path={`${match.path}${url.add}`}><Form /></Route>
        <Route path={`${match.path}/:id`}><Form /></Route>
        <Route path={`${match.path}`}><List /></Route>
      </Switch>
    );
}

export default Warehouse;
