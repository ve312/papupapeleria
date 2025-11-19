import { useState, useMemo, useRef, useEffect } from 'react';
import { useCart } from "../context/CartContext";
import { Search, SlidersHorizontal, X, Star, ShoppingCart, Heart, Eye, ChevronDown, ChevronLeft, ChevronRight, RefreshCw, DollarSign } from 'lucide-react';

const allProducts = [
  // Útiles Escolares
{ 
    id: 1,
    name: "Kit Escolar Completo",
    category: "Útiles Escolares",
    price: 45000,
    oldPrice: 60000,
    rating: 5, 
    image: "https://amelipapeleria.uy/wp-content/uploads/2021/01/kit-4-ameli.jpeg",
    stock: 12,
    description: "Kit completo para el regreso a clases"
  },
  { 
    id: 2,
    name: "Lapiceros x12 Colores",
    category: "Útiles Escolares",
    price: 18500,
    rating: 5, 
    image: "https://www.papeleriamegapel.com/wp-content/uploads/2022/05/Lapicero-Trilux-032-x-12-Colores-Surtidos-Faber-Castell.jpg",
    stock: 25,
    description: "Set de 12 lapiceros de colores vibrantes"
  },
  { 
    id: 3,
    name: "Set de Lápices HB",
    category: "Útiles Escolares",
    price: 8900,
    rating: 4, 
    image: "https://tse4.mm.bing.net/th/id/OIP.JjE-1bP4U0SXcHb7wDeN3AHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    stock: 30,
    description: "Lápices de grafito HB ideales para escribir y dibujar"
  },
  { 
    id: 4,
    name: "Borrador y Sacapuntas",
    category: "Útiles Escolares",
    price: 3500,
    rating: 5, 
    image: "https://tse3.mm.bing.net/th/id/OIP.4acZz7MLgxuc9S7l-raydAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
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
    image: "https://tse2.mm.bing.net/th/id/OIP.aevo3hsbAu3hrr53CdmUlQHaFL?rs=1&pid=ImgDetMain&o=7&rm=3",
    stock: 10,
    description: "Cuaderno universitario con espiral, 200 hojas"
  },
  { 
    id: 7,
    name: "Block de Notas A4",
    category: "Cuadernos",
    price: 12500,
    rating: 4, 
    image: "https://tse2.mm.bing.net/th/id/OIP.WMr6fvMXSPUkdOau86puZAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    stock: 20,
    description: "Block de notas tamaño A4, 50 hojas"
  },
  { 
    id: 8,
    name: "Agenda 2025",
    category: "Cuadernos",
    price: 28000,
    rating: 5, 
    image: "https://th.bing.com/th/id/OIP.AgR9lEb782H6mDnHPqgpLwHaHa?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
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
    image: "https://tse4.mm.bing.net/th/id/OIP.YtUEz9LZawodlvksBntl1QHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
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
    image: "https://tse3.mm.bing.net/th/id/OIP.SRHDC1YsfF6FGz2VGTSMBAHaHI?rs=1&pid=ImgDetMain&o=7&rm=3",
    stock: 15,
    description: "Set de témperas para proyectos artísticos"
  },
  { 
    id: 12,
    name: "Kit de Pinceles",
    category: "Arte y Manualidades",
    price: 16500,
    rating: 5, 
    image: "https://tse1.mm.bing.net/th/id/OIP.G0Cvp-DxLRdlDHjERy14DwHaHT?rs=1&pid=ImgDetMain&o=7&rm=3",
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
    image: "https://tse2.mm.bing.net/th/id/OIP.lgAjHK89eafCp3sKManIUAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
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
    image: "https://tse2.mm.bing.net/th/id/OIP.xvFHIrt6zc94gReI-oUjIwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    stock: 18,
    description: "Carpeta resistente para organizar documentos"
  },
  { 
    id: 18,
    name: "Grapadora Metálica",
    category: "Papelería de Oficina",
    price: 15500,
    rating: 4, 
    image: "https://tse1.mm.bing.net/th/id/OIP.ZJznDQoRckCnO99P0DxRwgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    stock: 10,
    description: "Grapadora de alta resistencia"
  },
  { 
    id: 19,
    name: "Perforadora 2 Huecos",
    category: "Papelería de Oficina",
    price: 18000,
    rating: 5, 
    image: "https://th.bing.com/th?id=OIF.BnU3vv%2b9yJLyJ0Pv7N1aPw&rs=1&pid=ImgDetMain&o=7&rm=3",
    stock: 12,
    description: "Perforadora metálica profesional"
  },
  { 
    id: 20,
    name: "Clips y Chinches Set",
    category: "Papelería de Oficina",
    price: 5500,
    rating: 5, 
    image: "https://tse1.mm.bing.net/th/id/OIP.MDXPywlJGq8zUlKEe1CUaAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
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
    image: "https://m.media-amazon.com/images/I/813coJGdHaL._AC_.jpg",
    stock: 9,
    description: "Organizador con múltiples compartimentos"
  },
  { 
    id: 22,
    name: "Separadores de Colores",
    category: "Organización",
    price: 8000,
    rating: 4, 
    image: "https://m.media-amazon.com/images/I/719L+cmT8RL._AC_.jpg",
    stock: 28,
    description: "Separadores plásticos de 5 colores"
  },
  { 
    id: 23,
    name: "Archivador Plástico",
    category: "Organización",
    price: 14500,
    rating: 5, 
    image: "https://th.bing.com/th/id/R.7ff469198f084610990574d2d53618e2?rik=ROrHJ6EJAb%2fNMQ&riu=http%3a%2f%2fextranet.plasticospardo.com%2fimagenes_prod%2ffamilia2450_familia.jpg&ehk=s3klNmW1AZrgbXGvcrfdMOHjiYQ3ISfJa60C5ZUN5pc%3d&risl=&pid=ImgRaw&r=0",
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
    image: "https://distribuidoraeleden.com/wp-content/uploads/LIB0184.jpg",
    stock: 12,
    description: "Tijeras con punta redondeada, ideales para niños"
  },
  { 
    id: 25,
    name: "Pegamento Líquido",
    category: "Accesorios",
    price: 7200,
    rating: 5, 
    image: "https://tse3.mm.bing.net/th/id/OIP.IzQ787LV16FDXJHOsVvA9gHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    stock: 20,
    description: "Pegamento blanco de secado rápido"
  },
  { 
    id: 26,
    name: "Regla 30cm",
    category: "Accesorios",
    price: 4000,
    rating: 5, 
    image: "https://www.officedepot.com.mx/medias/43946.gif-1200ftw?context=bWFzdGVyfHJvb3R8ODI0NzJ8aW1hZ2UvanBlZ3xhR0ZrTDJoaFlTODVORGMyTlRReE9EQTROamN3TG1wd1p3fGNjMzZkYmY0MDYzZjNjZWE3NDg1ZGMyNTBlMmUwOTk4ODcyZTczZGZlZDJlMTU0MTFlNDdjZWM4OWEyYzdhNmE",
    stock: 25,
    description: "Regla transparente con medidas precisas"
  },
  { 
    id: 27,
    name: "Cinta Adhesiva x2",
    category: "Accesorios",
    price: 6500,
    rating: 4, 
    image: "https://tse1.mm.bing.net/th/id/OIP.VzoJQLJiQaqx72dDGQQvugHaIf?rs=1&pid=ImgDetMain&o=7&rm=3",
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
    image: "https://tse2.mm.bing.net/th/id/OIP.nEOGwpmQpN92bo7-WFFiIgHaFT?rs=1&pid=ImgDetMain&o=7&rm=3",
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

const currencies = [
  { code: 'COP', symbol: '$', name: 'Peso Colombiano', flag: '🇨🇴' },
  { code: 'USD', symbol: '$', name: 'Dólar', flag: '🇺🇸' },
  { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', symbol: '£', name: 'Libra', flag: '🇬🇧' },
  { code: 'MXN', symbol: '$', name: 'Peso Mexicano', flag: '🇲🇽' }
];

const MIN_PRICE = 0;
const MAX_PRICE = 150000;

export default function ProductsPage() {
  const { addItem } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas las Categorías');
  const [priceRange, setPriceRange] = useState([MIN_PRICE, MAX_PRICE]);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  const carouselRef = useRef(null);

  // Estados para la API de moneda
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [exchangeRates, setExchangeRates] = useState({});
  const [loadingRates, setLoadingRates] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [showCurrencyMenu, setShowCurrencyMenu] = useState(false);

  // Cargar tasas de cambio desde la API
  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const fetchExchangeRates = async () => {
    setLoadingRates(true);
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/COP');
      const data = await response.json();
      
      setExchangeRates(data.rates);
      setLastUpdate(new Date());
      console.log('✅ Tasas de cambio actualizadas:', data.rates);
    } catch (error) {
      console.error('❌ Error al obtener tasas de cambio:', error);
      // Tasas de respaldo en caso de error
      setExchangeRates({
        COP: 1,
        USD: 0.00025,
        EUR: 0.00023,
        GBP: 0.00020,
        MXN: 0.0043
      });
    } finally {
      setLoadingRates(false);
    }
  };

  // Convertir precio a la moneda seleccionada
  const convertPrice = (priceInCOP) => {
    if (!exchangeRates[selectedCurrency.code]) return priceInCOP;
    
    const convertedPrice = priceInCOP * exchangeRates[selectedCurrency.code];
    return convertedPrice;
  };

  // Formatear precio según la moneda
  const formatPrice = (priceInCOP) => {
    const convertedPrice = convertPrice(priceInCOP);
    
    const formatter = new Intl.NumberFormat(
      selectedCurrency.code === 'COP' ? 'es-CO' : 
      selectedCurrency.code === 'EUR' ? 'de-DE' :
      selectedCurrency.code === 'GBP' ? 'en-GB' :
      selectedCurrency.code === 'MXN' ? 'es-MX' : 'en-US',
      {
        style: 'currency',
        currency: selectedCurrency.code,
        minimumFractionDigits: selectedCurrency.code === 'COP' ? 0 : 2,
        maximumFractionDigits: selectedCurrency.code === 'COP' ? 0 : 2
      }
    );
    
    return formatter.format(convertedPrice);
  };

  // Filtrado y ordenamiento de productos
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'Todas las Categorías') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (inStockOnly) {
      filtered = filtered.filter(p => p.stock > 0);
    }

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

  const handleMinPriceChange = (value) => {
    const newMin = Math.min(value, priceRange[1] - 1000);
    setPriceRange([newMin, priceRange[1]]);
  };

  const handleMaxPriceChange = (value) => {
    const newMax = Math.max(value, priceRange[0] + 1000);
    setPriceRange([priceRange[0], newMax]);
  };

  const ProductCard = ({ product }) => (
    <article
      className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group flex flex-col ${isOdd ? 'min-w-[350px] flex-shrink-0' : ''}`}
      onMouseEnter={() => setHoveredProduct(product.id)}
      onMouseLeave={() => setHoveredProduct(null)}
    >
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        
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

      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs font-semibold text-orange-600 mb-1">{product.category}</p>
        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem]">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

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

        <div className="mb-4">
          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through mr-2">{formatPrice(product.oldPrice)}</span>
          )}
          <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            {formatPrice(product.price)}
          </span>
        </div>

        <button 
  onClick={() => addItem({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    qty: 1
  })}
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
      {/* Header Hero */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-red-500 to-pink-500">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-yellow-400/10 rounded-full blur-3xl"></div>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-400/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-white space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-300"></span>
                </span>
                <span className="text-sm font-semibold">Catálogo Actualizado 2025</span>
              </div>

              <div>
                <h1 className="text-6xl md:text-7xl font-extrabold mb-4 leading-tight">
                  Nuestros
                  <span className="block bg-gradient-to-r from-yellow-200 via-yellow-100 to-white bg-clip-text text-transparent">
                    Productos
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-white/90 max-w-2xl">
                  Encuentra todo lo que necesitas con precios en tu moneda favorita
                </p>
              </div>

              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/20">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <ShoppingCart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{allProducts.length}+</div>
                    <div className="text-xs text-white/80">Productos</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/20">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <DollarSign className="w-5 h-5 text-yellow-300" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{currencies.length}</div>
                    <div className="text-xs text-white/80">Monedas</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/20">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">4.8</div>
                    <div className="text-xs text-white/80">Calificación</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="rgb(249 250 251)"
            />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-12">
        {/* Selector de Moneda - NUEVA SECCIÓN */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl p-6 mb-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Selecciona tu Moneda</h3>
                <p className="text-sm text-white/80">
                  {lastUpdate && `Actualizado: ${lastUpdate.toLocaleTimeString('es-CO')}`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Selector de moneda */}
              <div className="relative">
                <button
                  onClick={() => setShowCurrencyMenu(!showCurrencyMenu)}
                  className="flex items-center gap-3 bg-white text-gray-800 px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  <span className="text-2xl">{selectedCurrency.flag}</span>
                  <div className="text-left">
                    <div className="text-sm font-semibold">{selectedCurrency.code}</div>
                    <div className="text-xs text-gray-500">{selectedCurrency.name}</div>
                  </div>
                  <ChevronDown className={`w-5 h-5 transition-transform ${showCurrencyMenu ? 'rotate-180' : ''}`} />
                </button>

                {/* Menú desplegable de monedas */}
                {showCurrencyMenu && (
                  <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl overflow-hidden z-50 min-w-[280px]">
                    {currencies.map((currency) => (
                      <button
                        key={currency.code}
                        onClick={() => {
                          setSelectedCurrency(currency);
                          setShowCurrencyMenu(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
                          selectedCurrency.code === currency.code ? 'bg-orange-50' : ''
                        }`}
                      >
                        <span className="text-2xl">{currency.flag}</span>
                        <div className="flex-1 text-left">
                          <div className="font-semibold text-gray-800">{currency.code}</div>
                          <div className="text-xs text-gray-500">{currency.name}</div>
                        </div>
                        {selectedCurrency.code === currency.code && (
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Botón actualizar tasas */}
              <button
                onClick={fetchExchangeRates}
                disabled={loadingRates}
                className="bg-white/20 backdrop-blur-sm p-3 rounded-xl hover:bg-white/30 transition-all disabled:opacity-50"
                title="Actualizar tasas de cambio"
              >
                <RefreshCw className={`w-5 h-5 ${loadingRates ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Información de conversión */}
          {selectedCurrency.code !== 'COP' && (
            <div className="mt-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg">
              <p className="text-sm">
                <span className="font-semibold">Tasa de cambio:</span> 1 COP = {exchangeRates[selectedCurrency.code]?.toFixed(6)} {selectedCurrency.code}
              </p>
            </div>
          )}
        </div>

        {/* Barra de búsqueda y filtros */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
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
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

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
          <aside className={`lg:w-72 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-orange-500" />
                  Filtros
                </h3>
                <button
                  onClick={() => {
                    setSelectedCategory("Todas las Categorías");
                    setPriceRange([MIN_PRICE, MAX_PRICE]);
                    setSearchTerm("");
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
                          ? "bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-md"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rango de precio */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-700 mb-4">Rango de Precio (COP)</h4>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Mínimo</label>
                    <input
                      type="text"
                      value={`${priceRange[0].toLocaleString('es-CO')}`}
                      readOnly
                      className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Máximo</label>
                    <input
                      type="text"
                      value={`${priceRange[1].toLocaleString('es-CO')}`}
                      readOnly
                      className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg bg-gray-50"
                    />
                  </div>
                </div>

                <div className="relative pt-2 pb-6">
                  <div className="absolute top-2 left-0 right-0 h-2 bg-gray-200 rounded-full"></div>
                  <div
                    className="absolute top-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                    style={{
                      left: `${(priceRange[0] / MAX_PRICE) * 100}%`,
                      right: `${100 - (priceRange[1] / MAX_PRICE) * 100}%`,
                    }}
                  ></div>

                  <input
                    type="range"
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    step="1000"
                    value={priceRange[0]}
                    onChange={(e) => handleMinPriceChange(parseInt(e.target.value))}
                    className="absolute top-0 left-0 w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-orange-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md hover:[&::-webkit-slider-thumb]:scale-110 [&::-webkit-slider-thumb]:transition-transform"
                  />

                  <input
                    type="range"
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    step="1000"
                    value={priceRange[1]}
                    onChange={(e) => handleMaxPriceChange(parseInt(e.target.value))}
                    className="absolute top-0 left-0 w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-red-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md hover:[&::-webkit-slider-thumb]:scale-110 [&::-webkit-slider-thumb]:transition-transform"
                  />
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
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                Mostrando <span className="font-bold text-gray-800">{filteredProducts.length}</span> productos
                {isOdd && filteredProducts.length > 0 && (
                  <span className="ml-2 text-orange-600 font-semibold">(Modo Carrusel)</span>
                )}
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <>
                {isOdd ? (
                  <div className="relative overflow-hidden">
                    <div
                      ref={carouselRef}
                      className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 -mx-4 px-4"
                      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                      {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>

                    {filteredProducts.length > 1 && (
                      <>
                        <button
                          onClick={() => scrollCarousel("left")}
                          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-3 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-110 text-gray-700 z-10"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={() => scrollCarousel("right")}
                          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-3 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-110 text-gray-700 z-10"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No se encontraron productos</h3>
                <p className="text-gray-600 mb-6">Intenta con otros términos de búsqueda o filtros</p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("Todas las Categorías");
                    setPriceRange([MIN_PRICE, MAX_PRICE]);
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