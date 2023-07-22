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
import { Link } from "react-router-dom";

const Customers = () => {
  const theme = useTheme();

  // values to be sent to the backend
  const [page, setPage] = useState(0);

  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [loaded, setLoaded] = useState(true);
  const [customer, setCustomer] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [reloadPage, setReloadPage] = useState(false);

  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });
  useEffect(() => {
    setLoaded(false);
    axiosInstance
      .get(URLConstants.customers())
      .then((response) => {
        setLoaded(true);
        console.log("Response form countries", response);
        setCustomer(response);
      })
      .catch((err) => {
        setLoaded(true);
        console.log(err);
      });
  }, []);

  function deleteCustomer(customerId) {
    setLoaded(false);
    axiosInstance
      .get(URLConstants.disableCustomer(customerId))
      .then((response) => {
        setLoaded(true);
        console.log("Response form bookings", response);
        setReloadPage(!reloadPage);
      })
      .catch((err) => {
        setLoaded(true);
        console.log(err);
      });
    console.log("Customer Id selected", customerId);
  }

  const renderDetailsButton = (params) => {
    let customerInfo = customer.filter((book) => book.id == params.id);

    return (
      <Box sx={{ display: "flex", gap: "0.8rem" }}>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={(e) => deleteCustomer(params.id)}
        >
          Delete
        </Button>
        <Link to="/add-customer" state={{ customer: customerInfo[0] }}>
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
      headerName: "Customer Name",
    },
    {
      field: "mobile_number",
      headerName: "Mobile Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Booking Email",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 0.5,
    },
    {
      field: "state",
      headerName: "State",
      flex: 1,
    },
    {
      field: "country",
      headerName: "Country",
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
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Customer" subtitle="Entire list of customers" />
        <Button
          variant="contained"
          size="large"
          style={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.neutral[600],
            fontWeight: "bold",
          }}
          href="/add-customer"
        >
          Create Customer
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
          rows={customer}
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

export default Customers;
