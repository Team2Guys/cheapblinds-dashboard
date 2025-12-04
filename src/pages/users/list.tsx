import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { DeleteButton, EditButton, List, ShowButton, useDataGrid } from "@refinedev/mui";
import React from "react";
import { USER_LIST_QUERY } from "../../graphql";
import { formatDateTime } from "#utils/time-format-converter";

export const UserList = () => {
  const { dataGridProps } = useDataGrid({
    resource: "users",
    meta: {
      gqlQuery: USER_LIST_QUERY,
      operationName: "userList",
    },
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "fullName",
        headerName: "Name",
        minWidth: 200,
        flex: 1,
        sortable: false,
        filterable: false,
        renderCell: ({ row }) => <span>{`${row.firstName} ${row.lastName}`}</span>,
      },
      {
        field: "email",
        headerName: "Email",
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
        field: "role",
        headerName: "Role",
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
