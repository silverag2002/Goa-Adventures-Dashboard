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
import { useNavigate } from "react-router-dom";
import axios, * as others from "axios";
var FormData = require("form-data");

const AddCustomer = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [loaded, setLoaded] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [reloadPage, setReloadPage] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [product, setProduct] = useState([]);
  const [pendingAmount, setPendingAmount] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [customerId, setCustomerId] = useState("");

  const {
    handleSubmit,
    register,
    control,
    getValues,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    setLoaded(false);
    axiosInstance
      .get(URLConstants.customers())
      .then((response) => {
        setLoaded(true);
        console.log("Response form custoemrs", response);
        setCustomers(response);
      })
      .catch((err) => {
        setLoaded(true);
        console.log(err);
      });
  }, []);

  const onSubmit = (data) => {
    setLoaded(false);
    data.status = true;
    console.log("Data", data);
    var formData = new FormData();
    if (data.profile_image[0]?.size) {
      formData.append("profile_image", data.profile_image[0]);
    }

    formData.append("name", data.name.trim());
    formData.append("mobile_number", data.mobile_number.trim());
    formData.append("email", data.email.trim());
    formData.append("state", data.state.trim());
    formData.append("city", data.city.trim());
    formData.append("country", data.country.trim());
    formData.append("status", data.status);

    var config = {
      method: "POST",
      url: URLConstants.customers(),
      headers: {
        headers: { "content-type": "multipart/form-data" },
      },
      data: formData,
    };

    axios(config)
      .then((res) => {
        setLoaded(true);
        console.log("Responsse form customer post method", res);
        navigate("/customers");
      })
      .catch((err) => {
        setLoaded(true);
        console.log("error", err);
      });
  };

  const onError = (errors) => console.log(errors);
  return (
    <Box sx={{ flexGrow: 1, margin: "1.5rem 2.5rem" }}>
      <FlexBetween>
        <Header title="Create Customer" subtitle="" />
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
                    label="Customer Name"
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
                name="city"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="city"
                    label="City"
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
                name="state"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="state"
                    label="State"
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
                name="country"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="country"
                    label="Country"
                    variant="filled"
                    fullWidth
                    margin="normal"
                    {...field}
                  />
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
                {...register("profile_image", { required: true })}
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

export default AddCustomer;
