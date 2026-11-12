SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'superstore'
ORDER BY ordinal_position;


SELECT *
FROM superstore
LIMIT 5;


CREATE OR REPLACE VIEW looker_dashboard_sales AS
SELECT
    "Row ID",
    "Order ID",

    -- Convert text dates into PostgreSQL dates
    NULLIF("Order Date", '')::date AS "Order Date",
    NULLIF("Ship Date", '')::date AS "Ship Date",

    "Ship Mode",
    "Customer ID",
    "Customer Name",
    "Segment",
    "Country",
    "City",
    "State",
    "Postal Code",
    "Region",

    "Product ID",
    "Category",
    "Sub-Category",
    "Product Name",

    "Sales",
    "Quantity",
    "Discount",
    "Profit",

    -- Existing engineered columns
    "Year",
    "Month",
    "Quarter",
    "Weekday",
    "Profit Margin",
    "Sales Category",

    -- Calculate Shipping Days
    CASE
        WHEN NULLIF("Ship Date", '') IS NOT NULL
         AND NULLIF("Order Date", '') IS NOT NULL
        THEN
            NULLIF("Ship Date", '')::date
            - NULLIF("Order Date", '')::date
        ELSE NULL
    END AS "Shipping Days",

    -- Calculate Order Month Number
    EXTRACT(
        MONTH FROM NULLIF("Order Date", '')::date
    )::integer AS "Order Month Number",

    -- Calculate Order Week
    EXTRACT(
        WEEK FROM NULLIF("Order Date", '')::date
    )::integer AS "Order Week",

    -- Create Discount Category
    CASE
        WHEN "Discount" = 0
            THEN 'No Discount'
        WHEN "Discount" <= 0.20
            THEN 'Low Discount'
        ELSE 'High Discount'
    END AS "Discount Category"

FROM superstore;


SELECT *
FROM looker_dashboard_sales
LIMIT 10;


SELECT
    "Order Date",
    "Ship Date",
    "Shipping Days",
    "Order Month Number",
    "Order Week",
    "Discount",
    "Discount Category"
FROM looker_dashboard_sales
LIMIT 20;




CREATE OR REPLACE VIEW looker_monthly_sales AS
SELECT
    DATE_TRUNC(
        'month',
        NULLIF("Order Date", '')::date
    ) AS "Month",

    SUM("Sales") AS "Revenue",

    SUM("Profit") AS "Profit",

    SUM("Quantity") AS "Units Sold",

    COUNT(DISTINCT "Order ID") AS "Orders",

    COUNT(DISTINCT "Customer Name") AS "Customers"

FROM superstore

WHERE NULLIF("Order Date", '') IS NOT NULL

GROUP BY 1

ORDER BY 1;




SELECT *
FROM looker_monthly_sales;



CREATE OR REPLACE VIEW looker_customer_summary AS
SELECT
    "Customer Name",
    "Segment",
    "Region",

    COUNT(DISTINCT "Order ID") AS "Orders",

    SUM("Sales") AS "Revenue",

    SUM("Profit") AS "Profit",

    SUM("Quantity") AS "Units Sold",

    SUM("Sales")
        / NULLIF(
            COUNT(DISTINCT "Order ID"),
            0
        ) AS "Average Order Value",

    MAX(
        NULLIF("Order Date", '')::date
    ) AS "Last Order Date"

FROM superstore

GROUP BY
    "Customer Name",
    "Segment",
    "Region";


SELECT *
FROM looker_customer_summary
LIMIT 10;



CREATE OR REPLACE VIEW looker_product_summary AS
SELECT
    "Product ID",
    "Product Name",
    "Category",
    "Sub-Category",

    SUM("Sales") AS "Revenue",

    SUM("Profit") AS "Profit",

    SUM("Quantity") AS "Units Sold",

    COUNT(DISTINCT "Order ID") AS "Orders"

FROM superstore

GROUP BY
    "Product ID",
    "Product Name",
    "Category",
    "Sub-Category";



SELECT *
FROM looker_product_summary
LIMIT 10;




SELECT
    column_name,
    data_type
FROM information_schema.columns
WHERE table_name = 'looker_dashboard_sales'
ORDER BY ordinal_position;




