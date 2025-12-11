import { gql } from "@apollo/client";

export const NEWSLETTER_SUBSCRIBER_LIST_QUERY = gql`
  query GetNewsletterSubscriberList {
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

export const NEWSLETTER_SUBSCRIBER_BY_ID_QUERY = gql`
  query GetNewsletterSubscriberById($id: ID!) {
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
