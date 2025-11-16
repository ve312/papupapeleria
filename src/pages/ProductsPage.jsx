import { useState, useMemo, useRef } from 'react';
import { Search, SlidersHorizontal, X, Star, ShoppingCart, Heart, Eye, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';


const allProducts = [
  // Útiles Escolares
  { 
    id: 1,
    name: "Kit Escolar Completo",
    category: "Útiles Escolares",
    price: 45000,
    oldPrice: 60000,
    rating: 5, 
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80",
    stock: 12,
    description: "Kit completo  para el regreso a clases"
  },
  { 
    id: 2,
    name: "Lapiceros x12 Colores",
    category: "Útiles Escolares",
    price: 18500,
    rating: 5, 
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80",
    stock: 25,
    description: "Set de 12 lapiceros de colores vibrantes"
  },
  { 
    id: 3,
    name: "Set de Lápices HB",
    category: "Útiles Escolares",
    price: 8900,
    rating: 4, 
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=400&q=80",
    stock: 30,
    description: "Lápices de grafito HB ideales para escribir y dibujar"
  },
  { 
    id: 4,
    name: "Borrador y Sacapuntas",
    category: "Útiles Escolares",
    price: 3500,
    rating: 5, 
    image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&q=80",
    stock: 45,
    description: "Combo perfecto para tus útiles escolares"
  },
  
  // Cuadernos
  { 
    id: 5,
    name: "Cuaderno 100 Hojas",
    category: "Cuadernos",
    price: 10000,
    oldPrice: 15000,
    rating: 5, 
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&q=80",
    stock: 15,
    description: "Cuaderno rayado de 100 hojas, pasta dura"
  },
  { 
    id: 6,
    name: "Cuaderno Universitario",
    category: "Cuadernos",
    price: 15000,
    oldPrice: 20000,
    rating: 5, 
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80",
    stock: 10,
    description: "Cuaderno universitario con espiral, 200 hojas"
  },
  { 
    id: 7,
    name: "Block de Notas A4",
    category: "Cuadernos",
    price: 12500,
    rating: 4, 
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&q=80",
    stock: 20,
    description: "Block de notas tamaño A4, 50 hojas"
  },
  { 
    id: 8,
    name: "Agenda 2025",
    category: "Cuadernos",
    price: 28000,
    rating: 5, 
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&q=80",
    stock: 8,
    description: "Agenda profesional para el año 2025"
  },


  // Arte y Manualidades
  { 
    id: 9,
    name: "Set Colores x24",
    category: "Arte y Manualidades",
    price: 35960,
    oldPrice: 45000,
    rating: 5, 
    image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&q=80",
    stock: 8,
    description: "Colores profesionales, 24 tonalidades vibrantes"
  },
  { 
    id: 10,
    name: "Marcadores x12",
    category: "Arte y Manualidades",
    price: 25000,
    rating: 5, 
    image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400&q=80",
    stock: 18,
    description: "Marcadores permanentes de colores intensos"
  },
  { 
    id: 11,
    name: "Témperas x6 Colores",
    category: "Arte y Manualidades",
    price: 22000,
    rating: 4, 
    image: "https://images.unsplash.com/photo-1556910585-6e138566da5f?w=400&q=80",
    stock: 15,
    description: "Set de témperas para proyectos artísticos"
  },
  { 
    id: 12,
    name: "Kit de Pinceles",
    category: "Arte y Manualidades",
    price: 16500,
    rating: 5, 
    image: "https://images.unsplash.com/photo-1572372230681-7f00a9241ea9?w=400&q=80",
    stock: 12,
    description: "Pinceles de diferentes tamaños para pintura"
  },


  // Mochilas y Bolsos
  { 
    id: 13,
    name: "Mochila Escolar Grande",
    category: "Mochilas y Bolsos",
    price: 100000,
    oldPrice: 130000,
    rating: 4, 
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80",
    stock: 5,
    description: "Mochila ergonómica con múltiples compartimentos"
  },
  { 
    id: 14,
    name: "Lonchera Térmica",
    category: "Mochilas y Bolsos",
    price: 35000,
    rating: 5, 
    image: "https://images.unsplash.com/photo-1585916420730-d7f95e942d43?w=400&q=80",
    stock: 14,
    description: "Lonchera térmica que mantiene tus alimentos frescos"
  },
  { 
    id: 15,
    name: "Morral Universitario",
    category: "Mochilas y Bolsos",
    price: 85000,
    rating: 5, 
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400&q=80",
    stock: 7,
    description: "Morral moderno con compartimento para laptop"
  },
  { 
    id: 16,
    name: "Cartuchera Triple",
    category: "Mochilas y Bolsos",
    price: 18000,
    rating: 4, 
    image: "https://images.unsplash.com/photo-1588617507091-9dea7eb6dc95?w=400&q=80",
    stock: 22,
    description: "Cartuchera con tres compartimentos"
  },


  // Papelería de Oficina
  { 
    id: 17,
    name: "Carpeta Archivadora",
    category: "Papelería de Oficina",
    price: 12000,
    rating: 5, 
    image: "https://images.unsplash.com/photo-1568667256549-094345857637?w=400&q=80",
    stock: 18,
    description: "Carpeta resistente para organizar documentos"
  },
  { 
    id: 18,
    name: "Grapadora Metálica",
    category: "Papelería de Oficina",
    price: 15500,
    rating: 4, 
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80",
    stock: 10,
    description: "Grapadora de alta resistencia"
  },
  { 
    id: 19,
    name: "Perforadora 2 Huecos",
    category: "Papelería de Oficina",
    price: 18000,
    rating: 5, 
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&q=80",
    stock: 12,
    description: "Perforadora metálica profesional"
  },
  { 
    id: 20,
    name: "Clips y Chinches Set",
    category: "Papelería de Oficina",
    price: 5500,
    rating: 5, 
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80",
    stock: 35,
    description: "Set completo de clips y chinches de colores"
  },


  // Organización
  { 
    id: 21,
    name: "Organizador de Escritorio",
    category: "Organización",
    price: 32000,
    rating: 5, 
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&q=80",
    stock: 9,
    description: "Organizador con múltiples compartimentos"
  },
  { 
    id: 22,
    name: "Separadores de Colores",
    category: "Organización",
    price: 8000,
    rating: 4, 
    image: "https://images.unsplash.com/photo-1617333003364-f93e6ab569ea?w=400&q=80",
    stock: 28,
    description: "Separadores plásticos de 5 colores"
  },
  { 
    id: 23,
    name: "Archivador Plástico",
    category: "Organización",
    price: 14500,
    rating: 5, 
    image: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=400&q=80",
    stock: 16,
    description: "Archivador resistente con tapa"
  },


  // Accesorios
  { 
    id: 24,
    name: "Tijeras Escolares",
    category: "Accesorios",
    price: 14000,
    rating: 4, 
    image: "https://images.unsplash.com/photo-1616401776142-2cc2e2c6ef63?w=400&q=80",
    stock: 12,
    description: "Tijeras con punta redondeada, ideales para niños"
  },
  { 
    id: 25,
    name: "Pegamento Líquido",
    category: "Accesorios",
    price: 7200,
    rating: 5, 
    image: "https://images.unsplash.com/photo-1615751072497-5f5169febe17?w=400&q=80",
    stock: 20,
    description: "Pegamento blanco de secado rápido"
  },
  { 
    id: 26,
    name: "Regla 30cm",
    category: "Accesorios",
    price: 4000,
    rating: 5, 
    image: "https://images.unsplash.com/photo-1561414927-6d86591d0c4f?w=400&q=80",
    stock: 25,
    description: "Regla transparente con medidas precisas"
  },
  { 
    id: 27,
    name: "Cinta Adhesiva x2",
    category: "Accesorios",
    price: 6500,
    rating: 4, 
    image: "https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?w=400&q=80",
    stock: 30,
    description: "Pack de 2 cintas adhesivas transparentes"
  },


  // Tecnología
  { 
    id: 28,
    name: "Calculadora Científica",
    category: "Tecnología",
    price: 48000,
    rating: 5, 
    image: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=400&q=80",
    stock: 6,
    description: "Calculadora científica con 240 funciones"
  },
  { 
    id: 29,
    name: "USB 32GB",
    category: "Tecnología",
    price: 22000,
    oldPrice: 30000,
    rating: 5, 
    image: "https://images.unsplash.com/photo-1624823183493-ed5832f48f18?w=400&q=80",
    stock: 15,
    description: "Memoria USB de alta velocidad 3.0"
  },
  { 
    id: 30,
    name: "Mouse Inalámbrico",
    category: "Tecnología",
    price: 35000,
    rating: 4, 
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&q=80",
    stock: 8,
    description: "Mouse ergonómico inalámbrico 2.4GHz"
  }
];


const categories = [
  "Todas las Categorías",
  "Útiles Escolares",
  "Cuadernos",
  "Arte y Manualidades",
  "Mochilas y Bolsos",
  "Papelería de Oficina",
  "Organización",
  "Accesorios",
  "Tecnología"
];


export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas las Categorías');
  const [priceRange, setPriceRange] = useState([0, 150000]);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  const carouselRef = useRef(null);


  // Filtrado y ordenamiento de productos
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;


    // Filtro por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }


    // Filtro por categoría
    if (selectedCategory !== 'Todas las Categorías') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }


    // Filtro por rango de precio
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);


    // Filtro por stock
    if (inStockOnly) {
      filtered = filtered.filter(p => p.stock > 0);
    }


    // Ordenamiento
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }


    return filtered;
  }, [searchTerm, selectedCategory, priceRange, sortBy, inStockOnly]);


  // Detectar si es impar
  const isOdd = filteredProducts.length % 2 !== 0;


  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 400;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };


  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };


  const formatPrice = (price) => {
    return `$${price.toLocaleString('es-CO')}`;
  };


  // Componente de tarjeta de producto reutilizable
  const ProductCard = ({ product }) => (
    <article
      className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group flex flex-col ${isOdd ? 'min-w-[350px] flex-shrink-0' : ''}`}
      onMouseEnter={() => setHoveredProduct(product.id)}
      onMouseLeave={() => setHoveredProduct(null)}
    >
      {/* Imagen */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        
        {/* Overlay con acciones */}
        <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <button 
              onClick={() => toggleFavorite(product.id)}
              className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all hover:scale-110"
              aria-label="Agregar a favoritos"
            >
              <Heart className={`w-5 h-5 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
            </button>
            <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all hover:scale-110"
              aria-label="Vista rápida">
              <Eye className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.oldPrice && (
            <div className="bg-red-500 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg">
              ¡OFERTA!
            </div>
          )}
          {product.stock < 10 && product.stock > 0 && (
            <div className="bg-orange-500 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg">
              ¡Quedan {product.stock}!
            </div>
          )}
          {product.stock === 0 && (
            <div className="bg-gray-500 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg">
              Agotado
            </div>
          )}
        </div>
      </div>

      {/* Información */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs font-semibold text-orange-600 mb-1">{product.category}</p>
        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem]">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, j) => (
              <Star
                key={j}
                className={`w-4 h-4 ${j < product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 font-medium">({product.rating}.0)</span>
        </div>

        {/* Precio */}
        <div className="mb-4">
          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through mr-2">{formatPrice(product.oldPrice)}</span>
          )}
          <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Botón */}
        <button 
          disabled={product.stock === 0}
          className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 group/btn mt-auto ${
            product.stock === 0 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-xl hover:scale-105'
          }`}
        >
          <ShoppingCart className="w-5 h-5 group-hover/btn:animate-bounce" />
          {product.stock === 0 ? 'Agotado' : 'Agregar al Carrito'}
        </button>
      </div>
    </article>
  );


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header de la página */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-3">Nuestros Productos</h1>
          <p className="text-xl text-white/90">Encuentra todo lo que necesitas para tu día a día</p>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 pb-12">
        {/* Barra de búsqueda y filtros */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Búsqueda */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>


            {/* Ordenar */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors cursor-pointer bg-white"
              >
                <option value="featured">Destacados</option>
                <option value="price-low">Precio: Menor a Mayor</option>
                <option value="price-high">Precio: Mayor a Menor</option>
                <option value="name">Nombre A-Z</option>
                <option value="rating">Mejor Valorados</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>


            {/* Botón filtros móvil */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filtros
            </button>
          </div>
        </div>


        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar de filtros */}
          <aside className={`lg:w-72 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-orange-500" />
                  Filtros
                </h3>
                <button
                  onClick={() => {
                    setSelectedCategory('Todas las Categorías');
                    setPriceRange([0, 150000]);
                    setSearchTerm('');
                    setInStockOnly(false);
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
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-md'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>


              {/* Rango de precio */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-700 mb-3">Precio</h4>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="150000"
                    step="5000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full accent-orange-500"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
              </div>


              {/* Disponibilidad */}
              <div>
                <h4 className="font-bold text-gray-700 mb-3">Disponibilidad</h4>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 accent-orange-500 cursor-pointer"
                  />
                  <span className="text-gray-700">Solo productos en stock</span>
                </label>
              </div>
            </div>
          </aside>


          {/* Grid de productos */}
          <main className="flex-1 min-w-0">
            {/* Contador de resultados */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                Mostrando <span className="font-bold text-gray-800">{filteredProducts.length}</span> productos
                {isOdd && filteredProducts.length > 0 && (
                  <span className="ml-2 text-orange-600 font-semibold">(Modo Carrusel)</span>
                )}
              </p>
            </div>


            {/* Grid o Carrusel */}
            {filteredProducts.length > 0 ? (
              <>
                {isOdd ? (
                  // Carrusel para cantidad impar
                  <div className="relative overflow-hidden">
                    <div 
                      ref={carouselRef}
                      className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 -mx-4 px-4"
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                      {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>

                    {/* Botones de navegación */}
                    {filteredProducts.length > 1 && (
                      <>
                        <button
                          onClick={() => scrollCarousel('left')}
                          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-3 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-110 text-gray-700 z-10"
                          aria-label="Deslizar izquierda"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>

                        <button
                          onClick={() => scrollCarousel('right')}
                          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-3 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-110 text-gray-700 z-10"
                          aria-label="Deslizar derecha"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  // Grid normal para cantidad par
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </>
            ) : (
              // Sin resultados
              <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No se encontraron productos</h3>
                <p className="text-gray-600 mb-6">Intenta con otros términos de búsqueda o filtros</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('Todas las Categorías');
                    setPriceRange([0, 150000]);
                    setInStockOnly(false);
                  }}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Ver todos los productos
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
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
