import React, { useState, useEffect } from "react";
import Header from "components/Header";
import { Box, Button, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Loader from "react-loader";
import { axiosInstance } from "../base/api/axios.util";
import { URLConstants } from "../base/api/url.constants";

const CreateProduct = () => {
  const theme = useTheme();
  const [loaded, setLoaded] = useState(true);
  const [countries, setCountries] = useState([]);
  const [countryStates, setCountryStates] = useState([]);

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

  const onSubmit = (data) => {
    //reset({});
    // setClientType(undefined);
    console.log("Submitted Data,", data);

    setLoaded(false);
    delete data.email;
    data.XMLCompID = data.clientCompId;
    data.activationStatus = true;
    var formData = new FormData();
    formData.append("XMLCompID", data.XMLCompID);
    formData.append("XMLFormat", data.XMLFormat);
    formData.append("acceptLocalLeads", data.acceptLocalLeads);
    formData.append("activationStatus", data.activationStatus);
    if (data.bannerLink[0]?.size) {
      formData.append("bannerLink", data.bannerLink[0]);
    }
    if (data.logoLink[0]?.size) {
      formData.append("logoLink", data.logoLink[0]);
    }
    formData.append("clientCompId", data.clientCompId);
    formData.append("clientDesc", data.clientDesc);
    formData.append("clientProfile", data.clientProfile);
    formData.append("dailyTargetLeads", data.dailyTargetLeads);
    formData.append("dataFormat", data.dataFormat);
    formData.append("driverDb", data.driverDb);
    formData.append("driverTypes", JSON.stringify(data.driverTypes));
    formData.append("experiences", JSON.stringify(data.experiences));
    formData.append("featuredCompany", data.featuredCompany);
    formData.append("freightTypes", JSON.stringify(data.freightTypes));
    formData.append("jobFetchURL", data.jobFetchURL);
    formData.append("leadPushURL", data.leadPushURL);
    formData.append("mobileNumber", data.mobileNumber);
    formData.append("name", data.name);
    formData.append("runTypes", JSON.stringify(data.runTypes));
    formData.append("showPromotionalBanner", data.showPromotionalBanner);
    formData.append("states", JSON.stringify(data.states));
    formData.append("websiteLink", data.websiteLink);
    console.log("Form data", formData);

    console.log(" Client Updation Data --------------> ", data);

    // var config = {
    //                 method: "post",
    //                  url: URLConstants.updateClientInfo(clientDataAssignment.clientCompId,
    //                 headers: {
    //                   headers: { "content-type": "multipart/form-data" },
    //                 },
    //                 data: formData,
    //               };
    // var config = {
    //   method: "put",
    //   url: URLConstants.updateClientInfo(clientDataAssignment.clientCompId),
    //   headers: {
    //     headers: { "content-type": "multipart/form-data" },
    //   },
    //   data: formData,
    // };

    // axios(config)
    //   .then((response) => {
    //     try {
    //       if (
    //         client.clientType == "CLIENT" &&
    //         !client.client.totalSubscription
    //       ) {
    //         history.push("/renewBuySubscription", {
    //           params: {
    //             showToast: true,
    //             toastMessage: "Information Saved Successfully !",
    //           },
    //         });
    //       } else if (client.clientType == "CLIENT") {
    //         history.push("/AdminPage", {
    //           params: {
    //             showToast: true,
    //             toastMessage: "Customer Information Updated Success !",
    //           },
    //         });
    //       } else {
    //         history.push("companies-list", {
    //           params: {
    //             showToast: true,
    //             toastMessage: "Customer Information Updated Success !",
    //           },
    //         });
    //       }

    //       setLoaded(true);
    //       reset({});
    //       toast.success("Client Information Update Successful !");

    //       clientDataAssignment = {};
    //     } catch (error) {
    //       console.error(error);
    //     }
    //     resolve({ user, client });
    //   })
    //   .catch((err) => {
    //     setLoaded(true);
    //     const errorMsg = err?.response?.data?.message;
    //     // reject(errorMsg);
    //   });
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
        // setCountryStates(response.states);
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
                              handleCountryChange(e.target.value);
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
                              handleStateChange(e.target.value);
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
                    {/* <div className="form-group row">
                          <label className="col-lg-3 col-form-label">
                            {" "}
                            XML Format
                          </label>
                          <div className="col-lg-9 selectBox">
                            <select
                              {...register("XMLFormat")}
                              className={`${
                                errors?.XMLFormat ? "error-select" : ""
                              }`}
                            >
                              <option value="">Select XML Format</option>
                              {xmlFormatList.map((XMLFormat, index) => (
                                <option value={XMLFormat}>{XMLFormat}</option>
                              ))}
                            </select>
                            <small>{errors?.XMLFormat?.message}</small>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label">
                            XML Company ID
                          </label>
                          <div className="col-lg-9">
                            <Controller
                              name="clientCompId"
                              control={control}
                              render={({ field: { value, onChange } }) => (
                                <input
                                  className={`form-control  ${
                                    errors?.clientCompId ? "error-input" : ""
                                  }`}
                                  type="text"
                                  value={value}
                                  onChange={onChange}
                                  autoComplete="false"
                                />
                              )}
                              defaultValue=""
                            />
                            <small>{errors?.clientCompId?.message}</small>
                          </div>
                        </div>
                        <div className="form-group row items-center flex-nowrap">
                          <label className="col-lg-3 col-form-label">
                            Accept Leads Interested in Local Offers Only
                          </label>
                          <div className="ml-12 flx-shrink">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value={acceptLocalLeads}
                              name="acceptLocalLeads"
                              {...register("acceptLocalLeads")}
                            />
                            <lable>
                              {" "}
                              YES (accept leads 'local offers only')
                            </lable>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label">
                            Daily Targeted Leads
                          </label>
                          <div className="col-lg-9">
                            <Controller
                              name="dailyTargetLeads"
                              control={control}
                              render={({ field: { value, onChange } }) => (
                                <input
                                  className={`form-control  ${
                                    errors?.dailyTargetLeads
                                      ? "error-input"
                                      : ""
                                  }`}
                                  type="text"
                                  value={value}
                                  onChange={onChange}
                                  autoComplete="false"
                                />
                              )}
                              defaultValue=""
                            />
                            <small>{errors?.dailyTargetLeads?.message}</small>
                          </div>
                        </div>
                      </>

                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label">
                          WebSite URL
                        </label>
                        <div className="col-lg-9">
                          <Controller
                            name="websiteLink"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <input
                                className={`form-control  ${
                                  errors?.websiteLink ? "error-input" : ""
                                }`}
                                type="text"
                                value={value}
                                onChange={onChange}
                                autoComplete="false"
                              />
                            )}
                            defaultValue=""
                          />
                          <small>{errors?.websiteLink?.message}</small>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label">
                          Mobile No.
                        </label>
                        <div className="col-lg-9">
                          <Controller
                            name="mobileNumber"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <input
                                className={`form-control  ${
                                  errors?.mobileNumber ? "error-input" : ""
                                }`}
                                type="text"
                                value={value}
                                onChange={onChange}
                                autoComplete="false"
                              />
                            )}
                            defaultValue=""
                          />
                          <small>{errors?.mobileNumber?.message}</small>
                        </div>
                      </div>

                      <>
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label">
                            Job Fetch URL
                          </label>
                          <div className="col-lg-9">
                            <Controller
                              name="jobFetchURL"
                              control={control}
                              render={({ field: { value, onChange } }) => (
                                <input
                                  className={`form-control  ${
                                    errors?.jobFetchURL ? "error-input" : ""
                                  }`}
                                  type="text"
                                  value={value}
                                  onChange={onChange}
                                  autoComplete="false"
                                />
                              )}
                              defaultValue=""
                            />
                            <small>{errors?.jobFetchURL?.message}</small>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label">
                            Lead Push URL
                          </label>
                          <div className="col-lg-9">
                            <Controller
                              name="leadPushURL"
                              control={control}
                              render={({ field: { value, onChange } }) => (
                                <input
                                  className={`form-control  ${
                                    errors?.leadPushURL ? "error-input" : ""
                                  }`}
                                  type="text"
                                  value={value}
                                  onChange={onChange}
                                  autoComplete="false"
                                />
                              )}
                              defaultValue=""
                            />
                            <small>{errors?.leadPushURL?.message}</small>
                          </div>
                        </div> */}

                    {/* <div className="form-group row">
                          <label className="col-lg-3 col-form-label">
                            {" "}
                            State List
                          </label>
                          <div className="col-lg-9 selectBox">
                            <select
                              {...register("statelist")}
                              className={`${
                                errors?.statelist ? "error-select" : ""
                              }`}
                            >
                              <option value="">Select State</option>
                              {stateList.map(({ id, ststeList }, index) => (
                                <option value={ststeList}>{ststeList}</option>
                              ))}
                            </select>
                            <small>{errors?.statelist?.message}</small>
                          </div>
                        </div> */}
                    {/* <div className="form-group row items-center flex-nowrap">
                          <label className="col-lg-3 col-form-label">
                            Logo URL
                          </label>
                          <input
                            className="flx-shrink m-0"
                            type="file"
                            placeholder="Image URL"
                            {...register("logoLink", { required: true })}
                          />
                          {errors.logoLink && <p>Logo field is required</p>} */}

                    {/* <div className="col-lg-9">
                            <Controller
                              name="logoLink"
                              control={control}
                              render={({ field: { value, onChange } }) => (
                                <input
                                  className={`form-control  ${
                                    errors?.logoLink ? "error-input" : ""
                                  }`}
                                  type="text"
                                  value={value}
                                  onChange={onChange}
                                  autoComplete="false"
                                />
                              )}
                              defaultValue=""
                            />
                            <small>{errors?.logoLink?.message}</small>
                          </div> */}
                    {/* </div>
                      </>

                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label">
                          Client Description
                        </label>
                        <div className="col-lg-9">
                          <Controller
                            name="clientDesc"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <textarea
                                className={`form-control   ${
                                  errors?.clientProfile ? "error-input" : ""
                                }`}
                                style={{ height: "200px" }}
                                rows="8"
                                cols="50"
                                onChange={onChange}
                                value={value}
                              />
                            )}
                            defaultValue=""
                          />
                          <small>{errors?.clientDesc?.message}</small>
                        </div>
                      </div>
                     
                      <>
                        <div className="form-group row items-center">
                          <label className="col-lg-3 col-form-label">
                            Show Promotional Banner
                          </label>
                          <div className="col-lg-9">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value={showPromotionalBanner}
                              name="showPromotionalBanner"
                              {...register("showPromotionalBanner")}
                            />
                            <lable>
                              {" "}
                              YES (Will Show Banner on SPT Website')
                            </lable>
                          </div>
                        </div>
                        <div className="form-group row items-center">
                          <label className="col-lg-3 col-form-label">
                            Is it a featured Company
                          </label>
                          <div className="col-lg-9 align-middle">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value={featuredCompany}
                              name="featuredCompany"
                              {...register("featuredCompany")}
                            />
                            <lable>
                              {" "}
                              YES (Will Show as Featured Company on SPT
                              Website')
                            </lable>
                          </div>
                        </div>
                        <div className="form-group row items-center">
                          <label className="col-lg-3 col-form-label">
                            Show driver DB
                          </label>
                          <div className="col-lg-9 align-middle">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value={driverDb}
                              name="driverDb"
                              {...register("driverDb")}
                            />
                            <lable> YES</lable>
                          </div>
                        </div>
                        <div className="grid gap-4">
                          <label className="col-form-label">
                            Promotional Banner URL
                          </label>
                          <input
                            type="file"
                            placeholder="Image URL"
                            {...register("bannerLink", { required: true })}
                          />
                          {errors.bannerLink && <p>Banner field is required</p>}

                         
                        </div>
                      </>
                    </div>
                    <div className="col-xl-4">
                      <div className="row">
                        <div className="col-xl-12 form-group">
                          <label className="lable-color">Driver Type :</label>

                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value={driverTypes[0]}
                              name="driverTypes[0]"
                              {...register("driverTypes")}
                            />
                            {""}
                            <label class="form-check-label" for="driverSolo">
                              {driverTypes[0]}
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value={driverTypes[1]}
                              name="driverTypes[1]"
                              {...register("driverTypes")}
                            />
                            {""}
                            <label class="form-check-label" for="driverTeam">
                              {driverTypes[1]}
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value={driverTypes[2]}
                              name="driverTypes[2]"
                              {...register("driverTypes")}
                            />
                            <label class="form-check-label" for="leasePurchase">
                              {driverTypes[2]}
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value={driverTypes[3]}
                              name="driverTypes[3]"
                              {...register("driverTypes")}
                            />
                            <label class="form-check-label" for="operatorSolo">
                              {driverTypes[3]}
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value={driverTypes[4]}
                              name="driverTypes[4]"
                              {...register("driverTypes")}
                            />
                            <label class="form-check-label" for="operatorTeam">
                              {driverTypes[4]}
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value={driverTypes[5]}
                              name="driverTypes[5]"
                              {...register("driverTypes")}
                            />
                            <label class="form-check-label" for="student">
                              {driverTypes[5]}
                            </label>
                          </div>
                        </div>
                        <div className=" col-xl-12 form-group">
                          <label className="lable-color">Freight Type</label>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value={freightTypes[0]}
                              name="freightTypes[0]"
                              {...register("freightTypes")}
                            />
                            <label class="form-check-label" for="autohauler">
                              {freightTypes[0]}
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value={freightTypes[1]}
                              name="freightTypes[1]"
                              {...register("freightTypes")}
                            />
                            <label class="form-check-label" for="bus">
                              {freightTypes[1]}
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value={freightTypes[2]}
                              name="freightTypes[2]"
                              {...register("freightTypes")}
                            />
                            <label class="form-check-label" for="carHauler">
                              {freightTypes[2]}
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value={freightTypes[3]}
                              name="freightTypes[3]"
                              {...register("freightTypes")}
                            />
                            <label class="form-check-label" for="cattleHauling">
                              {freightTypes[3]}
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value={freightTypes[4]}
                              name="freightTypes[4]"
                              {...register("freightTypes")}
                            />
                            <label class="form-check-label" for="dryBulk">
                              {freightTypes[4]}
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value={freightTypes[5]}
                              name="freightTypes[5]"
                              {...register("freightTypes")}
                            />
                            <label class="form-check-label" for="dryVan">
                              {freightTypes[5]}
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value={freightTypes[6]}
                              name="freightTypes[6]"
                              {...register("freightTypes")}
                            />
                            <label class="form-check-label" for="dump">
                              {freightTypes[6]}
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value={freightTypes[7]}
                              name="freightTypes[7]"
                              {...register("freightTypes")}
                            />
                            <label class="form-check-label" for="flatbed">
                              {freightTypes[7]}
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value={freightTypes[8]}
                              name="freightTypes[8]"
                              {...register("freightTypes")}
                            />
                            <label class="form-check-label" for="hopperBottom">
                              {freightTypes[8]}
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value={freightTypes[9]}
                              name="freightTypes[9]"
                              {...register("freightTypes")}
                            />
                            <label
                              class="form-check-label"
                              for="householdGoods"
                            >
                              {freightTypes[9]}
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value={freightTypes[10]}
                              name="freightTypes[10]"
                              {...register("freightTypes")}
                            />
                            <label class="form-check-label" for="intermodal">
                              {freightTypes[10]}
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value={freightTypes[11]}
                              name="freightTypes[11]"
                              {...register("freightTypes")}
                            />
                            <label class="form-check-label" for="lowboy">
                              {freightTypes[11]}
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value={freightTypes[12]}
                              name="freightTypes[12]"
                              {...register("freightTypes")}
                            />
                            <label class="form-check-label" for="refrigerated">
                              {freightTypes[12]}
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value={freightTypes[13]}
                              name="freightTypes[13]"
                              {...register("freightTypes")}
                            />
                            <label class="form-check-label" for="straightTruck">
                              {freightTypes[13]}
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value={freightTypes[14]}
                              name="freightTypes[14]"
                              {...register("freightTypes")}
                            />
                            <label class="form-check-label" for="tanker">
                              {freightTypes[14]}
                            </label>
                          </div>
                        </div>
                        <div className="col-xl-12 form-group">
                          <label className="lable-color">Run Types</label>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value={runTypes[0]}
                              name="runTypes[0]"
                              {...register("runTypes")}
                            />
                            <label class="form-check-label" for="one">
                              {runTypes[0]}
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value={runTypes[1]}
                              name="runTypes[1]"
                              {...register("runTypes")}
                            />
                            <label class="form-check-label" for="two">
                              {runTypes[1]}
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value={runTypes[2]}
                              name="runTypes[2]"
                              {...register("runTypes")}
                            />
                            <label class="form-check-label" for="three">
                              {runTypes[2]}
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value={runTypes[3]}
                              name="runTypes[3]"
                              {...register("runTypes")}
                            />
                            <label class="form-check-label" for="four">
                              {runTypes[3]}
                            </label>
                          </div> */}
                    {/* <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value={runTypes[4]}
                                name="runTypes[4]"
                                {...register("runTypes")}
                              />
                              <label class="form-check-label" for="five">
                                {runTypes[4]}
                              </label>
                            </div>
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value={runTypes[5]}
                                name="runTypes[5]"
                                {...register("runTypes")}
                              />
                              <label class="form-check-label" for="six">
                                {runTypes[5]}
                              </label>
                            </div>
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value={runTypes[6]}
                                name="runTypes[6]"
                                {...register("runTypes")}
                              />
                              <label class="form-check-label" for="six">
                                {runTypes[6]}
                              </label>
                            </div> */}
                    {/* </div>
                        <div className="col-xl-12 form-group">
                          <label className="lable-color">
                            Experience Levels
                          </label>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value={experience.one}
                              name="experience.one"
                              {...register("experiences")}
                            />
                            <label class="form-check-label" for="one">
                              {experience.one}
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value={experience.two}
                              name="experience.two"
                              {...register("experiences")}
                            />
                            <label class="form-check-label" for="two">
                              {experience.two}
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value={experience.three}
                              name="experience.three"
                              {...register("experiences")}
                            />
                            <label class="form-check-label" for="three">
                              {experience.three}
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value={experience.four}
                              name="experience.four"
                              {...register("experiences")}
                            />
                            <label class="form-check-label" for="four">
                              {experience.four}
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value={experience.five}
                              name="experience.five"
                              {...register("experiences")}
                            />
                            <label class="form-check-label" for="five">
                              {experience.five}
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value={experience.six}
                              name="experience.six"
                              {...register("experiences")}
                            />
                            <label class="form-check-label" for="six">
                              {experience.six}
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value={experience.seven}
                              name="experience.seven"
                              {...register("experiences")}
                            />
                            <label class="form-check-label" for="seven">
                              {experience.seven}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-12 form-group p-0">
                      <label className="col-lg-3 col-form-label lable-color">
                        State Type
                      </label>
                      <div className="col-lg-9 selectBox">
                        <select
                          {...register("clientStateType", {
                            onChange: (event) => {
                              setStateStateSelected(event.target.value);
                              setShowWarning({ message: "", show: false });
                              handleStateSelection(null, event.target.value);
                            },
                          })}
                          className={`${
                            errors?.dataFormat ? "error-select" : ""
                          }`}
                        >
                          <option value="">Select State Type</option>
                          {stateType.map((dataFormat, index) => (
                            <option value={dataFormat}>{dataFormat}</option>
                          ))}
                        </select>
                        <small>{errors?.dataFormat?.message}</small> */}
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
