import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy.engine import URL

# ============================================
# 1. RENDER POSTGRESQL CREDENTIALS
# ============================================

HOST = "dpg-davam6h42hec739c8sf0-a.ohio-postgres.render.com"
PORT = 5432
DATABASE = "retail_sales_rtco_a1qb"
USERNAME = "retail_user"

# Enter your Render password here temporarily
PASSWORD = "e25EdAlbzrwuew3qILTegbnoQopTRVAQ"


# ============================================
# 2. CREATE DATABASE CONNECTION
# ============================================

connection_url = URL.create(
    drivername="postgresql+psycopg2",
    username=USERNAME,
    password=PASSWORD,
    host=HOST,
    port=PORT,
    database=DATABASE,
    query={"sslmode": "require"}
)

engine = create_engine(connection_url)


# ============================================
# 3. READ CSV
# ============================================

csv_file = "data/raw/SampleSuperstore.csv"

print("Reading CSV...")

df = pd.read_csv(csv_file, encoding="latin1")

print("CSV loaded successfully!")
print("Rows:", len(df))
print("Columns:", len(df.columns))

print("\nColumns:")
print(df.columns.tolist())


# ============================================
# 4. CLEAN COLUMN NAMES
# ============================================

df.columns = (
    df.columns
    .str.strip()
    .str.lower()
    .str.replace(" ", "_")
    .str.replace("-", "_")
)

print("\nCleaned columns:")
print(df.columns.tolist())


# ============================================
# 5. REMOVE DUPLICATES
# ============================================

before = len(df)

df = df.drop_duplicates()

after = len(df)

print(f"\nDuplicates removed: {before - after}")


# ============================================
# 6. CONVERT DATE COLUMNS
# ============================================

if "order_date" in df.columns:
    df["order_date"] = pd.to_datetime(
        df["order_date"],
        errors="coerce"
    )

if "ship_date" in df.columns:
    df["ship_date"] = pd.to_datetime(
        df["ship_date"],
        errors="coerce"
    )


# ============================================
# 7. LOAD INTO RENDER POSTGRESQL
# ============================================

print("\nUploading data to Render PostgreSQL...")

df.to_sql(
    "superstore",
    engine,
    schema="public",
    if_exists="replace",
    index=False
)

print("\nSUCCESS!")
print("Table created: public.superstore")
print("Rows uploaded:", len(df))


# ============================================
# 8. TEST CONNECTION
# ============================================

with engine.connect() as connection:

    result = connection.exec_driver_sql(
        "SELECT COUNT(*) FROM public.superstore"
    )

    count = result.fetchone()[0]

    print("\nDatabase verification:")
    print("Rows in PostgreSQL:", count)