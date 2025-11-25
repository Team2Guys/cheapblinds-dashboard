import { gql } from "@apollo/client";

export const PRODUCT_LIST_QUERY = gql`
  query GetProductList {
    getProductList {
      id
      name
      description
      shortDescription
      customUrl
      metaTitle
      metaDescription
      canonicalTag
      breadCrumb
      posterImageUrl
      productImages
      lastEditedBy
      seoSchema
      price
      discountPrice
      stock
      status
      categoryId
      subcategoryId
      category {
        id
        name
        customUrl
      }
      subcategory {
        id
        name
        customUrl
      }
      additionalInfo
      measuringGuide
      updatedAt
      createdAt
    }
  }
`;

export const PRODUCT_BY_ID_QUERY = gql`
  query GetProductById($id: ID!) {
    getProductById(id: $id) {
      id
      name
      description
      shortDescription
      customUrl
      metaTitle
      metaDescription
      canonicalTag
      breadCrumb
      posterImageUrl
      productImages
      lastEditedBy
      seoSchema
      price
      discountPrice
      stock
      status
      categoryId
      subcategoryId
      category {
        id
        name
        customUrl
      }
      subcategory {
        id
        name
        customUrl
      }
      additionalInfo
      measuringGuide
      updatedAt
      createdAt
    }
  }
`;
