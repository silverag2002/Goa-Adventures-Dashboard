import React, { useEffect, useState } from "react";
import Header from "components/Header";
import FlexBetween from "components/FlexBetween";
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Button,
  useTheme,
  Typography,
  Stack,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { axiosInstance } from "../base/api/axios.util";
import { URLConstants } from "../base/api/url.constants";
import Loader from "react-loader";
import { useNavigate, useLocation } from "react-router-dom";
import axios, * as others from "axios";

var FormData = require("form-data");

const AddStaff = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [loaded, setLoaded] = useState(true);
  const [reloadPage, setReloadPage] = useState(false);
  const [active, setActive] = useState(false);
  const location = useLocation();

  const {
    handleSubmit,
    register,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({});

  var clientDataAssignment = {};

  console.log("LOcaltion", location);
  if (location.state) {
    clientDataAssignment = location.state.staff;
  }
  console.log("ASsingment issue", clientDataAssignment);

  useEffect(() => {
    setValue("name", clientDataAssignment.name);
    setValue("email", clientDataAssignment.email);
    setValue("mobile_number", clientDataAssignment.mobile_number);
    setValue("aadhar_number", clientDataAssignment.aadhar_number);

    setActive(clientDataAssignment.active);
  }, [reloadPage]);

  const onSubmit = (data) => {
    setLoaded(false);
    data.active = active;
    console.log("Data", data);
    var formData = new FormData();
    if (data.profile_image[0]?.size) {
      formData.append("profile_image", data.profile_image[0]);
    }

    formData.append("name", data.name.trim());
    formData.append("mobile_number", data.mobile_number.trim());
    formData.append("email", data.email.trim());

    formData.append("aadhar_number", data.aadhar_number.trim());
    formData.append("active", data.active);

    if (clientDataAssignment.id) {
      var config = {
        method: "PUT",
        url: URLConstants.modifyStaff(clientDataAssignment.id),
        headers: {
          headers: { "content-type": "multipart/form-data" },
        },
        data: formData,
      };

      axios(config)
        .then((res) => {
          setLoaded(true);
          console.log("Responsse form staff post method", res);
          navigate("/manage-staff");
        })
        .catch((err) => {
          setLoaded(true);
          console.log("error", err);
        });
    } else {
      var config = {
        method: "POST",
        url: URLConstants.staff(),
        headers: {
          headers: { "content-type": "multipart/form-data" },
        },
        data: formData,
      };

      axios(config)
        .then((res) => {
          setLoaded(true);
          console.log("Responsse form staff post method", res);
          navigate("/manage-staff");
        })
        .catch((err) => {
          setLoaded(true);
          console.log("error", err);
        });
    }
  };

  const onError = (errors) => console.log(errors);
  return (
    <Box sx={{ flexGrow: 1, margin: "1.5rem 2.5rem" }}>
      <FlexBetween>
        <Header title="Create Staff" subtitle="" />
        <Button
          variant="contained"
          size="large"
          style={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.neutral[600],
            fontWeight: "bold",
          }}
          href="/customers"
        >
          Go Back
        </Button>
      </FlexBetween>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Box>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="name"
                    label="Staff Name"
                    variant="filled"
                    fullWidth
                    margin="normal"
                    {...field}
                  />
                )}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box>
              <Controller
                name="mobile_number"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="mobile_number"
                    label="Mobile Number"
                    variant="filled"
                    fullWidth
                    margin="normal"
                    {...field}
                  />
                )}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="email"
                    label="Email"
                    variant="filled"
                    fullWidth
                    margin="normal"
                    {...field}
                  />
                )}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Box>
              <Controller
                name="aadhar_number"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="aadhar_number"
                    label="Aadhar Number"
                    variant="filled"
                    fullWidth
                    margin="normal"
                    {...field}
                  />
                )}
              />
            </Box>
          </Grid>
          <Grid item xs={4} md={4}>
            <Box>
              <Controller
                name="active"
                control={control}
                render={({ field }) => (
                  <TextField
                    select
                    id="active"
                    label="Active"
                    variant="filled"
                    fullWidth
                    margin="normal"
                    value={active}
                    onChange={(e) => setActive(e.target.value)}
                  >
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </TextField>
                )}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={12}>
            <Typography variant="h4">Profile Picture</Typography>
          </Grid>
          <Grid item xs={4} md={4}>
            <Box>
              <input
                type="file"
                placeholder="Image URL"
                {...register("profile_image")}
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
          <Button
            size="large"
            variant="contained"
            style={{
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.neutral[600],
              fontWeight: "bold",
            }}
            href="/bookings"
          >
            Cancel
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

export default AddStaff;
