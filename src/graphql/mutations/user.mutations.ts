import { gql } from "@apollo/client";

export const UPDATE_USER_BY_ID = gql`
  mutation UpdateUserById($input: UpdateUserByIdInput!) {
    updateUserById(input: $input) {
      status
      message
    }
  }
`;

export const REMOVE_USER_BY_ID = gql`
  mutation removeUserById($input: RemoveUserByIdInput!) {
    removeUserById(input: $input) {
      status
      message
    }
  }
`;
