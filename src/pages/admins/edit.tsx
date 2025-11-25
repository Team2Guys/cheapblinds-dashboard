import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Grid,
} from "@mui/material";
import { useParsed } from "@refinedev/core";
import { Edit } from "@refinedev/mui";
import { useForm as useRefineForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { ADMIN_BY_ID_QUERY, UPDATE_ADMIN_BY_ID_MUTATION } from "../../graphql";

const availablePermissions = [
  "ADD_PRODUCTS",
  "EDIT_PRODUCTS",
  "DELETE_PRODUCTS",
  "ADD_CATEGORY",
  "DELETE_CATEGORY",
  "EDIT_CATEGORY",
  "CHECK_PROFIT",
  "CHECK_REVENUE",
  "CHECK_VISITORS",
  "VIEW_USERS",
  "VIEW_SALES",
  "VIEW ADMINS",
  "VIEW_TOTAL_PRODUCTS",
  "VIEW_TOTAL_CATEGORIES",
];

export const AdminEdit = () => {
  const { id } = useParsed();

  const {
    saveButtonProps,
    register,
    control,
    formState: { errors },
  } = useRefineForm({
    refineCoreProps: {
      resource: "admins",
      meta: {
        gqlQuery: ADMIN_BY_ID_QUERY,
        operationName: "getAdminById",
        gqlMutation: UPDATE_ADMIN_BY_ID_MUTATION,
        variables: {
          id,
        },
      },
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box component="form" autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register("name")}
              error={!!errors?.name}
              helperText={!!errors?.name?.message}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="text"
              label="Name"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              {...register("email")}
              error={!!errors?.email}
              helperText={!!errors?.email?.message}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="text"
              label="Email"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="permissions"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="permissions-label">Permissions</InputLabel>
                  <Select
                    labelId="permissions-label"
                    multiple
                    value={field.value || []}
                    onChange={field.onChange}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {availablePermissions.map((perm) => (
                      <MenuItem key={perm} value={perm}>
                        <Checkbox checked={field.value?.includes(perm)} />
                        <ListItemText primary={perm} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              {...register("lastEditedBy")}
              error={!!errors?.password}
              helperText={!!errors?.password?.message}
              fullWidth
              InputLabelProps={{ shrink: true }}
              InputProps={{ readOnly: true }}
              type="text"
              label="Last Edited By"
              disabled
            />
          </Grid>
        </Grid>
      </Box>
    </Edit>
  );
};
