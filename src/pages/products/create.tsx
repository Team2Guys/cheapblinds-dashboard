import { Box, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Create } from "@refinedev/mui";
import { useForm as useRefineForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { useList } from "@refinedev/core";

type ContentStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

interface IProductCreate {
  name: string;
  description?: string;
  shortDescription?: string;
  customUrl?: string;
  categoryId: string;
  subcategoryId: string;
  price: number;
  discountPrice?: number;
  stock: number;
  status: ContentStatus;
}

const statusOptions: ContentStatus[] = ["DRAFT", "PUBLISHED", "ARCHIVED"];

export const ProductCreate = () => {
  const { result: categoriesData } = useList({ resource: "categories" });
  const categories =
    categoriesData?.data?.map(({ id, name }) => ({ value: id, label: name })) ?? [];

  const { result: subcategoriesData } = useList({ resource: "subcategories" });
  const subcategories =
    subcategoriesData?.data?.map(({ id, name, categoryId }) => ({
      value: id,
      label: name,
      categoryId,
    })) ?? [];

  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    watch,
    formState: { errors },
  } = useRefineForm<IProductCreate>({
    defaultValues: {
      name: "",
      description: "",
      shortDescription: "",
      customUrl: "",
      categoryId: "",
      subcategoryId: "",
      price: 0,
      discountPrice: 0,
      stock: 0,
      status: "PUBLISHED",
    },
  });

  const selectedCategoryId = watch("categoryId");

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
          label="Bread Crumb"
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
        />

        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => (
            <FormControl margin="normal" fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                value={field.value}
                onChange={field.onChange}
                label="Category"
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.value} value={cat.value}>
                    {cat.label}
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
                value={field.value}
                onChange={field.onChange}
                label="Subcategory"
              >
                {subcategories
                  .filter((sub) => sub.categoryId === selectedCategoryId)
                  .map((sub) => (
                    <MenuItem key={sub.value} value={sub.value}>
                      {sub.label}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}
        />

        <TextField
          {...register("price", { required: "This field is required", valueAsNumber: true })}
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
          {...register("stock", { required: "This field is required", valueAsNumber: true })}
          error={!!errors?.stock}
          helperText={!!errors?.stock?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label="Stock"
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
