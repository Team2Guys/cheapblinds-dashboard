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
import { Edit } from "@refinedev/mui";
import { useForm as useRefineForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

type Permission = "CREATE_USER" | "EDIT_USER" | "DELETE_USER" | "VIEW_REPORTS";
const availablePermissions: Permission[] = [
  "CREATE_USER",
  "EDIT_USER",
  "DELETE_USER",
  "VIEW_REPORTS",
];

export const AdminEdit = () => {
  const {
    saveButtonProps,
    register,
    control,
    formState: { errors },
  } = useRefineForm();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box component="form" autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register("name", { required: "This field is required" })}
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
              {...register("email", { required: "This field is required" })}
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
            <TextField
              {...register("password", { required: "This field is required" })}
              error={!!errors?.password}
              helperText={!!errors?.password?.message}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="password"
              label="Password"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="permissions"
              control={control}
              render={({ field }) => (
                <FormControl margin="normal" fullWidth>
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
        </Grid>
      </Box>
    </Edit>
  );
};
