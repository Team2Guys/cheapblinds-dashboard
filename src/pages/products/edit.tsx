import { Box, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Edit } from "@refinedev/mui";
import { useForm as useRefineForm } from "@refinedev/react-hook-form";
import { useList } from "@refinedev/core";
import { Controller } from "react-hook-form";

type ContentStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

interface IProductEdit {
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
  price: number;
  discountPrice?: number;
  stock: number;
  categoryId: string;
  subcategoryId: string;
  status: ContentStatus;
}

const statusOptions: ContentStatus[] = ["DRAFT", "PUBLISHED", "ARCHIVED"];

export const ProductEdit = () => {
  const { result: categoriesData } = useList({ resource: "categories" });
  const { result: subcategoriesData } = useList({ resource: "subcategories" });

  const categories = categoriesData?.data || [];
  const subcategories = subcategoriesData?.data || [];

  const {
    saveButtonProps,
    register,
    control,
    formState: { errors },
  } = useRefineForm<IProductEdit>();

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

        <TextField
          {...register("price", { valueAsNumber: true })}
          error={!!errors?.price}
          helperText={!!errors?.price?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label="Price"
        />

        <TextField
          {...register("discountPrice", { valueAsNumber: true })}
          error={!!errors?.discountPrice}
          helperText={!!errors?.discountPrice?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label="Discount Price"
        />

        <TextField
          {...register("stock", { valueAsNumber: true })}
          error={!!errors?.stock}
          helperText={!!errors?.stock?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label="Stock"
        />

        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => (
            <FormControl margin="normal" fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                value={field.value || ""}
                onChange={field.onChange}
                label="Category"
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
          name="subcategoryId"
          control={control}
          render={({ field }) => (
            <FormControl margin="normal" fullWidth>
              <InputLabel id="subcategory-label">Subcategory</InputLabel>
              <Select
                labelId="subcategory-label"
                value={field.value || ""}
                onChange={field.onChange}
                label="Subcategory"
              >
                {subcategories.map((sub) => (
                  <MenuItem key={sub.id} value={sub.id}>
                    {sub.name}
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
