import React, { useState } from 'react';
import robotIcon from '@/assets/onboarding/robot-icon.svg';
import { X, Sparkles, Send, Lightbulb, CheckCircle2 } from 'lucide-react';

const STEP_TIPS = {
  1: {
    title: 'Welcome to MarketFlow AI',
    subtitle: 'AI Store Initialization Assistant',
    suggestions: [
      'What are the 5 onboarding steps?',
      'Can I change my store settings later?',
      'How does AI help automate pricing & inventory?',
    ],
  },
  2: {
    title: 'Store Setup Suggestions',
    subtitle: 'AI Brand & Domain Advisor',
    suggestions: [
      'Suggest a catchy brand name for my fashion store',
      'How should I choose between Minimal, Modern, or Elegant theme?',
      'What dimensions are best for store logos?',
    ],
  },
  3: {
    title: 'Business Info & Niche',
    subtitle: 'Market Intelligence Advisor',
    suggestions: [
      'Which category fits custom handmade items?',
      'How do I write a compelling business description?',
      'Help me define my ideal target audience',
    ],
  },
  4: {
    title: 'Store Preferences & Regional Settings',
    subtitle: 'Localization Engine',
    suggestions: [
      'Can I support multiple currencies later?',
      'How does timezone affect daily sales reporting?',
      'What is the recommended date format for global buyers?',
    ],
  },
  5: {
    title: 'Store Ready & Next Steps',
    subtitle: 'Launch Assistant',
    suggestions: [
      'How do I add my first product?',
      'How do I connect Stripe / PayPal?',
      'How do I enable MarketFlow AI auto-pricing?',
    ],
  },
};

export const AIAssistantWidget = ({ currentStep = 1, storeName = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hello! I'm your MarketFlow AI setup assistant. I'm here to help you configure your store for maximum conversion. Feel free to ask me anything or click a suggestion below!`,
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const tips = STEP_TIPS[currentStep] || STEP_TIPS[1];

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const userMsg = { sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal('');

    setIsTyping(true);

    setTimeout(() => {
      let aiReply = `Great question! `;
      if (text.toLowerCase().includes('category') || text.toLowerCase().includes('niche')) {
        aiReply += `For your store, selecting the most precise category helps our AI pricing algorithms benchmark your products against the most relevant competitors.`;
      } else if (text.toLowerCase().includes('theme') || text.toLowerCase().includes('minimal') || text.toLowerCase().includes('modern')) {
        aiReply += `The Modern theme is recommended for high-tech, apparel, and dynamic catalogs with hero spotlights. Minimal is ideal for boutique items, and Elegant suits luxury or artisanal goods.`;
      } else if (text.toLowerCase().includes('name') || text.toLowerCase().includes('domain') || text.toLowerCase().includes('url')) {
        aiReply += `Keep your store name memorable and under 3 words. Your custom URL slug will automatically route customers to ${storeName ? storeName.toLowerCase().replace(/[^a-z0-9]/g, '') : 'yourstore'}.marketflow.ai!`;
      } else {
        aiReply += `MarketFlow AI dynamically analyzes your store profile to auto-generate catalog tags, optimize checkout conversion, and automate your inventory sync. You're in great hands!`;
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: aiReply }]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Floating Robot Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.7)] hover:shadow-[0_0_28px_rgba(37,99,235,0.9)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group"
          title="MarketFlow AI Assistant"
        >
          <img
            src={robotIcon}
            alt="AI Assistant"
            className="w-7 h-7 sm:w-8 sm:h-8 object-contain select-none transition-transform group-hover:rotate-12"
          />
          {/* Active Ping indicator */}
          <span className="absolute top-0 right-0 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-400 border-2 border-white"></span>
          </span>
        </button>
      </div>

      {/* AI Assistant Chat Drawer */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[92vw] sm:w-[380px] h-[520px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 flex flex-col overflow-hidden animate-modal-in">
          {/* Header */}
          <div className="bg-[#2563eb] text-white px-4 py-3.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-cyan-200" />
              </div>
              <div>
                <h4 className="text-sm font-bold leading-tight flex items-center gap-1.5">
                  MarketFlow AI Copilot
                </h4>
                <p className="text-xs text-blue-100">{tips.subtitle}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/20 text-white/80 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Step Suggestions */}
          <div className="bg-slate-50 border-b border-slate-200 p-3 shrink-0">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              Quick Suggestions for Step {currentStep}
            </p>
            <div className="flex flex-col gap-1.5">
              {tips.suggestions.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(s)}
                  className="text-left text-xs bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer truncate"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-white text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${
                  m.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#2563eb] text-white rounded-br-none'
                      : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200/60'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-1.5 text-slate-400 text-xs pl-2 py-1">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-2.5 border-t border-slate-200 bg-slate-50 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask MarketFlow AI..."
              className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="p-2 bg-[#2563eb] hover:bg-blue-700 disabled:opacity-40 text-white rounded-lg transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AIAssistantWidget;
