import { useState } from 'react';
import { Save, User, Bell, Shield, Database } from 'lucide-react';

const SettingsPage = () => {
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl">
       <div>
         <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Settings & Preferences</h1>
         <p className="text-slate-500">Configure your RetailPulse AI environment and notification preferences.</p>
       </div>
       
       <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
           <div className="space-y-2">
               {['Profile', 'Notifications', 'Data Connections', 'Security'].map((tab, idx) => (
                  <button key={tab} className={`w-full text-left px-4 py-2 rounded-lg font-bold ${idx === 0 ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-slate-500 hover:bg-slate-100'}`}>
                      {tab}
                  </button>
               ))}
           </div>
           
           <div className="md:col-span-3 premium-card p-8">
               <h3 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Profile Configuration</h3>
               <form onSubmit={handleSave} className="space-y-6">
                   <div className="grid grid-cols-2 gap-6">
                       <div>
                           <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                           <input type="text" defaultValue="Admin User" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:ring-2 focus:ring-primary outline-none" />
                       </div>
                       <div>
                           <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                           <input type="email" defaultValue="admin@retailpulse.ai" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:ring-2 focus:ring-primary outline-none" />
                       </div>
                   </div>
                   
                   <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">OpenAI / Gemini API Key (Optional)</label>
                       <input type="password" placeholder="sk-..." className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:ring-2 focus:ring-primary outline-none font-mono" />
                       <p className="text-xs text-slate-500 mt-2 font-medium">Providing a live API key disables mocked data and activates live Generative AI interactions.</p>
                   </div>
                   
                   <div className="pt-4 flex items-center justify-between">
                       <span className={`text-emerald-500 font-bold transition-opacity ${saved ? 'opacity-100' : 'opacity-0'}`}>Settings Saved!</span>
                       <button type="submit" className="btn-primary inline-flex items-center gap-2">
                           <Save size={18}/> Save Changes
                       </button>
                   </div>
               </form>
           </div>
       </div>
    </div>
  );
};

export default SettingsPage;
