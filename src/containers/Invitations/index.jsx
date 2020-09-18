import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import List from './components/List';

const Users  = () => {
  let match = useRouteMatch();

    return(
      <Switch>
        <Route path={`${match.path}/me`}><List isMe/></Route>
        <Route path={`${match.path}`}><List /></Route>
      </Switch>
    );
}

export default Users;
