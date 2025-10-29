import { useState } from 'react';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';

export default function Header({ currentPage, setCurrentPage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Inicio' },
    { id: 'products', label: 'Productos' },
    { id: 'offers', label: 'Ofertas' },
    { id: 'contact', label: 'Contacto' }
  ];

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="lg:hidden"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <button 
              onClick={() => handleNavClick('home')}
              className="text-3xl font-bold tracking-tight hover:text-yellow-200 transition-colors"
            >
              Papupapeleria
            </button>
          </div>
          
          <nav className="hidden lg:flex space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`hover:text-yellow-200 transition-colors relative ${
                  currentPage === item.id ? 'text-yellow-200' : ''
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-yellow-200 rounded-full"></span>
                )}
              </button>
            ))}
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
            <button className="relative hover:scale-110 transition-transform">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-red-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">3</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-red-600 px-4 py-3 animate-fade-in">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left py-2 hover:text-yellow-200 transition-colors ${
                  currentPage === item.id ? 'text-yellow-200 font-bold' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
