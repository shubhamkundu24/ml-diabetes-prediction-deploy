import React, { useEffect, useState } from "react";
import axios from "axios";

function PatientsData() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/patients");
      setPatients(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredPatients = patients.filter(
    (p) => p.name && p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container full-width-container">
      <h1 className="title">📋 All Patients Data</h1>

      <input
        type="text"
        placeholder="Search by Name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <div className="table-wrapper">
        <table className="patients-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Pregnancies</th>
              <th>Glucose</th>
              <th>BloodPressure</th>
              <th>SkinThickness</th>
              <th>Insulin</th>
              <th>BMI</th>
              <th>DiabetesPedigreeFunction</th>
              <th>Age</th>
              <th>Prediction</th>
              <th>Probability</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((p, idx) => (
              <tr key={idx}>
                <td>{p.name}</td>
                <td>{p.features[0]}</td>
                <td>{p.features[1]}</td>
                <td>{p.features[2]}</td>
                <td>{p.features[3]}</td>
                <td>{p.features[4]}</td>
                <td>{p.features[5]}</td>
                <td>{p.features[6]}</td>
                <td>{p.features[7]}</td>
                <td>{p.prediction === 1 ? "⚠️ High Risk" : "✅ Low Risk"}</td>
                <td>{p.probability}</td>
                <td>{p.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientsData;
