import { Grid, Typography } from "@mui/material";
import { useShow } from "@refinedev/core";
import { Show, TextFieldComponent as TextField } from "@refinedev/mui";

export const CategoryShow = () => {
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
            Description
          </Typography>
          <TextField value={record?.description} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="body1" fontWeight="bold">
            Short Description
          </Typography>
          <TextField value={record?.shortDescription} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="body1" fontWeight="bold">
            Custom URL
          </Typography>
          <TextField value={record?.customUrl} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="body1" fontWeight="bold">
            Meta Title
          </Typography>
          <TextField value={record?.metaTitle} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="body1" fontWeight="bold">
            Meta Description
          </Typography>
          <TextField value={record?.metaDescription} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="body1" fontWeight="bold">
            Canonical Tag
          </Typography>
          <TextField value={record?.canonicalTag} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="body1" fontWeight="bold">
            Breadcrumb
          </Typography>
          <TextField value={record?.breadCrumb} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="body1" fontWeight="bold">
            Thumbnail URL
          </Typography>
          <TextField value={record?.thumbnailUrl} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="body1" fontWeight="bold">
            Last Edited By
          </Typography>
          <TextField value={record?.lastEditedBy} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="body1" fontWeight="bold">
            SEO Schema
          </Typography>
          <TextField value={record?.seoSchema} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="body1" fontWeight="bold">
            Status
          </Typography>
          <TextField value={record?.status} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="body1" fontWeight="bold">
            Created At
          </Typography>
          <TextField value={record?.createdAt} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="body1" fontWeight="bold">
            Updated At
          </Typography>
          <TextField value={record?.updatedAt} />
        </Grid>
      </Grid>
    </Show>
  );
};
