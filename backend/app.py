from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
from pymongo import MongoClient
from datetime import datetime

app = Flask(__name__)
CORS(app)

with open("model.pkl", "rb") as f:
    model = pickle.load(f)

    client = MongoClient("mongodb+srv://Shubham123:Shubham%40123@cluster0.qgicv9y.mongodb.net/")

# client = MongoClient(
#     "mongodb+srv://Shubham123:Shubham%40123@cluster0.qgicv9y.mongodb.net/?tlsAllowInvalidCertificates=true"
# )

db = client["healthcare_db"]
collection = db["patients"]

@app.route("/")
def home():
    return "Healthcare ML API is running 🚑"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        features = np.array([data["features"]])

        prediction = model.predict(features)[0]
        probability = model.predict_proba(features)[0][1]

        result = {
            "prediction": int(prediction),
            "probability": round(float(probability), 2),
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }

        patient_record = {
            "name": data.get("name", "Unknown"),
            "features": data["features"],
            "prediction": result["prediction"],
            "probability": result["probability"],
            "timestamp": result["timestamp"]
        }
        collection.insert_one(patient_record)

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)})

@app.route("/patients", methods=["GET"])
def get_patients():
    try:
        patients = list(collection.find({}, {"_id": 0}))
        return jsonify(patients)
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)



# mongodb+srv://Shubham123:Shubham%40123@cluster0.qgicv9y.mongodb.net/