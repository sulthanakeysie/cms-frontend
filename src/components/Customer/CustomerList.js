import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";

import CustomerFormDialog from "./CustomerFormDialog";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import { getAllCustomers } from "../../services/customer.service";
import LoginDialog from "../Login/LoginDialog";
import { toast } from "react-toastify";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [loginOpen, setLoginOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(null);

  useEffect(() => {
    try {
      getAllCustomers()
        .then((res) => {
          setCustomers(res.data?.data);
        })
        .catch((err) =>
          toast.error(
            err?.response?.data?.message || "Something went wrong. Try again"
          )
        );
    } catch (error) {
      toast.error("Something went wrong. Try again");
    }
  }, [isLoggedIn]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setLoginOpen(false);
  };

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setSelectedCustomer(null);
    setOpenForm(false);
  };

  const addNewCustomer = (newCustomer) => {
    setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
  };
  const updateCustomer = (updatedCustomer) => {
    let customerList = customers;
    let customertoUpdateIndex = customerList.findIndex(
      (item) => item._id === updatedCustomer._id
    );
    customerList[customertoUpdateIndex] = updatedCustomer;
    setCustomers(customerList);
  };
  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
    handleOpenForm();
  };

  const handleDeleteClick = (customer) => {
    setSelectedCustomer(customer);
    setOpenConfirmDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setSelectedCustomer(null);
    setOpenConfirmDeleteDialog(false);
  };

  const removeCustomer = (deletedCustomer) => {
    let customerList = customers;
    let customertoDeleteIndex = customerList.findIndex(
      (item) => item._id === deletedCustomer._id
    );
    customerList.splice(customertoDeleteIndex, 1);
    setCustomers(customerList);
  };

  return (
    <Box padding={"2rem 3rem"} className={loginOpen ? "blur-content" : ""}>
      <LoginDialog open={loginOpen} onLoginSuccess={handleLoginSuccess} />
      <CustomerFormDialog
        open={openForm}
        onClose={handleCloseForm}
        addNewCustomer={addNewCustomer}
        updateCustomer={updateCustomer}
        selectedCustomer={selectedCustomer}
      />
      <ConfirmDeleteDialog
        open={openConfirmDeleteDialog}
        onClose={handleCloseDeleteDialog}
        selectedCustomer={selectedCustomer}
        removeCustomer={removeCustomer}
      />
      <Typography variant="h4" gutterBottom fontWeight={500}>
        Customers
      </Typography>

      <Grid container spacing={2} style={{ marginTop: 20 }}>
        {customers.map((customer) => (
          <Grid item xs={12} sm={6} md={3} key={customer._id}>
            <Card sx={{ height: "200px", borderRadius: "10px" }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {customer.name}
                </Typography>
                <Typography color="textSecondary">
                  Email: {customer.email}
                </Typography>
                <Typography color="textSecondary">
                  Phone: {customer.phone}
                </Typography>
                <Typography color="textSecondary">
                  Address: {customer.address}
                </Typography>
                <Box
                  display={"flex"}
                  width="100%"
                  justifyContent={"space-between"}
                >
                  <Button
                    variant="text"
                    color="primary"
                    style={{
                      marginTop: 10,
                      textTransform: "none",
                      fontWeight: "600",
                    }}
                    onClick={() => handleCustomerClick(customer)}
                  >
                    View
                  </Button>
                  <Button
                    variant="text"
                    color="error"
                    style={{
                      marginTop: 10,
                      textTransform: "none",
                      fontWeight: "600",
                    }}
                    onClick={() => handleDeleteClick(customer)}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: "200px", borderRadius: "10px" }}>
            <CardContent
              sx={{
                height: "90%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                textDecoration: "none",
                cursor: "pointer",
              }}
              onClick={handleOpenForm}
            >
              <PersonAddAlt1OutlinedIcon />
              <Typography color={"textSecondary"} sx={{ marginTop: "8px" }}>
                Add Customer
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerList;
