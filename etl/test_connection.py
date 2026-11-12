from sqlalchemy import create_engine
from sqlalchemy.engine import URL

url = URL.create(
    drivername="postgresql+psycopg2",
    username="postgres",
    password="Rishav123",
    host="localhost",
    port=5432,
    database="testdb"
)

engine = create_engine(url)

with engine.connect() as conn:
    print("✅ Connected Successfully!")