import React from "react";
import Header from "components/Header";
import { Box, Button, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";

const Products = () => {
  const theme = useTheme();
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Product" subtitle="Entire list of product" />
        <Button
          variant="contained"
          style={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.neutral[600],
          }}
        >
          Add New
        </Button>
      </FlexBetween>
    </Box>
  );
};

export default Products;
