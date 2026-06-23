import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

export async function POST(request) {
  try {
    const { message, userId } = await request.json();

    // 1. Kirim pesan ke Server AI Python (FastAPI) untuk diprediksi
    const aiResponse = await fetch('http://127.0.0.1:8000/api/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: message }),
    });

    if (!aiResponse.ok) {
      throw new Error('Gagal terhubung ke server AI');
    }

    const aiData = await aiResponse.json(); 
    // aiData berisi: { intent: "...", confidence: 0.95 }

    // 2. TODO: Logika penanganan pesan dinamis berdasarkan intent & data database
    let finalBotReply = "";
    
    if (aiData.confidence >= 0.75) {
      if (aiData.intent === "ASK_SHIPPING") {
        // Jika user nanya shipping dan sudah login, kueri data ordernya di sini
        if (userId) {
          const lastOrder = await prisma.order.findFirst({
            where: { userId: userId },
            orderBy: { createdAt: 'desc' }
          });
          finalBotReply = lastOrder 
            ? `PESANAN ANDA DENGAN ID #${lastOrder.id} SAAT INI BERSTATUS: ${lastOrder.status}.`
            : "ANDA BELUM MEMILIKI RIWAYAT PESANAN.";
        } else {
          finalBotReply = "SILAKAN LOGIN TERLEBIH DAHULU UNTUK MEMERIKSA STATUS PENGIRIMAN ANDA.";
        }
      } else {
        // Intent lainnya (contoh: GREET atau ASK_MATERIAL)
        finalBotReply = "WELCOME TO THE ARCHIVE. HOW CAN I ASSIST YOUR CURATION TODAY?";
      }
    } else {
      finalBotReply = "I'M SORRY, I DON'T QUITE CATCH THAT. COULD YOU REPHRASE YOUR INQUIRY?";
    }

    // 3. SIMPAN HASILNYA KE TABEL CHATBOTLOG
    const newLog = await prisma.chatbotLog.create({
      data: {
        userId: userId || null, // Diisi id user jika sudah login
        userMessage: message,
        predictedIntent: aiData.intent,
        confidenceScore: aiData.confidence,
        botResponse: finalBotReply,
      },
    });

    // 4. Balikin respons final ke komponen UI Chatbot
    return NextResponse.json({ 
      success: true, 
      reply: finalBotReply 
    });

  } catch (error) {
    console.error("Error pada API Chatbot:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}