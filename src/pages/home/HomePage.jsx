import { useNavigate } from 'react-router-dom';
import { Star, ArrowRight, BookOpen, PenTool, Briefcase } from 'lucide-react';
import Carousel from '../../components/home/Carousel';
import Features from '../../components/home/Features';
import FeaturedProducts from '../../components/home/FeaturedProducts';

function HomePage() {
  const navigate = useNavigate();

  const categories = [
    {
      title: 'Escolar',
      description: 'Cuadernos, colores, lápices y todo para tus clases.',
      icon: BookOpen,
      color: 'from-orange-500 to-red-500',
    },
    {
      title: 'Arte y creatividad',
      description: 'Marcadores, pinturas y materiales para crear sin límites.',
      icon: PenTool,
      color: 'from-pink-500 to-rose-500',
    },
    {
      title: 'Oficina',
      description: 'Papelería práctica para trabajo, estudio y organización.',
      icon: Briefcase,
      color: 'from-yellow-500 to-orange-500',
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Carousel />

      <section className="max-w-7xl mx-auto px-4 py-10">
        <Features />
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-10">
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-orange-500 font-bold uppercase tracking-wide mb-3">
              Bienvenido a Papupapeleria
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-5 leading-tight">
              Todo lo que necesitas en un solo lugar
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Encuentra útiles escolares, artículos de oficina, productos creativos y
              ofertas especiales con una experiencia moderna, rápida y confiable.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/productos')}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition flex items-center gap-2"
              >
                Ver productos
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => navigate('/ofertas')}
                className="bg-white border border-gray-300 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
              >
                Ver ofertas
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-6 text-white shadow-lg">
              <h3 className="text-4xl font-extrabold mb-2">+500</h3>
              <p className="text-white/90">Productos disponibles</p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-lg border">
              <h3 className="text-4xl font-extrabold text-gray-800 mb-2">24/7</h3>
              <p className="text-gray-600">Atención y pedidos</p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-lg border">
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-800 font-semibold">Clientes satisfechos</p>
            </div>

            <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-3xl p-6 text-white shadow-lg">
              <h3 className="text-4xl font-extrabold mb-2">Top</h3>
              <p className="text-white/90">Calidad y variedad</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-10">
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">
            Explora nuestras categorías
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tenemos productos pensados para estudio, trabajo y creatividad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <article
              key={category.title}
              className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all hover:-translate-y-2 p-8"
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center mb-5`}
              >
                <category.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-3">{category.title}</h3>
              <p className="text-gray-600 mb-6">{category.description}</p>

              <button
                onClick={() => navigate('/productos')}
                className="text-orange-500 font-semibold hover:text-red-500 transition flex items-center gap-2"
              >
                Explorar
                <ArrowRight className="w-4 h-4" />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-14">
        <FeaturedProducts />
      </section>
    </div>
  );
}

export default HomePage;