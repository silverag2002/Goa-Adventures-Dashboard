import React from "react";
import Header from "../components/Header";
import { Box, useTheme, Button, Grid, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { DataGrid } from "@mui/x-data-grid";

const Category = () => {
  const theme = useTheme();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();

  const renderDetailsButton = (params) => {
    return (
      <Box sx={{ display: "flex", gap: "0.8rem" }}>
        <Button variant="contained" color="secondary" size="small">
          Delete
        </Button>
        <Button variant="contained" color="secondary" size="small">
          Edit
        </Button>
      </Box>
    );
  };
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "category", headerName: "Category", fullWidth: true },
    { field: "image", headerName: "Image", width: 100 },
    {
      field: "action",
      headerName: "Action",
      width: 175,
      renderCell: renderDetailsButton,
    },
  ];

  const rows = [
    {
      id: 1,
      category: "Activity",
      image: "Image",
    },
    { id: 2, category: "Tour", image: "Image" },
    { id: 3, category: "Park Ticket", image: "Image" },
    { id: 4, category: "Cruise", image: "Image" },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Category" subtitle="Entire list of category" />
      <Box>
        <Grid container spacing={2} alignItems="center">
          <Grid item md={5} xs={12}>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <TextField
                  id="category"
                  label="Category"
                  variant="filled"
                  fullWidth
                  margin="normal"
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item md={5} xs={12}>
            <Controller
              name="category-image"
              control={control}
              render={({ field }) => (
                <TextField
                  id="category-image"
                  type="file"
                  variant="filled"
                  fullWidth
                  margin="normal"
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item md={2} xs={12}>
            <Button
              variant="contained"
              size="large"
              style={{
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.neutral[600],
                fontWeight: "bold",
              }}
              type="submit"
            >
              Add Category
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box mt="2.5rem" sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </Box>
    </Box>
  );
};

export default Category;
