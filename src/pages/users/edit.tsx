import { Box, TextField, Grid } from '@mui/material';
import { useParsed } from '@refinedev/core';
import { Edit } from '@refinedev/mui';
import { useForm as useRefineForm } from '@refinedev/react-hook-form';
import { USER_BY_ID_QUERY, UPDATE_USER_BY_ID_MUTATION } from '../../graphql';

export const UserEdit = () => {
  const { id } = useParsed();

  const {
    saveButtonProps,
    register,
    formState: { errors }
  } = useRefineForm({
    refineCoreProps: {
      resource: 'users',
      meta: {
        gqlQuery: USER_BY_ID_QUERY,
        operationName: 'userById',
        gqlMutation: UPDATE_USER_BY_ID_MUTATION,
        variables: {
          id
        }
      }
    }
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box component="form" autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('name')}
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
              {...register('email')}
              error={!!errors?.email}
              helperText={!!errors?.email?.message}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="text"
              label="Email"
            />
          </Grid>
        </Grid>
      </Box>
    </Edit>
  );
};
