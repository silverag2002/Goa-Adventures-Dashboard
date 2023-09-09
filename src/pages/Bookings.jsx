import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  useTheme,
  Button,
  Tabs,
  Tab,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { axiosInstance } from "../base/api/axios.util";
import { URLConstants } from "../base/api/url.constants";
import Loader from "react-loader";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import TableSearchBar from "../components/UI/TableSearchBar";
import { ClientContext } from "../base/contexts/UserContext";
import Helmet from "components/Helmet/Helmet";
import { useClient } from "../base/hooks/useClient";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Wrapper from "components/UI/Wrapper";

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

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // values to be sent to the backend
  const [value, setValue] = React.useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [loaded, setLoaded] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [manualBookings, setManualBookings] = useState([]);
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
    axiosInstance
      .get(URLConstants.manualbookings())
      .then((response) => {
        console.log("End", new Date());
        setLoaded(true);
        console.log("Response form bookings", response);
        setManualBookings(response);
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
    let bookingInfo = manualBookings.filter((book) => (book.id = params.id));

    return (
      <Box sx={{ display: "flex", gap: "0.8rem" }}>
        {client.role == 0 ? (
          <IconButton aria-label="delete">
            <AiOutlineDelete
              onClick={(e) => deleteBooking(params.row.id)}
              color={theme.palette.warning.main}
            />
          </IconButton>
        ) : null}
        <IconButton sx={{ color: "red" }}>
          <Link to="/create-booking" state={{ booking: bookingInfo[0] }}>
            <AiOutlineEdit />
          </Link>
        </IconButton>
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
    // {
    //   field: "action",
    //   headerName: "Action",
    //   width: 175,
    //   renderCell: renderDetailsButton,
    // },
  ];

  const manualColumns = [
    { field: "id", headerName: "id", hide: true },
    {
      field: "booking_date",
      headerName: "Booking Date",
      hide: false,
    },
    {
      field: "customer_name",
      headerName: "Customer Name",
      hide: false,
      width: 150,
    },

    {
      field: "customer_mobile_number",
      headerName: "Mobile Number",
      hide: false,
    },
    {
      field: "product_name",
      headerName: "Item Name",
      hide: false,
      minWidth: 200,
    },
    { field: "category", headerName: "Category", hide: true },
    { field: "subcategory", headerName: "Sub Category", hide: false },
    { field: "total_seat", headerName: "Total Seat", hide: true },
    { field: "total_amount", headerName: "Total Amount", hide: false },
    { field: "deposit_amount", headerName: "Deposit Amount", hide: true },
    { field: "pendingamount", headerName: "Pending Amount", hide: true },
    { field: "start_date", headerName: "Start Date", hide: false },
    { field: "end_date", headerName: "End Date", hide: false },
    { field: "meeting_point", headerName: "Meeting Point", hide: true },
    { field: "destination_location", headerName: "Destination", hide: true },
    { field: "reporting_time", headerName: "Reporting Time", hide: true },
    { field: "payment_mode", headerName: "Payment Mode", hide: true },
    { field: "partial_full", headerName: "Paying Full", hide: true },
    {
      field: "action",
      headerName: "Action",
      width: 175,
      renderCell: renderDetailsButton,
    },
  ];

  return (
    <Helmet title="Bookings">
      <Wrapper>
        <Header
          title="Bookings"
          buttonText="Create Booking"
          onClick={() => navigate("/create-booking")}
        />

        <Box
          sx={{
            margin: "1rem 0",
            "& .MuiButtonBase-root.MuiTab-root.Mui-selected": {
              color: theme.palette.secondary.purple500,
              background: theme.palette.secondary.main,
            },
          }}
        >
          <Tabs
            value={value}
            selectionFollowsFocus
            onChange={handleChange}
            centered={isMobile ? true : false}
            variant={isMobile ? "fullWidth" : "standard"}
            TabIndicatorProps={{
              style: { background: theme.palette.secondary.purple500 },
            }}
          >
            <Tab
              label="Online Booking"
              {...a11yProps(0)}
              sx={{
                boxShadow: "0px 3px 2px 0px rgba(0,0,0,0.4)",
                fontWeight: "600",
                color: theme.palette.neutral.grey900,
                backgroundColor: theme.palette.neutral.grey200,
              }}
            />
            <Tab
              label="Manual Booking"
              {...a11yProps(1)}
              sx={{
                boxShadow: "0px 3px 2px 0px rgba(0,0,0,0.4)",
                fontWeight: "600",
                color: theme.palette.neutral.grey900,
                backgroundColor: theme.palette.neutral.grey200,
              }}
            />
          </Tabs>
        </Box>

        {value == 1 ? (
          //manual booking
          <>
            <CustomTabPanel value={value} index={0}>
              <Box
                height="80vh"
                sx={{
                  "& .MuiDataGrid-root": {
                    border: "none",
                  },
                  "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                    fontWeight: "bold",
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    color: theme.palette.neutral.grey700,
                    fontWeight: "bold",
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
                  rows={manualBookings}
                  columns={manualColumns}
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
                  rows={manualBookings}
                  columns={manualColumns}
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
          </>
        ) : (
          <>
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
                  initialState={columns}
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
          </>
        )}

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
      </Wrapper>
    </Helmet>
  );
};

export default Bookings;
