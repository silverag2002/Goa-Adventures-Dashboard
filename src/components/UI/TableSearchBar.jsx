import React from "react";
import { Search } from "@mui/icons-material";
import {
  IconButton,
  TextField,
  InputAdornment,
  Typography,
  useTheme,
} from "@mui/material";
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import FlexBetween from "components/FlexBetween";

const TableSearchBar = ({ title, searchInput, setSearchInput, setSearch }) => {
  const theme = useTheme();
  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <Typography
          variant="h4"
          sx={{
            fontSize: "1rem",
            fontWeight: "600",
            color: `${theme.palette.secondary.purple600}`,
          }}
        >
          {title}
        </Typography>
        <TextField
          label="Search..."
          sx={{ mb: "0.5rem", width: "15rem" }}
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          variant="standard"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setSearch(searchInput);
                    setSearchInput("");
                  }}
                >
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FlexBetween>
    </GridToolbarContainer>
  );
};

export default TableSearchBar;
