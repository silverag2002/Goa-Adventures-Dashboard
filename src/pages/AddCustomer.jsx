import React, { useEffect, useState } from "react";
import Header from "components/Header";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import Helmet from "components/Helmet/Helmet";
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Button,
  useTheme,
  Typography,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { axiosInstance } from "../base/api/axios.util";
import { URLConstants } from "../base/api/url.constants";
import Loader from "react-loader";
import { useNavigate, useLocation } from "react-router-dom";
import { ClientContext } from "../base/contexts/UserContext";
import { useClient } from "../base/hooks/useClient";
import axios, * as others from "axios";
import Wrapper from "components/UI/Wrapper";
var FormData = require("form-data");

const AddCustomer = () => {
  const client = useClient();
  const navigate = useNavigate();
  useEffect(() => {
    if (client?.client?.role == undefined) {
      navigate("/");
    }
  }, []);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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
    clientDataAssignment = location.state.customer;
  }
  console.log("ASsingment issue", clientDataAssignment);

  useEffect(() => {
    // setLoaded(false);
    // axiosInstance
    //   .get(URLConstants.customers())
    //   .then((response) => {
    //     setLoaded(true);
    //     console.log("Response form custoemrs", response);
    //     setCustomers(response);
    //   })
    //   .catch((err) => {
    //     setLoaded(true);
    //     console.log(err);
    //   });

    setValue("name", clientDataAssignment.name);
    setValue("email", clientDataAssignment.email);
    setValue("mobile_number", clientDataAssignment.mobile_number);
    setValue("city", clientDataAssignment.city);

    setValue("state", clientDataAssignment.state);
    setValue("country", clientDataAssignment.country);
  }, [reloadPage]);

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

    console.log("FInal data accepted", data);
    if (clientDataAssignment.id) {
      var config = {
        method: "PUT",
        url: URLConstants.modifyCustomers(clientDataAssignment.id),
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
    } else {
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
    }
  };

  const onError = (errors) => console.log(errors);
  return (
    <Helmet title="Add Customer">
      <Wrapper
        sx={{
          flexGrow: 1,
        }}
      >
        <Header
          title="Create Customer"
          buttonText="Go Back"
          icon={<ReplyOutlinedIcon />}
          onClick={() => navigate("/customers")}
        />

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
            </Grid>
            <Grid item xs={12} md={4}>
              <Box>
                <Controller
                  name="mobile_number"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="mobile_number"
                      label="Mobile Number"
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
            </Grid>
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
            </Grid>

            <Grid item xs={12} md={4}>
              <Box>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="city"
                      label="City"
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
            </Grid>
            <Grid item xs={12} md={4}>
              <Box>
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="state"
                      label="State"
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
            </Grid>

            <Grid item xs={12} md={4}>
              <Box>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="country"
                      label="Country"
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
              onClick={() => navigate("/customers")}
            >
              Cancel
            </Button>
          </Stack>

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
        </form>
      </Wrapper>
    </Helmet>
  );
};

export default AddCustomer;
