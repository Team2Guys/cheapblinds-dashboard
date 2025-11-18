import { Stack, Typography } from "@mui/material";
import { useShow } from "@refinedev/core";
import { Show, TextFieldComponent as TextField } from "@refinedev/mui";

export const AdminShow = () => {
  const { query } = useShow({});
  const { data, isLoading } = query;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          ID
        </Typography>
        <TextField value={record?.id} />

        <Typography variant="body1" fontWeight="bold">
          Name
        </Typography>
        <TextField value={record?.name} />

        <Typography variant="body1" fontWeight="bold">
          Email
        </Typography>
        <TextField value={record?.email} />

        <Typography variant="body1" fontWeight="bold">
          Password
        </Typography>
        <TextField value={record?.password} />

        <Typography variant="body1" fontWeight="bold">
          Permissions
        </Typography>
        <TextField value={record?.permissions?.join(", ")} />
      </Stack>
    </Show>
  );
};
