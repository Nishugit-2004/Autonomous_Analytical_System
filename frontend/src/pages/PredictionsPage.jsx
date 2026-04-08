import { useAppContext } from '../context/AppContext';
import Predictions from '../components/Predictions';
import EmptyState from '../components/EmptyState';

const PredictionsPage = () => {
  const { dataLoaded, results } = useAppContext();

  if (!dataLoaded) {
     return (
        <div className="animate-in fade-in duration-500">
            <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Demand Forecasting</h1>
            <EmptyState title="No predictions available" message="Upload a dataset to generate forecasted demand models." />
        </div>
     );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
       <div>
         <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Demand Forecasting</h1>
         <p className="text-slate-500">AI-powered unit projection models based on historical trends.</p>
       </div>
       <Predictions results={results} />
    </div>
  );
};

export default PredictionsPage;
