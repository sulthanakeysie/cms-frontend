import axios from "axios";

export const getAllCustomers = async () =>
  await axios.get(`${process.env.REACT_APP_API}/customers`);

export const getCustomerDetails = async (id) =>
  await axios.get(`${process.env.REACT_APP_API}/customers/${id}`);

export const addCustomer = async (data) =>
  await axios.post(`${process.env.REACT_APP_API}/customers`, data);

export const editCustomer = async (data, id) =>
  await axios.put(`${process.env.REACT_APP_API}/customers/${id}`, data);

export const deleteCustomer = async (id) =>
  await axios.delete(`${process.env.REACT_APP_API}/customers/${id}`);
