import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import { useShow } from "@refinedev/core";
import { Show } from "@refinedev/mui";

export const SubcategoryShow = () => {
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
        {value?.startsWith?.("http") ? (
          <img
            src={value}
            alt={label}
            style={{ maxWidth: "150px", maxHeight: "150px", objectFit: "cover" }}
          />
        ) : (
          <Typography variant="body1" sx={{ color: "text.primary" }}>
            {value || "—"}
          </Typography>
        )}
      </Box>
    </Box>
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
            <InfoField label="Name" value={record?.name} />
            <InfoField label="Description" value={record?.description} />
            <InfoField label="Short Description" value={record?.shortDescription} />
            <InfoField label="Custom URL" value={record?.customUrl} />
            <InfoField label="Category" value={record?.category?.name} />
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

        {/* Media & Metadata */}
        <Paper elevation={0} sx={{ p: 3, border: "1px solid", borderColor: "divider" }}>
          <SectionTitle>Media & Metadata</SectionTitle>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3 }}>
            <InfoField label="Thumbnail URL" value={record?.thumbnailUrl} />
            <InfoField label="Created At" value={record?.createdAt?.toString()} />
            <InfoField label="Updated At" value={record?.updatedAt?.toString()} />
            <InfoField label="Last Edited By" value={record?.lastEditedBy} />
          </Box>
        </Paper>
      </Stack>
    </Show>
  );
};
