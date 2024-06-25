import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";

import { deleteCustomer } from "../../services/customer.service";

const ConfirmDeleteDialog = ({
  open,
  onClose,
  selectedCustomer,
  removeCustomer,
}) => {
  const handleDeleteCustomer = () => {
    deleteCustomer(selectedCustomer?._id)
      .then((res) => removeCustomer(selectedCustomer))
      .catch((err) => console.log(err))
      .finally(() => {
        onClose();
      });
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography variant="h6">Delete {selectedCustomer?.name}</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography color={"textSecondary"}>
          Are you sure on deleting {selectedCustomer?.name}?.
          <br />
          This may cause permanent loss of customer data
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="text">
          Cancel
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={handleDeleteCustomer}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
