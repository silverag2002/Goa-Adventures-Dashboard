import React from "react";
import { Box, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import { useForm, Controller } from "react-hook-form";

const Location = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Location" subtitle="Get a list of locations" />
        <Button
          variant="contained"
          size="medium"
          style={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.neutral[600],
            fontWeight: "bold",
          }}
          onClick={() => navigate("/add-location")}
        >
          Add Location
        </Button>
      </FlexBetween>
    </Box>
  );
};

export default Location;
