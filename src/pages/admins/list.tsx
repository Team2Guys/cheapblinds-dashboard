import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { DeleteButton, EditButton, List, ShowButton, useDataGrid } from "@refinedev/mui";
import React from "react";
import { ADMIN_LIST_QUERY } from "../../graphql";

interface IAdmin {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

export const AdminList = () => {
  const { dataGridProps } = useDataGrid<IAdmin>({
    resource: "admins",
    meta: {
      gqlQuery: ADMIN_LIST_QUERY,
      operationName: "getAdminList",
    },
  });

  const columns = React.useMemo<GridColDef<IAdmin>[]>(
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
