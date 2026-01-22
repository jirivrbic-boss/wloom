import Link from 'next/link'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gradient-sakura mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4">Stránka nenalezena</h2>
        <p className="text-text-main/70 mb-8 text-lg">
          Tato sakura ještě nerozkvétá... 🌸
        </p>
        <p className="text-text-main/60 mb-8 text-sm">
          Stránka, kterou hledáte, neexistuje nebo byla přesunuta.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent-sakura/20 hover:bg-accent-sakura/30 border border-accent-sakura/50 rounded-lg transition-colors"
        >
          <Home size={20} />
          <span>Zpět na hlavní stránku</span>
        </Link>
      </div>
    </div>
  )
}
