import './globals.css';
import { subscribeEmail } from './actions/newsletter';
import { CurrencyProvider } from './context/CurrencyContext';
import Link from 'next/link';
import CurrencySwitcher from './components/CurrencySwitcher';
import Chatbot from './components/Chatbot';
import Navbar from './components/Navbar'; // Import Navbar baru lu

export const metadata = {
  title: 'ZOCIETY | ON OUR TERMZ',
  description: 'Dark editorial streetwear meets Scandinavian minimalism.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <CurrencyProvider>
        <body className="min-h-screen bg-[#F4F1EC] text-[#0A0A0A] selection:bg-[#3A0D0D] selection:text-[#F4F1EC] font-sans antialiased flex flex-col">

          {/* 1. PANGGIL NAVBAR DI SINI */}
          <Navbar />

          {/* Main Content */}
          <main className="flex-grow pt-16">{children}</main>

          {/* Chatbot */}
          <Chatbot />
          
          {/* FOOTER */}
          <footer className="bg-[#0A0A0A] text-[#F4F1EC] pt-24 pb-12 px-8 w-full border-t border-[#3A0D0D]/30">
            <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-20">
              
              <div className="md:col-span-2 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl tracking-[0.3em] font-bold mb-6">ZOCIETY</h2>
                  <p className="text-[#BFBFBF] text-xs uppercase tracking-widest mb-8 max-w-sm leading-relaxed">
                    Join the Undefined. Receive early access to new collections and editorial dispatches.
                  </p>
                </div>
                
                <form action={subscribeEmail} className="flex w-full max-w-sm border-b border-[#BFBFBF]/50 pb-2 transition-colors focus-within:border-[#F4F1EC]">
                  <input type="email" name="email" required placeholder="EMAIL ADDRESS" className="bg-transparent w-full text-xs tracking-widest outline-none placeholder:text-[#BFBFBF]/40 text-[#F4F1EC]"/>
                  <button type="submit" className="text-xs uppercase tracking-widest text-[#BFBFBF] hover:text-[#F4F1EC] transition-colors ml-4">
                    Subscribe
                  </button>
                </form>

                <div className="mt-8 md:hidden">
                   <CurrencySwitcher />
                </div>
              </div>

              <div className="flex flex-col space-y-4 text-xs uppercase tracking-widest text-[#BFBFBF]">
                <span className="text-[#F4F1EC] font-bold mb-2 tracking-[0.2em]">Explore</span>
                <Link href="/shop" className="hover:text-[#F4F1EC] transition-colors">Shop Collection</Link>
                <Link href="/journal" className="hover:text-[#F4F1EC] transition-colors">Journal</Link>
                <Link href="/about" className="hover:text-[#F4F1EC] transition-colors">Philosophy</Link>
              </div>

              <div className="flex flex-col space-y-4 text-xs uppercase tracking-widest text-[#BFBFBF]">
                <span className="text-[#F4F1EC] font-bold mb-2 tracking-[0.2em]">Support</span>
                <a href="#" className="hover:text-[#F4F1EC] transition-colors">Shipping & Returns</a>
                <a href="#" className="hover:text-[#F4F1EC] transition-colors">Terms of Service</a>
                <a href="https://www.tiktok.com/@zociety" className="hover:text-[#F4F1EC] transition-colors mt-4" target="_blank" rel="noreferrer">TikTok</a>
                <a href="https://www.instagram.com/zocietyarchive" className="hover:text-[#F4F1EC] transition-colors mt-4" target="_blank" rel="noreferrer">Instagram</a>
              </div>
            </div>
          
            <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] tracking-widest text-[#BFBFBF]/60 uppercase border-t border-[#BFBFBF]/20 pt-8">
              <p>© {new Date().getFullYear()} ZOCIETY. All Rights Reserved.</p>
              <p className="mt-4 md:mt-0">Built for the Undefined</p>
            </div>
          </footer>
        </body>
      </CurrencyProvider>
    </html>
  );
}