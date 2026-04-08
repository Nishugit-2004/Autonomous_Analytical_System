import pandas as pd
import numpy as np

def clean_data(df: pd.DataFrame) -> pd.DataFrame:
    """
    Data Cleaning Agent:
    - Removes duplicates
    - Handles missing values
    - Normalizes formats
    """
    cleaned_df = df.copy()
    
    # Remove duplicates
    cleaned_df = cleaned_df.drop_duplicates()
    
    # Try to identify a date column and normalize it
    date_cols = [col for col in cleaned_df.columns if 'date' in col.lower() or 'time' in col.lower()]
    for col in date_cols:
        try:
            cleaned_df[col] = pd.to_datetime(cleaned_df[col])
        except Exception:
            pass
            
    # Handle missing values: 
    # For numeric columns, fill with median
    num_cols = cleaned_df.select_dtypes(include=[np.number]).columns
    for col in num_cols:
        cleaned_df[col] = cleaned_df[col].fillna(cleaned_df[col].median())
        
    # For categorical columns, fill with mode or 'Unknown'
    cat_cols = cleaned_df.select_dtypes(exclude=[np.number, 'datetime']).columns
    for col in cat_cols:
        cleaned_df[col] = cleaned_df[col].fillna('Unknown')
    
    # Ensure column names are stripped and lowercase for easier reference
    cleaned_df.columns = [str(c).strip().lower() for c in cleaned_df.columns]
        
    return cleaned_df
