import React from "react";

import {
  Avatar,
  useTheme,
  Grid,
  Button,
  Box,
  TextField,
  Checkbox,
  Link,
  Typography,
  Container,
  CssBaseline,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { borders, borderBottomColor } from "@mui/system";
import FlexBetween from "components/FlexBetween";
import "../styles/Login.css";

const Login = () => {
  const theme = useTheme();
  console.log(theme);

  return (
    <Box
      sx={{
        backgroundImage: "url(https://source.unsplash.com/random?landscape)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          backdropFilter: "blur(25px)",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
          borderRadius: "10px",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Typography variant="h4">Sign in</Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              variant="filled"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              variant="filled"
              borderBottomColor="red"
            />
            <FlexBetween>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Link href="#" variant="body2" sx={{ color: "white" }}>
                Forget password?
              </Link>
            </FlexBetween>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                mb: 2,
                pt: 2,
                pb: 2,
                backgroundColor: "whitesmoke",
                color: "black",
                fontSize: "0.9rem",
                fontWeight: "bold",
              }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
