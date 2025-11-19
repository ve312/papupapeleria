import { useEffect, useMemo, useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import { ChevronLeft, ChevronRight, Star, ShoppingCart, Heart, Eye, Pause, Play } from "lucide-react";

const categories = [
  { name: "Útiles Escolares", icon: "📚", gradient: "from-blue-400 to-blue-600" },
  { name: "Cuadernos", icon: "📓", gradient: "from-indigo-400 to-indigo-600" },
  { name: "Arte y Manualidades", icon: "🎨", gradient: "from-pink-400 to-pink-600" },
  { name: "Mochilas y Bolsos", icon: "🎒", gradient: "from-purple-400 to-purple-600" },
  { name: "Papelería de Oficina", icon: "📎", gradient: "from-green-400 to-green-600" },
  { name: "Organización", icon: "📁", gradient: "from-orange-400 to-orange-600" },
  { name: "Accesorios", icon: "✂️", gradient: "from-red-400 to-red-600" },
  { name: "Tecnología", icon: "💻", gradient: "from-cyan-400 to-cyan-600" }
];

const products = [
  // Útiles Escolares
  { 
    name: "Kit Escolar Completo",
    category: "Útiles Escolares",
    price: "$45.000",
    oldPrice: "$60.000",
    rating: 5, 
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80",
    stock: 12
  },
  { 
    name: "Lapiceros x12 Colores",
    category: "Útiles Escolares",
    price: "$18.500",
    rating: 5, 
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80",
    stock: 25
  },
  { 
    name: "Set de Lápices HB",
    category: "Útiles Escolares",
    price: "$8.900",
    rating: 4, 
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=400&q=80",
    stock: 30
  },
  { 
    name: "Borrador y Sacapuntas",
    category: "Útiles Escolares",
    price: "$3.500",
    rating: 5, 
    image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&q=80",
    stock: 45
  },
  
  // Cuadernos
  { 
    name: "Cuaderno 100 Hojas",
    category: "Cuadernos",
    price: "$10.000",
    oldPrice: "$15.000",
    rating: 5, 
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&q=80",
    stock: 15
  },
  { 
    name: "Cuaderno Universitario",
    category: "Cuadernos",
    price: "$15.000",
    oldPrice: "$20.000",
    rating: 5, 
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80",
    stock: 10
  },
  { 
    name: "Block de Notas A4",
    category: "Cuadernos",
    price: "$12.500",
    rating: 4, 
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&q=80",
    stock: 20
  },
  { 
    name: "Agenda 2025",
    category: "Cuadernos",
    price: "$28.000",
    rating: 5, 
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&q=80",
    stock: 8
  },

  // Arte y Manualidades
  { 
    name: "Set Colores x24",
    category: "Arte y Manualidades",
    price: "$35.960",
    oldPrice: "$45.000",
    rating: 5, 
    image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&q=80",
    stock: 8
  },
  { 
    name: "Marcadores x12",
    category: "Arte y Manualidades",
    price: "$25.000",
    rating: 5, 
    image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400&q=80",
    stock: 18
  },
  { 
    name: "Témperas x6 Colores",
    category: "Arte y Manualidades",
    price: "$22.000",
    rating: 4, 
    image: "https://images.unsplash.com/photo-1556910585-6e138566da5f?w=400&q=80",
    stock: 15
  },
  { 
    name: "Kit de Pinceles",
    category: "Arte y Manualidades",
    price: "$16.500",
    rating: 5, 
    image: "https://images.unsplash.com/photo-1572372230681-7f00a9241ea9?w=400&q=80",
    stock: 12
  },

  // Mochilas y Bolsos
  { 
    name: "Mochila Escolar Grande",
    category: "Mochilas y Bolsos",
    price: "$100.000",
    oldPrice: "$130.000",
    rating: 4, 
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80",
    stock: 5
  },
  { 
    name: "Lonchera Térmica",
    category: "Mochilas y Bolsos",
    price: "$35.000",
    rating: 5, 
    image: "https://images.unsplash.com/photo-1585916420730-d7f95e942d43?w=400&q=80",
    stock: 14
  },
  { 
    name: "Morral Universitario",
    category: "Mochilas y Bolsos",
    price: "$85.000",
    rating: 5, 
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400&q=80",
    stock: 7
  },
  { 
    name: "Cartuchera Triple",
    category: "Mochilas y Bolsos",
    price: "$18.000",
    rating: 4, 
    image: "https://images.unsplash.com/photo-1588617507091-9dea7eb6dc95?w=400&q=80",
    stock: 22
  },

  // Papelería de Oficina
  { 
    name: "Carpeta Archivadora",
    category: "Papelería de Oficina",
    price: "$12.000",
    rating: 5, 
    image: "https://images.unsplash.com/photo-1568667256549-094345857637?w=400&q=80",
    stock: 18
  },
  { 
    name: "Grapadora Metálica",
    category: "Papelería de Oficina",
    price: "$15.500",
    rating: 4, 
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80",
    stock: 10
  },
  { 
    name: "Perforadora 2 Huecos",
    category: "Papelería de Oficina",
    price: "$18.000",
    rating: 5, 
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&q=80",
    stock: 12
  },
  { 
    name: "Clips y Chinches Set",
    category: "Papelería de Oficina",
    price: "$5.500",
    rating: 5, 
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80",
    stock: 35
  },

  // Organización
  { 
    name: "Organizador de Escritorio",
    category: "Organización",
    price: "$32.000",
    rating: 5, 
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&q=80",
    stock: 9
  },
  { 
    name: "Separadores de Colores",
    category: "Organización",
    price: "$8.000",
    rating: 4, 
    image: "https://images.unsplash.com/photo-1617333003364-f93e6ab569ea?w=400&q=80",
    stock: 28
  },
  { 
    name: "Archivador Plástico",
    category: "Organización",
    price: "$14.500",
    rating: 5, 
    image: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=400&q=80",
    stock: 16
  },

  // Accesorios
  { 
    name: "Tijeras Escolares",
    category: "Accesorios",
    price: "$14.000",
    rating: 4, 
    image: "https://images.unsplash.com/photo-1616401776142-2cc2e2c6ef63?w=400&q=80",
    stock: 12
  },
  { 
    name: "Pegamento Líquido",
    category: "Accesorios",
    price: "$7.200",
    rating: 5, 
    image: "https://images.unsplash.com/photo-1615751072497-5f5169febe17?w=400&q=80",
    stock: 20
  },
  { 
    name: "Regla 30cm",
    category: "Accesorios",
    price: "$4.000",
    rating: 5, 
    image: "https://images.unsplash.com/photo-1561414927-6d86591d0c4f?w=400&q=80",
    stock: 25
  },
  { 
    name: "Cinta Adhesiva x2",
    category: "Accesorios",
    price: "$6.500",
    rating: 4, 
    image: "https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?w=400&q=80",
    stock: 30
  },

  // Tecnología
  { 
    name: "Calculadora Científica",
    category: "Tecnología",
    price: "$48.000",
    rating: 5, 
    image: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=400&q=80",
    stock: 6
  },
  { 
    name: "USB 32GB",
    category: "Tecnología",
    price: "$22.000",
    oldPrice: "$30.000",
    rating: 5, 
    image: "https://images.unsplash.com/photo-1624823183493-ed5832f48f18?w=400&q=80",
    stock: 15
  },
  { 
    name: "Mouse Inalámbrico",
    category: "Tecnología",
    price: "$35.000",
    rating: 4, 
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&q=80",
    stock: 8
  }
];

export default function Categories() {
  const { addItem } = useCart();
  const [active, setActive] = useState(0);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef(null);
  const categoriesRef = useRef(null);

  const filtered = useMemo(() => {
    const catName = categories[active]?.name;
    return products.filter(p => p.category === catName);
  }, [active]);

  // Auto-rotación de categorías cada 5 segundos
  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      setActive((prev) => {
        const nextIndex = (prev + 1) % categories.length;
        scrollCategoryIntoView(nextIndex);
        return nextIndex;
      });
      if (trackRef.current) {
        trackRef.current.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Función para hacer scroll a la categoría seleccionada
  const scrollCategoryIntoView = (index) => {
    const el = categoriesRef.current;
    if (!el) return;
    const buttons = el.children;
    if (buttons[index]) {
      buttons[index].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  };

  const scroll = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = 260;
    const gap = 20;
    const amount = cardWidth + gap;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  const nextCategory = () => {
    const nextIndex = (active + 1) % categories.length;
    setActive(nextIndex);
    scrollCategoryIntoView(nextIndex);
    if (trackRef.current) {
      trackRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  const prevCategory = () => {
    const prevIndex = (active - 1 + categories.length) % categories.length;
    setActive(prevIndex);
    scrollCategoryIntoView(prevIndex);
    if (trackRef.current) {
      trackRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  const handleCategoryChange = (i) => {
    setActive(i);
    scrollCategoryIntoView(i);
    if (trackRef.current) {
      trackRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  const toggleFavorite = (productName) => {
    setFavorites(prev => 
      prev.includes(productName) 
        ? prev.filter(name => name !== productName)
        : [...prev, productName]
    );
  };

  return (
    <section className="mb-16 relative">
      {/* Header con decoración */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Explora por Categoría</h2>
          <p className="text-gray-600">Encuentra lo que necesitas para tu día a día</p>
        </div>
        <div className={`hidden md:flex items-center gap-3 px-6 py-3 bg-gradient-to-r ${categories[active]?.gradient} text-white rounded-full shadow-lg`}>
          <span className="text-3xl">{categories[active]?.icon}</span>
          <span className="font-bold text-lg">{categories[active]?.name}</span>
        </div>
      </div>

      {/* Carrusel de categorías - sin flechas */}
      <div className="relative mb-10">
        <div 
          ref={categoriesRef}
          className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
        >
          {categories.map((c, i) => (
            <button
              key={c.name}
              onClick={() => handleCategoryChange(i)}
              className={`group relative flex items-center gap-3 px-6 py-4 rounded-2xl whitespace-nowrap transition-all duration-300 snap-start ${
                i === active 
                  ? `bg-gradient-to-r ${c.gradient} text-white shadow-2xl scale-105` 
                  : 'bg-white text-gray-700 shadow-md hover:shadow-xl hover:scale-105'
              }`}
            >
              <span className="text-2xl">{c.icon}</span>
              <span className="font-bold">{c.name}</span>
              {i === active && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
              )}
            </button>
          ))}
        </div>

        {/* Indicadores de categorías */}
        <div className="flex justify-center gap-2 mt-4">
          {categories.map((_, index) => (
            <button
              key={index}
              onClick={() => handleCategoryChange(index)}
              className={`transition-all rounded-full ${
                index === active 
                  ? 'bg-orange-500 w-8 h-2' 
                  : 'bg-gray-300 w-2 h-2 hover:bg-gray-400'
              }`}
              aria-label={`Ir a categoría ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Carrusel de productos */}
      <div className="relative group/carousel">
        {/* Botón de pausa/play */}
        <div className="absolute top-0 right-0 z-40">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 ${
              isPaused 
                ? 'bg-green-500 text-white' 
                : 'bg-orange-500 text-white'
            }`}
            aria-label={isPaused ? 'Reanudar carrusel' : 'Pausar carrusel'}
          >
            {isPaused ? (
              <>
                <Play className="w-4 h-4" />
                <span className="text-sm">Reanudar</span>
              </>
            ) : (
              <>
                <Pause className="w-4 h-4" />
                <span className="text-sm">Pausar</span>
              </>
            )}
          </button>
        </div>

        {/* Botón categoría anterior */}
        <button
          onClick={prevCategory}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-white shadow-2xl rounded-full p-4 opacity-0 group-hover/carousel:opacity-100 hover:scale-110 transition-all duration-300 -translate-x-4 group-hover/carousel:translate-x-0"
          aria-label="Categoría anterior"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>

        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 scrollbar-hide"
        >
          {filtered.map((product, idx) => (
            <article
              key={`${product.name}-${idx}`}
              className="min-w-[260px] bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 snap-start group/card overflow-hidden"
              onMouseEnter={() => setHoveredProduct(idx)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Imagen del producto */}
              <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${hoveredProduct === idx ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <button 
                      onClick={() => toggleFavorite(product.name)}
                      className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all hover:scale-110"
                    >
                      <Heart className={`w-4 h-4 ${favorites.includes(product.name) ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
                    </button>
                    <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all hover:scale-110">
                      <Eye className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  {product.oldPrice && (
                    <div className="bg-red-500 px-2 py-0.5 rounded-full text-xs font-bold text-white shadow-lg">
                      ¡OFERTA!
                    </div>
                  )}
                  {product.stock < 10 && (
                    <div className="bg-orange-500 px-2 py-0.5 rounded-full text-xs font-bold text-white shadow-lg">
                      ¡Quedan {product.stock}!
                    </div>
                  )}
                </div>
              </div>

              {/* Información */}
              <div className="p-4">
                <p className="text-xs font-semibold text-gray-500 mb-1">{product.category}</p>
                <h3 className="font-bold text-base text-gray-800 mb-2 line-clamp-2 min-h-[2.5rem]">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        className={`w-3 h-3 ${j < (product.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600 font-medium">({product.rating}.0)</span>
                </div>

                {/* Precio */}
                <div className="mb-3">
                  {product.oldPrice && (
                    <span className="text-xs text-gray-400 line-through mr-1">{product.oldPrice}</span>
                  )}
                  <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                    {product.price}
                  </span>
                </div>

                {/* Botón */}
                <button 
  onClick={() =>
    addItem({
      id: product.name, // si no tienes id, uso el nombre como id único
      name: product.name,
      category: product.category,
      image: product.image,
      qty: 1,
      price: Number(product.price.replace(/\D/g, "")) // limpia "$45.000"
    })
  }
  disabled={product.stock === 0}
  className={`w-full bg-gradient-to-r ${categories[active]?.gradient} text-white py-2.5 rounded-xl font-bold text-sm hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2`}
>
  <ShoppingCart className="w-4 h-4" />
  {product.stock === 0 ? "Agotado" : "Agregar"}
</button>
              </div>
            </article>
          ))}

          {/* Sin productos */}
          {filtered.length === 0 && (
            <div className="min-w-full flex items-center justify-center py-20">
              <div className="text-center">
                <div className="text-6xl mb-4">{categories[active]?.icon}</div>
                <p className="text-2xl font-bold text-gray-800 mb-2">Próximamente</p>
                <p className="text-gray-500">Nuevos productos en {categories[active]?.name}</p>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={nextCategory}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-white shadow-2xl rounded-full p-4 opacity-0 group-hover/carousel:opacity-100 hover:scale-110 transition-all duration-300 translate-x-4 group-hover/carousel:translate-x-0"
          aria-label="Categoría siguiente"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Indicador */}
      <div className="mt-6 text-center text-sm text-gray-600">
        Mostrando {filtered.length} {filtered.length === 1 ? 'producto' : 'productos'} en {categories[active]?.name}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}