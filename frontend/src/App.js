import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import CheckDiabetes from "./CheckDiabetes";
import PatientsData from "./PatientsData";
import "./App.css";

function App() {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/check-diabetes">Check Diabetes</Link>
        <Link to="/patients">All Patients Data</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/check-diabetes" element={<CheckDiabetes />} />
        <Route path="/patients" element={<PatientsData />} />
      </Routes>
    </Router>
  );
}

export default App;
