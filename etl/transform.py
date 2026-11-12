import pandas as pd

#read the dataset
df = pd.read_csv("data/raw/SampleSuperstore.csv", 
                encoding = "latin1")

print(df.head())

print("\nDataset Shape:")
print(df.shape)

print("\nColumn Names:")
print(df.columns)

print("\nData Types:")
print(df.dtypes)

print("\nMissing Values:")
print(df.isnull().sum())

print("\nDuplicate Rows:")
print(df.duplicated().sum())

df = df.drop_duplicates()
print(df.shape)

# Convert date columns
df["Order Date"] = pd.to_datetime(df["Order Date"], errors="coerce")
df["Ship Date"] = pd.to_datetime(df["Ship Date"], errors="coerce")

print("\nUpdated Data Types:")
print(df.dtypes)

df["Year"] = df["Order Date"].dt.year
df["Month"] = df["Order Date"].dt.month_name()
df["Quarter"] = df["Order Date"].dt.quarter
df["Weekday"] = df["Order Date"].dt.day_name()

df["Profit Margin"] = (df["Profit"] / df["Sales"]) * 100

def sales_category(sales):
    if sales < 100:
        return "Low"
    elif sales < 500:
        return "Medium"
    else:
        return "High"

df["Sales Category"] = df["Sales"].apply(sales_category)

df.to_csv("data/processed/clean_sales.csv", index=False)

print("Clean dataset saved successfully!")
