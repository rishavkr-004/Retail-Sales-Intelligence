--Find categories having total sales greater than 500,000--
Select "Category", SUM("Sales")
AS total_sales From superstore
Group By "Category"
Having sum("Sales") > 500000;

Select "Product Name", "Profit",
Case
	When "Profit" > 0 then 'Profitable'
	When "Profit" < 0 then 'Loss'
	else 'Break even'
END AS profit_status
From superstore

SELECT "Order ID", "Sales",
    CASE
        WHEN "Sales" < 100 THEN 'Low'
        WHEN "Sales" < 500 THEN 'Medium'
        ELSE 'High'
    END AS sales_segment
FROM superstore;

--Find how many orders belong to each sales category--
SELECT
    CASE
        WHEN "Sales" < 100 THEN 'Low'
        WHEN "Sales" < 500 THEN 'Medium'
        ELSE 'High'
    END AS sales_segment,
    COUNT(*) AS order_count
FROM superstore
GROUP BY
    CASE
        WHEN "Sales" < 100 THEN 'Low'
        WHEN "Sales" < 500 THEN 'Medium'
        ELSE 'High'
    END;

--COALESCE() handles NULL values.--
SELECT "Customer Name",
COALESCE("Postal Code", 0) AS postal_code 
From superstore;

SELECT
    "Customer Name",
    LENGTH("Customer Name") AS name_length
FROM superstore;

SELECT
    CONCAT("City", ', ', "State") AS location
FROM superstore;

SELECT * From superstore
Where "Customer Name" LIKE 'A%';

SELECT * FROM superstore
WHERE "Product Name" LIKE '%Chair%';

SELECT * FROM superstore
WHERE "Category" IN ('Technology', 'Furniture');

SELECT *
FROM superstore
WHERE "Order Date"::date >= '2022-01-01'
AND "Order Date"::date < '2023-01-01';

SELECT
    EXTRACT(YEAR FROM "Order Date"::date) AS year,
    SUM("Sales"::numeric) AS total_sales
FROM superstore
GROUP BY year
ORDER BY year;

SELECT
    EXTRACT(MONTH FROM "Order Date"::date) AS month,
    SUM("Sales"::numeric) AS total_sales
FROM superstore
GROUP BY month
ORDER BY month;

SELECT
    DATE_TRUNC('month', "Order Date"::date) AS month,
    SUM("Sales"::numeric) AS revenue
FROM superstore
GROUP BY month
ORDER BY month;

SELECT
    EXTRACT(YEAR FROM "Order Date"::date) AS year,
    SUM("Sales") AS revenue
FROM superstore
GROUP BY year
ORDER BY year;

SELECT
    "State",
    SUM("Profit") AS total_profit
FROM superstore
GROUP BY "State"
HAVING SUM("Profit") > 0
ORDER BY total_profit DESC;

SELECT
    "State",
    SUM("Profit") AS total_profit
FROM superstore
GROUP BY "State"
HAVING SUM("Profit") < 0
ORDER BY total_profit;

SELECT
    CASE
        WHEN "Discount" = 0 THEN 'No Discount'
        WHEN "Discount" <= 0.20 THEN 'Low Discount'
        ELSE 'High Discount'
    END AS discount_category,
    AVG("Profit") AS average_profit,
    SUM("Sales") AS total_sales
FROM superstore
GROUP BY
    CASE
        WHEN "Discount" = 0 THEN 'No Discount'
        WHEN "Discount" <= 0.20 THEN 'Low Discount'
        ELSE 'High Discount'
    END;

SELECT
    "Customer Name",
    COUNT(DISTINCT "Order ID") AS order_count
FROM superstore
GROUP BY "Customer Name"
HAVING COUNT(DISTINCT "Order ID") > 10
ORDER BY order_count DESC;

SELECT
    "Customer Name",
    COUNT(DISTINCT "Order ID") AS orders,
    SUM("Sales") AS revenue,
    SUM("Profit") AS profit
FROM superstore
GROUP BY "Customer Name"
ORDER BY revenue DESC
LIMIT 10;

SELECT
    "Product Name",
    SUM("Sales") AS revenue,
    SUM("Profit") AS profit,
    SUM("Quantity") AS units_sold
FROM superstore
GROUP BY "Product Name"
ORDER BY revenue DESC
LIMIT 10;

SELECT
    "Category",
    SUM("Sales") AS revenue,
    SUM("Profit") AS profit,
    SUM("Quantity") AS units_sold,
    AVG("Profit Margin") AS avg_profit_margin
FROM superstore
GROUP BY "Category"
ORDER BY revenue DESC;

SELECT
    "Product Name",
    SUM("Sales") AS revenue,
    SUM("Profit") AS profit
FROM superstore
GROUP BY "Product Name"
HAVING SUM("Sales") > 1000
AND SUM("Profit") < 0
ORDER BY revenue DESC;
