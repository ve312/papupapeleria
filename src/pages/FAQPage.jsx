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
      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <HelpCircle className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-5xl font-extrabold mb-3">Preguntas Frecuentes</h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Encuentra respuestas rápidas a las dudas más comunes sobre nuestros productos y servicios
          </p>
        </div>
      </section>

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
                          onClick={() => setOpenIndex(isOpen ? null : globalIdx)}
                          className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-semibold text-gray-800 pr-4">{item.q}</span>
                          <ChevronDown 
                            className={`w-5 h-5 text-orange-500 flex-shrink-0 transition-transform ${
                              isOpen ? 'rotate-180' : ''
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
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No encontramos resultados</h3>
            <p className="text-gray-600">Intenta con otros términos de búsqueda</p>
          </div>
        )}

        {/* CTA de contacto */}
        <div className="mt-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-lg p-8 text-center text-white">
          <MessageCircle className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">¿No encontraste tu respuesta?</h3>
          <p className="mb-6 text-white/90">Nuestro equipo está listo para ayudarte</p>
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
      `}</style>
    </div>
  );
}
