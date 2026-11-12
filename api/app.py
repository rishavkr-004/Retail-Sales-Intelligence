from flask import Flask, request, jsonify
from flask_cors import CORS


import os
import joblib
import pandas as pd
import numpy as np


#---------------------------------------------------
# Project Base Directory

BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)

#----------------------------------------------------
# Model Path

SALES_MODEL_PATH = os.path.join(
    BASE_DIR,
    "models",
    "sales_prediction_model.pkl"
)

RETURN_MODEL_PATH = os.path.join(
    BASE_DIR,
    "models",
    "customer_return_model.pkl"
)


RFM_SCALER_PATH = os.path.join(
    BASE_DIR,
    "models",
    "rfm_scaler.pkl"
)

SEGMENTATION_MODEL_PATH = os.path.join(
    BASE_DIR,
    "models",
    "customer_segmentation_model.pkl"
)


FORECAST_MODEL_PATH = os.path.join(
    BASE_DIR,
    "models",
    "sales_forecasting_model.pkl"
)


MONTHLY_SALES_PATH = os.path.join(
    BASE_DIR,
    "data",
    "ml",
    "monthly_sales.csv"
)

monthly_sales = pd.read_csv(
    MONTHLY_SALES_PATH
)


#----------------------------------------------------
# Load Model

sales_model = joblib.load(
    SALES_MODEL_PATH
)

return_model = joblib.load(
    RETURN_MODEL_PATH
)

rfm_scaler = joblib.load(
    RFM_SCALER_PATH
)

segmentation_model = joblib.load(
    SEGMENTATION_MODEL_PATH
)


forecast_model = joblib.load(
    FORECAST_MODEL_PATH
)


monthly_sales["Month"] = pd.to_datetime(
    monthly_sales["Month"]
)



#----------------------------------------------------
# Flask App

app = Flask(__name__)

CORS(app)


#----------------------------------------------------
# Forecast function

def forecast_future_sales(
    model,
    historical_data,
    periods=6
):

    history = historical_data[
        ["Month", "Sales"]
    ].copy()

    predictions = []

    features = [
        "Year",
        "Month_Number",
        "Quarter",
        "Time_Index",
        "Lag_1",
        "Lag_2",
        "Lag_3",
        "Lag_6",
        "Lag_12",
        "Rolling_3",
        "Rolling_6"
    ]

    for _ in range(periods):

        next_month = (
            history["Month"].max()
            + pd.DateOffset(months=1)
        )

        row = {}

        row["Year"] = next_month.year
        row["Month_Number"] = next_month.month
        row["Quarter"] = next_month.quarter
        row["Time_Index"] = len(history)

        row["Lag_1"] = (
            history["Sales"].iloc[-1]
        )

        row["Lag_2"] = (
            history["Sales"].iloc[-2]
        )

        row["Lag_3"] = (
            history["Sales"].iloc[-3]
        )

        row["Lag_6"] = (
            history["Sales"].iloc[-6]
        )

        row["Lag_12"] = (
            history["Sales"].iloc[-12]
        )

        row["Rolling_3"] = (
            history["Sales"]
            .iloc[-3:]
            .mean()
        )

        row["Rolling_6"] = (
            history["Sales"]
            .iloc[-6:]
            .mean()
        )

        input_data = pd.DataFrame(
            [row]
        )[features]

        prediction = model.predict(
            input_data
        )[0]

        predictions.append({
            "month": next_month.strftime(
                "%Y-%m"
            ),
            "forecast_sales": round(
                float(prediction),
                2
            )
        })

        new_row = pd.DataFrame({
            "Month": [next_month],
            "Sales": [prediction]
        })

        history = pd.concat(
            [
                history,
                new_row
            ],
            ignore_index=True
        )

    return predictions

#----------------------------------------------------
# Home Route

@app.route("/", methods =["GET"])
def home():
    return jsonify({
        "message": "Retail Sales Intelligence API is running"
    })


#---------------------------------------------------------
# Health Check



@app.route("/health", methods = ["GET"])
def health():
    return jsonify({
        "status": "healthy",
        "service": "Retail Sales Intelligence API"
    })

#-----------------------------------------------------------
# Sales Prediction
"""

@app.route("/predict-sales", methods=["POST"])
def predict_sales():

    data = request.get_json()

    try:

        input_data = pd.DataFrame([{
            "Quantity": data["Quantity"],
            "Discount": data["Discount"],
            "Shipping Days": data["Shipping Days"],
            "Order Year": data["Order Year"],
            "Order Month": data["Order Month"],
            "Order Weekday": data["Order Weekday"],
            "Category": data["Category"],
            "Sub-Category": data["Sub-Category"],
            "Region": data["Region"],
            "Segment": data["Segment"]
        }])

        prediction = sales_model.predict(
            input_data
        )[0]

        return jsonify({
            "predicted_sales": round(
                float(prediction),
                2
            )
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 400

"""
#--------------------------------------------------------------------
# Return Prediction

@app.route("/predict-return", methods=["POST"])
def predict_return():

    data = request.get_json()

    try:

        input_data = pd.DataFrame([{
            "Recency": data["Recency"],
            "Frequency": data["Frequency"],
            "Monetary": data["Monetary"],
            "Total_Quantity": data["Total_Quantity"],
            "Average_Discount": data["Average_Discount"],
            "Average_Order_Value": data["Average_Order_Value"],
            "Customer_Lifespan": data["Customer_Lifespan"]
        }])

        prediction = return_model.predict(
            input_data
        )[0]

        probability = return_model.predict_proba(
            input_data
        )[0][1]

        return jsonify({
            "returned_prediction": int(
                prediction
            ),
            "return_probability": round(
                float(probability),
                4
            )
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 400


#----------------------------------------------------
# Customer Segmentation

@app.route("/segment-customer", methods=["POST"])
def segment_customer():

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "JSON request body is required."
        }), 400


    try:

        rfm_input = pd.DataFrame([{
            "Recency": data["Recency"],
            "Frequency": data["Frequency"],
            "Monetary": data["Monetary"]
        }])

        rfm_log_input = np.log1p(
            rfm_input
        )

        rfm_scaled_input = (
            rfm_scaler.transform(
                rfm_log_input
            )
        )

        cluster = segmentation_model.predict(
            rfm_scaled_input
        )[0]

        return jsonify({
            "cluster": int(cluster)
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 400



#----------------------------------------------------
# Forecast Sales

@app.route(
    "/forecast-sales",
    methods=["GET"]
)
def forecast_sales():

    try:

        periods = request.args.get(
            "periods",
            default=6,
            type=int
        )

        if periods < 1 or periods > 12:
            return jsonify({
                "error": "Periods must be between 1 and 12."
            }), 400

        predictions = forecast_future_sales(
            forecast_model,
            monthly_sales,
            periods
        )

        return jsonify({
            "forecast_periods": periods,
            "forecast": predictions
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 400



#----------------------------------------------------
# Predict Sales

@app.route("/predict-sales", methods=["POST"])
def predict_sales():

    # Get JSON data
    data = request.get_json(silent=True)

    # Check if JSON body exists
    if not data:
        return jsonify({
            "error": "JSON request body is required."
        }), 400

    # Required fields
    required_fields = [
        "Quantity",
        "Discount",
        "Shipping Days",
        "Order Year",
        "Order Month",
        "Order Weekday",
        "Category",
        "Sub-Category",
        "Region",
        "Segment"
    ]

    # Find missing fields
    missing_fields = [
        field
        for field in required_fields
        if field not in data
    ]

    # Return error if fields are missing
    if missing_fields:
        return jsonify({
            "error": "Missing fields",
            "fields": missing_fields
        }), 400

    try:

        # Create input DataFrame
        input_data = pd.DataFrame([{
            "Quantity": data["Quantity"],
            "Discount": data["Discount"],
            "Shipping Days": data["Shipping Days"],
            "Order Year": data["Order Year"],
            "Order Month": data["Order Month"],
            "Order Weekday": data["Order Weekday"],
            "Category": data["Category"],
            "Sub-Category": data["Sub-Category"],
            "Region": data["Region"],
            "Segment": data["Segment"]
        }])

        # Make prediction
        prediction = sales_model.predict(
            input_data
        )[0]

        # Return prediction
        return jsonify({
            "predicted_sales": round(
                float(prediction),
                2
            )
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 400

#----------------------------------------------------
# Run API

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )