import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const AiFloatingWidget = ({ storeName }) => {
  const { user } = useAuth();
  const displayName = storeName || user?.store_name || user?.name || 'your store';

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: `Hello! I'm your MarketFlow AI Assistant. How can I help you grow ${displayName} today?`,
    },
  ]);
  const [input, setInput] = useState('');
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput('');

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Simulated instant smart AI response
    timeoutRef.current = setTimeout(() => {
      let reply = "I'm analyzing your store catalog and inventory data...";
      const lower = currentInput.toLowerCase();
      if (lower.includes('product') || lower.includes('add')) {
        reply = "To add your first product, click the '+ Add Product' button in the Top Products or Sales Chart card. I can help generate AI descriptions and pricing suggestions!";
      } else if (lower.includes('sale') || lower.includes('revenue')) {
        reply = "Your store is all set up! Once you start sharing your storefront link, sales and analytics will appear here in real-time.";
      } else if (lower.includes('inventory') || lower.includes('stock')) {
        reply = "All inventory thresholds are currently healthy. You'll receive automated low-stock warnings when products run low.";
      }

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'ai', text: reply },
      ]);
    }, 600);
  };

  return (
    <>
      {/* Floating Action Button (Node 719:8269) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-13 h-13 rounded-full bg-gradient-to-tr from-[#6366f1] via-[#3b82f6] to-[#0ea5e9] text-white flex items-center justify-center shadow-[0_8px_25px_rgba(59,130,246,0.5)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer group"
          aria-label="Open MarketFlow AI Assistant"
        >
          {/* Ambient Glow Pulse */}
          <span className="absolute inset-0 rounded-full bg-blue-400 opacity-40 animate-ping pointer-events-none" />

          {isOpen ? (
            <X size={22} className="relative z-10" />
          ) : (
            <span className="text-xl font-bold relative z-10">✦</span>
          )}
        </button>
      </div>

      {/* Floating Interactive Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-22 right-6 w-[360px] sm:w-[400px] bg-white dark:bg-[#091530] rounded-2xl shadow-2xl border border-slate-200/80 dark:border-[#1e3a75] overflow-hidden z-40 animate-modal-in flex flex-col h-[480px]">
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-[#070e20] to-[#0d1c42] p-4 text-white flex items-center justify-between border-b border-[#142347]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-[#38bdf8]">
                <Bot size={18} />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">MarketFlow AI</h4>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online · Assistant</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#f8fafc] dark:bg-[#060c1d] text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2 ${
                  m.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {m.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                    ✦
                  </div>
                )}
                <div
                  className={`p-3 rounded-xl max-w-[80%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#2563eb] text-white rounded-tr-xs'
                      : 'bg-white dark:bg-[#0c1836] text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-[#1e3a75] shadow-xs rounded-tl-xs'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-1.5 bg-slate-100/70 dark:bg-[#091530] border-t border-slate-200/50 dark:border-[#1e3a75]/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[10px]">
            <button
              type="button"
              onClick={() => setInput('How do I add products?')}
              className="px-2.5 py-1 bg-white dark:bg-[#0c1836] hover:bg-slate-50 dark:hover:bg-[#122244] border border-slate-200 dark:border-[#1e3a75] rounded-full text-slate-600 dark:text-slate-300 shrink-0 cursor-pointer transition-colors"
            >
              💡 How do I add products?
            </button>
            <button
              type="button"
              onClick={() => setInput('Optimize my store SEO')}
              className="px-2.5 py-1 bg-white dark:bg-[#0c1836] hover:bg-slate-50 dark:hover:bg-[#122244] border border-slate-200 dark:border-[#1e3a75] rounded-full text-slate-600 dark:text-slate-300 shrink-0 cursor-pointer transition-colors"
            >
              🚀 Store SEO tips
            </button>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-white dark:bg-[#091530] border-t border-slate-100 dark:border-[#142347] flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask anything about your store..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 h-9 px-3 text-xs bg-slate-50 dark:bg-[#0c1836] border border-slate-200 dark:border-[#1e3a75] rounded-lg text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-9 h-9 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-lg flex items-center justify-center shrink-0 cursor-pointer transition-colors shadow-xs"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AiFloatingWidget;
