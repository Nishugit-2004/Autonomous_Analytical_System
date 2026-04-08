import pandas as pd

def recommend_pricing(df: pd.DataFrame, forecasts: dict):
    """
    Pricing Strategy Agent:
    - Recommend price increase/decrease based on demand trends
    """
    recs = []
    
    # This needs price and demand
    # A simple rule: if demand is consistently increasing, suggest slight price bump.
    # We will use the forecast for this.
    for product, forecasted_data in forecasts.items():
        daily = forecasted_data['daily']
        if len(daily) > 1:
            # Check if demand is increasing
            trend = daily[-1] - daily[0]
            
            action = "Hold"
            reason = "Demand is stable"
            
            if trend > (daily[0] * 0.1): # 10% increase
                action = "Increase Price"
                reason = "High and increasing demand predicted"
            elif trend < -(daily[0] * 0.1): # 10% decrease
                action = "Discount/Decrease Price"
                reason = "Demand is expected to drop"
                
            recs.append({
                "product": product,
                "recommended_action": action,
                "reason": reason
            })
            
    return recs
