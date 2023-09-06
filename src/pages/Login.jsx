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
import useAuth from "../hooks/useAuth";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(true);
  const [setAuth] = useAuth();
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
    console.log("Date capiutred in booking", data);
  };
  const onError = (errors) => console.log(errors);

  return (
    <Box sx={{ flexGrow: 1, margin: "1.5rem 2.5rem" }}>
      <Header title="Log In" icon={<ReplyOutlinedIcon />} />

      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Box>
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
                    }}
                    {...field}
                  />
                )}
              />
            </Box>
            <Box>
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
                    }}
                    {...field}
                  />
                )}
              />
            </Box>
          </Grid>
        </Grid>

        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={4}
          sx={{ marginTop: "1rem" }}
        >
          <Button
            size="large"
            variant="contained"
            type="submit"
            style={{
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.neutral[600],
              fontWeight: "bold",
            }}
          >
            Book
          </Button>
        </Stack>

        <div className="spinner">
          <Loader
            loaded={loaded}
            lines={13}
            length={20}
            width={10}
            radius={30}
            corners={1}
            rotate={0}
            direction={1}
            color="#000"
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
      </form>
    </Box>
  );
};

export default Login;
