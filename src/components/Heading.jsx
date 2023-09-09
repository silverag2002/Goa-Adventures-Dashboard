import React from "react";
import { Typography, Box, useTheme, useMediaQuery } from "@mui/material";

const Heading = ({ title, subtitle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box>
      <Typography
        variant="h4"
        color={theme.palette.secondary[100]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      {!isMobile && (
        <Typography variant="h5" color={theme.palette.secondary[300]}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default Heading;
