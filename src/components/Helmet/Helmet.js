import React from "react";
import { Box } from "@mui/material";

const Helmet = (props) => {
  document.title = props.title + " | Goa Adventure";
  return <Box>{props.children}</Box>;
};

export default Helmet;
