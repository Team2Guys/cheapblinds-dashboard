import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Grid } from "@mui/material";
import { Edit } from "@refinedev/mui";
import { useForm as useRefineForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

type ContentStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";
const statusOptions: ContentStatus[] = ["DRAFT", "PUBLISHED", "ARCHIVED"];

export const CategoryEdit = () => {
  const {
    saveButtonProps,
    register,
    control,
    formState: { errors },
  } = useRefineForm();

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
              margin="normal"
              InputLabelProps={{ shrink: true }}
              label="Name"
              type="text"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              {...register("customUrl")}
              error={!!errors?.customUrl}
              helperText={!!errors?.customUrl?.message}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              label="Custom URL"
              type="text"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              {...register("metaTitle")}
              error={!!errors?.metaTitle}
              helperText={!!errors?.metaTitle?.message}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              label="Meta Title"
              type="text"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              {...register("metaDescription")}
              error={!!errors?.metaDescription}
              helperText={!!errors?.metaDescription?.message}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              label="Meta Description"
              type="text"
              multiline
              minRows={2}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              {...register("description")}
              error={!!errors?.description}
              helperText={!!errors?.description?.message}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              label="Description"
              type="text"
              multiline
              minRows={3}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              {...register("shortDescription")}
              error={!!errors?.shortDescription}
              helperText={!!errors?.shortDescription?.message}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              label="Short Description"
              type="text"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              {...register("canonicalTag")}
              error={!!errors?.canonicalTag}
              helperText={!!errors?.canonicalTag?.message}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              label="Canonical Tag"
              type="text"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              {...register("breadCrumb")}
              error={!!errors?.breadCrumb}
              helperText={!!errors?.breadCrumb?.message}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              label="Breadcrumb"
              type="text"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              {...register("thumbnailUrl")}
              error={!!errors?.thumbnailUrl}
              helperText={!!errors?.thumbnailUrl?.message}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              label="Thumbnail URL"
              type="text"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              {...register("lastEditedBy")}
              error={!!errors?.lastEditedBy}
              helperText={!!errors?.lastEditedBy?.message}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              label="Last Edited By"
              type="text"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              {...register("seoSchema")}
              error={!!errors?.seoSchema}
              helperText={!!errors?.seoSchema?.message}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              label="SEO Schema"
              type="text"
              multiline
              minRows={4}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <FormControl margin="normal" fullWidth>
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    labelId="status-label"
                    label="Status"
                    value={field.value}
                    onChange={field.onChange}
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
