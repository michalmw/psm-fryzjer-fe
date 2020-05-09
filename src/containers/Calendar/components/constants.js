import { gql } from "apollo-boost";

export const ADD_USER = gql`
  mutation AddUser($newUserInput: NewUserInput!) {
    addUser(newUserInput: $newUserInput) {
        _id
        activationCode
      }
  }
`;
