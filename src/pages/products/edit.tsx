import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
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
      <Box component="form" autoComplete="off">
        <Grid container spacing={2}>

          <Grid item xs={12} md={6}>
            <TextField
              {...register("name", { required: "This field is required" })}
              error={!!errors?.name}
              helperText={!!errors?.name?.message}
              fullWidth
              label="Name"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              {...register("customUrl")}
              error={!!errors?.customUrl}
              helperText={!!errors?.customUrl?.message}
              fullWidth
              label="Custom URL"
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
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              {...register("shortDescription")}
              error={!!errors?.shortDescription}
              helperText={!!errors?.shortDescription?.message}
              fullWidth
              label="Short Description"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              {...register("metaTitle")}
              error={!!errors?.metaTitle}
              helperText={!!errors?.metaTitle?.message}
              fullWidth
              label="Meta Title"
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
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              {...register("canonicalTag")}
              error={!!errors?.canonicalTag}
              helperText={!!errors?.canonicalTag?.message}
              fullWidth
              label="Canonical Tag"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              {...register("breadCrumb")}
              error={!!errors?.breadCrumb}
              helperText={!!errors?.breadCrumb?.message}
              fullWidth
              label="Breadcrumb"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              {...register("thumbnailUrl")}
              error={!!errors?.thumbnailUrl}
              helperText={!!errors?.thumbnailUrl?.message}
              fullWidth
              label="Thumbnail URL"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              {...register("lastEditedBy")}
              error={!!errors?.lastEditedBy}
              helperText={!!errors?.lastEditedBy?.message}
              fullWidth
              label="Last Edited By"
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
              minRows={3}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              {...register("price", { valueAsNumber: true })}
              error={!!errors?.price}
              helperText={!!errors?.price?.message}
              fullWidth
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
              type="number"
              label="Discount Price"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              {...register("stock", { valueAsNumber: true })}
              error={!!errors?.stock}
              helperText={!!errors?.stock?.message}
              fullWidth
              type="number"
              label="Stock"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    value={field.value || ""}
                    onChange={field.onChange}
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
              name="subcategoryId"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="subcategory-label">Subcategory</InputLabel>
                  <Select
                    labelId="subcategory-label"
                    value={field.value || ""}
                    onChange={field.onChange}
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
