import functools
import numpy as np
import pandas as pd

class CollaborationAgent:
    def __init__(self):
        pass

    def generate_collaboration_insights(self, df):
        # We will simulate a network of 3-5 stores collaborating in the same product category
        network_size = np.random.randint(3, 6)
        
        if df is None or len(df) == 0:
            return None
            
        col_mapping = {}
        for col in df.columns:
            if 'product' in col.lower() or 'item' in col.lower():
                col_mapping['product'] = col
            elif 'qty' in col.lower() or 'quantity' in col.lower() or 'sales' in col.lower():
                col_mapping['quantity'] = col
            elif 'price' in col.lower():
                col_mapping['price'] = col

        if 'product' not in col_mapping or 'quantity' not in col_mapping:
            return None

        p_col = col_mapping['product']
        q_col = col_mapping['quantity']
        price_col = col_mapping.get('price', None)
        
        # Calculate store's performance on top 3 products
        top_products = df.groupby(p_col).agg({
            q_col: 'sum'
        })
        if price_col:
            prices = df.groupby(p_col)[price_col].mean()
            top_products['price'] = prices
        else:
            top_products['price'] = np.random.uniform(10, 100, size=len(top_products))
            
        top_products = top_products.sort_values(by=q_col, ascending=False).head(3)
        
        insights = []
        recommendations = []
        product_level_data = []

        category = "Electronics/FMCG" # simulated category

        for product, row in top_products.iterrows():
            my_demand = int(row[q_col])
            my_price = float(row['price'])
            
            # Simulate Network Data
            network_avg_demand = int(my_demand * np.random.uniform(0.7, 1.4))
            network_total_demand = network_avg_demand * network_size
            network_avg_price = float(my_price * np.random.uniform(0.85, 1.15))
            
            # Comparative analysis
            sales_status = "above average" if my_demand > network_avg_demand else "below average"
            price_status = "higher" if my_price > network_avg_price else "lower"
            
            growth_pct = np.random.randint(5, 35)
            
            product_level_data.append({
                "product": str(product),
                "my_demand": my_demand,
                "my_price": round(my_price, 2),
                "network_total_demand": network_total_demand,
                "network_avg_price": round(network_avg_price, 2),
                "growth": f"+{growth_pct}%",
                "stock_availability": "Low" if np.random.random() > 0.5 else "Stable"
            })
            
            if sales_status == "below average":
                recommendations.append(f"Adjust pricing for {product}: Your pricing is {price_status} than network competitors.")
            if growth_pct > 20:
                insights.append(f"{product} is trending across {network_size} collaborating stores!")
                
        # Fill additional generic intelligence
        if len(insights) == 0:
            insights.append(f"Steady demand across the {category} network.")
        insights.append("Stock running low in multiple regional stores for top items.")
        
        recommendations.append("Promote overall trending items using network marketing strategies.")
        recommendations.append("Consolidate restocking orders with collaborators for volume discounts.")

        # Deduplicate
        recommendations = list(dict.fromkeys(recommendations))
        insights = list(dict.fromkeys(insights))

        return {
            "network_size": network_size,
            "category": category,
            "product_level_data": product_level_data,
            "shared_insights": insights,
            "ai_recommendations": recommendations
        }
