import React, { useState } from "react";
import KitesurfingIcon from "@mui/icons-material/Kitesurfing";
import TourIcon from "@mui/icons-material/Tour";
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
  ButtonGroup,
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
        maxHeight: "375px",
        height: "100%",
        backgroundColor: theme.palette.background.default,
        boxShadow: 3,
        borderRadius: "7%",
      }}
    >
      <CardMedia
        sx={{ height: 175 }}
        image={product.featured_image}
        title="green iguana"
      />
      <CardContent sx={{ padding: "6px" }}>
        <Typography gutterBottom variant="h5" fontSize={14} fontWeight={500}>
          {product.title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "4px",
            alignItems: "start",
            justifyContent: "space-between",
            paddingTop: "0.5rem",
          }}
        >
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontWeight: "500", fontSize: "0.9rem" }}
          >
            <FmdGoodOutlined />
            {product.city}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontWeight: "500", fontSize: "0.9rem" }}
          >
            {product.category === "Activity" ? (
              <KitesurfingIcon />
            ) : (
              <TourIcon />
            )}

            {product.category}
          </Typography>
        </Box>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "4px",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "1.2rem",
          }}
        >
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}
          >
            <CurrencyRupee />
            {((100 - Number(product.discount_percent)) *
              Number(product.price)) /
              100}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              display: "flex",
              textDecoration: "line-through",
              fontSize: "0.9rem",
              fontWeight: "500",
              color: theme.palette.grey[500],
            }}
          >
            {product.price}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "6px",
          }}
        >
          {console.log("Proudct info in card", product)}

          <IconButton
            aria-label="edit"
            sx={{
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.neutral.main,
              fontSize: "inherit",
              ":hover": {
                bgcolor: "white",
                color: theme.palette.neutral.main,
              },
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
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.neutral.main,
              ":hover": {
                bgcolor: "white",
                color: theme.palette.neutral.main,
              },
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
