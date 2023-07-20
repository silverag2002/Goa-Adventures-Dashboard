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
  Stack,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { axiosInstance } from "../base/api/axios.util";
import { URLConstants } from "../base/api/url.constants";
import Loader from "react-loader";
import { useNavigate } from "react-router-dom";

const CreateBooking = () => {
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
        <Header title="Create Booking" subtitle="" />
        <Button
          variant="contained"
          size="large"
          style={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.neutral[600],
            fontWeight: "bold",
          }}
          href="/bookings"
        >
          Go Back
        </Button>
      </FlexBetween>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Box>
              <Controller
                name="customer_id"
                control={control}
                onChange={(e) => console.log("Ankit", e.target.value)}
                render={({ field }) => (
                  <TextField
                    select
                    id="customer_name"
                    label="Select Customer"
                    variant="filled"
                    margin="normal"
                    fullWidth
                    value={customerId}
                    onChange={(e) => {
                      setCustomerId(e.target.value);
                      console.log("Customer id selected", e.target.value);
                      let mobNum;
                      for (let i = 0; i < customers.length; i++) {
                        let cust = customers[i];
                        if (cust.id == e.target.value) {
                          mobNum = cust.mobile_number;
                          setMobileNumber(cust.mobile_number);
                          break;
                        }
                      }

                      console.log("MOb num", mobNum);
                    }}
                  >
                    {customers.map((cust) => (
                      <MenuItem key={cust.id} value={cust.id}>
                        {cust.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box>
              <Controller
                name="destination_location"
                control={control}
                render={({ field }) => (
                  <TextField
                    select
                    id="location"
                    label="Destination"
                    variant="filled"
                    margin="normal"
                    fullWidth
                    {...field}
                  >
                    <MenuItem key="" value="Goa">
                      Goa
                    </MenuItem>
                    <MenuItem key="" value="Mumbai">
                      Mumbai
                    </MenuItem>
                  </TextField>
                )}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box>
              <Controller
                name="category_id"
                control={control}
                render={({ field }) => (
                  <TextField
                    select
                    id="category"
                    label="Category"
                    variant="filled"
                    margin="normal"
                    fullWidth
                    {...field}
                  >
                    {categories.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.category}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box>
              <Controller
                name="sub_category_id"
                control={control}
                render={({ field }) => (
                  <TextField
                    select
                    id="sub-category"
                    label="Sub Category"
                    variant="filled"
                    fullWidth
                    margin="normal"
                    {...field}
                  >
                    {subcategories.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.subcategory}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box>
              <Controller
                name="product_id"
                control={control}
                render={({ field }) => (
                  <TextField
                    select
                    id="productName"
                    label="Product Name"
                    variant="filled"
                    fullWidth
                    margin="normal"
                    {...field}
                  >
                    {product.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.title}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box>
              <Controller
                name="total_seat"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="total_seat"
                    label="Total Seat"
                    variant="filled"
                    type="number"
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
                name="total_amount"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="total_amount"
                    label="Total Amount"
                    variant="filled"
                    type="number"
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

export default CreateBooking;
