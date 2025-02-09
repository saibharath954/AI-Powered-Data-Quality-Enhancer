from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import os
import uvicorn

# Import the enhance_data function
from models.data_quality_enhancer import enhance_data

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5173","http://localhost:5173"],  # Allow frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    if file.filename.endswith(".csv"):
        df = pd.read_csv(file.file)
    elif file.filename.endswith(".pdf"):
        # Handle PDF files (e.g., extract tables)
        df = pd.DataFrame()  # Placeholder
    else:
        raise HTTPException(status_code=400, detail="Invalid file format.")

    # Enhance data using AI model
    enhanced_df, suggestions = enhance_data(df)

    # Save enhanced data to a file
    enhanced_df.to_csv("enhanced_data.csv", index=False)
    print("Enhanced data saved to enhanced_data.csv")  # Log success message

    return JSONResponse(content={"message": "File processed successfully.", "suggestions": suggestions})

@app.get("/dashboard")
async def get_dashboard():
    # Check if the enhanced_data.csv file exists
    if not os.path.exists("enhanced_data.csv"):
        raise HTTPException(status_code=404, detail="No enhanced data found. Please upload a file first.")

    # Generate insights and charts
    df = pd.read_csv("enhanced_data.csv")
    charts = [
        {
            "x": df.columns.tolist(),
            "y": df.select_dtypes(include=['number']).mean().tolist(),
            "type": "bar",
            "name": "Column Averages",
        }
    ]
    return JSONResponse(content={"charts": charts})

@app.get("/download")
async def download_file():
    # Serve the enhanced dataset for download
    if not os.path.exists("enhanced_data.csv"):
        raise HTTPException(status_code=404, detail="No enhanced data found. Please upload a file first.")
    return FileResponse("enhanced_data.csv", filename="enhanced_data.csv")

def enhance_data(df):
    # Placeholder for data enhancement logic
    return df, ["No enhancements applied."]

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)