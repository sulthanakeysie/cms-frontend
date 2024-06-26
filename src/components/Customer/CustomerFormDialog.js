import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import React, { useState, useEffect } from "react";

import { addCustomer, editCustomer } from "../../services/customer.service";
import { toast } from "react-toastify";

const CustomerFormDialog = ({
  open,
  onClose,
  updateCustomer,
  addNewCustomer,
  selectedCustomer,
}) => {
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (selectedCustomer) {
      setCustomer({
        name: selectedCustomer.name,
        email: selectedCustomer.email,
        phone: selectedCustomer.phone,
        address: selectedCustomer.address,
      });
    } else {
      setCustomer({
        name: "",
        email: "",
        phone: "",
        address: "",
      });
    }
  }, [selectedCustomer]);

  const initialValues = {
    name: customer.name || "",
    email: customer.email || "",
    phone: customer.phone || "",
    address: customer.address || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    address: Yup.string().required("Address is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    if (!selectedCustomer)
      addCustomer(values)
        .then((res) => {
          toast.success(res?.data?.message);
          addNewCustomer(res?.data?.data);
        })
        .catch((err) => {
          toast.error(
            err?.response?.data?.message || "Something went wrong. Try again"
          );
        })
        .finally(() => {
          setSubmitting(false);
          setCustomer();
          handleClose();
        });
    else
      editCustomer(values, selectedCustomer._id)
        .then((res) => {
          updateCustomer(res.data?.data);
        })
        .catch((err) => {
          toast.error(
            err?.response?.data?.message || "Something went wrong. Try again"
          );
        })
        .finally(() => {
          setSubmitting(false);
          setCustomer();
          handleClose();
        });
  };
  const handleClose = () => {
    setCustomer({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography variant="h6">
          {selectedCustomer ? "Edit Customer" : "Add Customer"}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, handleChange, values, touched, errors }) => (
            <Form>
              <TextField
                margin="dense"
                name="name"
                label="Name"
                fullWidth
                value={values.name}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
              <TextField
                margin="dense"
                name="email"
                label="Email"
                type="email"
                fullWidth
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                margin="dense"
                name="phone"
                label="Phone"
                fullWidth
                value={values.phone}
                onChange={handleChange}
                error={touched.phone && Boolean(errors.phone)}
                helperText={touched.phone && errors.phone}
              />
              <TextField
                margin="dense"
                name="address"
                label="Address"
                fullWidth
                value={values.address}
                onChange={handleChange}
                error={touched.address && Boolean(errors.address)}
                helperText={touched.address && errors.address}
              />
              <DialogActions>
                <Button
                  onClick={onClose}
                  color="primary"
                  sx={{ textTransform: "none" }}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  color="primary"
                  disabled={isSubmitting}
                  variant="contained"
                  sx={{ textTransform: "none" }}
                >
                  {selectedCustomer ? "Update" : "Add"} Customer
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerFormDialog;
