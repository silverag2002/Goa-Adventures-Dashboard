import React from "react";
import {
  Box,
  useTheme,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

const ProductCard = () => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        display: "flex",
        width: "100%",
        backgroundColor: "white",
        margin: "10px",
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 250 }}
        image="https://goaadventure.in/wp-content/uploads/2020/12/Scuba-Diving-Malvan-300x300.jpg"
        alt="Live from space album cover"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "red",
          width: "100%",
        }}
      >
        <CardContent sx={{ flex: "1" }}>
          <Typography variant="h5">Scuba Diving Grand Island</Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Mac Miller
          </Typography>
          <Box>
            <span></span>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default ProductCard;
