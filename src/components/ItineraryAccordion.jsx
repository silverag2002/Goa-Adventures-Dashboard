import React from "react";
import { Box, Grid, TextField, IconButton } from "@mui/material";
import { DeleteOutlineOutlined } from "@mui/icons-material";

const ItineraryAccordion = ({ titleInput, descriptionInput }) => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid lg="12">
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <TextField label="Day" id="day" fullWidth variant="filled" />
            <IconButton aria-label="delete" size="small">
              <DeleteOutlineOutlined fontSize="inherit" />
              <DeleteOutlineOutlined fontSize="inherit" />
            </IconButton>
          </Box>
          <Box marginTop="0.7rem">
            <TextField
              label="Description"
              id="description"
              variant="filled"
              multiline
              fullWidth
              rows={7}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ItineraryAccordion;
