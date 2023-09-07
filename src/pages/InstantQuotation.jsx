import React, { useState, useRef, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { useClient } from "../base/hooks/useClient";

const InstantQuotation = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const theme = useTheme();
  const client = useClient();
  const navigate = useNavigate();
  useEffect(() => {
    if (client?.client?.role == undefined || client?.client?.role == 2) {
      navigate("/");
    }
  }, []);

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Customer Name" },
    { field: "mobileNumber", headerName: "Mobile No" },
    { field: "emailId", headerName: "Email ID" },
    { field: "title", headerName: "Quotation Title" },
    { field: "hotel", headerName: "Hotel Name" },
    { field: "adults", headerName: "Adults" },
    { field: "child", headerName: "Child" },
    { field: "rooms", headerName: "Rooms" },
  ];

  const rows = [
    {
      id: "1",
      customerName: "",
      mobileNumber: "",
      emailId: "",
      title: "",
      hote: "",
      adults: "",
      child: "",
      rooms: "",
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
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
          rows={rows}
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
    </Box>
  );
};

export default InstantQuotation;
