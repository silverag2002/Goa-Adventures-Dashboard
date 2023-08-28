import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  useTheme,
  Grid,
  Stack,
  TextField,
  MenuItem,
} from "@mui/material";
import axios, * as others from "axios";
import Loader from "react-loader";
import { useNavigate, useLocation } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import { axiosInstance } from "../base/api/axios.util";
import { URLConstants } from "../base/api/url.constants";
import Header from "components/Header";
import JoditEditor from "jodit-react";
import { useForm, Controller } from "react-hook-form";

const AddLocation = () => {
  const [description, setDescription] = useState("");
  const [parentLocation, setParentLocation] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();
  const editor = useRef();
  const location = useLocation();

  const onError = (errors) => console.log(errors);
  //Destructuring UseForm
  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm({});

  //Judit Instance
  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };

  //Description Handler
  const descriptionChangeHandler = (content) => {
    console.log(content);

    console.log("Testing acii code", content);
    setDescription(content);
  };

  var clientDataAssignment = {};

  console.log("LOcaltion", location);
  if (location.state) {
    clientDataAssignment = location.state.location;
  }
  console.log("ASsingment issue", clientDataAssignment);

  useEffect(() => {
    axiosInstance
      .get(URLConstants.getParentLocation())
      .then((response) => {
        setLoaded(true);
        console.log("Response form parent location", response);
        setValue("parent_location", clientDataAssignment?.parent_location);
        setParentLocation(response);
      })
      .catch((err) => {
        setLoaded(true);
        console.log(err);
      });

    setValue("location", clientDataAssignment?.location);
    setDescription(clientDataAssignment?.description);
  }, []);

  const onSubmit = (data) => {
    //reset({});
    // setClientType(undefined);
    data.description = description;
    setLoaded(false);
    console.log("Data captured", data);

    var formData = new FormData();
    if (data.image[0]?.size) {
      formData.append("image", data.image[0]);
    }

    formData.append("location", data.location.trim());
    if (data.parent_location) {
      formData.append("parent_location", data.parent_location.trim());
    }
    formData.append("description", data.description.trim());

    console.log("Fprm data", formData);
    if (clientDataAssignment?.id) {
      var config = {
        method: "PUT",
        url: URLConstants.updateLocation(clientDataAssignment.id),
        headers: {
          headers: { "content-type": "multipart/form-data" },
        },
        data: formData,
      };

      axios(config)
        .then((response) => {
          setLoaded(true);
          console.log("Response after submitting form", response);
          navigate("/location");
        })
        .catch((err) => {
          setLoaded(true);
          console.log(err);
        });
    } else {
      var config = {
        method: "POST",
        url: URLConstants.location(),
        headers: {
          headers: { "content-type": "multipart/form-data" },
        },
        data: formData,
      };

      axios(config)
        .then((response) => {
          setLoaded(true);
          console.log("Response after submitting form", response);
          navigate("/location");
        })
        .catch((err) => {
          setLoaded(true);
          console.log(err);
        });
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Add Location" subtitle="Add New Location" />
        <Button
          variant="contained"
          size="medium"
          style={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.neutral[600],
            fontWeight: "bold",
          }}
          onClick={() => navigate("/location")}
        >
          Go Back
        </Button>
      </FlexBetween>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Grid container spacing={2}>
          <Grid item lg={12}>
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <TextField
                  id="location"
                  label="Add Location"
                  variant="filled"
                  fullWidth
                  margin="normal"
                  size="small"
                  inputProps={{ style: { fontSize: 16 } }}
                  InputLabelProps={{ style: { fontSize: 16 } }}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item lg={12}>
            <Controller
              name="parent_location"
              control={control}
              render={({ field, value }) => (
                <TextField
                  select
                  id="parent_location"
                  label="Parent Location"
                  variant="filled"
                  fullWidth
                  margin="normal"
                  defaultValue={
                    clientDataAssignment?.parent_location
                      ? clientDataAssignment?.parent_location
                      : ""
                  }
                  {...field}
                >
                  {parentLocation.map((place, index) => (
                    <MenuItem key={index} value={place}>
                      {place}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid item lg={12}>
            <JoditEditor
              height={200}
              name="description"
              className="text-black"
              // config={{ theme: "dark" }}
              getSunEditorInstance={getSunEditorInstance}
              value={description}
              onChange={descriptionChangeHandler}
              setContents={description}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" component="label">
              Upload File
              <input type="file" {...register("image")} />
            </Button>
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
            Add Location
          </Button>
          <Button
            size="large"
            variant="contained"
            style={{
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.neutral[600],
              fontWeight: "bold",
            }}
            onClick={() => navigate("/location")}
          >
            Cancel
          </Button>
        </Stack>
      </form>
      <div className="spinner">
        <Loader
          loaded={loaded}
          lines={13}
          length={10}
          width={5}
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
    </Box>
  );
};

export default AddLocation;
