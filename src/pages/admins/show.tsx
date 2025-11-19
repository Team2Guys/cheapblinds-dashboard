import { Grid, Typography } from "@mui/material";
import { useShow } from "@refinedev/core";
import { Show, TextFieldComponent as TextField } from "@refinedev/mui";

export const AdminShow = () => {
  const { query } = useShow({});
  const { data, isLoading } = query;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" fontWeight="bold">
            ID
          </Typography>
          <TextField value={record?.id} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="body1" fontWeight="bold">
            Name
          </Typography>
          <TextField value={record?.name} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="body1" fontWeight="bold">
            Email
          </Typography>
          <TextField value={record?.email} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="body1" fontWeight="bold">
            Password
          </Typography>
          <TextField value={record?.password} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="body1" fontWeight="bold">
            Permissions
          </Typography>
          <TextField value={record?.permissions?.join(", ")} />
        </Grid>
      </Grid>
    </Show>
  );
};
