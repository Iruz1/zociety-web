import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Inisialisasi Supabase Client khusus untuk storage
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Gunakan Service Role Key agar punya izin upload
);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    // Buat nama file unik: produk-12345.jpg
    const fileName = `${Date.now()}-${file.name.replace(/\s/g, '-')}`;

    // Upload ke bucket "products"
    const { data, error } = await supabase.storage
      .from('products')
      .upload(fileName, file);

    if (error) throw error;

    // Ambil Link URL publiknya
    const { data: publicUrl } = supabase.storage
      .from('products')
      .getPublicUrl(fileName);

    return NextResponse.json({ url: publicUrl.publicUrl });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}