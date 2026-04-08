class DecisionEngine:
    def __init__(self):
        pass

    def generate_recommendations(self, inventory_recs: list, pricing_recs: list, trends: list, external_context: list = None):
        alerts = []
        actions = []
        debate_transcript = []
        marketing_assets = []
        
        # Inject Context into Actions/Alerts
        weather_event = next((c for c in (external_context or []) if c.get('type') == 'Weather'), None)
        
        inventory_dict = {item['product']: item for item in inventory_recs}
        pricing_dict = {item['product']: item for item in pricing_recs}
        all_products = set(inventory_dict.keys()).union(set(pricing_dict.keys()))
        
        for p in all_products:
            inv = inventory_dict.get(p)
            price = pricing_dict.get(p)
            
            # Weather overrides
            weather_modifier = False
            if weather_event and p == "Ergonomic Chair" and inv:
                 # It's raining, less people buy furniture in store
                 weather_modifier = True
                 alerts.append({
                    "severity": "Warning",
                    "message": f"[Contextual] {weather_event['description']} Expected foot traffic drop limits {p} sales."
                 })
                 
            if inv and inv['status'] == 'Understock' and not weather_modifier:
                alerts.append({
                    "severity": "Critical",
                    "message": f"Stock-out risk for {p}. Predicted demand: {inv['predicted_demand']:.0f}, Current stock: {inv['current_stock']:.0f}"
                })
                actions.append(f"Restock {inv['suggested_restock']:.0f} units of {p} immediately.")
                
                # Executable Action: Generate Purchase Order
                marketing_assets.append({
                    "type": "Purchase Order",
                    "target": p,
                    "content": f"URGENT: Draft PO to Supplier\n\nTo Whom It May Concern,\n\nPlease process an expedited order for {inv['suggested_restock']:.0f} units of [{p}]. Our forecasting models predict a complete stock-out within 7 days. Please confirm fulfillment."
                })
                
            elif inv and inv['status'] == 'Overstock':
                alerts.append({
                    "severity": "Warning",
                    "message": f"Overstock detected for {p}. Stock: {inv['current_stock']:.0f}, Demand: {inv['predicted_demand']:.0f}"
                })
                actions.append(f"Consider running a promotion to clear excess inventory of {p}.")
                
                # Executable Action: Generate Marketing Campaign
                marketing_assets.append({
                    "type": "Marketing Email",
                    "target": p,
                    "content": f"Subject: 🚨 Flash Sale: Grab {p} before it's gone!\n\nHey VIPs,\n\nWe're clearing out our shelves to make room for new inventory! For the next 48 hours, enjoy a massive discount on {p}. Click here to claim your deal."
                })
            
            if price:
                if price['recommended_action'] == 'Increase Price':
                    actions.append(f"Increase price for {p} due to high expected demand.")
                elif price['recommended_action'] == 'Discount/Decrease Price':
                    actions.append(f"Apply a discount on {p} as demand is dropping.")
                
                # Debate logic (if a product has both price and inventory pressure)
                if inv and len(debate_transcript) == 0: # Only generate one debate for demonstration
                    if inv['status'] == 'Overstock' and price['recommended_action'] == 'Discount/Decrease Price':
                        debate_transcript = [
                            {"agent": "Inventory Agent", "message": f"Warning! Product {p} is heavily overstocked. Our warehouse costs are rising. We need to clear this out immediately."},
                            {"agent": "Pricing Agent", "message": f"I see the demand curve dropping. I propose a 20% flash sale to incentivize immediate buys."},
                            {"agent": "Finance Agent", "message": f"Hold on. A 20% drop will destroy our quarterly margin on {p}. We should only perform a targeted 10% discount bundled with another high-margin product."},
                            {"agent": "CEO Decision", "message": f"Agreed with Finance. Initiating a bundled 10% discount and deploying the targeted marketing email for {p}."}
                        ]
                    elif inv['status'] == 'Understock':
                        debate_transcript = [
                            {"agent": "Sales Agent", "message": f"{p} is flying off the shelves! We should heavily promote it on socials right now."},
                            {"agent": "Inventory Agent", "message": f"Negative. If we promote {p}, we will stock out in 48 hours. We only have {inv['current_stock']:.0f} units left!"},
                            {"agent": "Pricing Agent", "message": f"To throttle the demand and capitalize on scarcity, I suggest increasing the price by 5% immediately until the restock arrives."},
                            {"agent": "CEO Decision", "message": f"Price increase approved. Holding all promotions for {p}. Operations, send the drafted Purchase Order immediately."}
                        ]
        
        # Fallback debate if none triggered
        if len(debate_transcript) == 0 and len(all_products) > 0:
            p = list(all_products)[0]
            debate_transcript = [
                 {"agent": "Inventory Agent", "message": f"Inventory levels for {p} look stable but slightly leaning towards a surplus."},
                 {"agent": "Marketing Agent", "message": f"We should proactively launch a social media campaign for {p} to keep momentum up."},
                 {"agent": "CEO Decision", "message": f"Approved. Aligning marketing spend with current stable inventory."}
            ]

        return alerts, actions, debate_transcript, marketing_assets
