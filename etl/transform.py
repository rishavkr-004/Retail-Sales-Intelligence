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