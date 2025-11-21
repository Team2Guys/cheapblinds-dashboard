import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { DeleteButton, EditButton, List, ShowButton, useDataGrid } from "@refinedev/mui";
import React from "react";
import { ADMIN_LIST_QUERY } from "../../graphql";
import { useList } from "@refinedev/core";

export const AdminList = () => {
  const { dataGridProps } = useDataGrid({
    resource: "admins",
    meta: {
      gqlQuery: ADMIN_LIST_QUERY,
      dataMapper: (response: any) => response?.data?.adminList?.data || [],
      getTotalCount: (response: any) => response?.data?.adminList?.data?.length || 0,
    },
  });

  const { result } = useList({
    resource: "admins",
    meta: {
      gqlQuery: ADMIN_LIST_QUERY,
      dataMapper: (response: any) => response?.data?.adminList?.data || [],
      getTotalCount: (response: any) => response?.data?.adminList?.data?.length || 0,
    },
  });

  console.log("result:", result);
  console.log("dataGridProps:", dataGridProps);

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
        field: "permissions",
        headerName: "Permissions",
        type: "string",
        minWidth: 200,
        flex: 1,
        align: "left",
        headerAlign: "left",
        display: "flex",
        sortable: false,
        filterable: false,
        renderCell: ({ row }) => row.permissions?.join(", "),
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
