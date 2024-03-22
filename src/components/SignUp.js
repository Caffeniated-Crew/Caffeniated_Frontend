import * as React from 'react';
import axios from 'axios'; 
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MenuItem from '@mui/material/MenuItem';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function SignUp() {
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [graduationYear, setGraduationYear] = React.useState('');
  const [university, setUniversity] = React.useState('');
  const [degree, setDegree] = React.useState('');

  const degrees = [
    "B.Tech",
    "B.E",
    "B.Sc",
  ];

  const graduationYears = [
    "2024",
    "2025",
    "2026",
    "2027",
    // Add more years as needed
  ];

  const universities = [
    "KJSCE",
    "SIES",
    // Add more universities as needed
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get('firstName') + ' ' + formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
      skills: [],
      university: formData.get('university'),
      certificate: [],
      degree: formData.get('degree'),
      work: [],
      yearOfGrad: parseInt(formData.get('yearOfGrad')),
    };
    
    try {
      const response = await axios.post('https://caffiniated-backend.onrender.com/auth/register', payload);
      if (response.status === 200) {
        window.location.replace('/');

        console.log('Registration successful:', response.data);
      }
      // Optionally, you can redirect the user or show a success message here
    } catch (error) {
      // Parse the response JSON if available
      let errorMessage = "Registration failed";
      try {
        const responseData = JSON.parse(error.request.response);
        if (responseData && responseData.error) {
          errorMessage = responseData.error;
        }
      } catch (parseError) {
        console.error("Error parsing response:", parseError);
      }
      alert(errorMessage);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <Button
                        onClick={handleTogglePasswordVisibility}
                        tabIndex={-1}
                        style={{ minWidth: 0 }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </Button>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <Button
                        onClick={handleToggleConfirmPasswordVisibility}
                        tabIndex={-1}
                        style={{ minWidth: 0 }}
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </Button>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="university-label">College Name</InputLabel>
                  <Select
                    labelId="university-label"
                    id="university"
                    name="university"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    label="College Name"
                  >
                    {universities.map((university) => (
                      <MenuItem key={university} value={university}>
                        {university}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="degree-label">Degree</InputLabel>
                  <Select
                    labelId="degree-label"
                    id="degree"
                    name="degree"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    label="Degree"
                  >
                    {degrees.map((degree) => (
                      <MenuItem key={degree} value={degree}>
                        {degree}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  id="graduationYear"
                  label="Graduation Year"
                  name="graduationYear"
                  value={graduationYear}
                  onChange={(e) => setGraduationYear(e.target.value)}
                  variant="outlined"
                >
                  {graduationYears.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;
