import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { DeleteButton, EditButton, List, ShowButton, useDataGrid } from "@refinedev/mui";
import React from "react";
import { PRODUCT_LIST_QUERY } from "../../graphql";
import { formatDateTime } from "#utils/time-format-converter";

export const ProductList = () => {
  const { dataGridProps } = useDataGrid({
    resource: "products",
    meta: {
      gqlQuery: PRODUCT_LIST_QUERY,
      operationName: "getProductList",
    },
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "name",
        headerName: "Name",
        type: "string",
        minWidth: 200,
        flex: 1,
        align: "left",
        headerAlign: "left",
        display: "flex",
        sortable: false,
        filterable: false,
      },
      {
        field: "slug",
        headerName: "Custom URL",
        type: "string",
        minWidth: 200,
        flex: 1,
        align: "left",
        headerAlign: "left",
        display: "flex",
        sortable: false,
        filterable: false,
      },
      {
        field: "createdAt",
        headerName: "Created At",
        type: "string",
        minWidth: 200,
        flex: 1,
        align: "left",
        headerAlign: "left",
        display: "flex",
        sortable: false,
        filterable: false,
        renderCell: ({ row }) => formatDateTime(row.createdAt),
      },
      {
        field: "status",
        headerName: "Status",
        type: "string",
        minWidth: 200,
        flex: 0,
        align: "left",
        headerAlign: "left",
        display: "flex",
        sortable: false,
        filterable: false,
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        minWidth: 120,
        flex: 0,
        align: "right",
        headerAlign: "right",
        display: "flex",
        sortable: false,
        filterable: false,
        renderCell: ({ row }) => (
          <>
            <EditButton hideText recordItemId={row.id} />
            <ShowButton hideText recordItemId={row.id} />
            <DeleteButton hideText recordItemId={row.id} />
          </>
        ),
      },
    ],
    [],
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} />
    </List>
  );
};
