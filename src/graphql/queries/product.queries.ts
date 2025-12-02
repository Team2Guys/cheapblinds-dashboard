import { gql } from "@apollo/client";

export const PRODUCT_LIST_QUERY = gql`
  query GetProductList {
    getProductList {
      id
      categoryId
      subcategoryId
      name
      description
      shortDescription
      slug
      metaTitle
      metaDescription
      canonicalTag
      breadcrumb
      posterImageUrl
      productImages
      seoSchema
      price
      discountPrice
      motorPrice
      width
      height
      stock
      color
      pattern
      composition
      isMotorized
      additionalInfo
      measuringGuide
      lastEditedBy
      category {
        id
        name
        slug
      }
      subcategory {
        id
        name
        slug
      }
      status
      createdAt
      updatedAt
    }
  }
`;

export const PRODUCT_BY_ID_QUERY = gql`
  query GetProductById($id: ID!) {
    getProductById(id: $id) {
      id
      categoryId
      subcategoryId
      name
      description
      shortDescription
      slug
      metaTitle
      metaDescription
      canonicalTag
      breadcrumb
      posterImageUrl
      productImages
      seoSchema
      price
      discountPrice
      motorPrice
      width
      height
      stock
      color
      pattern
      composition
      isMotorized
      additionalInfo
      measuringGuide
      lastEditedBy
      category {
        id
        name
        slug
      }
      subcategory {
        id
        name
        slug
      }
      status
      createdAt
      updatedAt
    }
  }
`;
