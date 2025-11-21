import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { DeleteButton, EditButton, List, ShowButton, useDataGrid } from "@refinedev/mui";
import React from "react";
import { CATEGORY_LIST_QUERY } from "../../graphql";

export const CategoryList = () => {
  const { dataGridProps } = useDataGrid({
    resource: "categories",
    meta: {
      gqlQuery: CATEGORY_LIST_QUERY,
      operationName: "getCategoryList",
    },
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "string",
        minWidth: 50,
        flex: 0,
        align: "left",
        headerAlign: "left",
        display: "flex",
        sortable: false,
        filterable: false,
      },
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
        field: "customUrl",
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
        field: "status",
        headerName: "Status",
        type: "string",
        minWidth: 120,
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
