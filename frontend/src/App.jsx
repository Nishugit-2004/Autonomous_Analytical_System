import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import UploadPage from './pages/UploadPage';
import PredictionsPage from './pages/PredictionsPage';
import InventoryPage from './pages/InventoryPage';
import SimulatorPage from './pages/SimulatorPage';
import InsightsPage from './pages/InsightsPage';
import AlertsPage from './pages/AlertsPage';
import SettingsPage from './pages/SettingsPage';
import { useAppContext } from './context/AppContext';

function App() {
  const { simpleMode, setSimpleMode, dataLoaded } = useAppContext();

  return (
    <div className="flex bg-background min-h-screen font-sans text-slate-800">
      <Sidebar />
      
      <main className="flex-1 lg:pl-64 flex flex-col h-screen overflow-hidden">
        {/* Top Navigation / Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-slate-800">RetailPulse AI</h1>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <span className={`text-sm font-medium ${simpleMode ? 'text-primary' : 'text-slate-500'}`}>Simple Mode</span>
              <button 
                onClick={() => setSimpleMode(!simpleMode)}
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center ${simpleMode ? 'bg-primary' : 'bg-slate-300'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform absolute ${simpleMode ? 'translate-x-7' : 'translate-x-1'}`} />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold shadow-md">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 pb-24">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/predictions" element={<PredictionsPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/simulator" element={<SimulatorPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
