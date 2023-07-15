import React, { useState, useEffect } from "react";
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
import Loader from "react-loader";
import { axiosInstance } from "../base/api/axios.util";
import { URLConstants } from "../base/api/url.constants";

const Products = () => {
  const theme = useTheme();
  const [reloadPage, setReloadPage] = useState(false);
  const [loaded, setLoaded] = useState(true);
  const [products, setProduct] = useState([]);
  useEffect(() => {
    setLoaded(false);
    axiosInstance
      .get(URLConstants.product())
      .then((res) => {
        console.log("Response", res);

        setProduct(res);
        setLoaded(true);
      })
      .catch((err) => {
        console.log("Error", err);
        setLoaded(true);
      });
  }, [reloadPage]);
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
        {products.map((item, index) => (
          <ProductCard
            title={item.title}
            featured_image={item.featured_image}
            category={item.category}
            city={item.city}
            price={item.price}
            disocunt_percent={item.discount_percent}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Products;
