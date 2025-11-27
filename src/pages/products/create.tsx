import { getErrorMessage } from "#utils/index";
import { useDropzone } from "react-dropzone";
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
  Chip,
  Stack,
  InputAdornment,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Create, useDataGrid } from "@refinedev/mui";
import { useForm as useRefineForm } from "@refinedev/react-hook-form";
import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import { CATEGORY_LIST_QUERY, CREATE_PRODUCT_MUTATION } from "#graphql";

type ContentStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

interface IProductCreate {
  name: string;
  description?: string;
  shortDescription?: string;
  additionalInfo?: string; // New Field
  measuringGuide?: string; // New Field
  slug?: string;
  categoryId: string;
  subcategoryId: string;
  price: number;
  discountPrice?: number;
  stock: number;
  height?: number;
  width?: number;
  weight?: number;
  color?: string;
  pattern?: string;
  composition?: string;
  isMotorized?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  canonicalTag?: string;
  breadcrumb?: string;
  posterImageUrl?: string;
  productImages?: string[];
  lastEditedBy?: string;
  seoSchema?: string;
  status: ContentStatus;
}

const statusOptions: ContentStatus[] = ["DRAFT", "PUBLISHED", "ARCHIVED"];
const colorOptions = ["Red", "Blue", "Green", "Black", "White"];
const compositionOptions = ["Cotton", "Polyester", "Leather", "Metal", "Plastic"];
const patternOptions = ["Solid", "Striped", "Checked", "Printed", "Patterned"];

// Shared Editor Configuration for consistency
const EDITOR_INIT_CONFIG = {
  height: 400,
  menubar: false,
  statusbar: true,
  branding: false,
  resize: true,
  plugins: [
    "advlist",
    "autolink",
    "lists",
    "link",
    "image",
    "charmap",
    "preview",
    "anchor",
    "searchreplace",
    "visualblocks",
    "code",
    "fullscreen",
    "insertdatetime",
    "media",
    "table",
    "wordcount",
    "help",
  ],
  toolbar:
    "undo redo | blocks | bold italic underline | " +
    "alignleft aligncenter alignright | " +
    "bullist numlist outdent indent | link table | " +
    "removeformat code fullscreen",
  content_style:
    "body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; font-size: 14px; line-height: 1.6; padding: 10px; }",
  block_formats: "Paragraph=p; Heading 2=h2; Heading 3=h3; Preformatted=pre",
};

// Reusable Editor Component to maintain UI consistency
const FormRichText = ({
  name,
  control,
  label,
  helperText,
  errors,
}: {
  name: keyof IProductCreate;
  control: Control<IProductCreate>;
  label: string;
  helperText: string;
  errors: FieldErrors<IProductCreate>;
}) => (
  <Box sx={{ mt: 3 }}>
    <Typography variant="subtitle1" fontWeight={500} sx={{ mb: 0.5 }}>
      {label}
    </Typography>
    <Typography variant="caption" color="text.secondary" sx={{ mb: 1.5, display: "block" }}>
      {helperText}
    </Typography>

    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <Box
          sx={{
            border: 1,
            borderColor: errors?.[name] ? "error.main" : "divider",
            borderRadius: 1,
            overflow: "hidden",
            transition: "border-color 0.2s",
            "&:hover": {
              borderColor: errors?.[name] ? "error.main" : "primary.main",
            },
            "&:focus-within": {
              borderColor: "primary.main",
              borderWidth: 2,
              m: "-1px", // Prevent layout shift on focus
            },
          }}
        >
          <Editor
            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
            value={value as string}
            onEditorChange={onChange}
            init={{
              ...EDITOR_INIT_CONFIG,
              placeholder: `Enter ${label.toLowerCase()}...`,
            }}
          />
        </Box>
      )}
    />
    {!!errors?.[name] && (
      <Typography variant="caption" color="error" sx={{ mt: 0.5, display: "block" }}>
        {errors[name]?.message?.toString()}
      </Typography>
    )}
  </Box>
);

export const ProductCreate = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [subcategories, setSubcategories] = useState<string[]>([]);

  const { dataGridProps } = useDataGrid({
    resource: "categories",
    meta: {
      gqlQuery: CATEGORY_LIST_QUERY,
      operationName: "getCategoryList",
    },
  });

  const categories = useMemo(() => dataGridProps.rows || [], [dataGridProps.rows]);

  useEffect(() => {
    if (selectedCategory) {
      const subs = categories.find((cat) => cat.id === selectedCategory)?.subcategories;
      setSubcategories(subs || []);
    } else {
      setSubcategories([]);
    }
  }, [selectedCategory, categories]);

  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    setValue,
    formState: { errors },
    watch,
  } = useRefineForm<IProductCreate>({
    defaultValues: {
      name: "",
      description: "",
      shortDescription: "",
      additionalInfo: "", // Default Value
      measuringGuide: "", // Default Value
      slug: "",
      categoryId: "",
      subcategoryId: "",
      price: 0,
      discountPrice: 0,
      stock: 0,
      height: 0,
      width: 0,
      weight: 0,
      color: "",
      composition: "",
      isMotorized: false,
      metaTitle: "",
      metaDescription: "",
      canonicalTag: "",
      breadcrumb: "",
      posterImageUrl: "",
      productImages: [],
      seoSchema: "",
      lastEditedBy: JSON.parse(localStorage.getItem("user") || "{}").name || "",
      status: "DRAFT",
    },
    refineCoreProps: {
      action: "create",
      resource: "products",
      meta: {
        gqlMutation: CREATE_PRODUCT_MUTATION,
        operationName: "createProduct",
      },
    },
  });

  // Featured Image Drop
  const onDropFeatured = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const url = `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    }/image/upload`;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

      const { data } = await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setValue("posterImageUrl", data.secure_url);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  // Gallery Drop
  const onDropGallery = async (acceptedFiles: File[]) => {
    if (!acceptedFiles.length) return;
    setUploadingGallery(true);

    const url = `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    }/image/upload`;

    try {
      const uploadedUrls = await Promise.all(
        acceptedFiles.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
          const res = await axios.post(url, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          return res.data.secure_url;
        }),
      );
      const newImages = [...productImages, ...uploadedUrls.filter(Boolean)];
      setProductImages(newImages);
      setValue("productImages", newImages);
    } catch (err) {
      console.error(err);
    } finally {
      setUploadingGallery(false);
    }
  };

  // Separate dropzones
  const {
    getRootProps: getFeaturedRootProps,
    getInputProps: getFeaturedInputProps,
    isDragActive: isFeaturedDragActive,
  } = useDropzone({ onDrop: onDropFeatured, accept: { "image/*": [] }, multiple: false });

  const posterImageInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);

  const handlePosterImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
        setValue("posterImageUrl", data.secure_url);
      } else {
        if (posterImageInputRef.current) posterImageInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Upload failed:", getErrorMessage(error));
      if (posterImageInputRef.current) posterImageInputRef.current.value = "";
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
                helperText={
                  !!errors?.shortDescription?.message || "Brief description (50-100 characters)"
                }
                margin="normal"
                fullWidth
                InputLabelProps={{ shrink: true }}
                type="text"
                label="Short Description"
                placeholder="A concise summary of this product"
              />

              <TextField
                {...register("slug")}
                error={!!errors?.slug}
                helperText={
                  !!errors?.slug?.message || "URL-friendly slug (e.g., premium-wireless-headphones)"
                }
                margin="normal"
                fullWidth
                InputLabelProps={{ shrink: true }}
                type="text"
                label="Slug"
                placeholder="e.g., premium-wireless-headphones"
              />

              {/* Main Description using Reusable Component */}
              <FormRichText
                name="description"
                control={control}
                errors={errors}
                label="Description"
                helperText="Provide a detailed description of the product with rich formatting"
              />
            </Paper>

            {/* Product Specifications Section */}
            <Paper elevation={0} sx={{ p: 3, mt: 3, border: 1, borderColor: "divider" }}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Product Specifications
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Specify the physical attributes of the product
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    {...register("height", {
                      valueAsNumber: true,
                      min: { value: 0, message: "Height must be positive" },
                    })}
                    error={!!errors?.height}
                    helperText={!!errors?.height?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label="Height"
                    placeholder="e.g., 12.5"
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    {...register("width", {
                      valueAsNumber: true,
                      min: { value: 0, message: "Width must be positive" },
                    })}
                    error={!!errors?.width}
                    helperText={!!errors?.width?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label="Width"
                    placeholder="e.g., 8.5"
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    {...register("weight", {
                      valueAsNumber: true,
                      min: { value: 0, message: "Weight must be positive" },
                    })}
                    error={!!errors?.weight}
                    helperText={!!errors?.weight?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label="Weight"
                    placeholder="e.g., 1.25"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel shrink>Color</InputLabel>
                    <Select
                      {...register("color", { required: "Please select a color" })}
                      defaultValue=""
                      error={!!errors?.color}
                    >
                      {colorOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors?.color && (
                      <Typography variant="caption" color="error">
                        {!!errors.color.message}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel shrink>Composition</InputLabel>
                    <Select
                      {...register("composition", { required: "Please select composition" })}
                      defaultValue=""
                      error={!!errors?.composition}
                    >
                      {compositionOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors?.composition && (
                      <Typography variant="caption" color="error">
                        {!!errors.composition.message}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel shrink>Motorized</InputLabel>
                    <Select
                      {...register("isMotorized", { required: "Please select a value" })}
                      defaultValue=""
                      error={!!errors?.isMotorized}
                    >
                      {["Yes", "No"].map((option) => (
                        <MenuItem key={option} value={option === "No" ? "false" : "true"}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors?.isMotorized && (
                      <Typography variant="caption" color="error">
                        {!!errors.isMotorized.message}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel shrink>Pattern</InputLabel>
                    <Select
                      {...register("pattern", { required: "Please select pattern" })}
                      defaultValue=""
                      error={!!errors?.pattern}
                    >
                      {patternOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors?.pattern && (
                      <Typography variant="caption" color="error">
                        {!!errors.pattern.message}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>

            {/* NEW SECTION: Product Details (Additional Info & Measuring Guide) */}
            <Paper elevation={0} sx={{ p: 3, mt: 3, border: 1, borderColor: "divider" }}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Product Details
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Extended information and guides
              </Typography>
              <Divider sx={{ mb: 1 }} />

              <FormRichText
                name="additionalInfo"
                control={control}
                errors={errors}
                label="Additional Information"
                helperText="Technical specifications, materials, care instructions, etc."
              />

              <FormRichText
                name="measuringGuide"
                control={control}
                errors={errors}
                label="Measuring Guide"
                helperText="Instructions on how to measure for this product (sizes, fit, etc.)"
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
                      min: { value: 0, message: "Price must be positive" },
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
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    {...register("discountPrice", {
                      valueAsNumber: true,
                      min: { value: 0, message: "Price must be positive" },
                    })}
                    error={!!errors?.discountPrice}
                    helperText={!!errors?.discountPrice?.message || "Optional sale price"}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label="Discount Price"
                    placeholder="0.00"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    {...register("stock", {
                      required: "This field is required",
                      valueAsNumber: true,
                      min: { value: 0, message: "Stock cannot be negative" },
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
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                <Typography variant="h6" fontWeight={600}>
                  Product Images
                </Typography>
                {productImages.length > 0 && (
                  <Chip
                    label={`${productImages.length} image${productImages.length > 1 ? "s" : ""}`}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                )}
              </Stack>
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
                            aria-label={`Delete image ${index + 1}`}
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
                    placeholder="SEO-friendly title for search results"
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
                    rows={3}
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
                    {...register("breadcrumb")}
                    error={!!errors?.breadcrumb}
                    helperText={!!errors?.breadcrumb?.message}
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
                    helperText={
                      !!errors?.seoSchema?.message || "JSON-LD structured data for search engines"
                    }
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label="SEO Schema (JSON-LD)"
                    multiline
                    rows={5}
                    placeholder='{"@context": "https://schema.org", "@type": "Product", ...}'
                    sx={{
                      "& textarea": {
                        fontFamily: "monospace",
                        fontSize: "0.875rem",
                      },
                    }}
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
                      {categories.length === 0 ? (
                        <MenuItem disabled value="">
                          <em>No categories available</em>
                        </MenuItem>
                      ) : (
                        categories.map((cat) => (
                          <MenuItem
                            key={cat.id}
                            value={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                          >
                            {cat.name}
                          </MenuItem>
                        ))
                      )}
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
                    >
                      {subcategories.length === 0 ? (
                        <MenuItem disabled value="">
                          <em>No subcategories available</em>
                        </MenuItem>
                      ) : (
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        subcategories.map((subCat: any) => (
                          <MenuItem key={subCat.id} value={subCat.id}>
                            {subCat.name}
                          </MenuItem>
                        ))
                      )}
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
                Upload a featured poster image for this product
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
                  onChange={handlePosterImageChange}
                  ref={posterImageInputRef}
                />
              </Button>

              <Box
                {...getFeaturedRootProps()}
                sx={
                  {
                    /* styling */
                  }
                }
              >
                <input {...getFeaturedInputProps()} />
                {uploading ? (
                  <Typography variant="body2">Uploading...</Typography>
                ) : watch("posterImageUrl") ? (
                  <Box>
                    <img
                      src={watch("posterImageUrl")}
                      alt="Uploaded"
                      style={{
                        width: "100%",
                        maxHeight: 260,
                        objectFit: "cover",
                        borderRadius: 8,
                      }}
                    />
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Click or drag another image to replace
                    </Typography>
                  </Box>
                ) : (
                  <Typography variant="body2">
                    {isFeaturedDragActive
                      ? "Drop the image here..."
                      : "Drag & drop an image, or click to choose"}
                  </Typography>
                )}
              </Box>

              {/* {control._formValues.posterImageUrl ? (
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    paddingTop: "56.25%",
                    overflow: "hidden",
                    borderRadius: 1,
                    border: 1,
                    borderColor: "divider",
                  }}
                >
                  <img
                    src={control._formValues.posterImageUrl}
                    alt="Product Poster Image"
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
              ) : (
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
              )} */}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Create>
  );
};
