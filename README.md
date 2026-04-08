# RetailPulse AI: Autonomous Retail Intelligence System

I have successfully built the multi-agent AI system and premium dashboard!
Here is the layout and how to run it.

## 📁 System Architecture
```text
e:\Retail_Analytics\
├── sample_data.csv          <-- Use this to test the ingestion!
├── backend/
│   ├── main.py              <-- FastAPI orchestrator
│   ├── requirements.txt
│   └── agents/
│       ├── data_cleaning.py
│       ├── analysis.py
│       ├── demand_forecast.py
│       ├── inventory.py
│       ├── pricing.py
│       ├── decision_engine.py
│       └── insights.py
└── frontend/
    ├── package.json
    ├── tailwind.config.js
    └── src/
        ├── index.css        <-- Premium dark-theme CSS
        ├── App.jsx          <-- Hub layout
        └── components/
            ├── Sidebar.jsx
            ├── UploadData.jsx
            ├── Dashboard.jsx
            ├── Predictions.jsx
            ├── Alerts.jsx
            └── AIChat.jsx
```

## 🚀 How to Run Locally

You will need two separate terminal windows.

### 1. Start the AI Backend
```powershell
cd backend
.\venv\Scripts\Activate.ps1
uvicorn main:app --reload --port 8000
```

### 2. Start the Frontend Application
```powershell
cd frontend
npm run dev
```

*Navigate to the Vite dev server URL (`http://localhost:5173`) in your browser to view the application.*
