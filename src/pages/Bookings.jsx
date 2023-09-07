import React, { useState, useEffect, useContext } from "react";
import { Box, useTheme, Button, Tabs, Tab, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import FlexBetween from "../components/FlexBetween";
import { axiosInstance } from "../base/api/axios.util";
import { URLConstants } from "../base/api/url.constants";
import Loader from "react-loader";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import TableSearchBar from "../components/UI/TableSearchBar";
import { ClientContext } from "../base/contexts/UserContext";
import Helmet from "components/Helmet/Helmet";
import { useClient } from "../base/hooks/useClient";

function CustomTabPanel(props) {
  const client = useClient();
  const navigate = useNavigate();
  useEffect(() => {
    if (client?.client?.role == undefined) {
      navigate("/");
    } else {
      console.log("CLeint else condiiotn", client?.client?.role);
    }
  }, []);

  console.log("Client in bookings testing useCLient", client);

  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Bookings = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { client, setClient } = useContext(ClientContext);

  // values to be sent to the backend
  const [value, setValue] = React.useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [loaded, setLoaded] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [reloadPage, setReloadPage] = useState(false);

  // const { data, isLoading } = useGetTransactionsQuery({
  //   page,
  //   pageSize,
  //   sort: JSON.stringify(sort),
  //   search,
  // });
  useEffect(() => {
    console.log("Start", new Date());
    setLoaded(false);
    axiosInstance
      .get(URLConstants.bookings())
      .then((response) => {
        console.log("End", new Date());
        setLoaded(true);
        console.log("Response form bookings", response);
        setBookings(response);
      })
      .catch((err) => {
        setLoaded(true);
        console.log(err);
      });
  }, [reloadPage]);

  function deleteBooking(bookingId) {
    setLoaded(false);
    axiosInstance
      .delete(URLConstants.modifyBookings(bookingId))
      .then((response) => {
        setLoaded(true);
        console.log("Response form bookings", response);
        setReloadPage(!reloadPage);
      })
      .catch((err) => {
        setLoaded(true);
        console.log(err);
      });
  }

  //Tabs Handle Change
  const handleChange = (event, newValue) => {
    console.log("Value", value);
    setValue(newValue);
  };

  const renderDetailsButton = (params) => {
    let bookingInfo = bookings.filter((book) => (book.id = params.id));

    return (
      <Box sx={{ display: "flex", gap: "0.8rem" }}>
        {client.role == 0 ? (
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={(e) => deleteBooking(params.row.id)}
          >
            Delete
          </Button>
        ) : null}
        <Link to="/create-booking" state={{ booking: bookingInfo[0] }}>
          <Button variant="contained" color="secondary" size="small">
            Edit
          </Button>
        </Link>
      </Box>
    );
  };

  const columns = [
    { field: "id", headerName: "id" },
    { field: "booking_date", headerName: "Booking Date" },
    { field: "customerName", headerName: "Customer Name" },
    { field: "mobileNumber", headerName: "Mobile Number" },
    { field: "itemName", headerName: "Item Name" },
    { field: "category", headerName: "Category" },
    { field: "subCategory", headerName: "Sub Category" },
    { field: "totalSeat", headerName: "Total Seat" },
    { field: "totalamount", headerName: "Total Amount" },
    { field: "depositamount", headerName: "Deposit Amount" },
    { field: "pendingamount", headerName: "Pending Amount" },
    { field: "startDate", headerName: "Start Date" },
    { field: "endDate", headerName: "End Date" },
    { field: "meetingPoint", headerName: "Meeting Point" },
    { field: "destination", headerName: "Destination" },
    { field: "reportingTime", headerName: "Reporting Time" },
    { field: "paymentMode", headerName: "Payment Mode" },
    { field: "partialPaid", headerName: "Paying Full" },
    {
      field: "action",
      headerName: "Action",
      width: 175,
      renderCell: renderDetailsButton,
    },
  ];

  return (
    <Helmet title="Bookings">
      <Box m="1.5rem 2.5rem">
        <Header
          title="Bookings"
          buttonText="Create Booking"
          onClick={() => navigate("/create-booking")}
        />

        <Box>
          <Tabs value={value} selectionFollowsFocus onChange={handleChange}>
            <Tab
              label="Online Booking"
              {...a11yProps(0)}
              sx={{ boxShadow: "0px 3px 2px 0px rgba(0,0,0,0.4)" }}
            />
            <Tab
              label="Manual Booking"
              {...a11yProps(1)}
              sx={{ boxShadow: "0px 3px 2px 0px rgba(0,0,0,0.4)" }}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
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
              rows={bookings}
              columns={columns}
              density="compact"
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
              components={{ Toolbar: TableSearchBar }}
              componentsProps={{
                toolbar: {
                  title: "Online Booking",
                  searchInput,
                  setSearchInput,
                  setSearch,
                },
              }}
            />
          </Box>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
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
              rows={bookings}
              columns={columns}
              density="compact"
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
                toolbar: {
                  searchInput,
                  setSearchInput,
                  setSearch,
                },
              }}
            />
          </Box>
        </CustomTabPanel>

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

export default Bookings;
