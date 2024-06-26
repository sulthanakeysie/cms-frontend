import { Box } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import CustomerList from "./components/Customer/CustomerList";

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={true}
        draggable
        pauseOnHover
        theme="light"
      />
      <div>
        <Box
          padding={"12px 24px"}
          display="flex"
          justifyContent={"space-between"}
        >
          <h1>Customer Management System</h1>
        </Box>
        <Routes>
          <Route path="/" element={<CustomerList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
