import React from "react";
import Header from "components/Header";
import {
  Box,
  Button,
  useTheme,
  TextField,
  MenuItem,
  Pagination,
  Grid,
  Container,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import ProductCard from "components/ProductCard";
import { Link } from "react-router-dom";
import ProductFilter from "components/Product/ProductFilter";

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
      <ProductFilter />
      <Box
        mt="1.5rem"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "start",
          gap: "1rem",
          flexWrap: "wrap",
          width: "100%",
        }}
        spacing={4}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
          <ProductCard />
        ))}
      </Box>
    </Box>
  );
};

export default Products;
