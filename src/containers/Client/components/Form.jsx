import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { BrowserRouter as Router, Link, Switch, Route, Redirect, useParams } from 'react-router-dom';

const EXCHANGE_RATES = gql`
  query client($id: String!) {
    client(id: $id) {
        _id
      name
      surname
      additionalInfo
    }
  }
`;

const ClientForm  = () => {
    let { id } = useParams();

    const {loading, error, data } = useQuery(EXCHANGE_RATES, {variables: {id}});

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;


    return(
      <div>
        Imię: {data.client.name} <br />
        Nazwisko: {data.client.surname} <br />
        Telefon: {data.client.phone} <br />
        Dodatkowe Info: {data.client.additionalInfo} <br /><br />
        <Link to="/clients">
        Lista
      </Link>
      </div>
    )
}

export default ClientForm;
