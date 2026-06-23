import { NextResponse, type NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  // 1. Ambil token dari cookies
  const token = request.cookies.get('admin_token')?.value;
  const { pathname } = request.nextUrl;

  // 2. Proteksi rute /admin
  if (pathname.startsWith('/admin')) {
    // Jika tidak ada token, langsung arahkan ke login
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      // 3. Verifikasi apakah token asli atau palsu/kadaluarsa
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
      
      // Jika valid, izinkan lanjut ke dashboard
      return NextResponse.next();
    } catch (err) {
      // Jika token tidak valid, hapus cookie dan paksa login ulang
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('admin_token');
      return response;
    }
  }

  // 4. Biarkan rute lain (seperti halaman toko publik) bisa diakses semua orang
  return NextResponse.next();
}

// 5. Tentukan rute mana saja yang harus diawasi oleh middleware ini
export const config = {
  matcher: ['/admin/:path*'],
};