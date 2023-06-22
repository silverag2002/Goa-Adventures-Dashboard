import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField, useTheme } from "@mui/material";
import JoditEditor from "jodit-react";

const BasicInformation = () => {
  const theme = useTheme();
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="title"
        rules={{ required: "This field is required" }}
        render={({ field }) => (
          <TextField
            id="title"
            label="Title"
            variant="outlined"
            placeholder="Enter Activity Or Tour Title"
            fullWidth
            margin="normal"
            {...field}
            error={Boolean(errors?.title)}
            helperText={errors.title?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="category"
        rules={{ required: "Required Field" }}
        render={({ field }) => <TextField select label="Category" />}
      />
    </>
  );
};

export default BasicInformation;
