"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Papa, { ParseResult } from 'papaparse';

interface KnowledgeBaseEntry {
  question: string;
  answer: string;
  [key: string]: string;
}

interface ChatLogEntry {
  input: string;
  intent: string;
  confidence: string;
  status: string;
  [key: string]: string;
}

export default function ChatbotAdmin() {
  const [activeTab, setActiveTab] = useState('Knowledge Base');
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeBaseEntry[]>([]);
  const [chatLogs, setChatLogs] = useState<ChatLogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fungsi buat tarik data dari CSV langsung
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch Knowledge Base
        const kbRes = await fetch('/knowledge.csv');
        const kbText = await kbRes.text();
        Papa.parse(kbText, {
          header: true,
          complete: (results: ParseResult<KnowledgeBaseEntry>) => setKnowledgeBase(results.data),
        });

        // Fetch Chat Logs
        const logRes = await fetch('/chat_logs.csv');
        const logText = await logRes.text();
        Papa.parse(logText, {
          header: true,
          complete: (results: ParseResult<ChatLogEntry>) => setChatLogs(results.data),
        });
      } catch (error) {
        console.error("Gagal load CSV:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F1EC] text-[#0A0A0A] flex flex-col md:flex-row absolute inset-0 z-[100]">
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-[#0A0A0A] text-[#F4F1EC] hidden md:flex flex-col border-r border-[#3A0D0D]/30 shadow-2xl">
        <div className="p-8 border-b border-[#3A0D0D]/30">
          <h1 className="text-xl tracking-[0.3em] font-bold">ZOCIETY</h1>
          <p className="text-[9px] tracking-[0.3em] text-[#888888] mt-2 uppercase">AI Control Center</p>
        </div>
        <nav className="flex-1 p-6 space-y-6 text-[10px] uppercase tracking-widest">
          <Link href="/admin" className="block text-[#888888] hover:text-white transition-colors">DASHBOARD</Link>
          <Link href="/admin/po-manager" className="block text-[#888888] hover:text-white transition-colors">PO Manager</Link>
          <Link href="/admin/chatbot" className="block text-white font-bold border-l-2 border-white pl-4">Chatbot Manager</Link>
        </nav>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <header className="mb-12 border-b border-black/10 pb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-[0.2em] uppercase">Bot Intelligence</h1>
            <p className="text-[10px] text-[#888888] mt-2 uppercase tracking-[0.3em]">Random Forest Classification Engine</p>
          </div>
          <button className="px-6 py-3 bg-red-600 text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-red-700 transition-all shadow-lg animate-pulse">
            ⚡ Retrain Model
          </button>
        </header>

        {/* Statistik Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 border border-neutral-200 shadow-sm">
            <p className="text-[9px] text-[#888888] uppercase tracking-widest mb-2">Confidence Level</p>
            <p className="text-2xl font-bold tracking-tighter text-green-600">92.4%</p>
          </div>
          <div className="bg-white p-6 border border-neutral-200 shadow-sm">
            <p className="text-[9px] text-[#888888] uppercase tracking-widest mb-2">Total Datasets</p>
            <p className="text-2xl font-bold tracking-tighter">{knowledgeBase.length} Intents</p>
          </div>
          <div className="bg-white p-6 border border-neutral-200 shadow-sm">
            <p className="text-[9px] text-[#888888] uppercase tracking-widest mb-2">Failure Rate</p>
            <p className="text-2xl font-bold tracking-tighter text-red-500">4.1%</p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex gap-8 mb-8 border-b border-neutral-200">
          {['Knowledge Base', 'Chat Logs'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-[10px] uppercase tracking-[0.3em] transition-all ${activeTab === tab ? 'text-black border-b-2 border-black font-bold' : 'text-[#888888] hover:text-black'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* --- DYNAMIC TAB CONTENT --- */}
        <div className="bg-white border border-neutral-200 shadow-xl overflow-hidden">
          {isLoading ? (
            <div className="p-20 text-center text-[10px] uppercase tracking-widest animate-pulse">Synchronizing CSV Archive...</div>
          ) : (
            <>
              {/* TAB 1: KNOWLEDGE BASE */}
              {activeTab === 'Knowledge Base' && (
                <table className="w-full text-left text-[11px] uppercase tracking-widest">
                  <thead className="bg-[#0A0A0A] text-white">
                    <tr>
                      <th className="p-5 font-medium">Intent</th>
                      <th className="p-5 font-medium w-1/3">Training Patterns</th>
                      <th className="p-5 font-medium text-right">System Response</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 italic">
                    {knowledgeBase.map((kb, i) => kb.intent && (
                      <tr key={i} className="hover:bg-neutral-50 transition-colors">
                        <td className="p-5 font-bold text-black">{kb.intent}</td>
                        <td className="p-5 text-neutral-500 lowercase">{kb.patterns}</td>
                        <td className="p-5 text-black text-right text-[9px] leading-relaxed max-w-xs">{kb.response}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* TAB 2: CHAT LOGS */}
              {activeTab === 'Chat Logs' && (
                <table className="w-full text-left text-[11px] uppercase tracking-widest">
                  <thead className="bg-[#0A0A0A] text-white">
                    <tr>
                      <th className="p-5 font-medium">User Input</th>
                      <th className="p-5 font-medium">Predicted Intent</th>
                      <th className="p-5 font-medium">Confidence</th>
                      <th className="p-5 font-medium text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {chatLogs.map((log, i) => log.input && (
                      <tr key={i} className="hover:bg-neutral-50 transition-colors">
                        <td className="p-5 text-black">&quot;{log.input}&quot;</td>
                        <td className="p-5 font-bold">{log.intent}</td>
                        <td className="p-5">
                          <div className="w-24 h-1 bg-neutral-100 relative">
                            <div className={`absolute h-full ${parseFloat(log.confidence) > 0.7 ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: `${parseFloat(log.confidence) * 100}%` }} />
                          </div>
                          <span className="text-[8px] mt-1 block">{(parseFloat(log.confidence) * 100).toFixed(1)}%</span>
                        </td>
                        <td className="p-5 text-right">
                          <span className={`text-[9px] font-bold px-2 py-1 ${log.status === 'MATCHED' ? 'text-green-600' : 'text-red-500'}`}>
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}