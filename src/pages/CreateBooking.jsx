import React, { useEffect, useState } from "react";
import Header from "components/Header";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
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
import { useNavigate, useLocation } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import Helmet from "components/Helmet/Helmet";
import { useClient } from "../base/hooks/useClient";

const CreateBooking = () => {
  const client = useClient();
  const navigate = useNavigate();
  useEffect(() => {
    if (client?.client?.role == undefined) {
      navigate("/");
    }
  }, []);
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
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [productLocations, setProducLocation] = useState([]);
  const [dest_location, setDestLocation] = useState("");
  const [productId, setProductId] = useState("");
  const location = useLocation();

  const theme = useTheme();

  var clientDataAssignment = {};

  console.log("LOcaltion", location);
  if (location.state) {
    clientDataAssignment = location.state.booking;
  }
  console.log("ASsingment issue", clientDataAssignment);

  const {
    handleSubmit,
    register,
    control,
    getValues,
    setValue,
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

  // useEffect(() => {
  //   setLoaded(false);
  //   axiosInstance
  //     .get(URLConstants.subcategories())
  //     .then((res) => {
  //       console.log("Response", res);

  //       setSubCategories(res);
  //       setLoaded(true);
  //     })
  //     .catch((err) => {
  //       console.log("Error", err);
  //       setLoaded(true);
  //     });
  // }, [reloadPage]);

  useEffect(() => {
    setLoaded(false);
    // axiosInstance
    //   .get(URLConstants.product())
    //   .then((res) => {
    //     console.log("Response", res);

    //     setProduct(res);
    //     setLoaded(true);
    //   })
    //   .catch((err) => {
    //     console.log("Error", err);
    //     setLoaded(true);
    //   });

    setValue("product_id", clientDataAssignment.product_id);
    setValue("destination_location", clientDataAssignment.destination_location);
    setValue("category_id", clientDataAssignment.category_id);
    setValue("sub_category_id", clientDataAssignment.sub_category_id);

    setValue("booking_status", clientDataAssignment.booking_status);
    setValue("total_seat", clientDataAssignment.total_seat);
    setValue("total_amount", clientDataAssignment.total_amount);
    setDepositAmount(clientDataAssignment.deposit_amount);
    setPendingAmount(clientDataAssignment.pending_amount);
    setMobileNumber(clientDataAssignment.customer_mobile_number);
    setCustomerId(clientDataAssignment.customer_id);
    setValue("start_date", clientDataAssignment.start_date);
    setValue("end_date", clientDataAssignment.end_date);
    setValue("payment_mode", clientDataAssignment.payment_mode);
    setValue("reporting_time", clientDataAssignment.reporting_time);
    setValue("meeting_point", clientDataAssignment.meeting_point);
  }, [reloadPage]);

  function handleCategoryChange(categoryId) {
    console.log("categoryId selecrted", categoryId);
    setCategoryId(categoryId);
    setLoaded(false);
    axiosInstance
      .get(URLConstants.getSubCategoryUnderCategory(categoryId))
      .then((response) => {
        setLoaded(true);
        console.log("Response form subcateogry new api", response);
        setSubCategories(response);
      })
      .catch((err) => {
        setLoaded(true);
        console.log(err);
      });
  }

  function handleSubCategoryChange(subCategoryId) {
    console.log("subCategoryId selecrted", subCategoryId);
    setSubCategoryId(subCategoryId);
    setLoaded(false);
    axiosInstance
      .get(URLConstants.getProductUnderSubCategory(subCategoryId))
      .then((response) => {
        setLoaded(true);
        console.log("Response form subcateogry new api", response);
        const prodLoc = response.map((loca) => loca.city);
        console.log("PRoducts locaiton", prodLoc);
        setProducLocation(prodLoc);
        setProduct(response);
      })
      .catch((err) => {
        setLoaded(true);
        console.log(err);
      });
  }

  const onSubmit = (data) => {
    console.log("Date capiutred in booking", data);
    setLoaded(false);
    data.quantity = 1;
    data.product_id = productId;
    data.category_id = categoryId;
    data.destination_location = dest_location;
    data.sub_category_id = subCategoryId;
    data.pending_amount = pendingAmount;
    data.deposit_amount = depositAmount;
    if (!clientDataAssignment.booking_date) {
      data.booking_date = new Date();
    }
    data.booked_by = "SUPER_ADMIN";

    data.customer_mobile_number = mobileNumber;
    data.customer_id = customerId;

    console.log("Data entered", data);
    if (clientDataAssignment.id) {
      axiosInstance
        .put(URLConstants.modifyBookings(clientDataAssignment.id), data)
        .then((res) => {
          setLoaded(true);
          console.log("Responsse form booking post method", res);
          navigate("/bookings");
        })
        .catch((err) => {
          setLoaded(true);
          console.log("error", err);
        });
    } else {
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
    }
  };

  const onError = (errors) => console.log(errors);
  return (
    <Helmet title="Create Booking">
      <Box sx={{ flexGrow: 1, margin: "1.5rem 2.5rem" }}>
        <Header
          title="Create Booking"
          subtitle="Create manual booking"
          buttonText="Go Back"
          icon={<ReplyOutlinedIcon />}
          onClick={() => navigate("/bookings")}
        />

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
                      variant="outlined"
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
                  name="customer_mobile_number"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="customer_mobile_number"
                      label="Customer Mobile Number"
                      variant="outlined"
                      value={mobileNumber}
                      fullWidth
                      margin="normal"
                    />
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
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      defaultValue={
                        clientDataAssignment.category_id
                          ? clientDataAssignment.category_id
                          : ""
                      }
                      onChange={(e) => {
                        e.preventDefault();
                        handleCategoryChange(e.target.value);
                        console.log("Field", e.target.value, field);
                      }}
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
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      defaultValue={
                        clientDataAssignment.sub_category_id
                          ? clientDataAssignment.sub_category_id
                          : ""
                      }
                      onChange={(e) => {
                        e.preventDefault();
                        handleSubCategoryChange(e.target.value);
                        console.log("Field", e.target.value, field);
                      }}
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
            <Grid item xs={12} md={6}>
              <Box>
                <Controller
                  name="product_id"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="productName"
                      label="Product Name"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                    />
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box>
                <Controller
                  name="total_seat"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="total_seat"
                      label="Total Seat"
                      variant="outlined"
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
                      variant="outlined"
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
                      variant="outlined"
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
                      variant="outlined"
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
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      defaultValue={
                        clientDataAssignment.payment_mode
                          ? clientDataAssignment.payment_mode
                          : ""
                      }
                      {...field}
                    >
                      <MenuItem value={0}>Online Payment</MenuItem>
                      <MenuItem value={1}>Offline Payment</MenuItem>
                    </TextField>
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box>
                <Controller
                  name="paying_full"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      select
                      id="paying_full"
                      label="Paying Full"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      defaultValue={
                        clientDataAssignment.paying_full
                          ? clientDataAssignment.paying_full
                          : ""
                      }
                      {...field}
                    >
                      <MenuItem value={true}>Yes</MenuItem>
                      <MenuItem value={false}>No</MenuItem>
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
                      id="destination_location"
                      label="Destiantion"
                      variant="outlined"
                      value={dest_location}
                      fullWidth
                      margin="normal"
                    />
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
                      variant="outlined"
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
                      variant="outlined"
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
                      variant="outlined"
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
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      {...field}
                    />
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={12}>
              <Box>
                <Controller
                  name="note"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="note"
                      type="number"
                      label="Note"
                      variant="outlined"
                      multiline
                      rows={5}
                      fullWidth
                      margin="normal"
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
            <Button
              size="large"
              variant="contained"
              style={{
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.neutral[600],
                fontWeight: "bold",
              }}
              onClick={() => navigate("/bookings")}
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
    </Helmet>
  );
};

export default CreateBooking;
