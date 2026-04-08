def generate_insights(kpis: dict, actions: list):
    """
    Insight Generator Agent (LLM simulated):
    - Generate human-readable business insights
    - (Optionally hook up to openai or gemini here)
    """
    insights = []
    
    total_sales = kpis.get("total_sales", 0)
    
    insights.append(f"The total recorded sales volume corresponds to ${total_sales:,.2f}.")
    
    if actions:
        insights.append(f"There are {len(actions)} recommended actions to optimize operations and revenue.")
        # We take a top action to highlight
        insights.append(f"Priority Recommendation: {actions[0]}")
        
    insights.append("Historical data suggests a strong correlation between peak stock availability and higher conversion rates.")
    
    return insights

# Optional: Real Gemini/OpenAI integration
# import google.generativeai as genai
# import os
# 
# def _generate_real_insights(prompt):
#     genai.configure(api_key=os.environ["GEMINI_API_KEY"])
#     model = genai.GenerativeModel('gemini-1.5-pro-latest')
#     response = model.generate_content(prompt)
#     return response.text
