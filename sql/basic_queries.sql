SELECT COUNT(*) FROM superstore;
SELECT * FROM superstore LIMIT 10;

SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'superstore';

SELECT "Customer Name",
"Sales", "Profit" FROM superstore;

Select * FROM superstore
WHERE "Sales" > 500;

SELECT * FROM superstore
WHERE "Profit" > 100;

SELECT *
FROM superstore
WHERE "State" = 'California';

SELECT *
FROM superstore
WHERE "State" = 'California'
AND "Sales" > 500;

SELECT *
FROM superstore
WHERE "Category" = 'Technology'
OR "Category" = 'Furniture';

SELECT "Product Name",
"Sales"
FROM superstore
ORDER BY "Sales" DESC;

SELECT DISTINCT "State"
FROM superstore;

SELECT DISTINCT "Category"
FROM superstore;

SELECT SUM("Sales")
FROM superstore;

SELECT AVG("Profit")
FROM superstore;

SELECT MAX("Sales")
FROM superstore;

SELECT MIN("Sales")
FROM superstore;

SELECT "Category",
SUM("Sales") AS Total_Sales
FROM superstore GROUP BY "Category";

SELECT "Region",
SUM("Profit") AS Total_Profit
FROM superstore GROUP BY "Region";

SELECT "State",
SUM("Sales") AS Revenue
FROM superstore
GROUP BY "State"
ORDER BY Revenue DESC;

SELECT "Customer Name",
SUM("Sales") AS Total_Sales
FROM superstore
GROUP BY "Customer Name"
Order BY Total_Sales Desc LIMIT 10;

SELECT "Product Name",
SUM("Sales") AS Revenue From superstore
GROUP BY "Product Name"
ORDER BY Revenue DESC LIMIT 10;

SELECT "Category",
SUM("Profit") AS Profit From superstore
GROUP BY "Category" ORDER BY Profit DESC;

SELECT "Region",
AVG("Discount") AS Avg_Discount
FROM superstore
GROUP BY "Region";

SELECT "Month",
SUM("Sales") AS Revenue FROM superstore
GROUP BY "Month"
ORDER BY Revenue DESC;


-- Top 5 cities  by profit __
SELECT
    "City",
    SUM("Profit") AS total_profit
FROM superstore
GROUP BY "City"
ORDER BY total_profit DESC
LIMIT 5;

-- Bottom 10 Products by Profit --
SELECT
    "Product Name",
    SUM("Profit") AS total_profit
FROM superstore
GROUP BY "Product Name"
ORDER BY total_profit ASC
LIMIT 10;

-- Number of orders in each region.--
SELECT "Region", 
COUNT("Order ID") AS Count_Order From Superstore
Group by "Region"
Order by Count_Order;

-- Average shipping days by state.--
SELECT "State",
ROUND (AVG(("Ship Date"::date - "Order Date"::date)),2)
AS average_shipping_days
FROM superstore
GROUP BY "State"
ORDER BY average_shipping_days DESC;

Select * FROM superstore;

-- Total sales by year.--
SELECT "Year",
SUM("Sales") AS Sale_Per_Year From superstore
GROUP BY "Year" Order BY Sale_Per_Year DESC;

-- Highest selling sub-category. --
SELECT "Sub-Category", SUM("Sales")
AS Highest_Selling From superstore
Group BY "Sub-Category" order by Highest_selling;

-- Total profit by segment. --
SELECT "Segment", SUM("Profit") as Total_Profit
From superstore
Group BY "Segment" Order BY Total_Profit;

--Average profit margin by category.--
SELECT "Category", AVG(("Profit"/ "Sales") * 100) AS
Avg_Profit_Margin From superstore
Group BY "Category" Order BY Avg_Profit_Margin;

--Top 5 customers by order count.--
SELECT "Customer Name", Count("Order ID") as Total_Order
From superstore
Group BY "Customer Name" Order BY Total_Order DESC;

--Total sales for each weekday.--
SELECT
    TRIM(TO_CHAR("Order Date"::date, 'Day')) AS weekday,
    SUM("Sales"::numeric) AS total_sales
FROM superstore
GROUP BY weekday
ORDER BY total_sales DESC;