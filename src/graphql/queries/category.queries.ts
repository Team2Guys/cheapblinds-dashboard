import { gql } from "@apollo/client";

export const CATEGORY_LIST_QUERY = gql`
  query GetCategoryList {
    categoryList {
      id
      name
      description
      shortDescription
      breadcrumb
      seoSchema
      status
      slug
      metaTitle
      metaDescription
      canonicalTag
      posterImageUrl
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
    categoryById(id: $id) {
      id
      name
      description
      shortDescription
      breadcrumb
      seoSchema
      status
      slug
      metaTitle
      metaDescription
      canonicalTag
      posterImageUrl
      lastEditedBy
      createdAt
      updatedAt
    }
  }
`;
