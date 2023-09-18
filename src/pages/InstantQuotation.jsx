import React, { useState, useRef, useEffect } from "react";
import { Box, useTheme, Button, ButtonGroup } from "@mui/material";
import Header from "components/Header";
import { useNavigate, Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import Helmet from "components/Helmet/Helmet";
import { useClient } from "../base/hooks/useClient";
import Wrapper from "components/UI/Wrapper";
import { axiosInstance } from "../base/api/axios.util";
import { URLConstants } from "../base/api/url.constants";
import Loader from "react-loader";
import moment from "moment";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsDownload } from "react-icons/bs";

const InstantQuotation = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [loaded, setLoaded] = useState(true);
  const [quotation, setQuotation] = useState([]);

  const theme = useTheme();
  const client = useClient();
  const navigate = useNavigate();

  useEffect(() => {
    if (client?.client?.role == undefined || client?.client?.role == 2) {
      navigate("/");
    } else {
      setLoaded(false);
      axiosInstance
        .get(URLConstants.quotation())
        .then((response) => {
          setLoaded(true);
          console.log("Response form setQuotation", response);
          setQuotation(response);
        })
        .catch((err) => {
          setLoaded(true);
          console.log(err);
        });
    }
  }, []);

  console.log("Quotation", quotation);

  const renderDetailsButton = (params) => {
    let quotationInfo = columns.filter((item) => item.id == params.row.id);
    console.log(params);

    return (
      <Box sx={{ display: "flex", gap: "0.8rem" }}>
        <Link to="/create-quotation" state={{ quotation: quotationInfo[0] }}>
          <Button
            size="small"
            variant="contained"
            sx={{ backgroundColor: "#4caf50" }}
          >
            <AiOutlineEdit />

            <AiOutlineEdit fontSize="20" />
          </Button>
        </Link>
        <Button
          size="small"
          variant="contained"
          sx={{ backgroundColor: "#f50057" }}
        >
          <AiOutlineDelete fontSize="20" />
        </Button>
        <Button
          size="small"
          variant="contained"
          sx={{ backgroundColor: "#ff9800" }}
        >
          <BsDownload fontSize="20" />
        </Button>
      </Box>
    );
  };

  const columns = [
    { field: "id", headerName: "ID", hide: true },
    {
      field: "createdAt",
      headerName: "Date",
      hide: false,
      renderCell: (params) => moment(params.row.createdAt).format("DD-MM-yyy"),
    },

    { field: "name", headerName: "Customer Name", hide: false, width: 175 },
    {
      field: "mobile_number",
      headerName: "Mobile No",
      hide: false,
      width: 120,
    },
    { field: "email", headerName: "Email ID", hide: true, width: 175 },
    { field: "title", headerName: "Quotation Title", hide: false, width: 175 },
    { field: "hotel_name", headerName: "Hotel Name", hide: false, width: 150 },
    {
      field: "check_in",
      headerName: "Check In",
      hide: false,
      renderCell: (params) => moment(params.row.check_in).format("DD-MM-yyy"),
    },
    {
      field: "check_out",
      headerName: "Check Out",
      hide: true,
      renderCell: (params) => moment(params.row.check_out).format("DD-MM-yyy"),
    },
    { field: "adult", headerName: "Adults", hide: false },
    { field: "adult_price", headerName: "Adults Price", hide: true },
    { field: "child", headerName: "Child", hide: true },
    { field: "child_price", headerName: "Child Price", hide: true },
    { field: "rooms", headerName: "Rooms", hide: false },
    { field: "total_amount", headerName: "Total Amount", hide: false },
    {
      field: "updatedAt",
      headerName: "Updated",
      hide: true,
      renderCell: (params) => moment(params.row.updatedAt).format("DD-MM-yyy"),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: renderDetailsButton,
    },
  ];

  return (
    <Helmet title="Instant Quotation">
      <Wrapper>
        <Header
          title="Instant Quotation"
          subtitle="Create online quotation"
          buttonText="Add New"
          onClick={() => navigate("/create-quotation")}
        />
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
            rows={quotation}
            columns={columns}
            // rowCount={(data && data.total) || 0}
            rowsPerPageOptions={[20, 50, 100]}
            pagination
            page={page}
            pageSize={pageSize}
            density="compact"
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
      </Wrapper>
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
    </Helmet>
  );
};

export default InstantQuotation;
