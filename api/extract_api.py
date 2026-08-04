import pandas as pd
import requests

url = "https://fakestoreapi.com/products"

response = requests.get(url)

products = response.json()

df = pd.DataFrame(products)

print(df.head())

df.to_csv("data/raw/products.csv", index=False)