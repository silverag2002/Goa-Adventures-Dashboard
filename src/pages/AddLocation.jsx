import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  useTheme,
  Grid,
  Stack,
  TextField,
  MenuItem,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import JoditEditor from "jodit-react";
import { useForm, Controller } from "react-hook-form";

const AddLocation = () => {
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const editor = useRef();

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
            name="parent"
            control={control}
            render={({ field, value }) => (
              <TextField
                select
                id="parent"
                label="Parent"
                variant="filled"
                fullWidth
                margin="normal"
                {...field}
              >
                <MenuItem>India</MenuItem>
                <MenuItem>Maldives</MenuItem>
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
            <input type="file" hidden />
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
    </Box>
  );
};

export default AddLocation;
