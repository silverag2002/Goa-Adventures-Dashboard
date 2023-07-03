import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import {
  Box,
  useTheme,
  Button,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "react-loader";
import { axiosInstance } from "../base/api/axios.util";
import { URLConstants } from "../base/api/url.constants";
import axios, * as others from "axios";
var FormData = require("form-data");

const SubCategory = () => {
  const theme = useTheme();
  const [loaded, setLoaded] = useState(true);
  const [reloadPage, setReloadPage] = useState(false);
  const [rows, setRows] = useState([]);
  const [categories, setCategories] = useState([]);
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();
  const onError = (errors) => console.log(errors);

  // const category = [
  //   "Activity",
  //   "Tour",
  //   "Drama Show",
  //   "DJ Night",
  //   "Dinner Cruise",
  //   "Park Ticket",
  // ];

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
  // const columns = [
  //   { field: "id", headerName: "ID", width: 100 },
  //   { field: "category", headerName: "Category", fullWidth: true },
  //   { field: "subcategory", headerName: "Sub Category", width: 100 },
  //   { field: "image", headerName: "Image", width: 100 },
  //   {
  //     field: "action",
  //     headerName: "Action",
  //     width: 175,
  //     renderCell: renderDetailsButton,
  //   },
  // ];

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "category", headerName: "Category", fullWidth: true },
    { field: "subcategory", headerName: "Sub Category", fullWidth: true },
    {
      field: "subcategory_image",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <a href={params.row.subcategory_image} target="_blank">
          Image
        </a>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 175,
      renderCell: renderDetailsButton,
    },
  ];

  // const rows = [
  //   {
  //     id: 1,
  //     category: "Activity",
  //     image: "Image",
  //   },
  //   { id: 2, category: "Tour", image: "Image" },
  //   { id: 3, category: "Park Ticket", image: "Image" },
  //   { id: 4, category: "Cruise", image: "Image" },
  // ];

  useEffect(() => {
    setLoaded(false);
    axiosInstance
      .get(URLConstants.subcategories())
      .then((res) => {
        console.log("Response", res);
        setRows(res);
        setLoaded(true);
      })
      .catch((err) => {
        console.log("Error", err);
        setLoaded(true);
      });
  }, [reloadPage]);

  const onSubmit = (data) => {
    //reset({});
    // setClientType(undefined);
    setLoaded(false);

    console.log("Data captured", data);

    var formData = new FormData();
    if (data.subCategoryImage[0]?.size) {
      formData.append("subCategoryImage", data.subCategoryImage[0]);
    }
    formData.append("category", data.category.trim());
    formData.append("subcategory", data.subcategory.trim());

    var config = {
      method: "POST",
      url: URLConstants.subcategories(),
      headers: {
        headers: { "content-type": "multipart/form-data" },
      },
      data: formData,
    };

    axios(config)
      .then((response) => {
        try {
          console.log("Response", response);
          setLoaded(true);

          setReloadPage(!reloadPage);
        } catch (error) {
          console.error(error);
        }
      })
      .catch((err) => {
        setLoaded(true);
        console.log("Err", err);
        // reject(errorMsg);
      });
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Category" subtitle="Entire list of category" />
      <Box>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <Grid container spacing={2} alignItems="center">
            <Grid item md={3} xs={12}>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
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
            </Grid>
            <Grid item md={3} xs={12}>
              <Controller
                name="subcategory"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="sub-category"
                    label="Sub Category"
                    variant="filled"
                    fullWidth
                    margin="normal"
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <input
                type="file"
                placeholder="Image URL"
                {...register("subCategoryImage", { required: true })}
              />
            </Grid>
            <Grid item md={3} xs={12}>
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
        </form>
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
    </Box>
  );
};

export default SubCategory;
