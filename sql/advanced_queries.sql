CREATE TABLE customers AS
SELECT DISTINCT
"Customer Name",
"Segment",
"City",
"State",
"Region"
FROM superstore

SELECT *
FROM customers
LIMIT 10;

Select
	s."Order ID",
	s."Customer Name",
	s."Segment",
	s."Sales",
	s."Profit"
FROM superstore s
INNER JOIN customers c
	on s."Customer Name" = s."Customer Name"
Limit 100;

SELECT
    s."Order ID",
    s."Customer Name",
    c."Segment",
    s."Sales"
FROM superstore s
LEFT JOIN customers c
    ON s."Customer Name" = c."Customer Name";

SELECT
    c."Segment",
    SUM(s."Sales") AS revenue,
    SUM(s."Profit") AS profit
FROM superstore s
JOIN customers c
    ON s."Customer Name" = c."Customer Name"
GROUP BY c."Segment"
ORDER BY revenue DESC;

SELECT AVG("Sales")
FROM superstore;

SELECT
    "Order ID",
    "Product Name",
    "Sales"
FROM superstore
WHERE "Sales" >
(
    SELECT AVG("Sales")
    FROM superstore
)
ORDER BY "Sales" DESC;

WITH customer_sales AS (
    SELECT
        "Customer Name",
        SUM("Sales") AS revenue
    FROM superstore
    GROUP BY "Customer Name"
)

SELECT *
FROM customer_sales
ORDER BY revenue DESC
LIMIT 10;


WITH customer_sales AS (
    SELECT
        "Customer Name",
        SUM("Sales") AS revenue
    FROM superstore
    GROUP BY "Customer Name"
),
average_sales AS (
    SELECT
        AVG(revenue) AS avg_revenue
    FROM customer_sales
)
SELECT
    c."Customer Name",
    c.revenue
FROM customer_sales c
CROSS JOIN average_sales a
WHERE c.revenue > a.avg_revenue
ORDER BY c.revenue DESC;


SELECT
    "Customer Name",
    SUM("Sales"),
    SUM("Profit")
FROM superstore
GROUP BY "Customer Name";

CREATE VIEW customer_performance AS
SELECT
    "Customer Name",
    COUNT(DISTINCT "Order ID") AS orders,
    SUM("Sales") AS revenue,
    SUM("Profit") AS profit,
    AVG("Profit Margin") AS avg_profit_margin
FROM superstore
GROUP BY "Customer Name";

SELECT *
FROM customer_performance
ORDER BY revenue DESC
LIMIT 10;



SELECT
    "Customer Name",
    "Order ID",
    "Sales",
    ROW_NUMBER() OVER (
        PARTITION BY "Customer Name"
        ORDER BY "Sales" DESC
    ) AS order_rank
FROM superstore;

SELECT
    "Product Name",
    "Sales",
    RANK() OVER (
        ORDER BY "Sales" DESC
    ) AS sales_rank
FROM superstore;



WITH monthly_sales AS (
    SELECT
        DATE_TRUNC('month', "Order Date"::date) AS month,
        SUM("Sales") AS revenue
    FROM superstore
    GROUP BY 1
)

SELECT
    month,
    revenue,
    SUM(revenue) OVER (
        ORDER BY month
    ) AS running_revenue
FROM monthly_sales
ORDER BY month;



WITH monthly_sales AS (
    SELECT
        DATE_TRUNC('month', "Order Date"::date) AS month,
        SUM("Sales") AS revenue
    FROM superstore
    GROUP BY 1
),

sales_with_previous AS (
    SELECT
        month,
        revenue,
        LAG(revenue) OVER (
            ORDER BY month
        ) AS previous_revenue
    FROM monthly_sales
)

SELECT
    month,
    revenue,
    previous_revenue,
    ROUND(
        (
            (revenue - previous_revenue)
            / NULLIF(previous_revenue, 0)
        ) * 100,
        2
    ) AS growth_percentage
FROM sales_with_previous
ORDER BY month;


SELECT
    "Order Date",
    "Sales",
    LEAD("Sales") OVER (
        ORDER BY "Order Date"
    ) AS next_sales
FROM superstore;




WITH product_sales AS (
    SELECT
        "Category",
        "Product Name",
        SUM("Sales") AS revenue
    FROM superstore
    GROUP BY
        "Category",
        "Product Name"
),

ranked_products AS (
    SELECT
        *,
        ROW_NUMBER() OVER (
            PARTITION BY "Category"
            ORDER BY revenue DESC
        ) AS product_rank
    FROM product_sales
)

SELECT *
FROM ranked_products
WHERE product_rank <= 3
ORDER BY "Category", product_rank;



WITH customer_revenue AS (
    SELECT
        "Customer Name",
        SUM("Sales") AS revenue
    FROM superstore
    GROUP BY "Customer Name"
)

SELECT
    "Customer Name",
    revenue,
    RANK() OVER (
        ORDER BY revenue DESC
    ) AS customer_rank
FROM customer_revenue;





SELECT
    "Region",
    SUM("Sales") AS revenue,
    SUM("Profit") AS profit,
    COUNT(DISTINCT "Order ID") AS orders,
    AVG("Profit Margin") AS avg_margin
FROM superstore
GROUP BY "Region"
ORDER BY revenue DESC;


WITH customer_revenue AS (
    SELECT
        "Customer Name",
        SUM("Sales") AS revenue
    FROM sales
    GROUP BY "Customer Name"
)

SELECT
    "Customer Name",
    revenue,
    ROUND(
        revenue /
        SUM(revenue) OVER () * 100,
        2
    ) AS revenue_percentage
FROM customer_revenue
ORDER BY revenue DESC;




SELECT
    "Region",
    SUM("Sales") AS revenue,
    SUM("Profit") AS profit
FROM superstore
GROUP BY "Region"
HAVING SUM("Sales") > 500000
AND SUM("Profit") < 50000
ORDER BY revenue DESC;