import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body>
        <nav className="border-b border-slate-800 p-3 text-sm flex gap-4">
          <Link href="/">Dashboard</Link><Link href="/search">Search</Link><Link href="/watchlist">Watchlist</Link><Link href="/portfolio">Portfolio</Link><Link href="/settings">Settings</Link>
        </nav>
        <main className="max-w-6xl mx-auto p-4 space-y-4">{children}</main>
        <footer className="text-xs text-slate-400 border-t border-slate-800 p-4">Informace jsou pouze informativní, nejde o investiční doporučení. Rozhodnutí je na uživateli.</footer>
      </body>
    </html>
  );
}
