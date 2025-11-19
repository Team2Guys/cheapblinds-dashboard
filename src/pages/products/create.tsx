import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
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
      <Box component="form" autoComplete="off">
        <Grid container spacing={2}>

          <Grid item xs={12} md={6}>
            <TextField
              {...register("name", { required: "This field is required" })}
              error={!!errors?.name}
              helperText={!!errors?.name?.message}
              fullWidth
              margin="normal"
              label="Name"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              {...register("customUrl")}
              error={!!errors?.customUrl}
              helperText={!!errors?.customUrl?.message}
              fullWidth
              margin="normal"
              label="Custom URL"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              {...register("description")}
              error={!!errors?.description}
              helperText={!!errors?.description?.message}
              fullWidth
              margin="normal"
              label="Description"
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
              label="Short Description"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              {...register("metaTitle")}
              error={!!errors?.metaTitle}
              helperText={!!errors?.metaTitle?.message}
              fullWidth
              margin="normal"
              label="Meta Title"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              {...register("metaDescription")}
              error={!!errors?.metaDescription}
              helperText={!!errors?.metaDescription?.message}
              fullWidth
              margin="normal"
              label="Meta Description"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              {...register("canonicalTag")}
              error={!!errors?.canonicalTag}
              helperText={!!errors?.canonicalTag?.message}
              fullWidth
              margin="normal"
              label="Canonical Tag"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              {...register("breadCrumb")}
              error={!!errors?.breadCrumb}
              helperText={!!errors?.breadCrumb?.message}
              fullWidth
              margin="normal"
              label="Bread Crumb"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              {...register("thumbnailUrl")}
              error={!!errors?.thumbnailUrl}
              helperText={!!errors?.thumbnailUrl?.message}
              fullWidth
              margin="normal"
              label="Thumbnail URL"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              {...register("lastEditedBy")}
              error={!!errors?.lastEditedBy}
              helperText={!!errors?.lastEditedBy?.message}
              fullWidth
              margin="normal"
              label="Last Edited By"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              {...register("seoSchema")}
              error={!!errors?.seoSchema}
              helperText={!!errors?.seoSchema?.message}
              fullWidth
              margin="normal"
              label="SEO Schema"
              multiline
              minRows={3}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth margin="normal">
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    label="Category"
                    value={field.value}
                    onChange={field.onChange}
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
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="subcategoryId"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth margin="normal">
                  <InputLabel id="subcategory-label">Subcategory</InputLabel>
                  <Select
                    labelId="subcategory-label"
                    label="Subcategory"
                    value={field.value}
                    onChange={field.onChange}
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
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              {...register("price", { required: "This field is required", valueAsNumber: true })}
              error={!!errors?.price}
              helperText={!!errors?.price?.message}
              fullWidth
              margin="normal"
              type="number"
              label="Price"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              {...register("discountPrice", { valueAsNumber: true })}
              error={!!errors?.discountPrice}
              helperText={!!errors?.discountPrice?.message}
              fullWidth
              margin="normal"
              type="number"
              label="Discount Price"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              {...register("stock", { required: "This field is required", valueAsNumber: true })}
              error={!!errors?.stock}
              helperText={!!errors?.stock?.message}
              fullWidth
              margin="normal"
              type="number"
              label="Stock"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth margin="normal">
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
    </Create>
  );
};
