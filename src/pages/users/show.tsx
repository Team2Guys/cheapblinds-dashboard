import { Box, Paper, Stack, Typography } from "@mui/material";
import { useParsed, useShow } from "@refinedev/core";
import { Show } from "@refinedev/mui";
import { USER_BY_ID_QUERY } from "../../graphql";
import { formatDateTime } from "#utils/time-format-converter";

export const UserShow = () => {
  const { id } = useParsed();

  const { query } = useShow({
    resource: "users",
    meta: {
      gqlQuery: USER_BY_ID_QUERY,
      operationName: "userById",
      variables: {
        id,
      },
    },
  });
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
      <Typography variant="body1" sx={{ mt: 0.5, color: "text.primary" }}>
        {value ?? "—"}
      </Typography>
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
        <Paper elevation={0} sx={{ p: 3, border: "1px solid", borderColor: "divider" }}>
          <SectionTitle>User Information</SectionTitle>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3 }}>
            <InfoField label="Name" value={record?.name} />
            <InfoField label="Email" value={record?.email} />
            <InfoField label="Role" value={record?.role} />
            <InfoField label="Permissions" value={record?.permissions?.join(", ")} />
            <InfoField label="Created At" value={formatDateTime(record?.createdAt)} />
            <InfoField label="Updated At" value={formatDateTime(record?.updatedAt)} />
          </Box>
        </Paper>
      </Stack>
    </Show>
  );
};
