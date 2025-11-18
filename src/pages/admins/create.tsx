import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { Create } from "@refinedev/mui";
import { useForm as useRefineForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form"; // Controller comes directly from react-hook-form

interface IAdminCreate {
  name: string;
  email: string;
  password: string;
  role: "ADMIN";
  permissions: string[];
}

// You can replace this with dynamic permissions from your backend
const availablePermissions = ["CREATE_USER", "EDIT_USER", "DELETE_USER", "VIEW_REPORTS"];

export const AdminCreate = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    formState: { errors },
  } = useRefineForm<IAdminCreate>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "ADMIN",
      permissions: [],
    },
  });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box component="form" sx={{ display: "flex", flexDirection: "column" }} autoComplete="off">
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
        <TextField
          {...register("email", { required: "This field is required" })}
          error={!!errors?.email}
          helperText={!!errors?.email?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="email"
          label="Email"
        />
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

        <Controller
          name="permissions"
          control={control}
          render={({ field }) => (
            <FormControl margin="normal" fullWidth>
              <InputLabel id="permissions-label">Permissions</InputLabel>
              <Select
                labelId="permissions-label"
                multiple
                value={field.value}
                onChange={field.onChange}
                renderValue={(selected) => selected.join(", ")}
              >
                {availablePermissions.map((perm) => (
                  <MenuItem key={perm} value={perm}>
                    <Checkbox checked={field.value.includes(perm)} />
                    <ListItemText primary={perm} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
      </Box>
    </Create>
  );
};
