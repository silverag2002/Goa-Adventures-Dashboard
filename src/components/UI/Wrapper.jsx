import { Box, useMediaQuery, useTheme } from "@mui/material";

const Wrapper = ({ sx = [], children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={[
        {
          padding: `${isMobile ? "2rem 0.5rem 0.5rem 0.5rem" : "1rem 1.5rem"}`,
        },
        // You cannot spread `sx` directly because `SxProps` (typeof sx) can be an array.
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
};

export default Wrapper;
