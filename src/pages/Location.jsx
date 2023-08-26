import React, { useState, useRef, useEffect } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
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
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Location" subtitle="Get a list of locations" />
        <Button
          variant="contained"
          size="medium"
          style={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.neutral[600],
            fontWeight: "bold",
          }}
          onClick={() => navigate("/add-location")}
        >
          Add Location
        </Button>
      </FlexBetween>

      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
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
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
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
