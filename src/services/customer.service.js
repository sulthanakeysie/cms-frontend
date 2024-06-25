import axios from "axios";

export const getAllCustomers = async () =>
  await axios.get(`${process.env.REACT_APP_API}/customers`, {
    headers: { Authorization: localStorage.getItem("access_token") },
  });

export const getCustomerDetails = async (id) =>
  await axios.get(`${process.env.REACT_APP_API}/customers/${id}`, {
    headers: { Authorization: localStorage.getItem("access_token") },
  });

export const addCustomer = async (data) =>
  await axios.post(`${process.env.REACT_APP_API}/customers`, data, {
    headers: { Authorization: localStorage.getItem("access_token") },
  });

export const editCustomer = async (data, id) =>
  await axios.put(`${process.env.REACT_APP_API}/customers/${id}`, data, {
    headers: { Authorization: localStorage.getItem("access_token") },
  });

export const deleteCustomer = async (id) =>
  await axios.delete(`${process.env.REACT_APP_API}/customers/${id}`, {
    headers: { Authorization: localStorage.getItem("access_token") },
  });
