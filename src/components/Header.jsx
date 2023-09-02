import React from "react";
import { Typography, useTheme, Button } from "@mui/material";
import Heading from "./Heading";
import FlexBetween from "./FlexBetween";

const Header = ({ title, subtitle, buttonText, onClick, icon }) => {
  const theme = useTheme();
  return (
    <FlexBetween>
      <Heading title={title} subtitle={subtitle} />
      {buttonText && (
        <Button
          size="large"
          variant="contained"
          onClick={onClick}
          style={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.neutral.white,
            fontWeight: "bold",
          }}
        >
          {icon}
          {buttonText}
        </Button>
      )}
    </FlexBetween>
  );
};

export default Header;
