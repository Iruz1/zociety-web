"use server";

import prisma from '../lib/prisma'; 
import { revalidatePath } from 'next/cache';

export async function subscribeEmail(formData: FormData) {
  const email = formData.get('email') as string;

  if (!email) return;

  try {
    // 1. Simpan ke daftar subscriber (untuk database marketing)
    await prisma.subscriber.create({
      data: { email: email },
    });

    // 2. Kirim pesan otomatis ke INBOX (agar muncul di admin)
    await prisma.inbox.create({
      data: {
        name: "SYSTEM / NEWSLETTER",
        email: email,
        subject: "New Community Member Joined",
        message: `New subscriber alert: ${email} has joined the ZOCIETY mailing list via the footer link.`,
        isRead: false // Pesan baru, statusnya belum dibaca
      }
    });
    
    revalidatePath('/admin/inbox');
    
  } catch (error) {
    console.log("Error subscribing:", error);
  }
}