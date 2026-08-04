import pandas as pd

df = pd.read_csv(
    "../data/raw/SampleSuperstore.csv",
    encoding="latin1"
)

print(df.head())

print(df.shape)

print(df.columns)

print(df.info())

print(df.describe())