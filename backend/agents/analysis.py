import pandas as pd
import numpy as np

def perform_eda(df: pd.DataFrame):
    """
    Analysis Agent:
    - Summary stats
    - KPIs: total sales, profit
    - Top/bottom products
    """
    # Assuming columns like: 'sales', 'profit', 'product', 'quantity', 'date' are common
    # We will try to map common columns
    
    col_mapping = {}
    for col in df.columns:
        if 'sale' in col or 'revenue' in col:
            col_mapping['sales'] = col
        elif 'profit' in col:
            col_mapping['profit'] = col
        elif 'product' in col or 'item' in col:
            col_mapping['product'] = col
        elif 'qty' in col or 'quantity' in col:
            col_mapping['quantity'] = col
        elif 'date' in col or 'time' in col:
            col_mapping['date'] = col

    kpis = {
        "total_sales": 0,
        "total_profit": 0,
        "total_orders": len(df)
    }
    
    if 'sales' in col_mapping:
        kpis["total_sales"] = float(df[col_mapping['sales']].sum())
    if 'profit' in col_mapping:
        kpis["total_profit"] = float(df[col_mapping['profit']].sum())
        
    top_products = []
    bottom_products = []
    trends = []
    
    if 'product' in col_mapping and 'sales' in col_mapping:
        product_sales = df.groupby(col_mapping['product'])[col_mapping['sales']].sum().sort_values(ascending=False)
        top_products = [
            {"product": str(p), "sales": float(s)} 
            for p, s in product_sales.head(5).items()
        ]
        bottom_products = [
            {"product": str(p), "sales": float(s)} 
            for p, s in product_sales.tail(5).items()
        ]
        
    if 'date' in col_mapping and 'sales' in col_mapping:
        if pd.api.types.is_datetime64_any_dtype(df[col_mapping['date']]):
            daily_sales = df.groupby(df[col_mapping['date']].dt.date)[col_mapping['sales']].sum()
            trends = [
                {"date": str(d), "sales": float(s)} 
                for d, s in daily_sales.items()
            ]

    return kpis, trends, top_products, bottom_products
