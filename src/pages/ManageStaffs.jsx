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
import { Link, useNavigate } from "react-router-dom";
import { useClient } from "../base/hooks/useClient";
import Helmet from "components/Helmet/Helmet";
import Wrapper from "components/UI/Wrapper";

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
  const [reloadPage, setReloadPage] = useState(false);

  const client = useClient();
  const navigate = useNavigate();
  useEffect(() => {
    if (client?.client?.role == undefined || client?.client?.role == 2) {
      navigate("/");
    }
  }, []);
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
  }, [reloadPage]);

  function deleteStaff(staffId) {
    setLoaded(false);
    axiosInstance
      .get(URLConstants.disableStaff(staffId))
      .then((response) => {
        setLoaded(true);
        console.log("Response form bookings", response);
        setReloadPage(!reloadPage);
      })
      .catch((err) => {
        setLoaded(true);
        console.log(err);
      });
    console.log("Customer Id selected", staffId);
  }

  const renderDetailsButton = (params) => {
    let staffInfo = staff.filter((book) => book.id == params.id);

    return (
      <Box sx={{ display: "flex", gap: "0.8rem" }}>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={(e) => deleteStaff(params.id)}
        >
          Delete
        </Button>

        <Link to="/add-staff" state={{ staff: staffInfo[0] }}>
          <Button variant="contained" color="secondary" size="small">
            Edit
          </Button>
        </Link>
      </Box>
    );
  };

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
    <Helmet title="Manage Staff">
      <Wrapper>
        <Header
          title="Staff"
          subtitle="Entire list of staff"
          buttonText="Create Staff"
          onClick={() => navigate("/add-staff")}
        />

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
              backgroundColor: theme.palette.background.default,
              color: theme.palette.neutral.grey700,
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.neutral.main,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.neutral.grey100,
              color: theme.palette.neutral.grey900,
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.neutral.grey900} !important`,
            },
            "& .MuiTablePagination-toolbar": {
              alignItems: "baseline",
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
            lines={20}
            length={15}
            width={5}
            radius={20}
            corners={1}
            rotate={0}
            direction={1}
            color={theme.palette.primary.main}
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
      </Wrapper>
    </Helmet>
  );
};

export default ManageStaffs;
