import { useAppContext } from '../context/AppContext';
import { Navigate } from 'react-router-dom';
import Alerts from '../components/Alerts';

const AlertsPage = () => {
  const { dataLoaded, results } = useAppContext();

  if (!dataLoaded) return <Navigate to="/upload" replace />;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
       <div>
         <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Warning & Action System</h1>
         <p className="text-slate-500">Active alerts raised automatically by the AI Decision Engine.</p>
       </div>
       
       <Alerts results={results} />
    </div>
  );
};

export default AlertsPage;
