import React from "react";
import Header from "components/Header";
import { Box, Button, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

const CreateProduct = () => {
  const theme = useTheme();
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Edit Product" subtitle="Entire list of product" />
      </FlexBetween>
    </Box>
  );
};

export default CreateProduct;
