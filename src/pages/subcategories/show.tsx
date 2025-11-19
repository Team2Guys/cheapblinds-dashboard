import { Stack, Typography } from "@mui/material";
import { useShow } from "@refinedev/core";
import { Show, TextFieldComponent as TextField } from "@refinedev/mui";

export const SubcategoryShow = () => {
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
          Description
        </Typography>
        <TextField value={record?.description} />

        <Typography variant="body1" fontWeight="bold">
          Short Description
        </Typography>
        <TextField value={record?.shortDescription} />

        <Typography variant="body1" fontWeight="bold">
          Custom URL
        </Typography>
        <TextField value={record?.customUrl} />

        <Typography variant="body1" fontWeight="bold">
          Category
        </Typography>
        <TextField value={record?.category?.name} />

        <Typography variant="body1" fontWeight="bold">
          Status
        </Typography>
        <TextField value={record?.status} />

        <Typography variant="body1" fontWeight="bold">
          Created At
        </Typography>
        <TextField value={record?.createdAt} />

        <Typography variant="body1" fontWeight="bold">
          Updated At
        </Typography>
        <TextField value={record?.updatedAt} />
      </Stack>
    </Show>
  );
};
