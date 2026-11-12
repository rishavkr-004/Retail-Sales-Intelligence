# Retail Sales Intelligence Platform — Project Report

## 1. Introduction

The Retail Sales Intelligence Platform is an end-to-end data analytics and machine learning solution developed to analyze retail transaction data and generate business insights.

The project integrates data collection, ETL, PostgreSQL, SQL analytics, exploratory data analysis, statistical testing, machine learning, customer segmentation, forecasting, dashboards, and REST API deployment.

## 2. Problem Statement

Retail businesses generate large amounts of transaction data but may struggle to convert it into useful information.

This project addresses the need to:

- Understand sales and profit performance.
- Identify high-performing products and regions.
- Analyze customer purchasing behavior.
- Understand the relationship between discounts and profitability.
- Segment customers based on purchasing patterns.
- Predict sales and customer return behavior.
- Explore historical sales trends and forecasting.

## 3. Project Objectives

1. Build a repeatable ETL pipeline.
2. Store structured data in PostgreSQL.
3. Perform advanced SQL analysis.
4. Conduct EDA and statistical analysis.
5. Engineer features for machine learning.
6. Train and evaluate predictive models.
7. Perform RFM-based customer segmentation.
8. Build a customer return prediction model.
9. Develop a sales forecasting model.
10. Create interactive BI dashboards.
11. Deploy ML models through a Flask API.
12. Test and document the deployed application.

## 4. Data Sources

### Retail Sales Dataset

The Sample Superstore dataset provides transaction-level information such as:

- Order ID and Order Date
- Ship Date and Ship Mode
- Customer ID and Customer Name
- Segment and Region
- Product Category and Sub-Category
- Sales, Quantity, Discount, and Profit

### Product API

Product information was collected from:

https://fakestoreapi.com/products

The API data was extracted and saved as a CSV file for project use.

## 5. ETL Pipeline

The ETL process was developed using Python and Pandas.

### Extract

- Read the Sample Superstore CSV dataset.
- Fetch product information from FakeStore API.
- Store extracted data in the raw data directory.

### Transform

- Remove duplicate records.
- Handle missing values.
- Convert date fields.
- Create year, month, quarter, and weekday features.
- Calculate shipping duration.
- Create profit margin and sales categories.
- Create discount categories.

### Load

- Connect Python to PostgreSQL using SQLAlchemy.
- Load the processed dataset into the database.
- Verify the uploaded record count.

The retail sales dataset was successfully loaded with 9,994 rows during the database-loading stage.

## 6. Database and SQL Analysis

PostgreSQL was used for structured data storage and querying.

SQL concepts implemented:

- SELECT, WHERE, GROUP BY, ORDER BY
- Aggregate functions
- INNER JOIN and LEFT JOIN
- Common Table Expressions
- Subqueries
- Window functions
- Views and materialized views
- Index creation
- Query execution analysis

The analysis included sales by category, regional profitability, monthly performance, customer revenue, and product performance.

## 7. Exploratory Data Analysis

EDA was conducted using Python, Pandas, NumPy, Matplotlib, and Seaborn.

Major analysis areas:

- Dataset structure and data types
- Missing values and duplicate records
- Sales and profit distributions
- Product and category performance
- Regional sales and profitability
- Customer purchasing patterns
- Discount distribution
- Outlier analysis
- Correlation analysis

## 8. Statistical Analysis

Statistical methods were used to investigate relationships and differences in the retail data.

### Discount and Profit Correlation

Previously calculated Pearson correlation:

**r = -0.2195**

This indicates a weak negative linear relationship between discount and profit in the analyzed data.

### Discount Group Comparison

A historical Welch's t-test comparing profit in discounted and non-discounted transactions produced:

- t-statistic: 15.7380
- p-value: approximately 4.36 × 10⁻⁵⁵

The result indicates a statistically significant difference between the two groups in that analysis.

These results describe associations and group differences; they do not establish that discounts alone caused changes in profit.

## 9. Feature Engineering and Data Modeling

Feature engineering prepared the dataset for machine learning.

Examples of engineered features:

- Shipping Days
- Order Year
- Order Month
- Order Weekday
- Recency
- Frequency
- Monetary
- Average Order Value
- Customer Lifespan
- Lagged monthly sales
- Rolling sales averages

Preprocessing included:

- Missing-value imputation
- Standard scaling
- One-hot encoding
- Train-test splitting
- Leakage checks

## 10. Machine Learning Modules

### A. Sales Prediction

Regression models developed:

- Linear Regression
- Decision Tree Regressor
- Random Forest Regressor
- Gradient Boosting Regressor

Evaluation metrics:

- MAE
- RMSE
- R²

### B. Customer Segmentation

RFM analysis was used to calculate:

- Recency: time since the last purchase
- Frequency: number of customer orders
- Monetary: total customer spending

K-Means clustering was applied after feature transformation and scaling.

### C. Customer Return Prediction

A historical cutoff was used to create a classification target based on whether a customer made another purchase within the defined future observation window.

Models included:

- Logistic Regression
- Random Forest Classifier

Evaluation metrics included accuracy, precision, recall, F1-score, ROC-AUC, and confusion matrix.

### D. Sales Forecasting

Monthly sales data was prepared using:

- Year and month
- Quarter
- Time index
- Lag features
- Rolling averages

A chronological train-test split was used to respect time order.

A previous-month baseline and Random Forest regression model were used for comparison.

Forecasting outputs and evaluation results were saved separately.

**Forecasting limitation:** The currently deployed API returns six saved records from January to June 2018. This output must be refreshed using the latest historical data before it can be described as a future forecast.

## 11. Business Intelligence Dashboards

Power BI and Looker Studio were used to create interactive reports.

The dashboard pages cover:

1. Executive Overview
2. Product Analysis
3. Regional Analysis
4. Customer Analysis
5. Customer Segmentation
6. Customer Return Prediction
7. Sales Forecasting

Dashboard KPIs include:

- Total Sales
- Total Profit
- Total Orders
- Total Customers
- Average Order Value
- Profit Margin
- Customer Return Rate
- Forecast Sales

Screenshots and published report links should be added to the project documentation when available.

## 12. Flask REST API

The trained machine learning models were integrated into a Flask application.

| HTTP Method | Endpoint | Function |
|---|---|---|
| GET | `/` | API welcome message |
| GET | `/health` | Health check |
| POST | `/predict-sales` | Sales prediction |
| POST | `/predict-return` | Customer return prediction |
| POST | `/segment-customer` | Customer clustering |
| GET | `/forecast-sales` | Retrieve forecast records |

The API uses Joblib to load trained models and Flask-CORS to support cross-origin requests.

## 13. Deployment and Testing

### Deployment

- GitHub: source code repository
- Render: API hosting
- Gunicorn: production application server

Live API:

https://retail-sales-intelligence-b5qc.onrender.com

### Integration Testing

The live API was tested with Python Requests.

| Test | Result |
|---|---|
| Health Check | Passed |
| Sales Prediction | Passed |
| Customer Return Prediction | Passed |
| Customer Segmentation | Passed |
| Sales Forecasting | Passed |

All five endpoints returned HTTP 200 in the reported test run.

## 14. Project Outcomes

The project demonstrates an integrated workflow across:

- Data collection and transformation
- Relational database management
- SQL-based business analysis
- Exploratory and statistical analysis
- Machine learning model development
- Customer analytics
- Business intelligence reporting
- REST API development
- Cloud deployment
- Integration testing

## 15. Limitations and Future Scope

### Current limitations

- The deployed forecasting endpoint currently returns saved 2018 forecast records.
- Dashboard data refresh may require manual updates depending on the data source.
- Model performance depends on the available historical dataset and its quality.
- Customer segmentation cluster numbers require business interpretation.

### Future improvements

- Refresh forecasting with current historical data.
- Automate ETL scheduling.
- Implement model monitoring.
- Add API authentication and rate limiting.
- Improve input validation and automated testing.
- Connect dashboards to automated data refresh pipelines.
- Develop a web interface for interactive predictions.

## 16. Conclusion

The Retail Sales Intelligence Platform demonstrates how raw retail data can be transformed into structured information, business insights, and machine learning predictions.

By combining Python, PostgreSQL, SQL, statistical analysis, machine learning, Power BI, Looker Studio, Flask, and Render, the project provides practical experience across the data analytics and machine learning lifecycle.

It also demonstrates the process of deploying trained models as accessible API services and validating them through integration tests.

## 17. Author

**Rishav Kumar Mishra**

MCA Graduate | Aspiring Data Analyst | Data Science & Machine Learning Enthusiast

GitHub: https://github.com/rishavkr-004

Portfolio: https://protfolio-react-eta.vercel.app/