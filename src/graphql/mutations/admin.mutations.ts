import { gql } from "@apollo/client";

export const UPDATE_ADMIN_BY_ID_MUTATION = gql`
  mutation UpdateAdminById($input: UpdateAdminByIdInput!) {
    updateAdminById(input: $input) {
      message
    }
  }
`;

export const REMOVE_ADMIN_BY_ID_MUTATION = gql`
  mutation removeAdminById($input: RemoveAdminByIdInput!) {
    removeAdminById(input: $input) {
      message
    }
  }
`;
