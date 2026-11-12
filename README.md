# Retail Sales Intelligence Platform
### End-to-End Data Analytics, Machine Learning, Business Intelligence & API Deployment

[![Python](https://img.shields.io/badge/Python-3.x-blue)](https://www.python.org/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue)](https://www.postgresql.org/)
[![Flask](https://img.shields.io/badge/API-Flask-black)](https://flask.palletsprojects.com/)
[![Scikit-learn](https://img.shields.io/badge/ML-Scikit--learn-orange)](https://scikit-learn.org/)
[![Deployment](https://img.shields.io/badge/Deployment-Render-46E3B7)](https://render.com/)

## Project Overview

The **Retail Sales Intelligence Platform** is an end-to-end data analytics and machine learning project designed to transform raw retail data into actionable business insights.

The project combines Python-based ETL, PostgreSQL, SQL analysis, exploratory data analysis, statistical testing, machine learning, customer segmentation, sales forecasting, interactive business intelligence dashboards, and a deployed Flask API.

It aims to help businesses understand sales performance, customer purchasing patterns, product performance, and potential customer returns while exploring predictive analytics.

## Key Features

- **Data Collection:** Collects retail sales data and product information from a CSV dataset and FakeStore API.
- **ETL Pipeline:** Cleans, transforms, validates, and prepares data using Python and Pandas.
- **Database Management:** Stores structured sales data in PostgreSQL.
- **SQL Analytics:** Uses joins, CTEs, window functions, views, indexes, and aggregation queries.
- **Exploratory Data Analysis:** Analyzes sales, profit, customers, products, discounts, and regional performance.
- **Statistical Analysis:** Applies correlation analysis and hypothesis testing.
- **Sales Prediction:** Predicts sales using trained regression models.
- **Customer Segmentation:** Groups customers using RFM analysis and K-Means clustering.
- **Customer Return Prediction:** Estimates the probability of a customer returning.
- **Sales Forecasting:** Uses historical monthly sales and machine learning to generate forecast records.
- **Business Intelligence:** Presents insights through Power BI and Looker Studio dashboards.
- **REST API:** Exposes trained models through Flask endpoints.
- **Cloud Deployment:** Deploys the API using Render.

## Project Architecture

```text
Raw Data Sources
      |
      v
Python ETL Pipeline
      |
      v
Data Cleaning & Feature Engineering
      |
      v
PostgreSQL Database
      |
      v
SQL Analysis & Data Modeling
      |
      +----------------------+
      |                      |
      v                      v
Exploratory Data       Business Intelligence
Analysis & Statistics  Power BI / Looker Studio
      |
      v
Machine Learning
      |
      +-------------------------------+
      |               |               |
      v               v               v
Sales Prediction  Customer Return  Customer
                  Prediction       Segmentation
      |
      v
Sales Forecasting
      |
      v
Flask REST API
      |
      v
Render Deployment
```

## Technology Stack

| Area | Technologies |
|---|---|
| Programming | Python |
| Data Processing | Pandas, NumPy |
| Database | PostgreSQL |
| SQL | Joins, CTEs, Window Functions, Views, Indexes |
| Data Analysis | EDA, SciPy, Statistical Analysis |
| Machine Learning | Scikit-learn |
| Models | Linear Regression, Decision Tree, Random Forest, Gradient Boosting, Logistic Regression, K-Means |
| Visualization | Matplotlib, Seaborn |
| BI Dashboards | Power BI, Looker Studio |
| API | Flask, Flask-CORS |
| Model Storage | Joblib |
| API Testing | Thunder Client, Python Requests |
| Deployment | Render, Gunicorn |
| Development | VS Code, Jupyter Notebook, Git, GitHub |

## Machine Learning Modules

### 1. Sales Prediction
Predicts sales using transaction and product-related features, including quantity, discount, shipping duration, order date information, category, region, and customer segment.

### 2. Customer Segmentation
Uses Recency, Frequency, and Monetary (RFM) features with K-Means clustering to group customers based on purchasing behavior.

### 3. Customer Return Prediction
Uses historical customer behavior features to estimate the probability of a customer making another purchase within the defined prediction window.

### 4. Sales Forecasting
Uses monthly sales history, time-based features, lag variables, and rolling statistics to model sales trends and generate forecast records.

**Evaluation:** Regression models are evaluated using MAE, RMSE, and R². Classification models are evaluated using accuracy, precision, recall, F1-score, ROC-AUC, and a confusion matrix where applicable. Actual model evaluation results are documented separately in the reports folder.

## API Documentation

**Live API Base URL:**

https://retail-sales-intelligence-b5qc.onrender.com

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | API welcome message |
| GET | `/health` | Health check |
| POST | `/predict-sales` | Predict sales |
| POST | `/predict-return` | Predict customer return probability |
| POST | `/segment-customer` | Assign customer to an RFM cluster |
| GET | `/forecast-sales` | Retrieve six forecast records |

### Example: Sales Prediction

**Request**

```json
{
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
```

**Example response**

```json
{
  "predicted_sales": 288.12
}
```

See [`docs/API_DOCUMENTATION.md`](docs/API_DOCUMENTATION.md) for complete request and response details.

## Integration Testing

The live API was tested using a Python integration testing script.

| Test | Result |
|---|---|
| Health Check | Passed |
| Sales Prediction | Passed |
| Customer Return Prediction | Passed |
| Customer Segmentation | Passed |
| Sales Forecasting | Passed |

**Latest test run:** 5 out of 5 endpoints returned HTTP 200 successfully.

Run the tests locally:

```bash
pip install requests
python tests/integration_test.py
```

## Dashboards

The project includes business intelligence dashboards for:

1. Executive Sales Overview
2. Product Analysis
3. Regional Analysis
4. Customer Analysis
5. Customer Segmentation
6. Customer Return Prediction
7. Sales Forecasting

Dashboard screenshots and links can be added in the `images/` folder and below.

- Power BI Dashboard: [Add your published dashboard link]
- Looker Studio Dashboard: [Add your report link]

## Project Structure

```text
Retail-Sales-Intelligence/
│
├── api/
│   ├── app.py
│   └── requirements.txt
│
├── data/
│   ├── raw/
│   ├── processed/
│   └── ml/
│
├── database/
│
├── docs/
│   ├── API_DOCUMENTATION.md
│   └── PROJECT_REPORT.md
│
├── etl/
│
├── images/
│
├── models/
│
├── notebooks/
│   ├── eda.ipynb
│   ├── feature_engineering.ipynb
│   ├── ml_model.ipynb
│   ├── customer_segmentation.ipynb
│   ├── customer_return_prediction.ipynb
│   └── sales_forecasting.ipynb
│
├── reports/
│
├── sql/
│
├── tests/
│   └── integration_test.py
│
├── .gitignore
└── README.md
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/rishavkr-004/Retail-Sales-Intelligence.git
cd Retail-Sales-Intelligence
```

### 2. Create a virtual environment

```bash
python -m venv venv
```

Activate on Windows:

```powershell
.\venv\Scripts\Activate.ps1
```

### 3. Install dependencies

```bash
pip install -r api/requirements.txt
pip install requests sqlalchemy psycopg2-binary jupyter matplotlib seaborn scipy statsmodels
```

Install any additional packages required by the ETL scripts and notebooks.

### 4. Configure PostgreSQL

Create a PostgreSQL database and configure the database connection using environment variables or a local environment file.

Never commit database passwords or API secrets to GitHub.

### 5. Run the Flask API locally

```bash
python api/app.py
```

### 6. Check the API

Open:

```text
http://127.0.0.1:5000/health
```

### 7. Run integration tests

```bash
pip install requests
python tests/integration_test.py
```

## Deployment

The Flask API is deployed on Render.

- Hosting: Render
- Application server: Gunicorn
- Source code: GitHub
- Live API: https://retail-sales-intelligence-b5qc.onrender.com

Free hosting instances may spin down after inactivity, so the first request can take longer.

## Important Forecasting Note

The currently deployed forecasting endpoint returns six records dated January–June 2018. These records reflect the current saved forecasting output and should not be interpreted as future forecasts for 2026. The forecasting pipeline needs to be updated and redeployed before presenting future-period predictions.

## Future Improvements

- Update forecasting to generate predictions after the latest historical data.
- Automate ETL scheduling and data refreshes.
- Add model monitoring and performance tracking.
- Improve API validation and automated test coverage.
- Add authentication and rate limiting if the API becomes publicly used.
- Connect dashboards to an automatically refreshed data source.
- Add a frontend interface for interactive predictions.

## Author

**Rishav Kumar Mishra**

MCA Graduate | Aspiring Data Analyst | Data Science & Machine Learning Enthusiast

- GitHub: https://github.com/rishavkr-004
- Portfolio: https://protfolio-react-eta.vercel.app/

---

*This project demonstrates an end-to-end workflow covering data engineering, analytics, machine learning, business intelligence, API development, testing, and deployment.*