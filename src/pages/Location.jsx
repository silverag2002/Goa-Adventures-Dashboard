import React, { useState, useRef, useEffect } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import { useForm, Controller } from "react-hook-form";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import Loader from "react-loader";
import { axiosInstance } from "../base/api/axios.util";
import { URLConstants } from "../base/api/url.constants";

const Location = () => {
  const theme = useTheme();
  const [reloadPage, setReloadPage] = useState(false);
  const [loaded, setLoaded] = useState(true);
  const [location, setLocation] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    setLoaded(false);
    axiosInstance
      .get(URLConstants.location())
      .then((res) => {
        console.log("Response", res);

        setLocation(res);
        setLoaded(true);
      })
      .catch((err) => {
        console.log("Error", err);
        setLoaded(true);
      });
  }, [reloadPage]);

  const renderDetailsButton = (params) => {
    let bookingInfo = location.filter((book) => book.id == params.id);

    return (
      <Box sx={{ display: "flex", gap: "0.8rem" }}>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          // onClick={(e) => deleteLocation(params.row.id)}
        >
          Delete
        </Button>
        <Link to="/add-location" state={{ location: bookingInfo[0] }}>
          <Button variant="contained" color="secondary" size="small">
            Edit
          </Button>
        </Link>
      </Box>
    );
  };

  // function deleteLocation(bookingId) {
  //   setLoaded(false);
  //   axiosInstance
  //     .delete(URLConstants.modifyBookings(bookingId))
  //     .then((response) => {
  //       setLoaded(true);
  //       console.log("Response form bookings", response);
  //       setReloadPage(!reloadPage);
  //     })
  //     .catch((err) => {
  //       setLoaded(true);
  //       console.log(err);
  //     });
  // }

  const columns = [
    {
      field: "id",
      headerName: "id",
    },
    {
      field: "parent_location",
      headerName: "Parent Location",
    },
    {
      field: "location",
      headerName: "Location",
    },
    {
      field: "action",
      headerName: "Action",
      width: 175,
      renderCell: renderDetailsButton,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Location"
        subtitle="Entire list of locations"
        buttonText="Add Location"
        onClick={() => navigate("/add-location")}
      />

      <Box height="80vh" sx={{ width: "100%" }}>
        <DataGrid
          getRowId={(rows) => rows.id}
          rows={location}
          columns={columns}
          // rowCount={(data && data.total) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          disableRowSelectionOnClick
          // sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          // onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          checkboxSelection
          // components={{ Toolbar: DataGridCustomToolbar }}
          // componentsProps={{
          //   toolbar: { searchInput, setSearchInput, setSearch },
          // }}
        />
      </Box>
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

export default Location;
