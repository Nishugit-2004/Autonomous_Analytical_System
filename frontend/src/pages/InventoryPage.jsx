import { useAppContext } from '../context/AppContext';
import { Package, ArrowDown, ArrowUp } from 'lucide-react';
import EmptyState from '../components/EmptyState';

const InventoryPage = () => {
    const { dataLoaded, results } = useAppContext();

    if (!dataLoaded) {
        return (
            <div className="animate-in fade-in duration-500">
                <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Inventory Management</h1>
                <EmptyState title="Inventory levels unknown" message="Upload stock data to analyze your inventory performance." />
            </div>
        );
    }

    const inventory = results?.inventory || [];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Inventory Management</h1>
                <p className="text-slate-500">Stock analysis mapping physical items against forecasted demand.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inventory.map((item, idx) => {
                    const isUnder = item.status === 'Understock';
                    const isOver = item.status === 'Overstock';

                    return (
                        <div key={idx} className="premium-card p-6 border-t-4" style={{ borderTopColor: isUnder ? '#f43f5e' : (isOver ? '#f59e0b' : '#3b82f6') }}>
                            <div className="flex justify-between items-center mb-4">
                                <div className="p-2 bg-slate-100 rounded-lg text-slate-600"><Package size={20} /></div>
                                <span className={`px-2 py-1 text-xs font-bold rounded-md ${isUnder ? 'bg-rose-100 text-rose-600' : (isOver ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600')}`}>
                                    {item.status}
                                </span>
                            </div>
                            <h3 className="font-bold text-lg text-slate-800 mb-1">{item.product}</h3>
                            <div className="space-y-2 mt-4 text-sm font-medium">
                                <div className="flex justify-between text-slate-500">
                                    <span>Current Stock:</span> <span className="text-slate-800">{item.current_stock} units</span>
                                </div>
                                <div className="flex justify-between text-slate-500">
                                    <span>Predicted Demand:</span> <span className="text-slate-800">{item.predicted_demand} units</span>
                                </div>
                            </div>

                            {isUnder && (
                                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between font-bold text-rose-600 text-sm">
                                    <span className="flex items-center gap-1"><ArrowUp size={16} /> Suggested Restock</span>
                                    <span>+{item.suggested_restock} units</span>
                                </div>
                            )}
                            {isOver && (
                                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between font-bold text-amber-600 text-sm">
                                    <span className="flex items-center gap-1"><ArrowDown size={16} /> Action Required</span>
                                    <span>Clearance Promo</span>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default InventoryPage;
