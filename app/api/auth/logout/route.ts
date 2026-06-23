import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = await cookies();
    
    // Hapus cookie dengan cara menset expired-nya ke masa lalu
    cookieStore.set('admin_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(0), // Set ke tahun 1970 (langsung mati)
      path: '/',
    });

    return NextResponse.json({ success: true, message: "Logged out" });
  } catch (error) {
    return NextResponse.json({ message: "Logout failed" }, { status: 500 });
  }
}