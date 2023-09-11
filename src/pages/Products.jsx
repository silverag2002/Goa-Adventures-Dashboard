import React, { useState, useEffect } from "react";
import Header from "components/Header";
import { Box, useTheme, Grid } from "@mui/material";
import ProductCard from "components/ProductCard";
import { useNavigate } from "react-router-dom";
import ProductFilter from "components/Product/ProductFilter";
import Loader from "react-loader";
import { axiosInstance } from "../base/api/axios.util";
import { URLConstants } from "../base/api/url.constants";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useClient } from "../base/hooks/useClient";
import Helmet from "components/Helmet/Helmet";
import Wrapper from "components/UI/Wrapper";

const Products = () => {
  const theme = useTheme();
  const [reloadPage, setReloadPage] = useState(false);
  const [loaded, setLoaded] = useState(true);
  const [products, setProduct] = useState([]);
  const navigate = useNavigate();
  const client = useClient();

  useEffect(() => {
    if (client?.client?.role == undefined) {
      navigate("/");
    }
  }, []);

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
    <Helmet title="Products">
      <Wrapper>
        <Header
          title="All Products"
          subtitle="Entire list of products"
          buttonText="Add Product"
          onClick={() => navigate("/add-product")}
        />

        <ProductFilter />
        {/* List of Card Start */}
        <Grid
          container
          spacing={2}
          rowSpacing={4}
          width="100%"
          marginTop="40px"
        >
          {products.map((item, index) => (
            <Grid item xs={12} sm={6} md={3}>
              <ProductCard
                product={item}
                key={item.id}
                setLoaded={setLoaded}
                setReloadPage={setReloadPage}
              />
            </Grid>
          ))}
        </Grid>

        {/* List of Card End */}
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
      </Wrapper>
    </Helmet>
  );
};

export default Products;
