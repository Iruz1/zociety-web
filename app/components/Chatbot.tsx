"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'WELCOME TO THE ARCHIVE. HOW CAN I ASSIST YOUR CURATION TODAY?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input.toUpperCase() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: 'ANALYZING REQUEST... OUR SYSTEM IS CURRENTLY MATCHING YOUR INTENT WITH OUR ARCHIVE.' 
      }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] font-sans flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            // PERPINDAHAN KANAN KE KIRI YANG SMOOTH
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 30, scale: 0.95, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 300, damping: 28, mass: 0.8 }}
            className="w-80 md:w-96 bg-[#0A0A0A]/70 backdrop-blur-md border border-neutral-800 shadow-2xl flex flex-col mb-4 rounded-none overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-neutral-800 flex justify-between items-center bg-black/20">
              <span className="text-[10px] tracking-[0.3em] text-[#F4F1EC] font-bold uppercase">ZOE</span>
              <button onClick={() => setIsOpen(false)} className="text-[#888888] hover:text-white text-[10px] tracking-widest uppercase transition-colors">CLOSE</button>
            </div>

            {/* Chat Area */}
            <div className="h-96 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] text-[10px] tracking-[0.15em] leading-relaxed p-3 ${
                    msg.role === 'user' 
                    ? 'bg-[#F4F1EC] text-[#0A0A0A] font-bold' 
                    : 'border border-neutral-800 text-[#BFBFBF]'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-neutral-800 flex gap-2 bg-black/20">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="TYPE YOUR INQUIRY..."
                className="flex-1 bg-transparent text-[10px] tracking-widest outline-none text-[#F4F1EC] placeholder:text-neutral-600"
              />
              <button onClick={handleSend} className="text-[#F4F1EC] text-[10px] font-bold tracking-widest hover:text-neutral-400 transition-colors">SEND</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#0A0A0A]/90 backdrop-blur-md border border-neutral-800 flex items-center justify-center hover:bg-black transition-all shadow-2xl relative group"
      >
        <motion.div
          // ROTASI SPRING YANG NYATU (TIDAK PAKAI MODE WAIT)
          animate={{ rotate: isOpen ? 135 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="relative w-4 h-4 flex items-center justify-center"
        >
          {/* Garis Horizontal */}
          <span className="absolute w-4 h-[1.5px] bg-[#F4F1EC]" />
          {/* Garis Vertikal */}
          <span className="absolute h-4 w-[1.5px] bg-[#F4F1EC]" />
        </motion.div>
      </button>
    </div>
  );
}