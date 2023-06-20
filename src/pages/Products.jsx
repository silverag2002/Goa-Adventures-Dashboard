import React from "react";
import Header from "components/Header";
import { Box, Button, useTheme, Pagination } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import ProductCard from "components/ProductCard";

const Products = () => {
  const theme = useTheme();
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Product" subtitle="Entire list of product" />
        <Button
          variant="contained"
          size="large"
          style={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.neutral[600],
            fontWeight: "bold",
          }}
          href="/add-product"
        >
          Add New
        </Button>
      </FlexBetween>
      <Box m="1.5rem 0">
        {Array.from(Array(4)).map((item, index) => (
          <Box sx={{ width: 1 }}>
            <ProductCard />
          </Box>
        ))}
        <Pagination count={10} />
      </Box>
    </Box>
  );
};

export default Products;
