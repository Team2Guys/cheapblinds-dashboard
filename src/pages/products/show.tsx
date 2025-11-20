import { Box, Chip, Grid, Paper, Stack, Typography, ImageList, ImageListItem } from "@mui/material";
import { useShow } from "@refinedev/core";
import { Show } from "@refinedev/mui";

export const ProductShow = () => {
  const { query } = useShow({});
  const { data, isLoading } = query;
  const record = data?.data;

  const InfoField = ({ label, value }: { label: string; value?: string }) => (
    <Box sx={{ mb: 2.5 }}>
      <Typography
        variant="caption"
        sx={{
          color: "text.secondary",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          fontSize: "0.7rem",
        }}
      >
        {label}
      </Typography>
      <Box sx={{ mt: 0.5 }}>
        {typeof value === "string" && value.startsWith("http") ? (
          <img
            src={value}
            alt={label}
            style={{ maxWidth: "150px", maxHeight: "150px", objectFit: "cover" }}
          />
        ) : (
          <Typography variant="body1" sx={{ color: "text.primary" }}>
            {value || "-"}
          </Typography>
        )}
      </Box>
    </Box>
  );

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <Typography
      variant="h6"
      sx={{ fontWeight: 600, mb: 2, color: "primary.main", fontSize: "1rem" }}
    >
      {children}
    </Typography>
  );

  return (
    <Show isLoading={isLoading}>
      <Stack spacing={3}>
        {/* Basic Info */}
        <Paper elevation={0} sx={{ p: 3, border: "1px solid", borderColor: "divider" }}>
          <SectionTitle>Basic Information</SectionTitle>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <InfoField label="ID" value={record?.id?.toString()} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InfoField label="Name" value={record?.name} />
            </Grid>
            <Grid item xs={12}>
              <InfoField label="Description" value={record?.description} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InfoField label="Short Description" value={record?.shortDescription} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InfoField label="Custom URL" value={record?.customUrl} />
            </Grid>
          </Grid>
        </Paper>

        {/* SEO & URLs */}
        <Paper elevation={0} sx={{ p: 3, border: "1px solid", borderColor: "divider" }}>
          <SectionTitle>SEO & URLs</SectionTitle>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <InfoField label="Meta Title" value={record?.metaTitle} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InfoField label="Meta Description" value={record?.metaDescription} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InfoField label="Canonical Tag" value={record?.canonicalTag} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InfoField label="Breadcrumb" value={record?.breadCrumb} />
            </Grid>
            <Grid item xs={12}>
              <InfoField label="SEO Schema" value={record?.seoSchema} />
            </Grid>
          </Grid>
        </Paper>

        {/* Media & Metadata */}
        <Paper elevation={0} sx={{ p: 3, border: "1px solid", borderColor: "divider" }}>
          <SectionTitle>Media & Metadata</SectionTitle>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <InfoField label="Thumbnail" value={record?.thumbnailUrl} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InfoField label="Price" value={record?.price?.toString()} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InfoField label="Discount Price" value={record?.discountPrice?.toString()} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InfoField label="Stock" value={record?.stock?.toString()} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InfoField label="Category" value={record?.category?.name} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InfoField label="Subcategory" value={record?.subcategory?.name} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Chip label={record?.status || "Unknown"} size="small" color="primary" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InfoField label="Last Edited By" value={record?.lastEditedBy} />
            </Grid>
          </Grid>
        </Paper>

        {/* Product Gallery */}
        <Paper elevation={0} sx={{ p: 3, border: "1px solid", borderColor: "divider" }}>
          <SectionTitle>Product Images</SectionTitle>

          {Array.isArray(record?.productImages) && record.productImages.length > 0 ? (
            <ImageList cols={3} gap={12} sx={{ mt: 1 }}>
              {record.productImages.map((img, idx) => (
                <ImageListItem key={idx}>
                  <img
                    src={img}
                    alt={`Product ${idx + 1}`}
                    style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 6 }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No gallery images available
            </Typography>
          )}
        </Paper>
      </Stack>
    </Show>
  );
};
