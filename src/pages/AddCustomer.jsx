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
        console.log("Response form countries", response);
        setCustomers(response);
      })
      .catch((err) => {
        setLoaded(true);
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setLoaded(false);
    axiosInstance
      .get(URLConstants.categories())
      .then((res) => {
        console.log("Response", res);
        const cate = res.map((ca) => ca.category);
        setCategories(res);
        setLoaded(true);
      })
      .catch((err) => {
        console.log("Error", err);
        setLoaded(true);
      });
  }, [reloadPage]);

  useEffect(() => {
    setLoaded(false);
    axiosInstance
      .get(URLConstants.subcategories())
      .then((res) => {
        console.log("Response", res);

        setSubCategories(res);
        setLoaded(true);
      })
      .catch((err) => {
        console.log("Error", err);
        setLoaded(true);
      });
  }, [reloadPage]);

  useEffect(() => {
    setLoaded(false);
    axiosInstance
      .get(URLConstants.product())
      .then((res) => {
        console.log("Response", res);

        setProduct(res);
        setLoaded(true);
      })
      .catch((err) => {
        console.log("Error", err);
        setLoaded(true);
      });
  }, [reloadPage]);

  const onSubmit = (data) => {
    setLoaded(false);
    data.pending_amount = pendingAmount;
    data.deposit_amount = depositAmount;
    data.booking_date = new Date();
    data.booked_by = "SUPER_ADMIN";
    data.invoice = "Test url";
    data.customer_mobile_number = mobileNumber;
    data.customer_id = customerId;
    data.booking_status = "CONFIRMED";
    console.log("Data entered", data);

    axiosInstance
      .post(URLConstants.bookings(), data)
      .then((res) => {
        setLoaded(true);
        console.log("Responsse form booking post method", res);
        navigate("/bookings");
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

          <Grid item xs={12} md={3}>
            <Box>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="status"
                    label="Status"
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
            <Typography variant="h4">Photos & Video</Typography>
          </Grid>
          <Grid item xs={4} md={4}>
            <Box>
              <input
                type="file"
                placeholder="Image URL"
                {...register("featured_image", { required: true })}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box>
              <Controller
                name="deposit_amount"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="deposit_amount"
                    label="Deposit Amount"
                    variant="filled"
                    type="number"
                    fullWidth
                    margin="normal"
                    value={depositAmount}
                    onChange={(e) => {
                      console.log("Testing getValues", field);
                      setDepositAmount(e.target.value);
                      if (
                        Number(getValues("total_amount")) >
                        Number(e.target.value)
                      ) {
                        let amount =
                          Number(getValues("total_amount")) -
                          Number(e.target.value);
                        setPendingAmount(amount);
                      } else {
                        setPendingAmount(0);
                      }
                    }}
                    // {...field}
                  />
                )}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box>
              <Controller
                name="pending_amount"
                control={control}
                render={({ field, value }) => (
                  <TextField
                    id="pending_amount"
                    label="Pending Amount"
                    variant="filled"
                    fullWidth
                    margin="normal"
                    value={pendingAmount}
                  />
                )}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box>
              <Controller
                name="payment_mode"
                control={control}
                render={({ field }) => (
                  <TextField
                    select
                    id="payment_mode"
                    label="Payment Mode"
                    variant="filled"
                    fullWidth
                    margin="normal"
                    {...field}
                  >
                    <MenuItem value="Online">Online Payment</MenuItem>
                    <MenuItem value="Offline">Offline Payment</MenuItem>
                  </TextField>
                )}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box>
              <Controller
                name="start_date"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="start_date"
                    label="Start Date"
                    type="date"
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
                name="end_date"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="end_date"
                    label="End Date"
                    type="date"
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
                name="reporting_time"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="reporting_time"
                    label="Reporting Time"
                    variant="filled"
                    type="time"
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
                name="meeting_point"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="meeting_point"
                    label="Meeting Point"
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
                name="customer_mobile_number"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="customer_mobile_number"
                    label="Customer Mobile Number"
                    variant="filled"
                    value={mobileNumber}
                    fullWidth
                    margin="normal"
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
