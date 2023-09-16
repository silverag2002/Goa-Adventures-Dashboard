import React, { useState, useRef, useEffect } from "react";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import { useForm, Controller } from "react-hook-form";
import JoditEditor from "jodit-react";
import Helmet from "components/Helmet/Helmet";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  TextField,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  MenuItem,
  Typography,
  Button,
  useTheme,
  Stack,
  Divider,
} from "@mui/material";
import Header from "components/Header";
import { useClient } from "../base/hooks/useClient";
import Wrapper from "components/UI/Wrapper";

const AddQuotation = () => {
  const client = useClient();
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState("");
  const [childPrice, setChildPrice] = useState("");
  const [adultPrice, setAdultPrice] = useState("");
  useEffect(() => {
    if (client?.client?.role == undefined || client?.client?.role == 2) {
      navigate("/");
    }
  }, []);

  const getDaysBtwDate = (startDate, endDate) => {
    var one_day = 1000 * 60 * 60 * 24;

    // To set present_dates to two variables
    var present_date = new Date(startDate);

    // 0-11 is Month in JavaScript
    var end_day = new Date(endDate);

    // To Calculate next year's Christmas if passed already.
    if (present_date.getMonth() == 11 && present_date.getdate() > 25)
      end_day.setFullYear(end_day.getFullYear() + 1);

    // To Calculate the result in milliseconds and then converting into days
    var Result =
      Math.round(end_day.getTime() - present_date.getTime()) / one_day;

    // To remove the decimals from the (Result) resulting days value
    var finalDays = Result.toFixed(0);

    //To display the final_result value
    return Number(finalDays) + 1;
  };
  const [itinerary, setItinerary] = useState("");
  const theme = useTheme();
  const editor = useRef();

  const {
    handleSubmit,
    register,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({});

  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };

  const itineraryChangeHandler = (content) => {
    setItinerary(content);
  };

  const onSubmit = (data) => {
    data.itinerary = itinerary;
    data.adult_amount = adultPrice;
    data.total_amount = totalAmount;
    data.child_amount = childPrice;
    if (data.check_in && data.check_out) {
      let numOfdays = Number(getDaysBtwDate(data.check_in, data.check_out));
      data.days = numOfdays + 1;
      data.nights = numOfdays + 2;
    }

    console.log("Data enterd ", data);
  };
  const onError = (errors) => console.log(errors);

  return (
    <Helmet title="Add Quotation">
      <Wrapper>
        <Header
          title="Create Quotation"
          subtitle="Fill the details to create quotation"
          buttonText="Go Back"
          icon={<ReplyOutlinedIcon />}
          onClick={() => navigate("/instant-quotation")}
        />

        <Box>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="name"
                      label="Full Name"
                      variant="filled"
                      placeholder=""
                      fullWidth
                      margin="normal"
                      size="small"
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Controller
                  name="mobile_number"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="mobile_number"
                      label="Mobile Number"
                      variant="filled"
                      placeholder=""
                      fullWidth
                      margin="normal"
                      size="small"
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="email"
                      label="Email ID"
                      variant="filled"
                      placeholder=""
                      fullWidth
                      margin="normal"
                      size="small"
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="title"
                      label="Title"
                      variant="filled"
                      placeholder=""
                      fullWidth
                      margin="normal"
                      size="small"
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Controller
                  name="hotel_name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="hotel_name"
                      label="Hotel Name"
                      variant="filled"
                      placeholder=""
                      fullWidth
                      margin="normal"
                      size="small"
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Controller
                  name="check_in"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="checkIn"
                      label="Check In"
                      type="date"
                      variant="filled"
                      placeholder=""
                      fullWidth
                      margin="normal"
                      size="small"
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Controller
                  name="check_out"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="checkOut"
                      label="Check Out"
                      type="date"
                      variant="filled"
                      placeholder=""
                      fullWidth
                      margin="normal"
                      size="small"
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Controller
                  name="adult"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="adult"
                      label="Adult No"
                      type="number"
                      variant="filled"
                      placeholder=""
                      fullWidth
                      margin="normal"
                      size="small"
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Controller
                  name="child"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="child"
                      label="Child No"
                      type="number"
                      variant="filled"
                      placeholder=""
                      fullWidth
                      margin="normal"
                      size="small"
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Controller
                  name="rooms"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="rooms"
                      label="Rooms"
                      type="number"
                      variant="filled"
                      placeholder=""
                      fullWidth
                      margin="normal"
                      size="small"
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Controller
                  name="adultPrice"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="adultPrice"
                      label="Adult Price"
                      variant="filled"
                      placeholder=""
                      fullWidth
                      margin="normal"
                      size="small"
                      value={adultPrice}
                      onChange={(e) => {
                        setAdultPrice(e.target.value);
                        let adultPric = e.target.value;

                        if (adultPric > 0 && getValues("adult")) {
                          let amount =
                            Number(adultPric) * Number(getValues("adult"));
                          console.log("Values of amoutn", Number(adultPric));
                          if (childPrice.length > 0 && getValues("child")) {
                            amount += Number(childPrice) * getValues("child");
                            setTotalAmount(amount);
                          } else {
                            setTotalAmount(amount);
                          }
                        } else {
                          setTotalAmount(0);
                        }
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Controller
                  name="childPrice"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="childPrice"
                      label="Child Price"
                      variant="filled"
                      placeholder=""
                      fullWidth
                      margin="normal"
                      size="small"
                      value={childPrice}
                      onChange={(e) => {
                        console.log("Testing getValues", field);
                        setChildPrice(e.target.value);
                        let childPric = e.target.value;
                        if (childPric > 0 && getValues("child")) {
                          let amount =
                            Number(childPric) * Number(getValues("child"));
                          console.log(
                            "Vlaue of total amount",
                            totalAmount.length
                          );
                          console.log(
                            "Vlaue of adult amount",
                            adultPrice.length
                          );
                          console.log(
                            "Vlaue of getvalue adult",
                            getValues("adult")
                          );
                          if (adultPrice.length > 0 && getValues("adult")) {
                            amount += Number(adultPrice) * getValues("adult");
                            setTotalAmount(amount);
                          } else {
                            setTotalAmount(amount);
                          }
                        } else {
                          setTotalAmount(0);
                        }
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Controller
                  name="totalAmount"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="totalAmount"
                      label="Total Amount"
                      variant="filled"
                      placeholder=""
                      fullWidth
                      margin="normal"
                      size="small"
                      value={totalAmount}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography variant="h4" m="1rem 0">
                  Itinerary
                </Typography>
                <JoditEditor
                  name="overview"
                  className="text-black"
                  // config={{ theme: "dark" }}
                  getSunEditorInstance={getSunEditorInstance}
                  value={itinerary}
                  onChange={itineraryChangeHandler}
                  setContents={itinerary}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Controller
                  name="inclusion"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="inclusion"
                      label="Inclusion"
                      variant="filled"
                      multiline
                      rows={6}
                      fullWidth
                      margin="normal"
                      inputProps={{ style: { fontSize: 16 } }}
                      InputLabelProps={{ style: { fontSize: 16 } }}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Controller
                  name="exclusion"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="exclusion"
                      label="Exclusion"
                      variant="filled"
                      multiline
                      rows={6}
                      fullWidth
                      margin="normal"
                      inputProps={{ style: { fontSize: 16 } }}
                      InputLabelProps={{ style: { fontSize: 16 } }}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Controller
                  name="cancellation_policy"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="cancellationPolicy"
                      label="Cancellation Policy"
                      variant="filled"
                      multiline
                      rows={6}
                      fullWidth
                      margin="normal"
                      inputProps={{ style: { fontSize: 16 } }}
                      InputLabelProps={{ style: { fontSize: 16 } }}
                      {...field}
                    />
                  )}
                />
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
                Create Quotation
              </Button>
              <Button
                size="large"
                variant="contained"
                style={{
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.neutral[600],
                  fontWeight: "bold",
                }}
                onClick={() => navigate("/instant-quotation")}
              >
                Cancel
              </Button>
            </Stack>
          </form>
        </Box>
      </Wrapper>
    </Helmet>
  );
};

export default AddQuotation;

//    <Stack
//      direction="row"
//      justifyContent="flex-end"
//      alignItems="center"
//      spacing={4}
//      sx={{ marginTop: "1rem" }}
//    ></Stack>;
