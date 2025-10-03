import React, { useState } from "react";
import axios from "axios";

function CheckDiabetes() {
  const [formData, setFormData] = useState({
    name: "",
    Pregnancies: "",
    Glucose: "",
    BloodPressure: "",
    SkinThickness: "",
    Insulin: "",
    BMI: "",
    DiabetesPedigreeFunction: "",
    Age: ""
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const features = Object.values(formData)
        .filter((_, i) => i !== 0) // exclude 'name' field
        .map(Number);

      const res = await axios.post("http://127.0.0.1:5000/predict", {
        name: formData.name,
        features: features
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1 className="title">🩺 Check Diabetes</h1>
      <form className="form" onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div className="form-group" key={key}>
            <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
            <input
              type={key === "name" ? "text" : "number"}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              placeholder={`Enter ${key.charAt(0).toUpperCase() + key.slice(1)}`}
              required
            />
          </div>
        ))}
        <button type="submit" className="btn">Predict</button>
      </form>

      {result && (
        <div className="result-card">
          <h2>Result</h2>
          <p><strong>Prediction:</strong> {result.prediction === 1 ? "⚠️ High Risk (Diabetic)" : "✅ Low Risk (Non-Diabetic)"}</p>
          <p><strong>Probability:</strong> {result.probability}</p>
        </div>
      )}
    </div>
  );
}

export default CheckDiabetes;
