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
      thumbnailUrl
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
  query GetSubcategoryById($input: GetSubcategoryByIdInput!) {
    getSubcategoryById(input: $input) {
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
      thumbnailUrl
      lastEditedBy
      seoSchema
      status
      createdAt
      updatedAt
    }
  }
`;
