import { Box, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
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

        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => (
            <FormControl margin="normal" fullWidth>
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
    </Edit>
  );
};
