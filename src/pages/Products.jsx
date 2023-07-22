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
            product={item}
            key={item.id}
            setLoaded={setLoaded}
            setReloadPage={setReloadPage}
          />
        ))}
      </Box>
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
    </Box>
  );
};

export default Products;
