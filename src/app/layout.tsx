import { SiteHeader } from "@/components/site-header";
import { SupportDock } from "@/components/support-dock";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/context/cart-context";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "bileet — кино и бронирование",
  description: "Демо-бронирование билетов в кино",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <CartProvider>
            <SiteHeader />
            <main className="mx-auto max-w-6xl px-4 py-8 pb-24">{children}</main>
            <SupportDock />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
