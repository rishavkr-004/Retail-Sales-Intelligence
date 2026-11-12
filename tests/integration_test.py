
import requests
import time

BASE_URL = "https://retail-sales-intelligence-b5qc.onrender.com"

# Allow extra time because Render's free instance may sleep.
TIMEOUT = 120


def test_endpoint(name, method, endpoint, payload=None):
    """Send a request and report whether the endpoint passed."""

    url = BASE_URL + endpoint

    try:
        start_time = time.time()

        if method == "GET":
            response = requests.get(url, timeout=TIMEOUT)
        else:
            response = requests.post(
                url,
                json=payload,
                timeout=TIMEOUT
            )

        elapsed = round(time.time() - start_time, 2)

        print(f"\nTesting: {name}")
        print("HTTP Status:", response.status_code)
        print("Response Time:", elapsed, "seconds")

        response.raise_for_status()

        result = response.json()
        print("Response:", result)

        return result

    except requests.exceptions.RequestException as error:
        print(f"FAILED: {name}")
        print("Error:", error)
        return None

    except ValueError:
        print(f"FAILED: {name} - Response is not valid JSON")
        return None


# 1. Health Check
health = test_endpoint(
    "Health Check",
    "GET",
    "/health"
)

assert health is not None, "Health check failed"
assert health.get("status") == "healthy"


# 2. Sales Prediction
sales_payload = {
    "Quantity": 3,
    "Discount": 0.1,
    "Shipping Days": 4,
    "Order Year": 2026,
    "Order Month": 11,
    "Order Weekday": 3,
    "Category": "Technology",
    "Sub-Category": "Phones",
    "Region": "West",
    "Segment": "Consumer"
}

sales_result = test_endpoint(
    "Sales Prediction",
    "POST",
    "/predict-sales",
    sales_payload
)

assert sales_result is not None
assert "predicted_sales" in sales_result


# 3. Customer Return Prediction
return_payload = {
    "Recency": 30,
    "Frequency": 5,
    "Monetary": 2500,
    "Total_Quantity": 12,
    "Average_Discount": 0.1,
    "Average_Order_Value": 500,
    "Customer_Lifespan": 180
}

return_result = test_endpoint(
    "Customer Return Prediction",
    "POST",
    "/predict-return",
    return_payload
)

assert return_result is not None
assert "return_probability" in return_result
assert "returned_prediction" in return_result


# 4. Customer Segmentation
segment_payload = {
    "Recency": 30,
    "Frequency": 5,
    "Monetary": 2500
}

segment_result = test_endpoint(
    "Customer Segmentation",
    "POST",
    "/segment-customer",
    segment_payload
)

assert segment_result is not None
assert "cluster" in segment_result


# 5. Sales Forecasting
forecast_result = test_endpoint(
    "Sales Forecasting",
    "GET",
    "/forecast-sales"
)

assert forecast_result is not None
assert "forecast" in forecast_result
assert len(forecast_result["forecast"]) == 6

print("\n" + "=" * 45)
print("ALL INTEGRATION TESTS PASSED!")
print("=" * 45)
