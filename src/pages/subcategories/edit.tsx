import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Grid } from "@mui/material";
import { Edit } from "@refinedev/mui";
import { useForm as useRefineForm } from "@refinedev/react-hook-form";
import { useList } from "@refinedev/core";
import { Controller } from "react-hook-form";

type ContentStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

interface ISubcategoryEdit {
  name: string;
  description?: string;
  shortDescription?: string;
  customUrl?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalTag?: string;
  breadCrumb?: string;
  thumbnailUrl?: string;
  lastEditedBy?: string;
  seoSchema?: string;
  categoryId: string;
  status: ContentStatus;
}

const statusOptions: ContentStatus[] = ["DRAFT", "PUBLISHED", "ARCHIVED"];

export const SubcategoryEdit = () => {
  const { result: categoryData } = useList({
    resource: "categories",
  });

  const categories = categoryData?.data || [];

  const {
    saveButtonProps,
    register,
    control,
    formState: { errors },
  } = useRefineForm<ISubcategoryEdit>();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box component="form" autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              {...register("name", { required: "This field is required" })}
              error={!!errors?.name}
              helperText={!!errors?.name?.message}
              fullWidth
              label="Name"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              {...register("customUrl")}
              error={!!errors?.customUrl}
              helperText={!!errors?.customUrl?.message}
              fullWidth
              label="Custom URL"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              {...register("metaTitle")}
              error={!!errors?.metaTitle}
              helperText={!!errors?.metaTitle?.message}
              fullWidth
              label="Meta Title"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              {...register("metaDescription")}
              error={!!errors?.metaDescription}
              helperText={!!errors?.metaDescription?.message}
              fullWidth
              label="Meta Description"
              multiline
              minRows={2}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              {...register("description")}
              error={!!errors?.description}
              helperText={!!errors?.description?.message}
              fullWidth
              label="Description"
              multiline
              minRows={3}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              {...register("shortDescription")}
              error={!!errors?.shortDescription}
              helperText={!!errors?.shortDescription?.message}
              fullWidth
              label="Short Description"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              {...register("canonicalTag")}
              error={!!errors?.canonicalTag}
              helperText={!!errors?.canonicalTag?.message}
              fullWidth
              label="Canonical Tag"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              {...register("breadCrumb")}
              error={!!errors?.breadCrumb}
              helperText={!!errors?.breadCrumb?.message}
              fullWidth
              label="Breadcrumb"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              {...register("thumbnailUrl")}
              error={!!errors?.thumbnailUrl}
              helperText={!!errors?.thumbnailUrl?.message}
              fullWidth
              label="Thumbnail URL"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              {...register("lastEditedBy")}
              error={!!errors?.lastEditedBy}
              helperText={!!errors?.lastEditedBy?.message}
              fullWidth
              label="Last Edited By"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              {...register("seoSchema")}
              error={!!errors?.seoSchema}
              helperText={!!errors?.seoSchema?.message}
              fullWidth
              label="SEO Schema"
              multiline
              minRows={4}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="category-label">Parent Category</InputLabel>
                  <Select
                    labelId="category-label"
                    value={field.value || ""}
                    onChange={field.onChange}
                    label="Parent Category"
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    labelId="status-label"
                    value={field.value}
                    onChange={field.onChange}
                    label="Status"
                  >
                    {statusOptions.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
        </Grid>
      </Box>
    </Edit>
  );
};
