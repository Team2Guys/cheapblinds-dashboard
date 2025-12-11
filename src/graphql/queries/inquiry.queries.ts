import { gql } from "@apollo/client";

export const INQUIRY_LIST_QUERY = gql`
  query GetInquiryList {
    adminList {
      id
      name
      email
      phone
      message
      inquiryType
      inquiryStatus
      createdAt
      updatedAt
    }
  }
`;

export const INQUIRY_BY_ID_QUERY = gql`
  query GetInquiryById($id: ID!) {
    adminById(id: $id) {
      id
      name
      email
      phone
      message
      inquiryType
      inquiryStatus
      createdAt
      updatedAt
    }
  }
`;
