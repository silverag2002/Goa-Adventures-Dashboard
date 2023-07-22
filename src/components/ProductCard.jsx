import React, { useState } from "react";
import {
  Box,
  useTheme,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Stack,
  Button,
  IconButton,
  Container,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Palette } from "@mui/icons-material";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { Link } from "react-router-dom";
import {
  CurrencyRupee,
  FmdGoodOutlined,
  CategoryOutlined,
} from "@mui/icons-material";
import { axiosInstance } from "base/api/axios.util";

import { URLConstants } from "../base/api/url.constants";

const ProductCard = ({ product, setLoaded, setReloadPage }) => {
  const [visible, setVisible] = useState(true);
  const [finalProduct, setFinalProduct] = useState(product);
  console.log("PRoduct received", product);

  const productStatusHandler = () => {
    setVisible(!visible);
  };
  const theme = useTheme();
  console.log("PRoiduct", product);

  function deleteProduct(productId) {
    setLoaded(false);
    console.log("PRoduct id ", productId);
    axiosInstance
      .get(URLConstants.disableProduct(productId))
      .then((response) => {
        setLoaded(true);
        console.log("Response from products", response);
        setReloadPage((prev) => !prev);
      })
      .catch((err) => {
        setLoaded(true);
        console.log(err);
      });
  }
  return (
    <Card
      sx={{
        maxWidth: "320px",
        width: "100%",
        backgroundColor: theme.palette.background.alt,
        boxShadow: 3,
        borderRadius: "7%",
      }}
    >
      <CardMedia
        sx={{ height: 200 }}
        image={product.featured_image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" fontWeight={600}>
          {product.title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            alignItems: "start",
            justifyContent: "space-between",
            paddingTop: "0.8rem",
          }}
        >
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontWeight: "bold" }}
          >
            <FmdGoodOutlined />
            {product.city}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontWeight: "bold" }}
          >
            <CategoryOutlined />
            {product.category}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "4px",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              textDecoration: "line-through",
              fontSize: "1.1rem",
              fontWeight: "500",
              color: theme.palette.grey[500],
            }}
          >
            <CurrencyRupee fontSize="medium" />
            {product.price}
          </Typography>
          <Typography
            variant="h4"
            color="text.secondary"
            sx={{ fontWeight: "bold" }}
          >
            <CurrencyRupee />
            {((100 - Number(product.discount_percent)) *
              Number(product.price)) /
              100}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "0.6rem",
          }}
        >
          {console.log("Proudct info in card", product)}

          <IconButton
            aria-label="edit"
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.neutral.main,
            }}
            // onClick={() => editProduct(product.id)}
          >
            <Link to="/add-product" state={{ product: product }}>
              <EditIcon />
            </Link>
          </IconButton>

          <IconButton
            onClick={productStatusHandler}
            aria-label="visible"
            sx={{
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.neutral.main,
            }}
          >
            {visible === true ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
          <IconButton
            aria-label="delete"
            variant="contained"
            sx={{
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.neutral.main,
              ":hover": {
                bgcolor: "white",
                color: theme.palette.neutral.main,
              },
            }}
            onClick={() => deleteProduct(product.id)}
          >
            <DeleteForeverIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
