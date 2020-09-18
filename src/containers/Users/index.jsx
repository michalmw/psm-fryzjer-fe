import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';

import Form from './components/Form';
import EditForm from './components/EditForm';
import Details from './components/Details';
import List from './components/List';
import { url } from '../../constants';

const Users  = () => {
  let match = useRouteMatch();

    return(
      <Switch>
        <Route path={`${match.path}${url.invite}`}><Form /></Route>
        <Route path={`${match.path}/edit`}><EditForm /></Route>
        <Route path={`${match.path}/:id`}><Details /></Route>
        <Route path={`${match.path}`}><List /></Route>
      </Switch>
    );
}

export default Users;
