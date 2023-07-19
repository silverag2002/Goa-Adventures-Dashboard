/* eslint-disable no-undef */
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
import { Link, useLocation } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { axiosInstance } from "../base/api/axios.util";
import { URLConstants } from "../base/api/url.constants";
import JoditEditor from "jodit-react";
import axios, * as others from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "react-loader";
var FormData = require("form-data");

const AddProduct = () => {
  const theme = useTheme();
  const editor = useRef();
  const location = useLocation();
  const [loaded, setLoaded] = useState(true);
  const [countries, setCountries] = useState([]);
  const [countryStates, setCountryStates] = useState([]);
  const [stateCities, setStateCities] = useState([]);
  const [highlight, setHighlight] = useState("");
  const [overview, setOverview] = useState("");
  const [counSel, setCounSel] = useState("");
  const [countrySelected, setCountry] = useState("");
  const [stateSelected, setState] = useState("");
  const [reloadPage, setReloadPage] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);

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
  console.log("COUN Sel", counSel);
  const {
    handleSubmit,
    register,
    control,
    setValue,
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

  var clientDataAssignment = {};

  console.log("LOcaltion", location);
  if (location.state) {
    clientDataAssignment = location.state.product;
  }
  console.log("ASsingment issue", clientDataAssignment);

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
    console.log("Clietn asssignment value", clientDataAssignment);
  }, []);

  useEffect(() => {
    setLoaded(false);
    axiosInstance
      .get(URLConstants.categories())
      .then((res) => {
        console.log("Response", res);
        const cate = res.map((ca) => ca.category);
        setCategories(cate);
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
        const cate = res.map((ca) => ca.subcategory);
        setSubCategories(cate);
        setLoaded(true);
      })
      .catch((err) => {
        console.log("Error", err);
        setLoaded(true);
      });
  }, [reloadPage]);

  console.log("Country ", countrySelected);

  const onError = (errors) => console.log(errors);

  function handleCountryChange(country) {
    console.log("COuntry selecrted", country);
    setCountry(decodeURIComponent(country));

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

    setValue("title", clientDataAssignment.title);
    setValue("country", clientDataAssignment.country);
    setValue("video", clientDataAssignment.video);
    setOverview(clientDataAssignment.overview);
    setValue("duration", clientDataAssignment.duration);
    setValue("creator", clientDataAssignment.creator);
    setValue("allow_cancel", clientDataAssignment.allow_cancel);
    setValue("allow_deposit", clientDataAssignment.allow_deposit);
    setValue("state", clientDataAssignment.state);
    setValue("country", clientDataAssignment.country);
    setValue("category", clientDataAssignment.category);
    setValue("category_type", clientDataAssignment.category_type);
    setValue("booking_period", clientDataAssignment.booking_period);
    setValue("city", clientDataAssignment.city);
    setValue("deposit_value", clientDataAssignment.deposit_value);
    setValue("min_people", clientDataAssignment.min_people);
    setValue("max_people", clientDataAssignment.max_people);
    setValue("price", clientDataAssignment.price);
    setValue("discount_percent", clientDataAssignment.discount_percent);
  }

  function handleStateChange(state) {
    console.log("State selecrted", state);
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

  const onSubmit = (data) => {
    //reset({});
    // setClientType(undefined);
    setLoaded(false);
    data.overview = overview;
    data.highlight = data.highlight.split("\n");
    data.activity_exclusion = data.exclusion.split("\n");
    data.activity_inclusion = data.inclusion.split("\n");
    delete data.exclusion;
    delete data.inclusion;
    data.country = countrySelected;
    data.state = stateSelected;
    data.last_update_by = "SUPER_ADMIN";
    data.creator = "SUPER_ADMIN";
    console.log("Submitted Data,", data);
    console.log("gallery", data.gallery[1]);
    console.log("featured", data.featured_image);
    var formData = new FormData();
    if (data.featured_image[0]?.size) {
      formData.append("featured_image", data.featured_image[0]);
    }
    if (data.gallery[0]?.size) {
      for (let i = 0; i < data.gallery.length; i++) {
        formData.append("gallery", data.gallery[i]);
      }
    }
    formData.append("title", data.title.trim());
    formData.append("video", data.video.trim());
    formData.append("overview", data.overview.trim());
    formData.append("duration", data.duration.trim());
    formData.append("creator", data.creator.trim());

    formData.append("state", data.state.trim());
    formData.append("country", data.country.trim());
    formData.append("category", data.category.trim());

    formData.append("category_type", data.category_type.trim());
    formData.append("city", data.city.trim());

    formData.append("min_people", data.min_people.trim());
    formData.append("max_people", data.max_people.trim());
    formData.append("booking_period", data.booking_period.trim());

    formData.append("price", data.price.trim());
    formData.append("deposit_value", data.deposit_value.trim());

    formData.append("discount_percent", data.discount_percent.trim());
    formData.append("allow_cancel", data.allow_cancel);
    formData.append("allow_deposit", data.allow_deposit);

    formData.append("last_update_by", data.last_update_by.trim());

    formData.append(
      "activity_inclusion",
      JSON.stringify(data.activity_inclusion)
    );

    formData.append(
      "activity_exclusion",
      JSON.stringify(data.activity_exclusion)
    );
    formData.append("highlight", JSON.stringify(data.highlight));
    console.log("Fprm data", formData);

    var config = {
      method: "POST",
      url: URLConstants.product(),
      headers: {
        headers: { "content-type": "multipart/form-data" },
      },
      data: formData,
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
                  render={({ field, value }) => (
                    <TextField
                      select
                      id="category"
                      label="Category"
                      variant="filled"
                      fullWidth
                      margin="normal"
                      {...field}
                    >
                      {categories.map((option) => (
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
                  name="category_type"
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
                      {subcategories.map((option) => (
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
                  name="allow_deposit"
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
                      <MenuItem value={true}>Allow Deposit</MenuItem>
                      <MenuItem value={false}>Disallow Deposit</MenuItem>
                    </TextField>
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={4} md={4}>
              <Box>
                <Controller
                  name="deposit_value"
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
                  name="allow_cancel"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      select
                      id="allow_cancel"
                      label="Allow Cancel"
                      variant="filled"
                      fullWidth
                      margin="normal"
                      {...field}
                    >
                      <MenuItem value={true}>Yes</MenuItem>
                      <MenuItem value={false}>No</MenuItem>
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
                  name="discount_percent"
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
                <input
                  type="file"
                  placeholder="Image URL"
                  {...register("featured_image", { required: true })}
                />
              </Box>
            </Grid>
            <Grid item xs={4} md={4}>
              <Box>
                <input
                  type="file"
                  placeholder="Image URL"
                  multiple
                  {...register("gallery", { required: true })}
                />
              </Box>
            </Grid>
            <Grid item xs={4} md={4}>
              <Box>
                <Controller
                  name="video"
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
