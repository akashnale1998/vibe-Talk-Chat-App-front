import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// material-ui
import { Button, FormHelperText, Grid, OutlinedInput, InputLabel, Stack, Typography, Box } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// ============================|| SIMPLE REGISTER ||============================ //

export default function AuthRegisterSimple() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        avatarUrl: ''
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Must be a valid email').required('Email is required'),
        password: Yup.string().required('Password is required')
      })}
      onSubmit={async (values, { setErrors, setSubmitting }) => {
        try {
          const response = await axios.post(
            'https://vibe-talk-chat-app.onrender.com/api/auth/register',
            values
          );

          console.log('User registered:', response.data);
          navigate('/');
        } catch (error) {
          console.error(error);
          if (error.response?.data?.message) {
            setErrors({ submit: error.response.data.message });
          } else {
            setErrors({ submit: 'Something went wrong. Please try again.' });
          }
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Name */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="name">Name*</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="name"
                  name="name"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="John Doe"
                  error={Boolean(touched.name && errors.name)}
                />
              </Stack>
              {touched.name && errors.name && <FormHelperText error>{errors.name}</FormHelperText>}
            </Grid>

            {/* Email */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="email">Email*</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="demo@company.com"
                  error={Boolean(touched.email && errors.email)}
                />
              </Stack>
              {touched.email && errors.email && <FormHelperText error>{errors.email}</FormHelperText>}
            </Grid>

            {/* Password */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="password">Password*</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="******"
                  error={Boolean(touched.password && errors.password)}
                />
              </Stack>
              {touched.password && errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
            </Grid>

            {/* Avatar URL */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="avatarUrl">Avatar URL (optional)</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="avatarUrl"
                  name="avatarUrl"
                  value={values.avatarUrl}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="https://example.com/avatar.png"
                />
              </Stack>
            </Grid>

            {/* Server Error */}
            {errors.submit && (
              <Grid item xs={12}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Grid>
            )}

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                disableElevation
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="primary"
              >
                Register
              </Button>
            </Grid>

            {/* Navigate to login */}
            <Grid item xs={12}>
              <Typography
                variant="body1"
                sx={{ textAlign: 'center', mt: 2, cursor: 'pointer', color: '#3a186e' }}
                onClick={() => navigate('/')}
              >
                Already have an account? Login
              </Typography>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}
