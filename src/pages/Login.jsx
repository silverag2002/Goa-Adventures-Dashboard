import React, { useState, useContext } from "react";
import { URLConstants } from "../base/api/url.constants";
import { axiosInstance } from "../base/api/axios.util";
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
  Stack,
} from "@mui/material";
import Header from "components/Header";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { borders, borderBottomColor } from "@mui/system";
import FlexBetween from "components/FlexBetween";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "react-loader";
import { useAuth } from "../base/hooks/useAuth.js";
import Helmet from "components/Helmet/Helmet";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(true);
  const { login } = useAuth();
  const location = useLocation();
  const [error, setError] = useState("");
  const from = location?.state?.from?.pathname || "/dashboard";
  console.log(theme);
  const {
    handleSubmit,
    register,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({});

  const onSubmit = (data) => {
    setLoaded(false);
    console.log("Date capiutred in booking", data);
    console.log("From value", from);
    login({
      email: data.email,
      password: data.password,
    })
      .then((res) => {
        setLoaded(true);
        console.log("Response from login", res);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setLoaded(true);
        console.log("Err", err);
        setError(err);
      });
  };
  const onError = (errors) => console.log(errors);

  return (
    <Helmet title="Login">
      <Box
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?landscape)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
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
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                mt: 2,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: theme.palette.neutral.white,
                  fontWeight: "bold",
                  letterSpacing: "0.1rem",
                }}
              >
                LOGIN
              </Typography>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    sx={{
                      backgroundColor: theme.palette.primary.light,
                      borderRadius: "0.3rem",
                      border: "none",
                      outline: "none",
                    }}
                    {...field}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    margin="normal"
                    sx={{
                      backgroundColor: theme.palette.primary.light,
                      borderRadius: "0.3rem",
                      border: "none",
                      outline: "none",
                    }}
                    {...field}
                  />
                )}
              />
              <FlexBetween>
                {/* <FormControlLabel
                sx={{ color: theme.palette.neutral.white }}
                control={
                  <Checkbox
                    value="remember"
                    sx={{ color: theme.palette.neutral.white }}
                  />
                }
                label="Remember me"
              />
              <Link href="#" variant="body2" sx={{ color: "white" }}>
                Forget password?
              </Link> */}
              </FlexBetween>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  mb: 2,
                  pt: 1.5,
                  pb: 1.5,
                  backgroundColor: "whitesmoke",
                  color: "black",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                }}
              >
                Sign In
              </Button>
            </Box>
            {error}
          </form>
        </Container>

        <div className="spinner">
          <Loader
            loaded={loaded}
            lines={20}
            length={15}
            width={5}
            radius={20}
            corners={1}
            rotate={0}
            direction={1}
            color={theme.palette.primary.main}
            speed={1}
            trail={60}
            shadow={false}
            hwaccel={false}
            className="spinner"
            zIndex={2e9}
            top="50%"
            left="50%"
            scale={1.0}
            loadedClassName="loadedContent"
          />
        </div>
      </Box>
    </Helmet>
  );
};

export default Login;
