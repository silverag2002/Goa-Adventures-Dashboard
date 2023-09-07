import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Box, useTheme, Button, Grid, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "react-loader";
import { axiosInstance } from "../base/api/axios.util";
import { URLConstants } from "../base/api/url.constants";
import axios, * as others from "axios";
import { Link } from "react-router-dom";
import Helmet from "components/Helmet/Helmet";
import {
  DeleteOutlineOutlined,
  ModeEditOutlineOutlined,
} from "@mui/icons-material/";

var FormData = require("form-data");

const Category = () => {
  const client = useClient();
  const navigate = useNavigate();
  useEffect(() => {
    if (client?.client?.role == undefined || client?.client?.role == 2) {
      navigate("/");
    }
  }, []);
  const theme = useTheme();
  const [loaded, setLoaded] = useState(true);
  const [rows, setRows] = useState([]);
  const [reloadPage, setReloadPage] = useState(false);
  const [category, setCategory] = useState("");
  const [editInfo, setEditInfo] = useState(0);

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setLoaded(false);
    axiosInstance
      .get(URLConstants.categories())
      .then((res) => {
        console.log("Response for get category", res);
        setRows(res);
        setLoaded(true);
      })
      .catch((err) => {
        console.log("Error", err);
        setLoaded(true);
      });
  }, [reloadPage]);

  console.log(rows);

  function deleteCategory(bookingId) {
    setLoaded(false);
    axiosInstance
      .get(URLConstants.deactivateCategory(bookingId))
      .then((response) => {
        setLoaded(true);
        console.log("Response form category", response);
        setReloadPage(!reloadPage);
      })
      .catch((err) => {
        setLoaded(true);
        console.log(err);
      });
  }

  function handleEdit(categoryId) {
    console.log("Category id", categoryId);
    let categoryInfo = rows.filter((row) => row.id == categoryId);
    console.log("Category Info ", categoryInfo[0]);
    setCategory(categoryInfo[0].category);
    setEditInfo(categoryInfo[0].id);
  }

  const renderDetailsButton = (params) => {
    return (
      <Box sx={{ display: "flex", gap: "0.8rem" }}>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={(e) => deleteCategory(params.id)}
        >
          <DeleteOutlineOutlined />
        </Button>
        {/* <Link to="/add-category" state={{ category: categoryInfo[0] }}> */}
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => handleEdit(params.id)}
        >
          <ModeEditOutlineOutlined />
        </Button>
        {/* </Link> */}
      </Box>
    );
  };
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "category", headerName: "Category", fullWidth: true },
    {
      field: "category_image",
      headerName: "Image",
      fullWidth: true,
      renderCell: (params) => <img src={params.row.category_image} alt="" />,
    },
    {
      field: "activation_status",
      headerName: "Status",
      fullWidth: true,
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      fullWidth: true,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      fullWidth: true,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: renderDetailsButton,
    },
  ];

  const onSubmit = (data) => {
    //reset({});
    // setClientType(undefined);
    data.category = category;
    console.log("Data", data);
    setLoaded(false);
    console.log("Data captured", data.categoryImage[0]);

    var formData = new FormData();
    if (data.categoryImage[0]?.size) {
      formData.append("categoryImage", data.categoryImage[0]);
    }
    formData.append("category", data.category.trim());
    console.log("Check", editInfo);
    if (editInfo > 0) {
      var config = {
        method: "PUT",
        url: URLConstants.modifyCategory(editInfo),
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
            reset({});
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
    } else {
      var config = {
        method: "POST",
        url: URLConstants.categories(),
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
    }
  };

  const onError = (errors) => console.log(errors);

  return (
    <Helmet title="Category">
      <Box m="1.5rem 2.5rem">
        <Header title="Category" subtitle="Entire list of category" />
        <Box>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <Grid container spacing={2} alignItems="center">
              <Grid item md={5} xs={12}>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="category"
                      label="Category"
                      variant="outlined"
                      value={category}
                      fullWidth
                      margin="normal"
                      sx={{
                        backgroundColor: theme.palette.primary.light,
                      }}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  )}
                />
              </Grid>
              <Grid item md={5} xs={12}>
                <input
                  type="file"
                  placeholder="Image URL"
                  {...register("categoryImage")}
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
    </Helmet>
  );
};

export default Category;
