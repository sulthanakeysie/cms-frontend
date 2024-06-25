import { Box } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import CustomerList from "./components/Customer/CustomerList";

function App() {
  return (
    <Router>
      <div>
        <Box padding={'12px 24px'} display='flex'  justifyContent={'space-between'}>
        <h1>Customer Management System</h1>
        {/* <Button variant="text" color="primary" sx={{textTransform:'none', fontWeight:500, fontSize:'18px'}} onClick={}>Logout</Button> */}
        </Box>
        <Routes>
          <Route path="/" element={<CustomerList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
