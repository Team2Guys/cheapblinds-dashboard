import { gql } from "@apollo/client";

export const SIGNUP = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      status
      message
    }
  }
`;

export const SIGNIN = gql`
  mutation Signin($input: SigninInput!) {
    signin(input: $input) {
      status
      message
      data {
        id
        role
      }
    }
  }
`;

export const SIGNOUT = gql`
  mutation Signout {
    signout {
      status
      message
    }
  }
`;

export const REQUEST_PASSWORD_RESET = gql`
  mutation RequestPasswordReset($input: PasswordResetRequestInput!) {
    requestPasswordReset(input: $input) {
      status
      message
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation UpdatePassword($input: PasswordUpdateInput!) {
    updatePassword(input: $input) {
      status
      message
    }
  }
`;
