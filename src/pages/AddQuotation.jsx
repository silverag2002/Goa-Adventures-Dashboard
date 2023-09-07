import React, { useState, useRef, useEffect } from "react";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import { useForm, Controller } from "react-hook-form";
import JoditEditor from "jodit-react";
import FlexBetween from "components/FlexBetween";
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

const AddQuotation = () => {
  const client = useClient();
  const navigate = useNavigate();
  useEffect(() => {
    if (client?.client?.role == undefined || client?.client?.role == 2) {
      navigate("/");
    }
  }, []);
  const [itinerary, setItinerary] = useState("");
  const theme = useTheme();
  const editor = useRef();

  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm({});

  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };

  const itineraryChangeHandler = (content) => {
    setItinerary(content);
  };

  const onSubmit = () => {};
  const onError = (errors) => console.log(errors);

  return (
    <Box m="1.5rem 2.5rem">
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
                name="fullname"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="fullname"
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
                name="mobileNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="mobileNumber"
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
                name="emailId"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="emailId"
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
                name="hotel"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="hotel"
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
                name="checkIn"
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
                name="checkOut"
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
                    {...field}
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
                    {...field}
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
                    {...field}
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
                name="cancellationPolicy"
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
    </Box>
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
