import { CATEGORY_BY_ID_QUERY } from "#graphql";
import { formatDateTime } from "#utils/time-format-converter";
import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import { useParsed, useShow } from "@refinedev/core";
import { Show } from "@refinedev/mui";

export const CategoryShow = () => {
  const { id } = useParsed();

  const { query } = useShow({
    resource: "categories",
    meta: {
      gqlQuery: CATEGORY_BY_ID_QUERY,
      operationName: "getCategoryById",
      variables: {
        id,
      },
    },
  });

  const { data, isLoading } = query;

  const record = data?.data;

  const InfoField = ({ label, value }: { label: string; value?: string }) => (
    <div style={{ marginBottom: "1rem" }}>
      <Typography
        variant="caption"
        style={{
          color: "text.secondary",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          fontSize: "0.7rem",
        }}
      >
        {label}
      </Typography>
      <div style={{ marginTop: "0.5rem" }}>
        {value && value.startsWith("http") ? (
          <img
            src={value}
            alt={label}
            style={{ maxWidth: "150px", maxHeight: "150px", objectFit: "cover" }}
          />
        ) : (
          <Typography variant="body1" style={{ color: "text.primary" }}>
            {value || "—"}
          </Typography>
        )}
      </div>
    </div>
  );

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <Typography
      variant="h6"
      sx={{
        fontWeight: 600,
        mb: 2,
        color: "primary.main",
        fontSize: "1rem",
      }}
    >
      {children}
    </Typography>
  );

  return (
    <Show isLoading={isLoading}>
      <Stack spacing={3}>
        {/* Basic Information */}
        <Paper elevation={0} sx={{ p: 3, border: "1px solid", borderColor: "divider" }}>
          <SectionTitle>Basic Information</SectionTitle>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3 }}>
            <InfoField label="ID" value={record?.id?.toString()} />
            <InfoField label="Last Edited By" value={record?.lastEditedBy?.toString()} />
            <InfoField label="Created At" value={formatDateTime(record?.createdAt?.toString())} />
            <InfoField label="Updated At" value={formatDateTime(record?.updatedAt?.toString())} />

            <Box>
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
                Status
              </Typography>
              <Box sx={{ mt: 0.5 }}>
                <Chip
                  label={record?.status || "Unknown"}
                  size="small"
                  color={record?.status === "active" ? "success" : "default"}
                  sx={{ fontWeight: 500 }}
                />
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* SEO & URLs */}
        <Paper elevation={0} sx={{ p: 3, border: "1px solid", borderColor: "divider" }}>
          <SectionTitle>SEO & URLs</SectionTitle>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3 }}>
            <InfoField label="Slug" value={record?.slug} />
            <InfoField label="Meta Title" value={record?.metaTitle} />
            <InfoField label="Meta Description" value={record?.metaDescription} />
            <InfoField label="Canonical Tag" value={record?.canonicalTag} />
            <InfoField label="Breadcrumb" value={record?.breadcrumb} />
            <InfoField label="SEO Schema" value={record?.seoSchema} />
          </Box>
        </Paper>

        {/* Media */}
        <Paper elevation={0} sx={{ p: 3, border: "1px solid", borderColor: "divider" }}>
          <SectionTitle>Media</SectionTitle>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3 }}>
            <InfoField label="Poster Image URL" value={record?.posterImageUrl} />
          </Box>
        </Paper>
      </Stack>
    </Show>
  );
};
