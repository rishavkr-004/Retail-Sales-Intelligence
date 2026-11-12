# Customer Return Prediction

## Objective

Predict whether a customer will place another order within the defined future observation period.

## Target Variable

- 1 = Customer returned
- 0 = Customer did not return

## Features

- Recency
- Frequency
- Monetary
- Total Quantity
- Average Discount
- Average Order Value
- Customer Lifespan

## Models

1. Logistic Regression
2. Random Forest

## Evaluation Metrics

- Accuracy
- Precision
- Recall
- F1 Score
- ROC-AUC

## Model Results

Add the actual model results here.

## Feature Importance

Add the Random Forest feature importance results here.

## Business Interpretation

Describe the customer characteristics associated with the model's predictions.

## Limitations

- The target depends on the selected cutoff and future observation window.
- Historical purchasing behavior does not guarantee future behavior.
- Model performance depends on the available transaction history.
- Feature importance should not be interpreted as causal evidence.