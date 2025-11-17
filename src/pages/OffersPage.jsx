import { useEffect, useMemo, useState } from 'react';
import { Percent, Timer, SlidersHorizontal, Star, ShoppingCart, Heart, Eye, X, ChevronDown } from 'lucide-react';

const allOffers = [
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
  const [minDiscount, setMinDiscount] = useState(0); // % mínimo (cambiado de 10 a 0)
  const [sortBy, setSortBy] = useState('best');
  const [favorites, setFavorites] = useState([]);
  const [hovered, setHovered] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Temporizador de Flash Sale
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
    let list = allOffers.filter(p => p.oldPrice);
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
        list.sort((a, b) => (b.rating - a.rating) || (discountPct(b) - discountPct(a)));
        break;
    }
    return list;
  }, [search, category, minDiscount, sortBy]);

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  // Handler para el input numérico del descuento
  const handleDiscountInputChange = (e) => {
    const value = parseInt(e.target.value.replace(/[^0-9]/g, '')) || 0;
    const clamped = Math.max(0, Math.min(value, 100));
    setMinDiscount(clamped);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Ofertas Mejorado */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-red-500 to-pink-500">
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Círculos decorativos con animación */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-pink-400/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute -bottom-24 left-1/3 w-80 h-80 bg-orange-300/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>

          {/* Patrón de puntos */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "25px 25px",
            }}
          ></div>

          {/* Elementos flotantes de porcentaje */}
          <div className="absolute top-20 left-[10%] text-white/20 text-8xl font-black animate-float">
            %
          </div>
          <div
            className="absolute top-40 right-[15%] text-white/20 text-6xl font-black animate-float"
            style={{ animationDelay: "1s" }}
          >
            %
          </div>
          <div
            className="absolute bottom-20 left-[20%] text-white/20 text-7xl font-black animate-float"
            style={{ animationDelay: "2s" }}
          >
            %
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Contenido principal */}
            <div className="flex-1 text-white space-y-6">
              {/* Badge superior con pulso */}
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/30 animate-pulse">
                <div className="relative">
                  <div className="absolute inset-0 bg-yellow-300 rounded-full blur-md"></div>
                  <div className="relative bg-yellow-400 text-red-600 w-8 h-8 rounded-full flex items-center justify-center font-black text-lg">
                    !
                  </div>
                </div>
                <span className="text-sm font-bold tracking-wide">
                  OFERTAS EXCLUSIVAS - TIEMPO LIMITADO
                </span>
              </div>

              {/* Título principal con animación */}
              <div>
                <h1 className="text-6xl md:text-8xl font-black mb-4 leading-none">
                  <span className="block">¡SUPER</span>
                  <span className="block bg-gradient-to-r from-yellow-200 via-yellow-100 to-white bg-clip-text text-transparent animate-shimmer">
                    OFERTAS!
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-white/95 font-medium max-w-2xl">
                  Descuentos increíbles por tiempo limitado en tus productos
                  favoritos
                </p>
              </div>

              {/* Características destacadas */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="bg-yellow-400 text-red-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                      <Percent className="w-6 h-6 font-bold" />
                    </div>
                    <div>
                      <div className="text-3xl font-black">Hasta</div>
                      <div className="text-xl font-bold text-yellow-200">
                        50% OFF
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="bg-pink-400 text-white p-2 rounded-lg group-hover:scale-110 transition-transform">
                      <ShoppingCart className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-3xl font-black">
                        {allOffers.length}
                      </div>
                      <div className="text-sm font-semibold text-pink-100">
                        Productos en oferta
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-400 text-white p-2 rounded-lg group-hover:scale-110 transition-transform">
                      <Star className="w-6 h-6 fill-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-black">Top</div>
                      <div className="text-sm font-semibold text-green-100">
                        Calidad premium
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Temporizador de cuenta regresiva destacado */}
            <div className="lg:w-auto">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/40 to-pink-400/40 rounded-3xl blur-2xl"></div>

                {/* Card del timer */}
                <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-4 border-white">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full mb-3">
                      <Timer className="w-5 h-5 animate-pulse" />
                      <span className="font-bold text-sm uppercase tracking-wider">
                        Termina en
                      </span>
                    </div>
                    <p className="text-gray-600 font-medium">
                      ¡No te pierdas estas ofertas!
                    </p>
                  </div>

                  {/* Contador */}
                  <div className="grid grid-cols-4 gap-3">
                    <div className="text-center">
                      <div className="bg-gradient-to-br from-red-500 to-pink-500 text-white rounded-xl p-4 mb-2 shadow-lg">
                        <div className="text-4xl font-black tabular-nums">
                          {String(timeParts.d).padStart(2, "0")}
                        </div>
                      </div>
                      <div className="text-xs font-bold text-gray-600 uppercase">
                        Días
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-xl p-4 mb-2 shadow-lg">
                        <div className="text-4xl font-black tabular-nums">
                          {String(timeParts.h).padStart(2, "0")}
                        </div>
                      </div>
                      <div className="text-xs font-bold text-gray-600 uppercase">
                        Horas
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white rounded-xl p-4 mb-2 shadow-lg">
                        <div className="text-4xl font-black tabular-nums">
                          {String(timeParts.m).padStart(2, "0")}
                        </div>
                      </div>
                      <div className="text-xs font-bold text-gray-600 uppercase">
                        Min
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="bg-gradient-to-br from-pink-500 to-red-500 text-white rounded-xl p-4 mb-2 shadow-lg animate-pulse">
                        <div className="text-4xl font-black tabular-nums">
                          {String(timeParts.s).padStart(2, "0")}
                        </div>
                      </div>
                      <div className="text-xs font-bold text-gray-600 uppercase">
                        Seg
                      </div>
                    </div>
                  </div>

                  {/* Mensaje urgente */}
                  <div className="mt-6 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-4">
                    <p className="text-center text-red-600 font-bold text-sm">
                      ⚡ ¡Apresúrate! Las ofertas terminan pronto
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Onda decorativa inferior */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 120L60 110C120 100 240 80 360 75C480 70 600 80 720 85C840 90 960 90 1080 85C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="rgb(249 250 251)"
            />
          </svg>
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
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
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
          <aside
            className={`lg:w-72 ${showFilters ? "block" : "hidden lg:block"}`}
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-orange-500" />
                  Filtros
                </h3>
                <button
                  onClick={() => {
                    setCategory("Todas");
                    setMinDiscount(0);
                    setSearch("");
                    setSortBy("best");
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
                          ? "bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-md"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Descuento mínimo mejorado */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-700 mb-4">
                  Descuento Mínimo
                </h4>

                {/* Input numérico del descuento */}
                <div className="mb-4">
                  <label className="text-xs text-gray-500 mb-1 block">
                    Porcentaje mínimo
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={`${minDiscount}%`}
                      onChange={handleDiscountInputChange}
                      className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none text-center font-semibold"
                    />
                    <Percent className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Slider visual mejorado */}
                <div className="relative pt-2 pb-6">
                  {/* Track de fondo con marcas */}
                  <div className="absolute top-2 left-0 right-0 h-2 bg-gradient-to-r from-gray-200 via-orange-100 to-red-200 rounded-full"></div>

                  {/* Track activo */}
                  <div
                    className="absolute top-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                    style={{
                      left: "0%",
                      right: `${100 - minDiscount}%`,
                    }}
                  ></div>

                  {/* Slider */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={minDiscount}
                    onChange={(e) => setMinDiscount(parseInt(e.target.value))}
                    className="absolute top-0 left-0 w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-3 [&::-webkit-slider-thumb]:border-orange-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg hover:[&::-webkit-slider-thumb]:scale-110 [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10"
                  />

                  {/* Marcas de referencia */}
                  <div className="absolute top-6 left-0 right-0 flex justify-between text-xs text-gray-400 font-medium">
                    <span>0%</span>
                    <span>25%</span>
                    <span>50%</span>
                    <span>75%</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* Botones de descuento rápido */}
                <div className="grid grid-cols-3 gap-2 mt-4">
                  <button
                    onClick={() => setMinDiscount(0)}
                    className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                      minDiscount === 0
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
                        : "bg-gray-100 hover:bg-orange-100 hover:text-orange-600"
                    }`}
                  >
                    Todas
                  </button>
                  <button
                    onClick={() => setMinDiscount(20)}
                    className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                      minDiscount === 20
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
                        : "bg-gray-100 hover:bg-orange-100 hover:text-orange-600"
                    }`}
                  >
                    +20%
                  </button>
                  <button
                    onClick={() => setMinDiscount(30)}
                    className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                      minDiscount === 30
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
                        : "bg-gray-100 hover:bg-orange-100 hover:text-orange-600"
                    }`}
                  >
                    +30%
                  </button>
                  <button
                    onClick={() => setMinDiscount(40)}
                    className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                      minDiscount === 40
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
                        : "bg-gray-100 hover:bg-orange-100 hover:text-orange-600"
                    }`}
                  >
                    +40%
                  </button>
                  <button
                    onClick={() => setMinDiscount(50)}
                    className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                      minDiscount === 50
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
                        : "bg-gray-100 hover:bg-orange-100 hover:text-orange-600"
                    }`}
                  >
                    +50%
                  </button>
                  <button
                    onClick={() => setMinDiscount(60)}
                    className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                      minDiscount === 60
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
                        : "bg-gray-100 hover:bg-orange-100 hover:text-orange-600"
                    }`}
                  >
                    +60%
                  </button>
                </div>

                {/* Indicador visual del descuento actual */}
                <div className="mt-4 p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      Descuento actual:
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                        {minDiscount}%
                      </span>
                      <Percent className="w-5 h-5 text-orange-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Info banner */}
              <div className="rounded-xl bg-gradient-to-r from-orange-50 to-red-50 p-4 border border-orange-100">
                <p className="text-sm text-gray-700">
                  Aprovecha envíos gratis en compras mayores a{" "}
                  {formatPrice(20000)}.
                </p>
              </div>
            </div>
          </aside>

          {/* Grid de ofertas */}
          <main className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                Mostrando{" "}
                <span className="font-bold text-gray-800">
                  {filtered.length}
                </span>{" "}
                ofertas
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
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          loading="lazy"
                        />

                        {/* Overlay acciones */}
                        <div
                          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
                            hovered === p.id ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          <div className="absolute top-3 right-3 flex flex-col gap-2">
                            <button
                              onClick={() => toggleFavorite(p.id)}
                              className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all hover:scale-110"
                              aria-label="Agregar a favoritos"
                            >
                              <Heart
                                className={`w-5 h-5 ${
                                  favorites.includes(p.id)
                                    ? "fill-red-500 text-red-500"
                                    : "text-gray-700"
                                }`}
                              />
                            </button>
                            <button
                              className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all hover:scale-110"
                              aria-label="Vista rápida"
                            >
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
                        <p className="text-xs font-semibold text-orange-600 mb-1">
                          {p.category}
                        </p>
                        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 min-h-[3.2rem]">
                          {p.name}
                        </h3>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-3">
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, j) => (
                              <Star
                                key={j}
                                className={`w-4 h-4 ${
                                  j < p.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 font-medium">
                            ({p.rating}.0)
                          </span>
                        </div>

                        {/* Precio */}
                        <div className="mb-4">
                          {p.oldPrice && (
                            <span className="text-sm text-gray-400 line-through mr-2">
                              {formatPrice(p.oldPrice)}
                            </span>
                          )}
                          <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                            {formatPrice(p.price)}
                          </span>
                        </div>

                        <button
                          disabled={p.stock === 0}
                          className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                            p.stock === 0
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-xl hover:scale-105"
                          }`}
                        >
                          <ShoppingCart className="w-5 h-5" />
                          {p.stock === 0 ? "Agotado" : "Agregar al Carrito"}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
                <div className="text-6xl mb-4">🛍️</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  No hay ofertas que coincidan
                </h3>
                <p className="text-gray-600 mb-6">
                  Ajusta los filtros o vuelve más tarde
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setCategory("Todas");
                    setMinDiscount(0);
                    setSortBy("best");
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

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .animate-shimmer {
          background-size: 1000px 100%;
          animation: shimmer 3s linear infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
}
