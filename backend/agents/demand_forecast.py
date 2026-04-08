import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression

def forecast_demand(df: pd.DataFrame, days_to_predict=7):
    """
    Demand Forecast Agent: 
    - Uses a simple Linear Regression model
    - Predicts future demand for the next 7-30 days
    """
    predictions = {}
    
    col_mapping = {}
    for col in df.columns:
        if 'product' in col or 'item' in col:
            col_mapping['product'] = col
        elif 'qty' in col or 'quantity' in col:
            col_mapping['quantity'] = col
        elif 'date' in col or 'time' in col:
            col_mapping['date'] = col

    if not all(k in col_mapping for k in ['product', 'quantity', 'date']):
        return predictions  # Insufficient columns for forecasting

    prod_col = col_mapping['product']
    qty_col = col_mapping['quantity']
    date_col = col_mapping['date']

    if pd.api.types.is_datetime64_any_dtype(df[date_col]):
        df_copy = df.copy()
        # Create a date ordinal for regression
        df_copy['date_ordinal'] = df_copy[date_col].apply(lambda x: x.toordinal())
        
        products = df_copy[prod_col].unique()
        
        # We will only forecast for the top 10 products to save time
        top_products = df_copy.groupby(prod_col)[qty_col].sum().sort_values(ascending=False).head(10).index
        
        for p in top_products:
            p_data = df_copy[df_copy[prod_col] == p].sort_values(by='date_ordinal')
            if len(p_data) < 3:
                continue # Not enough data
            
            X = p_data[['date_ordinal']]
            y = p_data[qty_col]
            
            model = LinearRegression()
            model.fit(X, y)
            
            last_date = p_data['date_ordinal'].max()
            future_dates = np.array([last_date + i for i in range(1, days_to_predict + 1)]).reshape(-1, 1)
            future_demand = model.predict(future_dates)
            
            # Formatting outputs
            daily_predictions = [max(0, float(val)) for val in future_demand]
            predictions[str(p)] = {
                "total_predicted_demand": sum(daily_predictions),
                "daily": daily_predictions
            }
            
    return predictions
