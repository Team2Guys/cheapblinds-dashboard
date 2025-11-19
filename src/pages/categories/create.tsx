import { Box, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Create } from "@refinedev/mui";
import { useForm as useRefineForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

type ContentStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

interface ICategoryCreate {
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
  status: ContentStatus;
}

const statusOptions: ContentStatus[] = ["DRAFT", "PUBLISHED", "ARCHIVED"];

export const CategoryCreate = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    formState: { errors },
  } = useRefineForm<ICategoryCreate>({
    defaultValues: {
      name: "",
      description: "",
      shortDescription: "",
      customUrl: "",
      metaTitle: "",
      metaDescription: "",
      canonicalTag: "",
      breadCrumb: "",
      thumbnailUrl: "",
      lastEditedBy: "",
      seoSchema: "",
      status: "PUBLISHED",
    },
  });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box component="form" sx={{ display: "flex", flexDirection: "column" }} autoComplete="off">
        <TextField
          {...register("name", { required: "This field is required" })}
          error={!!errors?.name}
          helperText={!!errors?.name?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Name"
        />

        <TextField
          {...register("description")}
          error={!!errors?.description}
          helperText={!!errors?.description?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Description"
          multiline
          minRows={3}
        />

        <TextField
          {...register("shortDescription")}
          error={!!errors?.shortDescription}
          helperText={!!errors?.shortDescription?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Short Description"
        />

        <TextField
          {...register("customUrl")}
          error={!!errors?.customUrl}
          helperText={!!errors?.customUrl?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Custom URL"
        />

        <TextField
          {...register("metaTitle")}
          error={!!errors?.metaTitle}
          helperText={!!errors?.metaTitle?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Meta Title"
        />

        <TextField
          {...register("metaDescription")}
          error={!!errors?.metaDescription}
          helperText={!!errors?.metaDescription?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Meta Description"
          multiline
          minRows={2}
        />

        <TextField
          {...register("canonicalTag")}
          error={!!errors?.canonicalTag}
          helperText={!!errors?.canonicalTag?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Canonical Tag"
        />

        <TextField
          {...register("breadCrumb")}
          error={!!errors?.breadCrumb}
          helperText={!!errors?.breadCrumb?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Breadcrumb"
        />

        <TextField
          {...register("thumbnailUrl")}
          error={!!errors?.thumbnailUrl}
          helperText={!!errors?.thumbnailUrl?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Thumbnail URL"
        />

        <TextField
          {...register("lastEditedBy")}
          error={!!errors?.lastEditedBy}
          helperText={!!errors?.lastEditedBy?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Last Edited By"
        />

        <TextField
          {...register("seoSchema")}
          error={!!errors?.seoSchema}
          helperText={!!errors?.seoSchema?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="SEO Schema"
          multiline
          minRows={4}
        />

        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <FormControl margin="normal" fullWidth>
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
      </Box>
    </Create>
  );
};
