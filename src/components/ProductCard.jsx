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
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Palette } from "@mui/icons-material";

const ProductCard = () => {
  const [visible, setVisible] = useState(true);

  const productStatusHandler = () => {
    setVisible(!visible);
  };
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
          width: "100%",
          backgroundColor: "gray",
        }}
      >
        <CardContent sx={{ flex: "1" }}>
          <Typography variant="h5">Scuba Diving Grand Island</Typography>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            ></Typography>
            <Button href="#" variant="outlined" size="medium">
              View Details
            </Button>
          </Box>
        </CardContent>
        <CardActions>
          <Stack
            direction={"column"}
            sx={{
              display: "flex",
              alignItems: "flex-end",
              flexDirection: "column",
              width: "100%",
            }}
          >
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
            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" variant="contained">
              <DeleteForeverIcon />
            </IconButton>
          </Stack>
        </CardActions>
      </Box>
    </Card>
  );
};

export default ProductCard;
