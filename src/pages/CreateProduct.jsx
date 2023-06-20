import React, { useState, useEffect, useRef } from "react";
import Header from "components/Header";
import { Box, Button, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Loader from "react-loader";
import { axiosInstance } from "../base/api/axios.util";
import { URLConstants } from "../base/api/url.constants";
import JoditEditor from "jodit-react";
import axios, * as others from "axios";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const theme = useTheme();
  const editor1 = useRef();
  const editor2 = useRef();
  const [loaded, setLoaded] = useState(true);
  const [countries, setCountries] = useState([]);
  const [countryStates, setCountryStates] = useState([]);
  const [stateCities, setStateCities] = useState([]);
  const [highlight, setHighlight] = useState("");
  const [overview, setOverview] = useState("");
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    control,
    setError,
    clearErrors,
    setValue,
    reset,
    formState: { errors },
  } = useForm({});

  const depositData = ["Disallow Deposit", "Deposit by Percent"];
  const categories = ["Activity", "Tour"];
  const categoriesType = [
    "Scuba Diving",
    "Watersports",
    "Combo Pack",
    "Sightseeing",
    "River Rafting",
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

  const getSunEditor1Instance = (sunEditor) => {
    editor1.current = sunEditor;
    console.log(" editor.current ", editor1.current);
  };
  const getSunEditor2Instance = (sunEditor) => {
    editor2.current = sunEditor;
    console.log(" editor.current ", editor2.current);
  };

  const handleOverviewChange = (content) => {
    console.log(" handleEditorChang ", content); //Get Content Inside Editor
    // var resultBuffer = encoding.convert(content,  'ASCII','UTF-8');

    // const asciiText = iconv.decode(Buffer.from(content, 'binary'), 'ascii');

    console.log("Testing acii code", content);
    setOverview(content);
  };
  console.log("URL COnstants", URLConstants.product);
  const handleHighlightChange = (content) => {
    console.log(" handleEditorChang ", content); //Get Content Inside Editor
    // var resultBuffer = encoding.convert(content,  'ASCII','UTF-8');

    // const asciiText = iconv.decode(Buffer.from(content, 'binary'), 'ascii');

    console.log("Testing acii code", content);
    setHighlight(content);
  };

  const onSubmit = (data) => {
    //reset({});
    // setClientType(undefined);
    setLoaded(false);
    data.overview = overview;
    data.highlight = highlight;
    data.activityExclusion = data.activityExclusion.split(",");
    data.activityInclusion = data.activityInclusion.split(",");
    data.last_update_by = "SUPER_ADMIN";
    data.creator = "SUPER_ADMIN";
    console.log("Submitted Data,", data);

    var config = {
      method: "post",
      url: URLConstants.product(),

      data: data,
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
  };
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

  return (
    <>
      <Box m="1.5rem 2.5rem">
        <FlexBetween>
          <Header title="Edit Product" subtitle="Entire list of product" />
        </FlexBetween>
      </Box>
      <div className="row">
        <div className="col-md-12">
          <div className="card mb-0">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit, onError)}>
                <div className="row">
                  <div className="col-xl-8">
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">Title</label>

                      <div className="col-lg-9">
                        <Controller
                          name="title"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <input
                              className={`form-control  ${
                                errors?.name ? "error-input" : ""
                              }`}
                              type="text"
                              value={value}
                              onChange={onChange}
                              autoComplete="false"
                            />
                          )}
                          defaultValue=""
                        />
                        <small>{errors?.name?.message}</small>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-lg-3 col-form-label required pl-0">
                        HighLight
                      </label>

                      <JoditEditor
                        value={highlight}
                        height={100}
                        name="highlight"
                        getSunEditorInstance={getSunEditor1Instance}
                        onChange={handleHighlightChange}
                        setContents={highlight}
                      />
                    </div>
                    <div className="form-group">
                      <label className="col-lg-3 col-form-label required pl-0">
                        Overview
                      </label>

                      <JoditEditor
                        value={overview}
                        height={100}
                        name="overview"
                        getSunEditorInstance={getSunEditor2Instance}
                        onChange={handleOverviewChange}
                        setContents={highlight}
                      />
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">
                        Gallery Image
                      </label>

                      <div className="col-lg-9">
                        <Controller
                          name="gallery"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <input
                              className={`form-control  ${
                                errors?.gallery ? "error-input" : ""
                              }`}
                              type="text"
                              value={value}
                              onChange={onChange}
                              autoComplete="false"
                            />
                          )}
                          defaultValue=""
                        />
                        <small>{errors?.gallery?.message}</small>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">video</label>

                      <div className="col-lg-9">
                        <Controller
                          name="video"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <input
                              className={`form-control  ${
                                errors?.video ? "error-input" : ""
                              }`}
                              type="text"
                              value={value}
                              onChange={onChange}
                              autoComplete="false"
                            />
                          )}
                          defaultValue=""
                        />
                        <small>{errors?.video?.message}</small>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">price</label>

                      <div className="col-lg-9">
                        <Controller
                          name="price"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <input
                              className={`form-control  ${
                                errors?.price ? "error-input" : ""
                              }`}
                              type="number"
                              value={value}
                              onChange={onChange}
                              autoComplete="false"
                            />
                          )}
                          defaultValue=""
                        />
                        <small>{errors?.price?.message}</small>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">
                        discount_percent
                      </label>

                      <div className="col-lg-9">
                        <Controller
                          name="discount_percent"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <input
                              className={`form-control  ${
                                errors?.discount_percent ? "error-input" : ""
                              }`}
                              type="number"
                              value={value}
                              onChange={onChange}
                              autoComplete="false"
                            />
                          )}
                          defaultValue=""
                        />
                        <small>{errors?.discount_percent?.message}</small>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">
                        min_people
                      </label>

                      <div className="col-lg-9">
                        <Controller
                          name="min_people"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <input
                              className={`form-control  ${
                                errors?.min_people ? "error-input" : ""
                              }`}
                              type="number"
                              value={value}
                              onChange={onChange}
                              autoComplete="false"
                            />
                          )}
                          defaultValue=""
                        />
                        <small>{errors?.min_people?.message}</small>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">
                        max_people
                      </label>

                      <div className="col-lg-9">
                        <Controller
                          name="max_people"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <input
                              className={`form-control  ${
                                errors?.max_people ? "error-input" : ""
                              }`}
                              type="number"
                              value={value}
                              onChange={onChange}
                              autoComplete="false"
                            />
                          )}
                          defaultValue=""
                        />
                        <small>{errors?.max_people?.message}</small>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">
                        Start Time
                      </label>

                      <div className="col-lg-9">
                        <Controller
                          name="start_time"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <input
                              className={`form-control  ${
                                errors?.start_time ? "error-input" : ""
                              }`}
                              type="time"
                              value={value}
                              onChange={onChange}
                              autoComplete="false"
                            />
                          )}
                          defaultValue=""
                        />
                        <small>{errors?.start_time?.message}</small>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">
                        featured_image
                      </label>

                      <div className="col-lg-9">
                        <Controller
                          name="featured_image"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <input
                              className={`form-control  ${
                                errors?.featured_image ? "error-input" : ""
                              }`}
                              type="text"
                              value={value}
                              onChange={onChange}
                              autoComplete="false"
                            />
                          )}
                          defaultValue=""
                        />
                        <small>{errors?.featured_image?.message}</small>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">
                        duration
                      </label>

                      <div className="col-lg-9">
                        <Controller
                          name="duration"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <input
                              className={`form-control  ${
                                errors?.duration ? "error-input" : ""
                              }`}
                              type="text"
                              value={value}
                              onChange={onChange}
                              autoComplete="false"
                            />
                          )}
                          defaultValue=""
                        />
                        <small>{errors?.duration?.message}</small>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">
                        Booking Period
                      </label>

                      <div className="col-lg-9">
                        <Controller
                          name="booking_period"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <input
                              className={`form-control  ${
                                errors?.booking_period ? "error-input" : ""
                              }`}
                              type="number"
                              value={value}
                              onChange={onChange}
                              autoComplete="false"
                            />
                          )}
                          defaultValue=""
                        />
                        <small>{errors?.booking_period?.message}</small>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">
                        Activity Exclusion Enter comma seperated value
                      </label>

                      <div className="col-lg-9">
                        <Controller
                          name="activityExclusion"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <input
                              className={`form-control  ${
                                errors?.activityExclusion ? "error-input" : ""
                              }`}
                              type="text"
                              value={value}
                              onChange={onChange}
                              autoComplete="false"
                            />
                          )}
                          defaultValue=""
                        />
                        <small>{errors?.activityExclusion?.message}</small>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">
                        Activity Inclusion Enter comma seperated value
                      </label>

                      <div className="col-lg-9">
                        <Controller
                          name="activityInclusion"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <input
                              className={`form-control  ${
                                errors?.activityInclusion ? "error-input" : ""
                              }`}
                              type="text"
                              value={value}
                              onChange={onChange}
                              autoComplete="false"
                            />
                          )}
                          defaultValue=""
                        />
                        <small>{errors?.activityInclusion?.message}</small>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">Deposit</label>
                      <div className="col-lg-9 selectBox">
                        <select
                          {...register("deposit")}
                          className={`${errors?.deposit ? "error-select" : ""}`}
                        >
                          <option value="">Select Deposit Type</option>
                          {depositData.map((dataFormat, index) => (
                            <option value={dataFormat}>{dataFormat}</option>
                          ))}
                        </select>
                        <small>{errors?.dataFormat?.message}</small>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">
                        Allow Cancel
                      </label>
                      <div className="col-lg-9 selectBox">
                        <select
                          {...register("allow_cancel")}
                          className={`${
                            errors?.allow_cancel ? "error-select" : ""
                          }`}
                        >
                          <option value="">Select </option>
                          {["YES", "NO"].map((dataFormat, index) => (
                            <option value={dataFormat}>{dataFormat}</option>
                          ))}
                        </select>
                        <small>{errors?.dataFormat?.message}</small>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">Country</label>
                      <div className="col-lg-9 selectBox">
                        <select
                          {...register("country", {
                            onChange: (e) => {
                              handleCountryChange(
                                encodeURIComponent(e.target.value)
                              );
                            },
                          })}
                          className={`${errors?.country ? "error-select" : ""}`}
                        >
                          <option value="">Select Country </option>
                          {countries.map((dataFormat, index) => (
                            <option value={dataFormat.country_name}>
                              {dataFormat.country_name}
                            </option>
                          ))}
                        </select>
                        <small>{errors?.dataFormat?.message}</small>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">State</label>
                      <div className="col-lg-9 selectBox">
                        <select
                          {...register("state", {
                            onChange: (e) => {
                              handleStateChange(
                                encodeURIComponent(e.target.value)
                              );
                            },
                          })}
                          className={`${errors?.state ? "error-select" : ""}`}
                        >
                          <option value="">Select State </option>
                          {countryStates.map((dataFormat, index) => (
                            <option value={dataFormat.state_name}>
                              {dataFormat.state_name}
                            </option>
                          ))}
                        </select>
                        <small>{errors?.dataFormat?.message}</small>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">City</label>
                      <div className="col-lg-9 selectBox">
                        <select
                          {...register("city")}
                          className={`${errors?.state ? "error-select" : ""}`}
                        >
                          <option value="">Select City </option>
                          {stateCities.map((dataFormat, index) => (
                            <option value={dataFormat.city_name}>
                              {dataFormat.city_name}
                            </option>
                          ))}
                        </select>
                        <small>{errors?.dataFormat?.message}</small>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">
                        Category
                      </label>
                      <div className="col-lg-9 selectBox">
                        <select
                          {...register("category")}
                          className={`${
                            errors?.category ? "error-select" : ""
                          }`}
                        >
                          <option value="">Select category </option>
                          {categories.map((dataFormat, index) => (
                            <option value={dataFormat}>{dataFormat}</option>
                          ))}
                        </select>
                        <small>{errors?.dataFormat?.message}</small>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">
                        Category Type
                      </label>
                      <div className="col-lg-9 selectBox">
                        <select
                          {...register("categoryType")}
                          className={`${
                            errors?.categoryType ? "error-select" : ""
                          }`}
                        >
                          <option value="">Select category type </option>
                          {categoriesType.map((dataFormat, index) => (
                            <option value={dataFormat}>{dataFormat}</option>
                          ))}
                        </select>
                        <small>{errors?.dataFormat?.message}</small>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="d-grid gap-2 justify-content-md-center">
                  <Button class="btn btn-primary me-md-2" type="submit">
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

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
    </>
  );
};

export default CreateProduct;
