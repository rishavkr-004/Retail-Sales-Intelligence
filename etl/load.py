import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy.engine import URL

# Create connection
url = URL.create(
    drivername="postgresql+psycopg2",
    username="postgres",
    password="Rishav123",
    host="localhost",
    port=5432,
    database="testdb"
)

engine = create_engine(url)

# Read cleaned dataset
df = pd.read_csv("data/processed/clean_sales.csv")

# Load into PostgreSQL
df.to_sql(
    name="superstore",
    con=engine,
    if_exists="replace",   # replace table if it exists
    index=False
)

print("✅ Data loaded successfully!")