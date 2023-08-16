import React, { useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const InstantQuotation = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const theme = useTheme();
  const navigate = useNavigate();

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
      <FlexBetween>
        <Header title="Instant Quotation" subtitle="" />
        <Button
          size="large"
          variant="contained"
          onClick={() => navigate("/create-quotation")}
          style={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.neutral[600],
            fontWeight: "bold",
          }}
        >
          Add New
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
