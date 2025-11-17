import { useState } from 'react';
import { ChevronDown, Search, HelpCircle, MessageCircle } from 'lucide-react';

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: 'Envíos',
      questions: [
        { 
          q: '¿Cuánto tarda el envío?', 
          a: 'En Neiva entregamos en 24 horas. Para el resto del país, el tiempo de entrega es de 2 a 5 días hábiles dependiendo de la ciudad.' 
        },
        { 
          q: '¿Cuál es el costo del envío?', 
          a: 'El envío en Neiva es gratis para compras superiores a $50.000. Para otras ciudades, el costo varía según el destino y peso del paquete.' 
        },
        { 
          q: '¿Hacen envíos a todo Colombia?', 
          a: 'Sí, realizamos envíos a todo el territorio nacional a través de nuestros aliados logísticos.' 
        },
      ]
    },
    {
      category: 'Cambios y Devoluciones',
      questions: [
        { 
          q: '¿Tienen cambios o devoluciones?', 
          a: 'Sí, aceptamos cambios y devoluciones dentro de los 30 días posteriores a la compra. El producto debe estar en perfecto estado con su empaque original y presentar la factura.' 
        },
        { 
          q: '¿Cómo solicito un cambio?', 
          a: 'Puedes comunicarte con nosotros por WhatsApp, correo o visitarnos en nuestra tienda. Te indicaremos el proceso según tu caso.' 
        },
        { 
          q: '¿Me devuelven el dinero?', 
          a: 'Sí, si prefieres devolución en lugar de cambio, procesamos el reembolso en un plazo de 5 a 10 días hábiles.' 
        },
      ]
    },
    {
      category: 'Pagos',
      questions: [
        { 
          q: '¿Qué medios de pago aceptan?', 
          a: 'Aceptamos tarjetas débito/crédito, transferencias bancarias, PSE y pago contraentrega en zonas habilitadas.' 
        },
        { 
          q: '¿Es seguro pagar con tarjeta?', 
          a: 'Totalmente. Utilizamos pasarelas de pago certificadas con encriptación SSL para proteger tu información.' 
        },
        { 
          q: '¿Puedo pagar en cuotas?', 
          a: 'Sí, aceptamos pagos en cuotas con tarjetas de crédito según el banco emisor.' 
        },
      ]
    },
    {
      category: 'Productos',
      questions: [
        { 
          q: '¿Los productos tienen garantía?', 
          a: 'Sí, todos nuestros productos cuentan con garantía del fabricante. El tiempo varía según el tipo de producto.' 
        },
        { 
          q: '¿Tienen disponibilidad inmediata?', 
          a: 'La mayoría de productos en nuestro catálogo están en stock. Si algo no está disponible, te lo indicamos antes de la compra.' 
        },
        { 
          q: '¿Puedo reservar un producto?', 
          a: 'Sí, puedes reservar productos pagando un anticipo del 30%. La reserva tiene validez de 5 días hábiles.' 
        },
      ]
    },
    {
      category: 'Mayoristas',
      questions: [
        { 
          q: '¿Cómo cotizo al por mayor?', 
          a: 'Escríbenos seleccionando "Mayoristas" en el formulario de contacto y te responderemos con nuestra lista de precios especiales actualizada.' 
        },
        { 
          q: '¿Cuál es la compra mínima para mayoristas?', 
          a: 'La compra mínima para acceder a precios de mayorista es de $200.000 en productos.' 
        },
        { 
          q: '¿Ofrecen crédito a mayoristas?', 
          a: 'Sí, para clientes frecuentes ofrecemos líneas de crédito previa evaluación.' 
        },
      ]
    },
  ];

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      item => 
        item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero FAQ Mejorado */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-red-500 to-pink-500">
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Círculos decorativos animados */}
          <div className="absolute -top-32 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-yellow-400/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 -left-24 w-80 h-80 bg-pink-400/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>

          {/* Patrón de puntos */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          ></div>

          {/* Iconos de interrogación flotantes */}
          <div className="absolute top-20 left-[12%] text-white/10 text-8xl font-black animate-float">
            ?
          </div>
          <div
            className="absolute top-32 right-[18%] text-white/10 text-6xl font-black animate-float"
            style={{ animationDelay: "1s" }}
          >
            ?
          </div>
          <div
            className="absolute bottom-24 left-[22%] text-white/10 text-7xl font-black animate-float"
            style={{ animationDelay: "2s" }}
          >
            ?
          </div>
          <div
            className="absolute bottom-32 right-[15%] text-white/10 text-5xl font-black animate-float"
            style={{ animationDelay: "0.5s" }}
          >
            ?
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Contenido principal */}
            <div className="flex-1 text-white space-y-6 text-center lg:text-left">
              {/* Badge superior */}
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/30">
                <HelpCircle className="w-5 h-5" />
                <span className="text-sm font-bold">Centro de Ayuda</span>
              </div>

              {/* Título principal */}
              <div>
                <h1 className="text-6xl md:text-7xl font-black mb-4 leading-tight">
                  Preguntas
                  <span className="block bg-gradient-to-r from-yellow-200 via-yellow-100 to-white bg-clip-text text-transparent">
                    Frecuentes
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-white/95 max-w-2xl font-medium">
                  Encuentra respuestas rápidas a las dudas más comunes sobre
                  nuestros productos y servicios
                </p>
              </div>

              {/* Estadísticas del FAQ */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-all text-center">
                  <div className="text-3xl font-black mb-1">
                    {faqs.reduce((acc, cat) => acc + cat.questions.length, 0)}
                  </div>
                  <div className="text-xs text-white/80 font-semibold">
                    Preguntas
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-all text-center">
                  <div className="text-3xl font-black mb-1">{faqs.length}</div>
                  <div className="text-xs text-white/80 font-semibold">
                    Categorías
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-all text-center">
                  <div className="text-3xl font-black mb-1">24h</div>
                  <div className="text-xs text-white/80 font-semibold">
                    Respuesta
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-all text-center">
                  <div className="text-3xl font-black mb-1">100%</div>
                  <div className="text-xs text-white/80 font-semibold">
                    Útiles
                  </div>
                </div>
              </div>
            </div>

            {/* Ilustración decorativa lateral */}
            <div className="hidden lg:block relative">
              <div className="relative w-80">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 to-pink-400/30 rounded-full blur-3xl"></div>

                {/* Tarjetas flotantes con iconos FAQ */}
                <div className="relative space-y-6">
                  {/* Tarjeta principal */}
                  <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-white">
                    <div className="flex items-center justify-center mb-4">
                      <div className="bg-gradient-to-br from-orange-500 to-red-500 p-6 rounded-full">
                        <HelpCircle className="w-16 h-16 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-black text-gray-800 text-center mb-2">
                      ¿Necesitas ayuda?
                    </h3>
                    <p className="text-gray-600 text-center text-sm">
                      Explora nuestras preguntas frecuentes o contáctanos
                      directamente
                    </p>
                  </div>

                  {/* Mini tarjetas flotantes */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/95 backdrop-blur-xl rounded-xl p-4 shadow-lg border border-white hover:scale-105 transition-all animate-float">
                      <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-2">
                        <Search className="w-6 h-6 text-blue-600" />
                      </div>
                      <h4 className="font-bold text-gray-800 text-sm mb-1">
                        Búsqueda
                      </h4>
                      <p className="text-xs text-gray-600">Encuentra rápido</p>
                    </div>

                    <div
                      className="bg-white/95 backdrop-blur-xl rounded-xl p-4 shadow-lg border border-white hover:scale-105 transition-all animate-float"
                      style={{ animationDelay: "0.5s" }}
                    >
                      <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mb-2">
                        <MessageCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <h4 className="font-bold text-gray-800 text-sm mb-1">
                        Contacto
                      </h4>
                      <p className="text-xs text-gray-600">Ayuda directa</p>
                    </div>
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
              d="M0 120L60 100C120 80 240 40 360 30C480 20 600 40 720 50C840 60 960 60 1080 55C1200 50 1320 40 1380 35L1440 30V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="rgb(249 250 251)"
            />
          </svg>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Barra de búsqueda */}
        <div className="mb-10">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Busca tu pregunta..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors text-lg"
            />
          </div>
        </div>

        {/* FAQs por categoría */}
        {filteredFaqs.length > 0 ? (
          <div className="space-y-8">
            {filteredFaqs.map((category, catIdx) => (
              <div key={catIdx}>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></span>
                  {category.category}
                </h2>
                <div className="bg-white rounded-2xl shadow-lg divide-y">
                  {category.questions.map((item, idx) => {
                    const globalIdx = `${catIdx}-${idx}`;
                    const isOpen = openIndex === globalIdx;

                    return (
                      <div key={idx} className="group">
                        <button
                          onClick={() =>
                            setOpenIndex(isOpen ? null : globalIdx)
                          }
                          className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-semibold text-gray-800 pr-4">
                            {item.q}
                          </span>
                          <ChevronDown
                            className={`w-5 h-5 text-orange-500 flex-shrink-0 transition-transform ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-5 text-gray-700 animate-fadeIn">
                            {item.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No encontramos resultados
            </h3>
            <p className="text-gray-600">
              Intenta con otros términos de búsqueda
            </p>
          </div>
        )}

        {/* CTA de contacto */}
        <div className="mt-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-lg p-8 text-center text-white">
          <MessageCircle className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">
            ¿No encontraste tu respuesta?
          </h3>
          <p className="mb-6 text-white/90">
            Nuestro equipo está listo para ayudarte
          </p>
          <a
            href="/contacto"
            className="inline-flex items-center gap-2 bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold hover:shadow-xl transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            Contáctanos
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}
