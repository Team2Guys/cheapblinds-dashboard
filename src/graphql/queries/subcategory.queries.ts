import { gql } from "@apollo/client";

// Get all subcategories
export const SUBCATEGORY_LIST_QUERY = gql`
  query GetSubcategoryList {
    getSubcategoryList {
      id
      categoryId
      name
      description
      shortDescription
      customUrl
      metaTitle
      metaDescription
      canonicalTag
      breadCrumb
      posterImageUrl
      lastEditedBy
      seoSchema
      status
      createdAt
      updatedAt
    }
  }
`;

// Get single subcategory by ID
export const SUBCATEGORY_BY_ID_QUERY = gql`
  query GetSubcategoryById($id: ID!) {
    getSubcategoryById(id: $id) {
      id
      categoryId
      name
      description
      shortDescription
      customUrl
      metaTitle
      metaDescription
      canonicalTag
      breadCrumb
      posterImageUrl
      lastEditedBy
      seoSchema
      status
      category {
        name
      }
      createdAt
      updatedAt
    }
  }
`;
