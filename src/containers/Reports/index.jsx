import React from 'react';
import labels from '../../assets/labels';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const EXCHANGE_RATES = gql`
  {
    companies {
      name
    }
  }
`;

const Dashboard  = () => {
    const { loading, error, data } = useQuery(EXCHANGE_RATES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return data.companies.map(({ name }) => (
        <div>
            <p>{name}</p>
        </div>
    ));
}

export default Dashboard;

