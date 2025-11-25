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
  Stack,
} from "@mui/material";
import { Create } from "@refinedev/mui";
import { useForm as useRefineForm } from "@refinedev/react-hook-form";
import axios from "axios";
import { useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import { CREATE_CATEGORY_MUTATION } from "#graphql";

type ContentStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

interface ICategoryCreate {
  name: string;
  description?: string;
  shortDescription?: string;
  slug?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalTag?: string;
  breadcrumb?: string;
  posterImageUrl?: string;
  seoSchema?: string;
  lastEditedBy?: string;
  status: ContentStatus;
}

const statusOptions: ContentStatus[] = ["DRAFT", "PUBLISHED", "ARCHIVED"];

export const CategoryCreate = () => {
  const [uploading, setUploading] = useState(false);

  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    setValue,
    formState: { errors },
  } = useRefineForm<ICategoryCreate>({
    defaultValues: {
      name: "",
      description: "",
      shortDescription: "",
      slug: "",
      metaTitle: "",
      metaDescription: "",
      canonicalTag: "",
      breadcrumb: "",
      posterImageUrl: "",
      seoSchema: "",
      lastEditedBy: JSON.parse(localStorage.getItem("user") || "{}").name || "",
      status: "DRAFT",
    },
    refineCoreProps: {
      resource: "categories",
      meta: {
        gqlMutation: CREATE_CATEGORY_MUTATION,
        operationName: "createCategory",
      },
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
        setValue("posterImageUrl", data.secure_url);
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
                helperText={
                  !!errors?.shortDescription?.message || "Brief description (50-100 characters)"
                }
                margin="normal"
                fullWidth
                InputLabelProps={{ shrink: true }}
                type="text"
                label="Short Description"
                placeholder="A concise summary of this category"
              />

              <TextField
                {...register("slug")}
                error={!!errors?.slug}
                helperText={!!errors?.slug?.message || "URL-friendly slug (e.g., technology-news)"}
                margin="normal"
                fullWidth
                InputLabelProps={{ shrink: true }}
                type="text"
                label="Slug"
                placeholder="e.g., technology-news"
              />

              {/* Rich Text Editor Section */}
              <Box sx={{ mt: 4 }}>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                  <Typography variant="subtitle1" fontWeight={500}>
                    Description
                  </Typography>
                </Stack>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mb: 2, display: "block" }}
                >
                  Provide a detailed description of the category with rich formatting
                </Typography>

                <Controller
                  name="description"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Box
                      sx={{
                        border: 1,
                        borderColor: errors?.description ? "error.main" : "divider",
                        borderRadius: 1,
                        overflow: "hidden",
                        transition: "border-color 0.2s",
                        "&:hover": {
                          borderColor: errors?.description ? "error.main" : "primary.main",
                        },
                        "&:focus-within": {
                          borderColor: "primary.main",
                          borderWidth: 2,
                        },
                      }}
                    >
                      <Editor
                        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                        value={value}
                        onEditorChange={onChange}
                        init={{
                          height: 450,
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
                            "undo redo | blocks | bold italic underline strikethrough | " +
                            "alignleft aligncenter alignright alignjustify | " +
                            "bullist numlist outdent indent | link image media table | " +
                            "removeformat code fullscreen | help",
                          toolbar_mode: "sliding",
                          content_style:
                            "body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; font-size: 14px; line-height: 1.6; padding: 10px; }",
                          placeholder: "Write a detailed description of this category...",
                          block_formats:
                            "Paragraph=p; Heading 1=h1; Heading 2=h2; Heading 3=h3; Preformatted=pre",
                        }}
                      />
                    </Box>
                  )}
                />

                {!!errors?.description && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5, display: "block" }}>
                    {!!errors.description.message?.toString()}
                  </Typography>
                )}
              </Box>
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
                    placeholder="https://example.com/category"
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
                    placeholder="Home > Categories > Name"
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
                    placeholder='{"@context": "https://schema.org", "@type": "CollectionPage", ...}'
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
                Upload a poster image for this category
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

              {control._formValues.posterImageUrl ? (
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
                    alt="Category Poster Image"
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
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Create>
  );
};
