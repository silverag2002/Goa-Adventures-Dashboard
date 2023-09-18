import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Modal = ({ isOpen, title, body, footer, actionLabel }) => {
  const theme = useTheme();
  return (
    <Dialog open={isOpen} aria-labelledby="Delete">
      <DialogTitle id="modal-title">{title}</DialogTitle>

      <DialogContent>{body}</DialogContent>
      <DialogActions>
        <Button>Cancel</Button>
        <Button autoFocus>{actionLabel}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
