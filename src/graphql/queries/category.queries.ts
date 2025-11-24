import { gql } from "@apollo/client";

export const CATEGORY_LIST_QUERY = gql`
  query GetCategoryList {
    getCategoryList {
      id
      name
      description
      shortDescription
      breadCrumb
      seoSchema
      status
      customUrl
      metaTitle
      metaDescription
      canonicalTag
      thumbnailUrl
      subcategories {
        id
        name
      }
      lastEditedBy
      createdAt
      updatedAt
    }
  }
`;

export const CATEGORY_BY_ID_QUERY = gql`
  query GetCategoryById($id: ID!) {
    getCategoryById(id: $id) {
      id
      name
      description
      shortDescription
      breadCrumb
      seoSchema
      status
      customUrl
      metaTitle
      metaDescription
      canonicalTag
      thumbnailUrl
      lastEditedBy
      createdAt
      updatedAt
    }
  }
`;
