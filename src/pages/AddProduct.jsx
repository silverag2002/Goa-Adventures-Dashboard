import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Typography,
  Button,
  useTheme,
  Stack,
} from "@mui/material";
import Header from "components/Header";
import { useForm, Controller } from "react-hook-form";
import { axiosInstance } from "../base/api/axios.util";
import { URLConstants } from "../base/api/url.constants";
import JoditEditor from "jodit-react";
import axios, * as others from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "react-loader";

const AddProduct = () => {
  const theme = useTheme();
  const editor = useRef();

  const [loaded, setLoaded] = useState(true);
  const [countries, setCountries] = useState([]);
  const [countryStates, setCountryStates] = useState([]);
  const [stateCities, setStateCities] = useState([]);
  const [highlight, setHighlight] = useState("");
  const [overview, setOverview] = useState("");
  const [countrySelected, setCountry] = useState("");
  const [stateSelected, setState] = useState("");
  const navigate = useNavigate();

  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };

  const handleOverviewChange = (content) => {
    console.log(" handleEditorChang ", content); //Get Content Inside Editor
    // var resultBuffer = encoding.convert(content,  'ASCII','UTF-8');

    // const asciiText = iconv.decode(Buffer.from(content, 'binary'), 'ascii');

    console.log("Testing acii code", content);
    setOverview(content);
  };

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({});

  const category = [
    "Activity",
    "Tour",
    "Drama Show",
    "DJ Night",
    "Dinner Cruise",
    "Park Ticket",
  ];

  const categoryType = [
    "Scuba Diving",
    "Watersports",
    "Bangee Jump",
    "Sightseeing",
  ];

  useEffect(() => {
    setLoaded(false);
    axiosInstance
      .get(URLConstants.getCountries())
      .then((response) => {
        setLoaded(true);
        console.log("Response form countries", response);
        setCountries(response);
      })
      .catch((err) => {
        setLoaded(true);
        console.log(err);
      });
  }, []);

  console.log("Country ", countrySelected);
  function handleCountryChange(country) {
    console.log("COuntry selecrted", country);
    setCountry(decodeURIComponent(country));

    setLoaded(false);
    axiosInstance
      .get(URLConstants.getStates(country))
      .then((response) => {
        setLoaded(true);
        console.log("Response form states", response);
        setCountryStates(response);
      })
      .catch((err) => {
        setLoaded(true);
        console.log(err);
      });
  }

  function handleStateChange(state) {
    console.log("COuntry selecrted", state);
    setState(decodeURIComponent(state));

    setLoaded(false);
    axiosInstance
      .get(URLConstants.getCities(state))
      .then((response) => {
        setLoaded(true);
        console.log("Response form cities", response);
        setStateCities(response.city_info);
      })
      .catch((err) => {
        setLoaded(true);
        console.log(err);
      });
  }

  const onError = (errors) => console.log(errors);

  function handleCountryChange(country) {
    console.log("COuntry selecrted", country);

    setLoaded(false);
    axiosInstance
      .get(URLConstants.getStates(country))
      .then((response) => {
        setLoaded(true);
        console.log("Response form states", response);
        setCountryStates(response.states);
      })
      .catch((err) => {
        setLoaded(true);
        console.log(err);
      });
  }

  function handleStateChange(state) {
    console.log("COuntry selecrted", state);

    setLoaded(false);
    axiosInstance
      .get(URLConstants.getCities(state))
      .then((response) => {
        setLoaded(true);
        console.log("Response form cities", response);
        setStateCities(response.city_info);
      })
      .catch((err) => {
        setLoaded(true);
        console.log(err);
      });
  }

  const onSubmit = (data) => {
    //reset({});
    // setClientType(undefined);
    setLoaded(false);
    data.overview = overview;
    data.highlight = data.highlight.split("\n");
    data.activityExclusion = data.exclusion.split("\n");
    data.activityInclusion = data.inclusion.split("\n");
    delete data.exclusion;
    delete data.inclusion;
    data.country = countrySelected;
    data.state = stateSelected;
    data.last_update_by = "SUPER_ADMIN";
    data.creator = "SUPER_ADMIN";
    console.log("Submitted Data,", data);

    var config = {
      method: "post",
      url: URLConstants.product(),

      data: data,
    };

    // axios(config)
    //   .then((response) => {
    //     setLoaded(true);
    //     console.log("Response after submitting form", response);
    //     navigate("/products");
    //   })
    //   .catch((err) => {
    //     setLoaded(true);
    //     console.log(err);
    //   });
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, margin: "1.5rem 2.5rem" }}>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Typography variant="h4">Basic Information</Typography>
              <Box>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="title"
                      label="Title"
                      variant="filled"
                      placeholder="Activity Or Tour Title"
                      fullWidth
                      margin="normal"
                      {...field}
                    />
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      select
                      id="category"
                      label="Category"
                      variant="filled"
                      fullWidth
                      margin="normal"
                      {...field}
                    >
                      {category.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box>
                <Controller
                  name="category-type"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      select
                      id="category-type"
                      label="Category Type"
                      variant="filled"
                      fullWidth
                      margin="normal"
                      {...field}
                    >
                      {categoryType.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={4} md={4}>
              <Box>
                <Controller
                  name="duration"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="duration"
                      label="Duration"
                      type="time"
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
              <Box>
                <JoditEditor
                  height={200}
                  name="overview"
                  className="text-black"
                  // config={{ theme: "dark" }}
                  getSunEditorInstance={getSunEditorInstance}
                  value={overview}
                  onChange={handleOverviewChange}
                  setContents={overview}
                />
              </Box>
            </Grid>
            <Grid item xs={4} md={4}>
              <Box>
                <Controller
                  name="highlight"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="highlight"
                      label="Highlight"
                      variant="filled"
                      multiline
                      rows={6}
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
                      {...field}
                    />
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={4} md={4}>
              <Box>
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
                      {...field}
                    />
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={4} md={4}>
              <Box>
                <Controller
                  name="min_people"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="min_people"
                      label="Min People"
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
            <Grid item xs={4} md={4}>
              <Box>
                <Controller
                  name="max_people"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="max_people"
                      label="Max People"
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
            <Grid item xs={4} md={4}>
              <Box>
                <Controller
                  name="booking_period"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="booking_period"
                      label="Booking Period"
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
            <Grid item xs={4}>
              <Box>
                <Controller
                  name="allow-deposit"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      select
                      id="allow_deposit"
                      label="Deposit"
                      variant="filled"
                      fullWidth
                      margin="normal"
                      {...field}
                    >
                      <MenuItem value="allow-deposit">Allow Deposit</MenuItem>
                      <MenuItem value="disallow-deposit">
                        Disallow Deposit
                      </MenuItem>
                    </TextField>
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={4} md={4}>
              <Box>
                <Controller
                  name="deposit_percent"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="deposit_percent"
                      label="Deposit Percent"
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
            <Grid item xs={4}>
              <Box>
                <Controller
                  name="cancellation"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      select
                      id="cancellation"
                      label="Allow Cancel"
                      variant="filled"
                      fullWidth
                      margin="normal"
                      {...field}
                    >
                      <MenuItem value="yes">Yes</MenuItem>
                      <MenuItem value="no">No</MenuItem>
                    </TextField>
                  )}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ paddingTop: "1rem" }}>
            <Grid item xs={12} md={12}>
              <Typography variant="h4">Pricing & Location</Typography>
            </Grid>
            <Grid item xs={4} md={6}>
              <Box>
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="price"
                      label="Price"
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
            <Grid item xs={4} md={6}>
              <Box>
                <Controller
                  name="discount"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="discount"
                      label="Discount"
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
            <Grid item xs={4} md={4}>
              <Box>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      select
                      id="country"
                      label="Country"
                      variant="filled"
                      fullWidth
                      margin="normal"
                      onChange={(e) => {
                        console.log("Field", e.target.value, field);
                        e.preventDefault();
                        handleCountryChange(encodeURIComponent(e.target.value));
                      }}
                    >
                      {countries.map((con) => (
                        <MenuItem value={con.country_name}>
                          {con.country_name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={4} md={4}>
              <Box>
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      select
                      id="state"
                      label="State"
                      variant="filled"
                      fullWidth
                      margin="normal"
                      onChange={(e) => {
                        e.preventDefault();
                        handleStateChange(encodeURIComponent(e.target.value));
                        console.log("Field", e.target.value, field);
                      }}
                    >
                      {countryStates.map((con) => (
                        <MenuItem value={con.state_name}>
                          {con.state_name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={4} md={4}>
              <Box>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      select
                      id="city"
                      label="City"
                      variant="filled"
                      fullWidth
                      margin="normal"
                      {...field}
                    >
                      {stateCities.map((con) => (
                        <MenuItem value={con.city_name}>
                          {con.city_name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ paddingTop: "1rem" }}>
            <Grid item xs={12} md={12}>
              <Typography variant="h4">Photos & Video</Typography>
            </Grid>
            <Grid item xs={4} md={4}>
              <Box>
                <Controller
                  name="feature-img"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="feature-img"
                      label="Featured Image"
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
                  name="gallery-img"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="gallery-img"
                      label="Gallery Image"
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
                  name="video-url"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="video-url"
                      label="Video"
                      variant="filled"
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
              Add Product
            </Button>
            <Button
              size="large"
              variant="contained"
              style={{
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.neutral[600],
                fontWeight: "bold",
              }}
              href="/products"
            >
              Cancel
            </Button>
          </Stack>
        </form>
      </Box>
    </>
  );
};

export default AddProduct;
