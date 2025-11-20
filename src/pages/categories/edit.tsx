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
} from "@mui/material";
import { Edit } from "@refinedev/mui";
import { useForm as useRefineForm } from "@refinedev/react-hook-form";
import axios from "axios";
import { useRef, useState } from "react";
import { Controller } from "react-hook-form";

type ContentStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

interface ICategoryEdit {
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

export const CategoryEdit = () => {
  const [uploading, setUploading] = useState(false);

  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    setValue,
    formState: { errors },
  } = useRefineForm<ICategoryEdit>({
    refineCoreProps: {
      action: "edit",
    },
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Upload failed:", getErrorMessage(error));
      if (fileInputRef.current) fileInputRef.current.value = "";
    } finally {
      setUploading(false);
    }
  };

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box component="form" autoComplete="off">
        <Grid container spacing={3}>
          {/* Primary Content Section */}
          <Grid item xs={12} lg={8}>
            <Paper elevation={0} sx={{ p: 3, border: 1, borderColor: "divider" }}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Basic Information
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Enter the category name and descriptions
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
                placeholder="e.g., Technology, Fashion, Sports"
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
                placeholder="Detailed description of this category"
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
                placeholder="e.g., technology-news"
              />
            </Paper>

            {/* SEO Section */}
            <Paper elevation={0} sx={{ p: 3, mt: 3, border: 1, borderColor: "divider" }}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                SEO Settings
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Optimize your category for search engines
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
                    placeholder="https://example.com/category"
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
                    placeholder="Home > Categories > Name"
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
                    placeholder='{"@context": "https://schema.org", "@type": "CollectionPage", ...}'
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Sidebar Section */}
          <Grid item xs={12} lg={4}>
            {/* Status & Publishing */}
            <Paper elevation={0} sx={{ p: 3, border: 1, borderColor: "divider" }}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Publishing
              </Typography>
              <Divider sx={{ mb: 3 }} />

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

            {/* Media Section */}
            <Paper elevation={0} sx={{ p: 3, mt: 3, border: 1, borderColor: "divider" }}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Featured Image
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Upload a thumbnail for this category
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
                  onChange={handleFileChange}
                  ref={fileInputRef}
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
                    alt="Category Thumbnail"
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
    </Edit>
  );
};
