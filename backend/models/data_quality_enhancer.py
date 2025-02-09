import pandas as pd

def enhance_data(df):
    # Detect missing values
    missing_values = df.isnull().sum()

    # Detect duplicates
    duplicates = df.duplicated().sum()

    # Detect anomalies (example: outliers in numeric columns)
    anomalies = {}
    for col in df.select_dtypes(include=['number']).columns:
        q1 = df[col].quantile(0.25)
        q3 = df[col].quantile(0.75)
        iqr = q3 - q1
        anomalies[col] = df[(df[col] < (q1 - 1.5 * iqr)) | (df[col] > (q3 + 1.5 * iqr))].shape[0]

    # Suggestions for cleaning
    suggestions = [
        f"Missing values detected: {missing_values}",
        f"Duplicates detected: {duplicates}",
        f"Anomalies detected: {anomalies}",
    ]

    # Clean data
    df = df.dropna().drop_duplicates()
    print ("Data cleaned successfully.")

    return df, suggestions