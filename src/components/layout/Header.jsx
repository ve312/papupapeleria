import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, User, LogIn } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import CartDrawer from '../cart/CartDrawer';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const { count } = useCart();
  const navigate = useNavigate();

  const navItems = [
    { to: '/', label: 'Inicio' },
    { to: '/productos', label: 'Productos' },
    { to: '/ofertas', label: 'Ofertas' },
    { to: '/contacto', label: 'Contacto' },
    { to: '/preguntas-frecuentes', label: 'Preguntas Frecuentes' },
    { to: '/login', label: 'Login' },
    { to: '/registro', label: 'Registro' },
  ];

  const handleMobileNav = (to) => {
    setIsMenuOpen(false);
    navigate(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>

              <NavLink
                to="/"
                className="text-3xl font-bold tracking-tight hover:text-yellow-200 transition-colors"
              >
                Papupapeleria
              </NavLink>
            </div>

            <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `hover:text-yellow-200 transition-colors relative ${
                      isActive ? 'text-yellow-200' : ''
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && (
                        <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-yellow-200 rounded-full"></span>
                      )}
                    </>
                  )}
                </NavLink>
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

              <NavLink
                to="/login"
                className="hidden xl:flex items-center gap-2 hover:text-yellow-200 transition"
              >
                <LogIn className="w-5 h-5" />
              </NavLink>

              <NavLink
                to="/registro"
                className="hidden xl:flex items-center gap-2 hover:text-yellow-200 transition"
              >
                <User className="w-5 h-5" />
              </NavLink>

              <button
                onClick={() => setOpenCart(true)}
                className="relative hover:scale-110 transition-transform"
                aria-label="Abrir carrito"
              >
                <ShoppingCart className="w-7 h-7" />
                {count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-red-600 text-xs font-bold rounded-full min-w-5 h-5 px-1 flex items-center justify-center">
                    {count}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-red-600 px-4 py-3">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.to}
                  onClick={() => handleMobileNav(item.to)}
                  className="text-left py-2 hover:text-yellow-200 transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setOpenCart(true);
                }}
                className="text-left py-2 hover:text-yellow-200 transition-colors"
              >
                Ver carrito
              </button>
            </nav>
          </div>
        )}
      </header>

      <CartDrawer
        open={openCart}
        onClose={() => setOpenCart(false)}
        goToCart={() => {
          setOpenCart(false);
          navigate('/carrito');
        }}
      />
    </>
  );
}