import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'ZOCIETY | Built for the Undefined',
  description: 'Dark editorial streetwear meets Scandinavian minimalism.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F4F1EC] text-[#0A0A0A] selection:bg-[#3A0D0D] selection:text-[#F4F1EC] font-sans antialiased flex flex-col">
       {/* Navigation */}
        {/* PERBAIKAN: Mengganti 'p-6 md:p-8' menjadi 'py-3 px-6 md:py-4 md:px-8' agar header lebih tipis */}
        <nav className="fixed w-full top-0 z-50 flex justify-between items-center py-3 px-6 md:py-4 md:px-8 uppercase tracking-widest text-xs font-medium bg-[#0A0A0A] text-[#F4F1EC] border-b border-[#3A0D0D]/30">
          <Link href="/" className="text-xl md:text-2xl tracking-[0.3em] font-bold hover:text-[#BFBFBF] transition-colors">
            ZOCIETY
          </Link>
          <div className="flex space-x-6 md:space-x-12">
            <Link href="/shop" className="hover:text-[#BFBFBF] transition-colors">Shop</Link>
            <Link href="/journal" className="hover:text-[#BFBFBF] transition-colors">Journal</Link>
            <Link href="/about" className="hover:text-[#BFBFBF] transition-colors">About</Link>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow">{children}</main>
        
        {/* Footer */}
        <footer className="bg-[#0A0A0A] text-[#F4F1EC] pt-24 pb-12 px-8 w-full border-t border-[#3A0D0D]/30">
          <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-20">
            
            {/* Kolom 1: Newsletter & Brand */}
            <div className="md:col-span-2 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl tracking-[0.3em] font-bold mb-6">ZOCIETY</h2>
                <p className="text-[#BFBFBF] text-xs uppercase tracking-widest mb-8 max-w-sm leading-relaxed">
                  Join the Undefined. Receive early access to new collections and editorial dispatches.
                </p>
              </div>
              {/* Form Newsletter Minimalis */}
              <form className="flex w-full max-w-sm border-b border-[#BFBFBF]/50 pb-2 transition-colors focus-within:border-[#F4F1EC]">
                <input 
                  type="email" 
                  placeholder="EMAIL ADDRESS" 
                  className="bg-transparent w-full text-xs tracking-widest outline-none placeholder:text-[#BFBFBF]/40 text-[#F4F1EC]"
                />
                <button type="submit" className="text-xs uppercase tracking-widest text-[#BFBFBF] hover:text-[#F4F1EC] transition-colors ml-4">
                  Subscribe
                </button>
              </form>
            </div>

            {/* Kolom 2: Menu Eksplorasi */}
            <div className="flex flex-col space-y-4 text-xs uppercase tracking-widest text-[#BFBFBF]">
              <span className="text-[#F4F1EC] font-bold mb-2 tracking-[0.2em]">Explore</span>
              <Link href="/shop" className="hover:text-[#F4F1EC] transition-colors">Shop Collection</Link>
              <Link href="/journal" className="hover:text-[#F4F1EC] transition-colors">Journal</Link>
              <Link href="/about" className="hover:text-[#F4F1EC] transition-colors">Philosophy</Link>
            </div>

            {/* Kolom 3: Customer Care & Social */}
            <div className="flex flex-col space-y-4 text-xs uppercase tracking-widest text-[#BFBFBF]">
              <span className="text-[#F4F1EC] font-bold mb-2 tracking-[0.2em]">Support</span>
              <a href="#" className="hover:text-[#F4F1EC] transition-colors">Shipping & Returns</a>
              <a href="#" className="hover:text-[#F4F1EC] transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-[#F4F1EC] transition-colors mt-4">TikTok</a>
              <a href="#" className="hover:text-[#F4F1EC] transition-colors mt-4">Instagram</a>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] tracking-widest text-[#BFBFBF]/60 uppercase border-t border-[#BFBFBF]/20 pt-8">
            <p>© {new Date().getFullYear()} ZOCIETY. All Rights Reserved.</p>
            <p className="mt-4 md:mt-0">Built for the Undefined</p>
          </div>
        </footer>
      </body>
    </html>
  );
}