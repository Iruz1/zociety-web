"use client";

import { useState } from 'react';

export default function InboxClient({ initialMessages }: { initialMessages: any[] }) {
  const [selectedMessage, setSelectedMessage] = useState(initialMessages[0] || null);

  // Hitung pesan yang belum dibaca untuk notifikasi
  const unreadCount = initialMessages.filter(m => !m.isRead).length;

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <header className="p-6 md:p-8 border-b border-[#0A0A0A]/20 flex-shrink-0 bg-[#F4F1EC]">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold tracking-widest uppercase text-[#0A0A0A]">Dispatch Inbox</h2>
            {/* NOTIFIKASI: Menampilkan jumlah pesan masuk */}
            <p className={`text-xs mt-2 uppercase tracking-widest ${unreadCount > 0 ? 'text-red-600 font-bold' : 'text-[#888888]'}`}>
              {unreadCount > 0 ? `● ${unreadCount} New Messages` : 'No new messages'}
            </p>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* List Pesan */}
        <div className="w-full md:w-2/5 border-r border-[#0A0A0A]/20 overflow-y-auto bg-white">
          {initialMessages.length === 0 && (
            <p className="p-8 text-xs uppercase tracking-widest text-center text-gray-400">Inbox is empty</p>
          )}
          {initialMessages.map((msg) => (
            <div 
              key={msg.id} 
              onClick={() => setSelectedMessage(msg)}
              className={`p-6 border-b border-neutral-200 cursor-pointer transition-colors ${selectedMessage?.id === msg.id ? 'bg-neutral-100' : 'hover:bg-neutral-50'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  {!msg.isRead && <span className="w-2 h-2 rounded-full bg-red-600"></span>}
                  <h3 className={`text-sm ${!msg.isRead ? 'font-bold' : ''}`}>{msg.name}</h3>
                </div>
                <span className="text-[10px] text-[#888888]">{new Date(msg.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-xs truncate font-medium">{msg.subject}</p>
            </div>
          ))}
        </div>

        {/* Detail Pesan */}
        <div className="hidden md:flex w-full md:w-3/5 bg-[#F4F1EC] flex-col overflow-y-auto p-8">
          {selectedMessage ? (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-xl font-bold mb-6 border-b border-black/10 pb-4">{selectedMessage.subject}</h2>
              <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-widest text-[#888888]">From</p>
                <p className="text-sm font-bold">{selectedMessage.name} ({selectedMessage.email})</p>
              </div>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{selectedMessage.message}</p>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-[10px] uppercase tracking-[0.3em] text-gray-400">
              Select a dispatch to read
            </div>
          )}
        </div>
      </div>
    </div>
  );
}