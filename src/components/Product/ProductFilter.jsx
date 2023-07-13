import React, { useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Typography,
} from "@mui/material";

const destination = ["Goa", "Himachal Pradesh", "Mumbai", "Delhi", "Keral"];

const categories = ["Tour", "Activity", "Sightseeing"];

const ProductFilter = () => {
  const [category, setCategory] = useState([]);

  console.log(category);
  const categoryChangeHandler = (event) => {
    const {
      target: { value },
    } = event;
    setCategory(typeof value === "string" ? value.split(",") : value);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <>
      <Box mt={5} sx={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
        <FormControl sx={{}} fullWidth>
          <InputLabel id="demo-multiple-checkbox-label">Category</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            variant="filled"
            multiple
            value={category}
            onChange={categoryChangeHandler}
            input={<OutlinedInput label="Category" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {categories.map((item) => (
              <MenuItem key={item} value={item}>
                <Checkbox checked={item.indexOf(item) > -1} />
                <ListItemText primary={item} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{}} fullWidth>
          <InputLabel id="demo-multiple-checkbox-label">
            Sub Category
          </InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            variant="filled"
            multiple
            value={category}
            onChange={categoryChangeHandler}
            input={<OutlinedInput label="Sub Category" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {categories.map((item) => (
              <MenuItem key={item} value={item}>
                <Checkbox checked={item.indexOf(item) > -1} />
                <ListItemText primary={item} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{}} fullWidth>
          <InputLabel id="demo-multiple-checkbox-label">Destination</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            variant="filled"
            multiple
            value={category}
            onChange={categoryChangeHandler}
            input={<OutlinedInput label="Destination" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {categories.map((item) => (
              <MenuItem key={item} value={item}>
                <Checkbox checked={item.indexOf(item) > -1} />
                <ListItemText primary={item} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default ProductFilter;
