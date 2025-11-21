import { gqlClient } from "#utils/gql-client";
import createDataProvider from "@refinedev/graphql";

export const dataProvider = createDataProvider(gqlClient);
