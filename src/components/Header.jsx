import { useState } from 'react';
import { ShoppingCart, Search, Menu } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden">
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-3xl font-bold tracking-tight">Papupapeleria</h1>
          </div>
          
          <nav className="hidden lg:flex space-x-6 text-sm font-medium">
            <a href="#" className="hover:text-yellow-200 transition">Inicio</a>
            <a href="#" className="hover:text-yellow-200 transition">Productos</a>
            <a href="#" className="hover:text-yellow-200 transition">Ofertas</a>
            <a href="#" className="hover:text-yellow-200 transition">Contacto</a>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center bg-white/20 rounded-full px-4 py-2">
              <input 
                type="text" 
                placeholder="Buscar productos..." 
                className="bg-transparent border-none outline-none text-white placeholder-white/70 w-48"
              />
              <Search className="w-5 h-5" />
            </div>
            <button className="relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-red-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">3</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-red-600 px-4 py-3">
          <nav className="flex flex-col space-y-2">
            <a href="#" className="hover:text-yellow-200 transition">Inicio</a>
            <a href="#" className="hover:text-yellow-200 transition">Productos</a>
            <a href="#" className="hover:text-yellow-200 transition">Ofertas</a>
            <a href="#" className="hover:text-yellow-200 transition">Contacto</a>
          </nav>
        </div>
      )}
    </header>
  );
}