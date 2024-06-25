import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import CustomerList from "./components/CustomerList";

function App() {
  return (
    <Router>
      <div>
        <h1>Customer Management System</h1>
        <Routes>
          <Route path="/" element={<CustomerList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
