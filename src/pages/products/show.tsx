import { Stack, Typography } from "@mui/material";
import { useShow } from "@refinedev/core";
import { Show, TextFieldComponent as TextField } from "@refinedev/mui";

export const ProductShow = () => {
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
          Meta Title
        </Typography>
        <TextField value={record?.metaTitle} />

        <Typography variant="body1" fontWeight="bold">
          Meta Description
        </Typography>
        <TextField value={record?.metaDescription} />

        <Typography variant="body1" fontWeight="bold">
          Canonical Tag
        </Typography>
        <TextField value={record?.canonicalTag} />

        <Typography variant="body1" fontWeight="bold">
          Breadcrumb
        </Typography>
        <TextField value={record?.breadCrumb} />

        <Typography variant="body1" fontWeight="bold">
          Thumbnail URL
        </Typography>
        <TextField value={record?.thumbnailUrl} />

        <Typography variant="body1" fontWeight="bold">
          Last Edited By
        </Typography>
        <TextField value={record?.lastEditedBy} />

        <Typography variant="body1" fontWeight="bold">
          SEO Schema
        </Typography>
        <TextField value={record?.seoSchema} />

        <Typography variant="body1" fontWeight="bold">
          Price
        </Typography>
        <TextField value={record?.price} />

        <Typography variant="body1" fontWeight="bold">
          Discount Price
        </Typography>
        <TextField value={record?.discountPrice} />

        <Typography variant="body1" fontWeight="bold">
          Stock
        </Typography>
        <TextField value={record?.stock} />

        <Typography variant="body1" fontWeight="bold">
          Category
        </Typography>
        <TextField value={record?.category?.name} />

        <Typography variant="body1" fontWeight="bold">
          Subcategory
        </Typography>
        <TextField value={record?.subcategory?.name} />

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
