import { getErrorMessage } from "#utils/index";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button,
  Typography,
  Paper,
  Divider,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Create } from "@refinedev/mui";
import { useForm as useRefineForm } from "@refinedev/react-hook-form";
import { useList } from "@refinedev/core";
import axios from "axios";
import { useRef, useState } from "react";
import { Controller } from "react-hook-form";

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
  metaTitle?: string;
  metaDescription?: string;
  canonicalTag?: string;
  breadCrumb?: string;
  thumbnailUrl?: string;
  productImages?: string[];
  lastEditedBy?: string;
  seoSchema?: string;
  status: ContentStatus;
}

const statusOptions: ContentStatus[] = ["DRAFT", "PUBLISHED", "ARCHIVED"];

export const ProductCreate = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [productImages, setProductImages] = useState<string[]>([]);

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
    setValue,
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
      metaTitle: "",
      metaDescription: "",
      canonicalTag: "",
      breadCrumb: "",
      thumbnailUrl: "",
      productImages: [],
      lastEditedBy: JSON.parse(localStorage.getItem("user") || "{}").name || "",
      seoSchema: "",
      status: "DRAFT",
    },
    refineCoreProps: {
      action: "create",
    },
  });

  const selectedCategoryId = watch("categoryId");
  const thumbnailInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);

  const handleThumbnailChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    const url = `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    }/image/upload`;

    try {
      const response = await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = response.data;

      if (data.secure_url) {
        setValue("thumbnailUrl", data.secure_url);
      } else {
        console.error("Upload failed:", data);
        if (thumbnailInputRef.current) thumbnailInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Upload failed:", getErrorMessage(error));
      if (thumbnailInputRef.current) thumbnailInputRef.current.value = "";
    } finally {
      setUploading(false);
    }
  };

  const handleGalleryChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploadingGallery(true);

    const url = `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    }/image/upload`;

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

        const response = await axios.post(url, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        return response.data.secure_url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      const newImages = [...productImages, ...uploadedUrls.filter(Boolean)];
      setProductImages(newImages);
      setValue("productImages", newImages);

      if (galleryInputRef.current) galleryInputRef.current.value = "";
    } catch (error) {
      console.error("Upload failed:", getErrorMessage(error));
      if (galleryInputRef.current) galleryInputRef.current.value = "";
    } finally {
      setUploadingGallery(false);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const newImages = productImages.filter((_, index) => index !== indexToRemove);
    setProductImages(newImages);
    setValue("productImages", newImages);
  };

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box component="form" autoComplete="off">
        <Grid container spacing={3}>
          {/* Primary Content Section */}
          <Grid item xs={12} lg={8}>
            <Paper elevation={0} sx={{ p: 3, border: 1, borderColor: "divider" }}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Basic Information
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Enter the product name and descriptions
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <TextField
                {...register("name", { required: "This field is required" })}
                error={!!errors?.name}
                helperText={!!errors?.name?.message}
                margin="normal"
                fullWidth
                InputLabelProps={{ shrink: true }}
                type="text"
                label="Name"
                placeholder="e.g., Premium Wireless Headphones"
                required
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
                placeholder="Brief description (50-100 characters)"
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
                minRows={4}
                placeholder="Detailed description of this product"
              />

              <TextField
                {...register("customUrl")}
                error={!!errors?.customUrl}
                helperText={!!errors?.customUrl?.message}
                margin="normal"
                fullWidth
                InputLabelProps={{ shrink: true }}
                type="text"
                label="Custom URL Slug"
                placeholder="e.g., premium-wireless-headphones"
              />
            </Paper>

            {/* Pricing Section */}
            <Paper elevation={0} sx={{ p: 3, mt: 3, border: 1, borderColor: "divider" }}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Pricing & Inventory
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Set product pricing and stock information
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    {...register("price", {
                      required: "This field is required",
                      valueAsNumber: true,
                    })}
                    error={!!errors?.price}
                    helperText={!!errors?.price?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label="Price"
                    placeholder="0.00"
                    required
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    {...register("discountPrice", { valueAsNumber: true })}
                    error={!!errors?.discountPrice}
                    helperText={!!errors?.discountPrice?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label="Discount Price"
                    placeholder="0.00"
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    {...register("stock", {
                      required: "This field is required",
                      valueAsNumber: true,
                    })}
                    error={!!errors?.stock}
                    helperText={!!errors?.stock?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label="Stock"
                    placeholder="0"
                    required
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Product Images Gallery */}
            <Paper elevation={0} sx={{ p: 3, mt: 3, border: 1, borderColor: "divider" }}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Product Images
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Upload additional product images (multiple files allowed)
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Button
                variant="outlined"
                component="label"
                fullWidth
                disabled={uploadingGallery}
                sx={{ mb: 3 }}
              >
                {uploadingGallery ? "Uploading..." : "Add Images"}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  multiple
                  onChange={handleGalleryChange}
                  ref={galleryInputRef}
                />
              </Button>

              {productImages.length > 0 ? (
                <ImageList cols={3} gap={12}>
                  {productImages.map((image, index) => (
                    <ImageListItem key={index}>
                      <img
                        src={image}
                        alt={`Product ${index + 1}`}
                        loading="lazy"
                        style={{
                          height: 200,
                          objectFit: "cover",
                          borderRadius: 8,
                        }}
                      />
                      <ImageListItemBar
                        sx={{
                          background:
                            "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                          borderRadius: "8px 8px 0 0",
                        }}
                        position="top"
                        actionIcon={
                          <IconButton
                            sx={{ color: "white" }}
                            onClick={() => handleRemoveImage(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        }
                        actionPosition="right"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: 200,
                    bgcolor: "action.hover",
                    borderRadius: 1,
                    border: 1,
                    borderColor: "divider",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    No product images added
                  </Typography>
                </Box>
              )}
            </Paper>

            {/* SEO Section */}
            <Paper elevation={0} sx={{ p: 3, mt: 3, border: 1, borderColor: "divider" }}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                SEO Settings
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Optimize your product for search engines
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    {...register("metaTitle")}
                    error={!!errors?.metaTitle}
                    helperText={!!errors?.metaTitle?.message || "Recommended: 50-60 characters"}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label="Meta Title"
                    placeholder="SEO-friendly title"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    {...register("metaDescription")}
                    error={!!errors?.metaDescription}
                    helperText={
                      !!errors?.metaDescription?.message || "Recommended: 150-160 characters"
                    }
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label="Meta Description"
                    multiline
                    minRows={3}
                    placeholder="Description that appears in search results"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    {...register("canonicalTag")}
                    error={!!errors?.canonicalTag}
                    helperText={!!errors?.canonicalTag?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label="Canonical URL"
                    placeholder="https://example.com/product"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    {...register("breadCrumb")}
                    error={!!errors?.breadCrumb}
                    helperText={!!errors?.breadCrumb?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label="Breadcrumb"
                    placeholder="Home > Category > Product"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    {...register("seoSchema")}
                    error={!!errors?.seoSchema}
                    helperText={!!errors?.seoSchema?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label="SEO Schema (JSON-LD)"
                    multiline
                    minRows={5}
                    placeholder='{"@context": "https://schema.org", "@type": "Product", ...}'
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Sidebar Section */}
          <Grid item xs={12} lg={4}>
            {/* Category & Publishing */}
            <Paper elevation={0} sx={{ p: 3, border: 1, borderColor: "divider" }}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Category & Publishing
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Controller
                name="categoryId"
                control={control}
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <FormControl fullWidth margin="normal" error={!!errors?.categoryId}>
                    <InputLabel id="category-label">Category *</InputLabel>
                    <Select
                      labelId="category-label"
                      label="Category *"
                      value={field.value}
                      onChange={field.onChange}
                    >
                      {categories.map((cat) => (
                        <MenuItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {!!errors?.categoryId && (
                      <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.75 }}>
                        {!!errors.categoryId.message}
                      </Typography>
                    )}
                  </FormControl>
                )}
              />

              <Controller
                name="subcategoryId"
                control={control}
                rules={{ required: "Subcategory is required" }}
                render={({ field }) => (
                  <FormControl fullWidth margin="normal" error={!!errors?.subcategoryId}>
                    <InputLabel id="subcategory-label">Subcategory *</InputLabel>
                    <Select
                      labelId="subcategory-label"
                      label="Subcategory *"
                      value={field.value}
                      onChange={field.onChange}
                      disabled={!selectedCategoryId}
                    >
                      {subcategories
                        .filter((sub) => sub.categoryId === selectedCategoryId)
                        .map((sub) => (
                          <MenuItem key={sub.value} value={sub.value}>
                            {sub.label}
                          </MenuItem>
                        ))}
                    </Select>
                    {!!errors?.subcategoryId && (
                      <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.75 }}>
                        {!!errors.subcategoryId.message}
                      </Typography>
                    )}
                  </FormControl>
                )}
              />

              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth margin="normal">
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

              <TextField
                {...register("lastEditedBy")}
                error={!!errors?.lastEditedBy}
                helperText={!!errors?.lastEditedBy?.message}
                margin="normal"
                fullWidth
                InputLabelProps={{ shrink: true }}
                type="text"
                label="Last Edited By"
                disabled
                size="small"
              />
            </Paper>

            {/* Featured Image Section */}
            <Paper elevation={0} sx={{ p: 3, mt: 3, border: 1, borderColor: "divider" }}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Featured Image
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Upload a featured thumbnail for this product
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Button
                variant="outlined"
                component="label"
                fullWidth
                disabled={uploading}
                sx={{ mb: 2 }}
              >
                {uploading ? "Uploading..." : "Choose Image"}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  ref={thumbnailInputRef}
                />
              </Button>

              {control._formValues.thumbnailUrl && (
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    paddingTop: "56.25%", // 16:9 aspect ratio
                    overflow: "hidden",
                    borderRadius: 1,
                    border: 1,
                    borderColor: "divider",
                  }}
                >
                  <img
                    src={control._formValues.thumbnailUrl}
                    alt="Product Thumbnail"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              )}

              {!control._formValues.thumbnailUrl && (
                <Box
                  sx={{
                    width: "100%",
                    paddingTop: "56.25%",
                    bgcolor: "action.hover",
                    borderRadius: 1,
                    border: 1,
                    borderColor: "divider",
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      No image selected
                    </Typography>
                  </Box>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Create>
  );
};
