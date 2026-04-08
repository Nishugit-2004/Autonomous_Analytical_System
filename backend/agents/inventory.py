import pandas as pd

def optimize_inventory(df: pd.DataFrame, forecasts: dict):
    """
    Inventory Optimization Agent:
    - Suggest restocking quantities
    - Detect overstock and understock
    """
    recs = []
    
    col_mapping = {}
    for col in df.columns:
        if 'product' in col or 'item' in col:
            col_mapping['product'] = col
        elif 'stock' in col or 'inventory' in col:
            col_mapping['stock'] = col

    if not all(k in col_mapping for k in ['product', 'stock']):
        return recs # Insufficient columns
        
    prod_col = col_mapping['product']
    stock_col = col_mapping['stock']
    
    # Get current stock per product (assume last recorded or sum if it's snapshot)
    # We will just take the max stock as a simple proxy for current stock if it varies, 
    # or if we assume static stock we take mean. Let's take the latest or mean
    current_stocks = df.groupby(prod_col)[stock_col].last()
    
    for product, forecasted_data in forecasts.items():
        if product in current_stocks:
            stock = current_stocks[product]
            demand = forecasted_data['total_predicted_demand']
            
            status = "Normal"
            suggested_restock = 0
            
            if demand > stock * 1.2:
                status = "Understock"
                suggested_restock = demand - stock + (demand * 0.1) # Buffer
            elif stock > demand * 1.5:
                status = "Overstock"
                
            recs.append({
                "product": product,
                "current_stock": float(stock),
                "predicted_demand": float(demand),
                "status": status,
                "suggested_restock": float(suggested_restock)
            })
            
    return recs
