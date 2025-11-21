import { gql } from "@apollo/client";

// Get all subcategories
export const SUBCATEGORY_LIST_QUERY = gql`
  query GetSubcategoryList {
    getSubcategoryList {
      id
      name
      categoryId
      description
      shortDescription
      customUrl
      metaTitle
      metaDescription
      canonicalTag
      thumbnailUrl
      createdAt
      updatedAt
      lastEditedBy
      breadCrumb
      seoSchema
      status
    }
  }
`;

// Get single subcategory by ID
export const SUBCATEGORY_BY_ID_QUERY = gql`
  query GetSubcategoryById($input: GetSubcategoryByIdInput!) {
    getSubcategoryById(input: $input) {
      id
      name
      categoryId
      description
      shortDescription
      customUrl
      metaTitle
      metaDescription
      canonicalTag
      thumbnailUrl
      thumbnailPublicId
      thumbnailText
      createdAt
      updatedAt
    }
  }
`;
