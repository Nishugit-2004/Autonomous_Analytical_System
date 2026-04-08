import { useAppContext } from '../context/AppContext';
import Hero from '../components/Hero';
import KPIOverview from '../components/KPIOverview';
import Dashboard from '../components/Dashboard';
import EmptyState from '../components/EmptyState';

const DashboardPage = () => {
  const { dataLoaded, results } = useAppContext();

  if (!dataLoaded) {
    return (
        <div className="animate-in fade-in duration-500">
            <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Dashboard</h1>
            <EmptyState title="No data available" message="Please upload a dataset or image to view your customized dashboard." />
        </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <Hero results={results} />
      <KPIOverview results={results} />
      <Dashboard results={results} />
    </div>
  );
};

export default DashboardPage;
