import React, { useState, useEffect } from "react";
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import FlexBetween from "../components/FlexBetween";
import { axiosInstance } from "../base/api/axios.util";
import { URLConstants } from "../base/api/url.constants";
import Loader from "react-loader";

const ManageStaffs = () => {
  const theme = useTheme();

  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [loaded, setLoaded] = useState(true);
  const [staff, setStaff] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });
  useEffect(() => {
    setLoaded(false);
    axiosInstance
      .get(URLConstants.staff())
      .then((response) => {
        setLoaded(true);
        console.log("Response form staff", response);
        setStaff(response);
      })
      .catch((err) => {
        setLoaded(true);
        console.log(err);
      });
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "id",
    },
    {
      field: "name",
      headerName: "Staff Name",
    },
    {
      field: "mobile_number",
      headerName: "Mobile Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: " Email",
      flex: 1,
    },
    {
      field: "active",
      headerName: "Active",
      flex: 0.5,
    },
    {
      field: "aadhar_number",
      headerName: "Aadhar Number",
      flex: 1,
    },

    {
      field: "profile_image",
      headerName: "Profile Image",
      flex: 1,
      renderCell: (params) => (
        <a href={params.row.profile_image} target="_blank">
          Image
        </a>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      date: "Jan 2023",
      itemName: "Scuba Diving",
      startDate: "15th Jan",
      depositeAmount: "25%",
      totalAmount: "2500",
      booking_status: "Complete",
      invoice: "Download",
    },
    {
      id: 2,
      date: "Jan 2023",
      itemName: "Scuba Diving",
      startDate: "15th Jan",
      depositeAmount: "25%",
      totalAmount: "2500",
      booking_status: "Complete",
      invoice: "Download",
    },
    {
      id: 3,
      date: "Jan 2023",
      itemName: "Scuba Diving",
      startDate: "15th Jan",
      depositeAmount: "25%",
      totalAmount: "2500",
      booking_status: "Complete",
      invoice: "Download",
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Staff" subtitle="Entire list of staff" />
        <Button
          variant="contained"
          size="large"
          style={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.neutral[600],
            fontWeight: "bold",
          }}
          href="/add-staff"
        >
          Create Staff
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
          rows={staff}
          columns={columns}
          rowCount={(data && data.total) || 0}
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

export default ManageStaffs;
