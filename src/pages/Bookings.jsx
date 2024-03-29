import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  useTheme,
  Button,
  Tabs,
  Tab,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { axiosInstance } from "../base/api/axios.util";
import { URLConstants } from "../base/api/url.constants";
import Loader from "react-loader";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { ClientContext } from "../base/contexts/UserContext";
import Helmet from "components/Helmet/Helmet";
import { useClient } from "../base/hooks/useClient";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Wrapper from "components/UI/Wrapper";
import moment from "moment/moment";
import { BsDownload } from "react-icons/bs";

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
  const isTable = useMediaQuery(theme.breakpoints.down("md"));
  // values to be sent to the backend
  const [value, setValue] = React.useState(1);
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
      .delete(URLConstants.modifyManualBookings(bookingId))
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

  //Manual Booking Status
  const renderStatus = (params) => {
    switch (params.value) {
      case 1:
        return (
          <Button
            variant="Contained"
            sx={{
              backgroundColor: "green",
              color: theme.palette.neutral.white,
            }}
          >
            Confirmed
          </Button>
        );
      case 2:
        return (
          <Button
            variant="Contained"
            sx={{ backgroundColor: "red", color: theme.palette.neutral.white }}
          >
            Cancelled
          </Button>
        );
      case 3:
        return (
          <Button
            variant="Contained"
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.neutral.white,
            }}
          >
            Enquiry
          </Button>
        );
      case 4:
        return (
          <Button
            variant="Contained"
            sx={{
              backgroundColor: theme.palette.secondary.purple500,
              color: theme.palette.neutral.white,
            }}
          >
            Refund
          </Button>
        );
    }
  };

  const renderDetailsButton = (params) => {
    let bookingInfo = manualBookings.filter((book) => book.id == params.row.id);
    console.log("Booking fixed", params);

    return (
      <Box sx={{ display: "flex", gap: "0.5rem" }}>
        <Button
          size="small"
          variant="contained"
          sx={{ backgroundColor: theme.palette.secondary.main }}
        >
          <Link to="/create-booking" state={{ booking: bookingInfo[0] }}>
            <AiOutlineEdit
              fontSize="20"
              color={theme.palette.secondary.purple500}
            />
          </Link>
        </Button>
        <Link
          to={"#"}
          // download={params.row.invoice}
        >
          <Button
            size="small"
            variant="contained"
            sx={{ backgroundColor: theme.palette.secondary.main }}
          >
            <BsDownload
              fontSize="20"
              color={theme.palette.secondary.purple500}
            />
          </Button>
        </Link>
        {client.role == 0 ? (
          <Button
            aria-label="delete"
            size="small"
            variant="contained"
            sx={{ backgroundColor: theme.palette.secondary.main }}
          >
            <AiOutlineDelete
              onClick={(e) => {
                alert("Do you really want to delete?");
                deleteBooking(params.row.id);
              }}
              fontSize="20"
              color={theme.palette.secondary.purple500}
            />
          </Button>
        ) : null}
      </Box>
    );
  };

  const columns = [
    { field: "id", headerName: "id", hide: true },
    {
      field: "booking_date",
      headerName: "Booking Date",
      width: 130,
      renderCell: (params) =>
        moment(params.row.booking_date).format("DD-MM-yyyy"),
    },
    {
      field: "customer_name",
      headerName: "Customer Name",
      width: 160,
      resizable: true,
    },
    {
      field: "customer_mobile_number",
      headerName: "Mobile Number",
      width: 120,
    },
    { field: "product_title", headerName: "Item Name", width: 200 },
    { field: "category", headerName: "Category", hide: true },
    { field: "subcategory", headerName: "Sub Category", width: 150 },
    {
      field: "start_date",
      headerName: "Trip Date",
      width: 120,
      renderCell: (params) =>
        moment(params.row.start_date).format("DD-MM-yyyy"),
    },
    { field: "quantity", headerName: "Total Seat" },
    { field: "total_amount", headerName: "Total Amount" },
    { field: "deposit_amount", headerName: "Deposit Amount" },
    { field: "pending_amount", headerName: "Pending Amount" },

    { field: "meeting_point", headerName: "Meeting Point" },
    { field: "destination_location", headerName: "Destination", hide: true },
    { field: "reporting_time", headerName: "Reporting Time", hide: true },
    { field: "paymentMode", headerName: "Payment Mode", hide: true },
    { field: "partial_full", headerName: "Paying Full", hide: true },
    {
      field: "booking_status",
      headerName: "Booking Status",
      hide: true,
    },
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
      renderCell: (params) =>
        moment(params.row.booking_date).format("DD-MM-yyyy"),
    },
    {
      field: "staff_name",
      headerName: "Staff",
      width: 150,
      hide: false,
    },
    {
      field: "customer_name",
      headerName: "Customer Name",
      width: 175,
      hide: false,
    },

    {
      field: "customer_mobile_number",
      headerName: "Mobile No",
      width: 120,
      hide: false,
    },
    {
      field: "product_name",
      headerName: "Item Name",
      hide: false,
      minWidth: 200,
    },
    {
      field: "category",
      headerName: "Category",
      hide: true,
    },
    { field: "subcategory", headerName: "Sub Category", hide: true },
    { field: "total_seat", headerName: "Total Seat", hide: true },
    { field: "price_per_person", headerName: "Per Person ₹", hide: true },
    { field: "total_amount", headerName: "Total Amount", hide: true },
    { field: "deposit_amount", headerName: "Deposit Amount", hide: true },
    {
      field: "pending_amount",
      headerName: "Pending Amount",
      width: 120,
      hide: false,
    },

    {
      field: "start_date",
      headerName: "Start Date",
      width: 120,
      hide: false,
      type: "date",
      renderCell: (params) =>
        moment(params.row.start_date).format("DD-MM-yyyy"),
    },
    {
      field: "end_date",
      headerName: "End Date",
      width: 100,
      hide: true,
      renderCell: (params) => moment(params.row.end_date).format("DD-MM-yyyy"),
    },
    { field: "meeting_point", headerName: "Meeting Point", hide: true },
    { field: "destination_location", headerName: "Destination", hide: true },
    { field: "reporting_time", headerName: "Reporting Time", hide: true },
    { field: "payment_mode", headerName: "Payment Mode", hide: true },
    { field: "paying_full", headerName: "Paying Full", hide: true },
    { field: "hotel_name", headerName: "Hotel Name", hide: true },
    {
      field: "booking_status",
      headerName: "Booking Status",
      width: 150,
      renderCell: renderStatus,
      hide: false,
    },
    {
      field: "action",
      headerName: "Action",
      width: 225,
      renderCell: renderDetailsButton,
    },
  ];

  console.log("Online Booking", bookings);

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
                    borderBottom: `1px solid ${theme.palette.neutral.grey300}`,
                    fontSize: "0.9rem",
                    color: theme.palette.neutral.grey900,
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: theme.palette.primary.light,
                    color: theme.palette.neutral.grey900,
                    borderBottom: "none",
                    fontSize: "0.8rem",
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
                  initialState={{
                    sorting: {
                      sortModel: [{ field: "booking_date", sort: "desc" }],
                    },
                  }}
                  // rowCount={(data && data.total) || 0}
                  rowsPerPageOptions={[20, 50, 100]}
                  pagination
                  page={page}
                  pageSize={pageSize}
                  paginationMode="client"
                  sortingMode="client"
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
                    borderBottom: `1px solid ${theme.palette.neutral.grey300}`,
                    fontSize: "0.9rem",
                    color: theme.palette.neutral.grey900,
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: theme.palette.primary.light,
                    color: theme.palette.neutral.grey900,
                    borderBottom: "none",
                    fontSize: "0.8rem",
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
                  initialState={{
                    sorting: {
                      sortModel: [{ field: "booking_date", sort: "desc" }],
                    },
                  }}
                  pagination
                  page={page}
                  pageSize={pageSize}
                  paginationMode="client"
                  sortingMode="client"
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

export default Bookings;
