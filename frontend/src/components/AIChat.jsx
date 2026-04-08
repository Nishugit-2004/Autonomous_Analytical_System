import { useState } from 'react';
import { Send, Sparkles, User, Bot, Loader2 } from 'lucide-react';

const AIChat = ({ results }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your AI Retail Analyst. based on your latest data, what would you like to know? Try asking "Which product is performing worst?" or "Simulate a 10% price drop on top items".' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      // Direct call to our backend api
      const response = await fetch('http://localhost:8000/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userMsg })
      });
      const data = await response.json();
      
      setMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error while contacting AI subsystem.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Sparkles className="text-emerald-400" /> Natural Language Query
        </h2>
        <p className="text-slate-400">Ask questions about your data in plain English</p>
      </div>

      <div className="flex-1 premium-card flex flex-col overflow-hidden bg-slate-900/50">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[80%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  msg.role === 'user' ? 'bg-blue-600' : 'bg-emerald-600'
                }`}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-4 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-sm' 
                    : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-sm'
                }`}>
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="flex max-w-[80%] gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center">
                  <Bot size={16} />
                </div>
                <div className="p-4 rounded-2xl bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-sm flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-emerald-400" /> Thinking...
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-700/50 bg-slate-800/50">
          <form onSubmit={sendMessage} className="relative">
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="e.g., Which region had the highest growth?" 
              className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl pl-4 pr-12 py-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner"
            />
            <button 
              type="submit" 
              disabled={loading}
              className="absolute right-2 top-2 bottom-2 aspect-square bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center justify-center transition-colors shadow-md disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
