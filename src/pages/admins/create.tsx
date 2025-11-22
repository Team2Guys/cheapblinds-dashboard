import { CREATE_ADMIN_MUTATION } from "#graphql";
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
import { Create } from "@refinedev/mui";
import { useForm as useRefineForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

interface IAdminCreate {
  name: string;
  email: string;
  password: string;
  role: "ADMIN";
  permissions: string[];
}

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
    refineCoreProps: {
      resource: "admins",
      meta: {
        gqlMutation: CREATE_ADMIN_MUTATION,
        operationName: "createAdmin",
      },
    },
  });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box component="form" autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register("name", { required: "This field is required" })}
              error={!!errors?.name}
              helperText={!!errors?.name?.message}
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
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="email"
              label="Email"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              {...register("password", { required: "This field is required" })}
              error={!!errors?.password}
              helperText={!!errors?.password?.message}
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
                <FormControl fullWidth>
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
          </Grid>
        </Grid>
      </Box>
    </Create>
  );
};
