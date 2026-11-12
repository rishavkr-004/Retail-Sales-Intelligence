SELECT
    "State",
    SUM("Sales") AS revenue,
    SUM("Profit") AS profit
FROM superstore
GROUP BY "State"
ORDER BY revenue DESC;


EXPLAIN
SELECT
    "State",
    SUM("Sales") AS revenue,
    SUM("Profit") AS profit
FROM superstore
GROUP BY "State"
ORDER BY revenue DESC;


EXPLAIN ANALYZE
SELECT
    "State",
    SUM("Sales") AS revenue,
    SUM("Profit") AS profit
FROM superstore
GROUP BY "State"
ORDER BY revenue DESC;


----------------------Create an Index--------------------

CREATE INDEX idx_sales_state
ON superstore ("State");

SELECT
    indexname,
    indexdef
FROM pg_indexes
WHERE tablename = 'superstore';


EXPLAIN ANALYZE
SELECT
    *
FROM superstore
WHERE "State" = 'California';


CREATE INDEX idx_sales_order_date
ON superstore ("Order Date");

CREATE INDEX idx_sales_category
ON superstore ("Category");


CREATE INDEX idx_sales_customer
ON superstore ("Customer Name");

SELECT *
FROM superstore
WHERE "Category" = 'Technology'
AND "Region" = 'West';

CREATE INDEX idx_sales_category_region
ON superstore ("Category", "Region");

SELECT
    "Order ID",
    "Order Date",
    "Product Name",
    "Sales",
    "Profit"
FROM superstore
WHERE "Category" = 'Technology';

SELECT *
FROM superstore
WHERE "Sales" > 1000
AND "Category" = 'Technology';

SELECT
    "Customer Name",
    SUM("Sales") AS revenue
FROM superstore
GROUP BY "Customer Name";

CREATE MATERIALIZED VIEW customer_sales_summary AS
SELECT
    "Customer Name",
    COUNT(DISTINCT "Order ID") AS orders,
    SUM("Sales") AS revenue,
    SUM("Profit") AS profit,
    SUM("Quantity") AS units_sold
FROM superstore
GROUP BY "Customer Name";

SELECT *
FROM customer_sales_summary
ORDER BY revenue DESC
LIMIT 10;

CREATE MATERIALIZED VIEW monthly_sales_summary AS
SELECT
    DATE_TRUNC('month', TO_DATE("Order Date", 'MM/DD/YYYY')) AS month,
    SUM("Sales") AS revenue,
    SUM("Profit") AS profit,
    SUM("Quantity") AS units_sold,
    COUNT(DISTINCT "Order ID") AS orders
FROM superstore
GROUP BY 1
ORDER BY 1;


SELECT *
FROM monthly_sales_summary
ORDER BY month;

-------------------------------------------------------------------
SELECT
    "Order Date",
    "State",
    "Category",
    "Product Name",
    "Customer Name",
    "Sales",
    "Profit",
    "Quantity",
    "Discount"
FROM superstore;


CREATE VIEW looker_sales_summary AS
SELECT
    DATE_TRUNC('month', TO_DATE("Order Date", 'MM/DD/YYYY')) AS month,
    "Region",
    "Category",
    SUM("Sales") AS revenue,
    SUM("Profit") AS profit,
    SUM("Quantity") AS units_sold,
    COUNT(DISTINCT "Order ID") AS orders
FROM superstore
GROUP BY
    1,
    "Region",
    "Category";
