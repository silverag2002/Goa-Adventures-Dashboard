import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const DeleteModal = ({ isOpen }) => {
  const [openModal, setIsOpenModal] = useState(isOpen);
  const theme = useTheme();
  if (!isOpen) {
    return null;
  }
  return (
    <Dialog open={openModal} aria-labelledby="Delete" fullWidth>
      <DialogContent>
        <Typography variant="h5" fontSize={20}>
          Are you sure to delete booking?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button>No</Button>
        <Button
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: "#fff",
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
