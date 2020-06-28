import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { BrowserRouter as Router, useRouteMatch,  Link, Switch, Route, Redirect, useParams } from 'react-router-dom';

const EXCHANGE_RATES = gql`
  {
    clients {
      name
      surname
      _id
    }
  }
`;

const ClientsList  = () => {
    const { loading, error, data } = useQuery(EXCHANGE_RATES);
    let match = useRouteMatch();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return(
      <div>
        { data.clients.map(({ _id, name }) => (
            <p key={_id}>
              <Link to={`${match.url}/${_id}`}>
              {name}
            </Link>
            </p>
         )) }
     </div>
    )
}

export default ClientsList;
