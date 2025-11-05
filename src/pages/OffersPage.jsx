import { useEffect, useMemo, useState } from 'react';
import { Percent, Timer, SlidersHorizontal, Star, ShoppingCart, Heart, Eye, X, ChevronDown } from 'lucide-react';

const allOffers = [
  // Usa una selección de tus productos con oldPrice para marcar oferta
  { id: 5,  name: "Cuaderno 100 Hojas", category: "Cuadernos", price: 10000, oldPrice: 15000, rating: 5, stock: 15, image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&q=80" },
  { id: 6,  name: "Cuaderno Universitario", category: "Cuadernos", price: 15000, oldPrice: 20000, rating: 5, stock: 10, image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80" },
  { id: 9,  name: "Set Colores x24", category: "Arte y Manualidades", price: 35960, oldPrice: 45000, rating: 5, stock: 8, image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&q=80" },
  { id: 13, name: "Mochila Escolar Grande", category: "Mochilas y Bolsos", price: 100000, oldPrice: 130000, rating: 4, stock: 5, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80" },
  { id: 29, name: "USB 32GB", category: "Tecnología", price: 22000, oldPrice: 30000, rating: 5, stock: 15, image: "https://images.unsplash.com/photo-1624823183493-ed5832f48f18?w=400&q=80" },
];

const categories = ["Todas", ...Array.from(new Set(allOffers.map(p => p.category)))];

function discountPct(p) {
  if (!p.oldPrice || !p.price) return 0;
  return Math.round((1 - p.price / p.oldPrice) * 100);
}

function formatPrice(n) {
  return `$${Number(n).toLocaleString('es-CO')}`;
}

export default function OffersPage() {
  // Estado de filtros y UI
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todas');
  const [minDiscount, setMinDiscount] = useState(10); // % mínimo
  const [sortBy, setSortBy] = useState('best'); // best | discount | price-low | price-high | name
  const [favorites, setFavorites] = useState([]);
  const [hovered, setHovered] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Temporizador de Flash Sale (ejemplo: 48h a partir de ahora)
  const [deadline] = useState(() => {
    const d = new Date();
    d.setHours(d.getHours() + 48);
    return d.getTime();
  });
  const [remaining, setRemaining] = useState(deadline - Date.now());

  useEffect(() => {
    const t = setInterval(() => setRemaining(deadline - Date.now()), 1000);
    return () => clearInterval(t);
  }, [deadline]);

  const timeParts = useMemo(() => {
    const total = Math.max(0, remaining);
    const secs = Math.floor(total / 1000);
    const d = Math.floor(secs / 86400);
    const h = Math.floor((secs % 86400) / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return { d, h, m, s };
  }, [remaining]);

  // Filtrado y ordenamiento
  const filtered = useMemo(() => {
    let list = allOffers.filter(p => p.oldPrice); // solo con oferta
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    if (category !== 'Todas') {
      list = list.filter(p => p.category === category);
    }
    list = list.filter(p => discountPct(p) >= minDiscount);

    switch (sortBy) {
      case 'discount':
        list.sort((a, b) => discountPct(b) - discountPct(a));
        break;
      case 'price-low':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'best':
      default:
        // mezcla por rating y descuento
        list.sort((a, b) => (b.rating - a.rating) || (discountPct(b) - discountPct(a)));
        break;
    }
    return list;
  }, [search, category, minDiscount, sortBy]);

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Ofertas */}
      <div className="relative overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <h1 className="text-5xl font-extrabold mb-2 flex items-center gap-3">
                  Ofertas
                  <Percent className="w-10 h-10" />
                </h1>
                <p className="text-white/90 text-lg">Descuentos por tiempo limitado en tus categorías favoritas</p>
              </div>
              <div className="bg-white/15 backdrop-blur-md rounded-2xl px-5 py-3 inline-flex items-center gap-3">
                <Timer className="w-6 h-6" />
                <div className="text-center font-semibold">
                  <div className="text-xs uppercase tracking-wider">Termina en</div>
                  <div className="text-xl tabular-nums">
                    {String(timeParts.d).padStart(2, '0')}d :
                    {String(timeParts.h).padStart(2, '0')}h :
                    {String(timeParts.m).padStart(2, '0')}m :
                    {String(timeParts.s).padStart(2, '0')}s
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Barra de búsqueda / orden */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar ofertas..."
                className="w-full pl-4 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 outline-none"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 bg-white"
              >
                <option value="best">Mejores</option>
                <option value="discount">Mayor descuento</option>
                <option value="price-low">Precio: Menor a Mayor</option>
                <option value="price-high">Precio: Mayor a Menor</option>
                <option value="name">Nombre A-Z</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filtros
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filtros */}
          <aside className={`lg:w-72 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-orange-500" />
                  Filtros
                </h3>
                <button
                  onClick={() => {
                    setCategory('Todas');
                    setMinDiscount(10);
                    setSearch('');
                    setSortBy('best');
                  }}
                  className="text-sm text-orange-500 hover:text-orange-600 font-semibold"
                >
                  Limpiar
                </button>
              </div>

              {/* Categorías */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-700 mb-3">Categorías</h4>
                <div className="space-y-2">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCategory(c)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                        category === c
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-md'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Descuento mínimo */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-700 mb-3">Descuento mínimo</h4>
                <input
                  type="range"
                  min="0"
                  max="80"
                  step="5"
                  value={minDiscount}
                  onChange={(e) => setMinDiscount(parseInt(e.target.value))}
                  className="w-full accent-orange-500"
                />
                <div className="mt-2 text-sm text-gray-600">Desde {minDiscount}%</div>
              </div>

              {/* Info banner */}
              <div className="rounded-xl bg-gradient-to-r from-orange-50 to-red-50 p-4 border border-orange-100">
                <p className="text-sm text-gray-700">
                  Aprovecha envíos gratis en compras mayores a {formatPrice(20000)}.
                </p>
              </div>
            </div>
          </aside>

          {/* Grid de ofertas */}
          <main className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                Mostrando <span className="font-bold text-gray-800">{filtered.length}</span> ofertas
              </p>
            </div>

            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((p) => {
                  const pct = discountPct(p);
                  return (
                    <article
                      key={p.id}
                      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group"
                      onMouseEnter={() => setHovered(p.id)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                        {/* Overlay acciones */}
                        <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${hovered === p.id ? 'opacity-100' : 'opacity-0'}`}>
                          <div className="absolute top-3 right-3 flex flex-col gap-2">
                            <button
                              onClick={() => toggleFavorite(p.id)}
                              className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all hover:scale-110"
                              aria-label="Agregar a favoritos"
                            >
                              <Heart className={`w-5 h-5 ${favorites.includes(p.id) ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
                            </button>
                            <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all hover:scale-110" aria-label="Vista rápida">
                              <Eye className="w-5 h-5 text-gray-700" />
                            </button>
                          </div>
                        </div>

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-1">
                          <div className="bg-red-500 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg">
                            -{pct}%
                          </div>
                          {p.stock < 10 && p.stock > 0 && (
                            <div className="bg-orange-500 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg">
                              ¡Quedan {p.stock}!
                            </div>
                          )}
                          {p.stock === 0 && (
                            <div className="bg-gray-500 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg">
                              Agotado
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="p-5">
                        <p className="text-xs font-semibold text-orange-600 mb-1">{p.category}</p>
                        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 min-h-[3.2rem]">{p.name}</h3>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-3">
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, j) => (
                              <Star key={j} className={`w-4 h-4 ${j < p.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 font-medium">({p.rating}.0)</span>
                        </div>

                        {/* Precio */}
                        <div className="mb-4">
                          {p.oldPrice && (
                            <span className="text-sm text-gray-400 line-through mr-2">{formatPrice(p.oldPrice)}</span>
                          )}
                          <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                            {formatPrice(p.price)}
                          </span>
                        </div>

                        <button
                          disabled={p.stock === 0}
                          className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                            p.stock === 0
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-xl hover:scale-105'
                          }`}
                        >
                          <ShoppingCart className="w-5 h-5" />
                          {p.stock === 0 ? 'Agotado' : 'Agregar al Carrito'}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
                <div className="text-6xl mb-4">🛍️</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No hay ofertas que coincidan</h3>
                <p className="text-gray-600 mb-6">Ajusta los filtros o vuelve más tarde</p>
                <button
                  onClick={() => {
                    setSearch('');
                    setCategory('Todas');
                    setMinDiscount(10);
                    setSortBy('best');
                  }}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg"
                >
                  Ver todas las ofertas
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
