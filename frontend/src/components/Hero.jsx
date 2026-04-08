import { Bot, BellRing } from 'lucide-react';

const Hero = ({ results }) => {
  const alertCount = results?.alerts?.length || 0;
  
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-secondary p-10 text-white shadow-xl">
      {/* Decorative background circles */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-white opacity-10 rounded-full blur-2xl"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            System Online
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">AI Command Center</h1>
          <p className="text-indigo-100 text-lg md:text-xl font-light">
            Transform your retail data into smart decisions. Upload your historical sales, and let our multi-agent architecture uncover trends, predict demand, and optimize operations.
          </p>
        </div>
        
        <div className="flex flex-col gap-4 min-w-[200px]">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex items-center gap-4 hover:bg-white/20 transition-colors">
            <div className="p-3 bg-white/20 rounded-xl">
              <Bot className="text-white" size={24} />
            </div>
            <div>
              <p className="text-indigo-100 text-sm">Active Agents</p>
              <p className="font-bold text-2xl">5</p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex items-center gap-4 hover:bg-white/20 transition-colors">
            <div className="p-3 bg-rose-500/80 rounded-xl">
              <BellRing className="text-white" size={24} />
            </div>
            <div>
              <p className="text-indigo-100 text-sm">Alerts Detected</p>
              <p className="font-bold text-2xl">{alertCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
