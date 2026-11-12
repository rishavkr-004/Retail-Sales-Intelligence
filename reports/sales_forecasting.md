# Sales Forecasting

## Objective

Forecast future monthly sales using historical sales data.

## Dataset

The cleaned Superstore transaction dataset was aggregated to monthly sales.

## Methodology

1. Aggregate transaction-level sales by month
2. Create time-based features
3. Create lag features
4. Create rolling averages
5. Split data chronologically
6. Build a previous-month baseline
7. Train Random Forest
8. Evaluate forecasting performance
9. Generate future forecasts

## Features

- Year
- Month Number
- Quarter
- Time Index
- Lag 1
- Lag 2
- Lag 3
- Lag 6
- Lag 12
- Rolling 3
- Rolling 6

## Validation

The data was divided chronologically rather than randomly to avoid using future observations during training.

## Model Results

Add actual results:

- Baseline MAE:
- Baseline RMSE:
- Random Forest MAE:
- Random Forest RMSE:
- Random Forest R²:

## Future Forecast

Add the generated six-month forecast.

## Business Insights

Add observations based on the actual forecast and historical trend.

## Limitations

- Forecast accuracy depends on the available historical period.
- Recursive forecasting can accumulate prediction errors.
- External factors such as promotions, economic conditions and market changes are not included.
- The model identifies patterns in historical data and does not guarantee future sales.