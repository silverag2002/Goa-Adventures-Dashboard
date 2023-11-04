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
  Divider,
  ImageList,
  ImageListItem,
  useMediaQuery,
} from "@mui/material";
import Header from "components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { axiosInstance } from "../base/api/axios.util";
import { URLConstants } from "../base/api/url.constants";
import JoditEditor from "jodit-react";
import axios, * as others from "axios";
import Loader from "react-loader";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import Helmet from "components/Helmet/Helmet";
import { useClient } from "../base/hooks/useClient";
import Wrapper from "components/UI/Wrapper";

var FormData = require("form-data");

const AddProduct = () => {
  const client = useClient();
  const navigate = useNavigate();
  useEffect(() => {
    if (client?.client?.role == undefined) {
      navigate("/");
    }
  }, []);
  const theme = useTheme();
  const editor = useRef();
  const location = useLocation();
  const [loaded, setLoaded] = useState(true);
  const [countries, setCountries] = useState([]);
  const [featuredImage, setFeaturedImage] = useState();
  const [galleryImage, setGalleryImage] = useState([]);

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
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  console.log(imageUrl);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);
  console.log("Featured images selected", featuredImage);

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
        const cate = res.map((ca) => ca.subcategory);
        setSubCategories(res);
        setLoaded(true);
      })
      .catch((err) => {
        console.log("Error", err);
        setLoaded(true);
      });

    setValue("title", clientDataAssignment.title);
    setValue("country", clientDataAssignment.country);
    setCountry(clientDataAssignment.country);
    setValue("video", clientDataAssignment.video);
    setOverview(clientDataAssignment.overview);
    setValue("duration", clientDataAssignment.duration);
    setValue("creator", clientDataAssignment.creator);
    setValue("allow_cancel", clientDataAssignment.allow_cancel);
    setValue("allow_deposit", clientDataAssignment.allow_deposit);
    setValue("state", clientDataAssignment.state);
    setValue("country", clientDataAssignment.country);
    setValue("category_id", clientDataAssignment.category_id);
    setValue("subcategory_id", clientDataAssignment.subcategory_id);
    setValue("booking_period", clientDataAssignment.booking_period);
    setValue("city", clientDataAssignment.city);
    setValue("deposit_value", clientDataAssignment.deposit_value);
    setValue("min_people", clientDataAssignment.min_people);
    setValue("max_people", clientDataAssignment.max_people);
    setValue("price", clientDataAssignment.price);
    setValue("discount_percent", clientDataAssignment.discount_percent);
    if (clientDataAssignment?.activity_exclusion?.length > 0) {
      let newString = "";
      for (let i = 0; i < clientDataAssignment.activity_exclusion.length; i++) {
        newString =
          newString + clientDataAssignment.activity_exclusion[i] + "\n";
      }
      console.log("ACtivity_Exclusion", newString);
      setValue("exclusion", newString);
    }
    if (clientDataAssignment?.meeting_point?.length > 0) {
      let newString = "";
      for (let i = 0; i < clientDataAssignment?.meeting_point?.length; i++) {
        newString = newString + clientDataAssignment.meeting_point[i] + "\n";
      }

      setValue("meeting_point", newString);
    }

    if (clientDataAssignment?.keywords?.length > 0) {
      let newString = "";
      for (let i = 0; i < clientDataAssignment?.keywords?.length; i++) {
        newString = newString + clientDataAssignment.keywords[i] + "\n";
      }

      setValue("keywords", newString);
    }
    if (clientDataAssignment?.activity_inclusion?.length > 0) {
      let newString = "";
      for (let i = 0; i < clientDataAssignment.activity_inclusion.length; i++) {
        newString =
          newString + clientDataAssignment.activity_inclusion[i] + "\n";
      }
      console.log("ACtivity_Inclusion", newString);
      setValue("inclusion", newString);
    }
    if (clientDataAssignment?.highlight?.length > 0) {
      let newString = "";
      for (let i = 0; i < clientDataAssignment.highlight.length; i++) {
        newString = newString + clientDataAssignment.highlight[i] + "\n";
      }
      console.log("ACtivity_Inclusion", newString);
      setValue("highlight", newString);
    }

    if (clientDataAssignment.country) {
      handleCountryChange(clientDataAssignment.country);
    }
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
        if (clientDataAssignment.state) {
          handleStateChange(clientDataAssignment.state);
        }
      })
      .catch((err) => {
        setLoaded(true);
        console.log(err);
      });
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
    data.meeting_point = data.meeting_point.split("\n");
    data.keywords = data.keywords.split("\n");
    delete data.exclusion;
    delete data.inclusion;
    data.country = countrySelected;
    data.state = stateSelected;
    data.last_update_by = "SUPER_ADMIN";
    data.creator = "SUPER_ADMIN";
    console.log("Submitted Data,", data);
    console.log("gallery", data.gallery[1]);
    console.log("featured", data.featured_image);
    console.log("Data check", data);
    var formData = new FormData();
    if (data?.featured_image[0]?.size) {
      formData.append("featured_image", data.featured_image[0]);
    }
    if (data?.gallery[0]?.size) {
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
    formData.append("category_id", data.category_id);

    formData.append("subcategory_id", data.subcategory_id);
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
    formData.append("meeting_point", JSON.stringify(data.meeting_point));
    formData.append("keywords", JSON.stringify(data.keywords));

    formData.append(
      "activity_exclusion",
      JSON.stringify(data.activity_exclusion)
    );
    formData.append("highlight", JSON.stringify(data.highlight));
    console.log("Fprm data", formData);
    if (clientDataAssignment.id) {
      var config = {
        method: "PUT",
        url: URLConstants.modifyProduct(clientDataAssignment.id),
        headers: {
          headers: { "content-type": "multipart/form-data" },
        },
        data: formData,
      };

      axios(config)
        .then((response) => {
          setLoaded(true);
          console.log("Response after submitting form", response);
          navigate("/products");
        })
        .catch((err) => {
          setLoaded(true);
          console.log(err);
        });
    } else {
      var config = {
        method: "POST",
        url: URLConstants.product(),
        headers: {
          headers: { "content-type": "multipart/form-data" },
        },
        data: formData,
      };

      axios(config)
        .then((response) => {
          setLoaded(true);
          console.log("Response after submitting form", response);
          navigate("/products");
        })
        .catch((err) => {
          setLoaded(true);
          console.log(err);
        });
    }
  };

  return (
    <Helmet title="Add Product">
      <Wrapper
        sx={{
          flexGrow: 1,
        }}
      >
        <Header
          title="Add Product"
          subtitle="Fill the details to add product"
          buttonText="Go Back"
          icon={<ReplyOutlinedIcon />}
          onClick={() => navigate("/products")}
        />
        <Box pt="1rem">
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Typography variant="h5">Basic Information</Typography>
                <Box>
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        id="title"
                        label="Title"
                        variant="outlined"
                        placeholder="Activity Or Tour Title"
                        fullWidth
                        margin="normal"
                        size="medium"
                        sx={{
                          backgroundColor: theme.palette.primary.light,
                        }}
                        inputProps={{ style: { fontSize: 16 } }}
                        InputLabelProps={{ style: { fontSize: 16 } }}
                        {...field}
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box>
                  <Controller
                    name="category_id"
                    control={control}
                    render={({ field, value }) => (
                      <TextField
                        select
                        id="category_id"
                        label="Category"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        sx={{
                          backgroundColor: theme.palette.primary.light,
                        }}
                        inputProps={{ style: { fontSize: 16 } }}
                        InputLabelProps={{ style: { fontSize: 16 } }}
                        defaultValue={
                          clientDataAssignment.category_id
                            ? clientDataAssignment.category_id
                            : ""
                        }
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
              <Grid item xs={12} md={4}>
                <Box>
                  <Controller
                    name="subcategory_id"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        select
                        id="subcategory_id"
                        label="Category Type"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        sx={{
                          backgroundColor: theme.palette.primary.light,
                        }}
                        inputProps={{ style: { fontSize: 16 } }}
                        InputLabelProps={{ style: { fontSize: 16 } }}
                        defaultValue={
                          clientDataAssignment.subcategory_id
                            ? clientDataAssignment.subcategory_id
                            : ""
                        }
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
              <Grid item xs={12} md={4}>
                <Box>
                  <Controller
                    name="duration"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        id="duration"
                        label="Duration"
                        type="text"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        sx={{
                          backgroundColor: theme.palette.primary.light,
                        }}
                        inputProps={{ style: { fontSize: 16 } }}
                        InputLabelProps={{ style: { fontSize: 16 } }}
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
                    onBlur={handleOverviewChange}
                    setContents={overview}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box>
                  <Controller
                    name="highlight"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        id="highlight"
                        label="Highlight"
                        variant="outlined"
                        multiline
                        rows={6}
                        fullWidth
                        margin="normal"
                        sx={{
                          backgroundColor: theme.palette.primary.light,
                        }}
                        inputProps={{ style: { fontSize: 16 } }}
                        InputLabelProps={{ style: { fontSize: 16 } }}
                        {...field}
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box>
                  <Controller
                    name="inclusion"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        id="inclusion"
                        label="Inclusion"
                        variant="outlined"
                        multiline
                        rows={6}
                        fullWidth
                        margin="normal"
                        sx={{
                          backgroundColor: theme.palette.primary.light,
                        }}
                        inputProps={{ style: { fontSize: 16 } }}
                        InputLabelProps={{ style: { fontSize: 16 } }}
                        {...field}
                      />
                    )}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box>
                  <Controller
                    name="meeting_point"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        id="meeting_point"
                        label="Meeting Point"
                        variant="outlined"
                        multiline
                        rows={6}
                        fullWidth
                        margin="normal"
                        sx={{
                          backgroundColor: theme.palette.primary.light,
                        }}
                        inputProps={{ style: { fontSize: 16 } }}
                        InputLabelProps={{ style: { fontSize: 16 } }}
                        {...field}
                      />
                    )}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box>
                  <Controller
                    name="keywords"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        id="keywords"
                        label="Keywords"
                        variant="outlined"
                        multiline
                        rows={6}
                        fullWidth
                        margin="normal"
                        sx={{
                          backgroundColor: theme.palette.primary.light,
                        }}
                        inputProps={{ style: { fontSize: 16 } }}
                        InputLabelProps={{ style: { fontSize: 16 } }}
                        {...field}
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box>
                  <Controller
                    name="exclusion"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        id="exclusion"
                        label="Exclusion"
                        variant="outlined"
                        multiline
                        rows={6}
                        fullWidth
                        margin="normal"
                        sx={{
                          backgroundColor: theme.palette.primary.light,
                        }}
                        inputProps={{ style: { fontSize: 16 } }}
                        InputLabelProps={{ style: { fontSize: 16 } }}
                        {...field}
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box>
                  <Controller
                    name="min_people"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        id="min_people"
                        label="Min People"
                        variant="outlined"
                        type="number"
                        fullWidth
                        margin="normal"
                        sx={{
                          backgroundColor: theme.palette.primary.light,
                        }}
                        inputProps={{ style: { fontSize: 16 } }}
                        InputLabelProps={{ style: { fontSize: 16 } }}
                        {...field}
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box>
                  <Controller
                    name="max_people"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        id="max_people"
                        label="Max People"
                        variant="outlined"
                        type="number"
                        fullWidth
                        margin="normal"
                        sx={{
                          backgroundColor: theme.palette.primary.light,
                        }}
                        inputProps={{ style: { fontSize: 16 } }}
                        InputLabelProps={{ style: { fontSize: 16 } }}
                        {...field}
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box>
                  <Controller
                    name="booking_period"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        id="booking_period"
                        label="Booking Period"
                        variant="outlined"
                        type="number"
                        fullWidth
                        margin="normal"
                        sx={{
                          backgroundColor: theme.palette.primary.light,
                        }}
                        inputProps={{ style: { fontSize: 16 } }}
                        InputLabelProps={{ style: { fontSize: 16 } }}
                        {...field}
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box>
                  <Controller
                    name="allow_deposit"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        select
                        id="allow_deposit"
                        label="Deposit"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        sx={{
                          backgroundColor: theme.palette.primary.light,
                        }}
                        inputProps={{ style: { fontSize: 16 } }}
                        InputLabelProps={{ style: { fontSize: 16 } }}
                        defaultValue={
                          clientDataAssignment.allow_deposit
                            ? clientDataAssignment.allow_deposit
                            : ""
                        }
                        {...field}
                      >
                        <MenuItem value={true}>Allow Deposit</MenuItem>
                        <MenuItem value={false}>Disallow Deposit</MenuItem>
                      </TextField>
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box>
                  <Controller
                    name="deposit_value"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        id="deposit_percent"
                        label="Deposit Percent"
                        variant="outlined"
                        type="number"
                        fullWidth
                        margin="normal"
                        sx={{
                          backgroundColor: theme.palette.primary.light,
                        }}
                        inputProps={{ style: { fontSize: 16 } }}
                        InputLabelProps={{ style: { fontSize: 16 } }}
                        {...field}
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box>
                  <Controller
                    name="allow_cancel"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        select
                        id="allow_cancel"
                        label="Allow Cancel"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        sx={{
                          backgroundColor: theme.palette.primary.light,
                        }}
                        inputProps={{ style: { fontSize: 16 } }}
                        InputLabelProps={{ style: { fontSize: 16 } }}
                        defaultValue={
                          clientDataAssignment.allow_cancel
                            ? clientDataAssignment.allow_cancel
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
            </Grid>
            <Divider
              sx={{ borderWidth: "2px", marginTop: "1rem" }}
              variant="fullWidth"
              color={theme.palette.neutral.main}
            />
            <Grid container spacing={2} sx={{ paddingTop: "1rem" }}>
              <Grid item xs={12} md={12}>
                <Typography variant="h5">Pricing & Location</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box>
                  <Controller
                    name="price"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        id="price"
                        label="Price"
                        variant="outlined"
                        type="number"
                        fullWidth
                        margin="normal"
                        sx={{
                          backgroundColor: theme.palette.primary.light,
                        }}
                        inputProps={{ style: { fontSize: 16 } }}
                        InputLabelProps={{ style: { fontSize: 16 } }}
                        {...field}
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box>
                  <Controller
                    name="discount_percent"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        id="discount"
                        label="Discount"
                        variant="outlined"
                        type="number"
                        fullWidth
                        margin="normal"
                        sx={{
                          backgroundColor: theme.palette.primary.light,
                        }}
                        inputProps={{ style: { fontSize: 16 } }}
                        InputLabelProps={{ style: { fontSize: 16 } }}
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
                        select
                        id="country"
                        label="Country"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        sx={{
                          backgroundColor: theme.palette.primary.light,
                        }}
                        inputProps={{ style: { fontSize: 16 } }}
                        InputLabelProps={{ style: { fontSize: 16 } }}
                        defaultValue={
                          clientDataAssignment.country
                            ? clientDataAssignment.country
                            : ""
                        }
                        onChange={(e) => {
                          console.log("Field", e.target.value, field);
                          e.preventDefault();
                          handleCountryChange(
                            encodeURIComponent(e.target.value)
                          );
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
              <Grid item xs={12} md={4}>
                <Box>
                  <Controller
                    name="state"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        select
                        id="state"
                        label="State"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        sx={{
                          backgroundColor: theme.palette.primary.light,
                        }}
                        inputProps={{ style: { fontSize: 16 } }}
                        InputLabelProps={{ style: { fontSize: 16 } }}
                        defaultValue={
                          clientDataAssignment.state
                            ? clientDataAssignment.state
                            : ""
                        }
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
              <Grid item xs={12} md={4}>
                <Box>
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        select
                        id="city"
                        label="City"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        sx={{
                          backgroundColor: theme.palette.primary.light,
                        }}
                        inputProps={{ style: { fontSize: 16 } }}
                        InputLabelProps={{ style: { fontSize: 16 } }}
                        defaultValue={
                          clientDataAssignment.city
                            ? clientDataAssignment.city
                            : ""
                        }
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
            <Divider
              sx={{ borderWidth: "2px", marginTop: "1rem" }}
              variant="fullWidth"
              color={theme.palette.neutral.main}
            />
            <Grid container spacing={2} sx={{ paddingTop: "1rem" }}>
              <Grid item xs={12} md={12}>
                <Typography variant="h5">Photos & Video</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box>
                  <label>Featured Image</label>
                  <input
                    type="file"
                    placeholder="Image URL"
                    {...register("featured_image", {
                      onChange: (e) => {
                        setFeaturedImage(
                          URL.createObjectURL(e.target.files[0])
                        );
                        console.log("Ankit");
                      },
                    })}
                  />
                </Box>
                <ImageList
                  cols={1}
                  rowHeight={80}
                  gap={4}
                  sx={{
                    width: 100,
                    height: 100,
                    marginTop: "1rem",
                    border: "0px",
                  }}
                >
                  <ImageListItem>
                    <img
                      src={featuredImage}
                      width="50px"
                      height="50px"
                      loading="lazy"
                    />
                  </ImageListItem>
                </ImageList>
                {clientDataAssignment.featured_image && (
                  <ImageList
                    cols={1}
                    rowHeight={80}
                    gap={4}
                    sx={{ width: 100, height: 100, paddingTop: "10px" }}
                  >
                    <ImageListItem>
                      <img
                        src={clientDataAssignment.featured_image}
                        width="50px"
                        height="50px"
                        loading="lazy"
                      />
                    </ImageListItem>
                  </ImageList>
                )}
              </Grid>
              <Grid item xs={12} md={4}>
                <Box>
                  <Box>
                    <label>Gallery Image</label>
                    <input
                      type="file"
                      placeholder="Image URL"
                      multiple
                      {...register("gallery", {
                        onChange: (e) => {
                          let arr = [];
                          for (let i = 0; i < e.target.files.length; i++) {
                            arr.push(URL.createObjectURL(e.target.files[i]));
                          }
                          setGalleryImage(arr);
                        },
                      })}
                    />
                  </Box>
                  <ImageList
                    cols={6}
                    rowHeight={80}
                    gap={4}
                    sx={{ width: 500, marginTop: "1.5rem" }}
                  >
                    {galleryImage?.map((item, index) => (
                      <ImageListItem key={index}>
                        <img
                          src={item}
                          width="50px"
                          height="50px"
                          alt="Gallery Image"
                          loading="lazy"
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                  {clientDataAssignment && (
                    <ImageList
                      cols={6}
                      rowHeight={80}
                      gap={4}
                      sx={{ width: 500, marginTop: "1.5rem" }}
                    >
                      {clientDataAssignment.gallery?.map((item, index) => (
                        <ImageListItem key={index}>
                          <img
                            src={item}
                            width="50px"
                            height="50px"
                            alt="Gallery Image"
                            loading="lazy"
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box>
                  <Controller
                    name="video"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        id="video-url"
                        label="Video"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        sx={{
                          backgroundColor: theme.palette.primary.light,
                        }}
                        inputProps={{ style: { fontSize: 16 } }}
                        InputLabelProps={{ style: { fontSize: 16 } }}
                        {...field}
                      />
                    )}
                  />
                </Box>
              </Grid>
            </Grid>

            <div></div>

            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={4}
              sx={{ marginTop: "1rem" }}
            >
              <Button
                size="medium"
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
                size="medium"
                variant="contained"
                style={{
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.neutral[600],
                  fontWeight: "bold",
                }}
                onClick={() => navigate("/products")}
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
        </Box>
      </Wrapper>
    </Helmet>
  );
};

export default AddProduct;
