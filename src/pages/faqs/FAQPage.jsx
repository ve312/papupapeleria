import { useMemo, useState } from 'react';
import { Search, ChevronDown, HelpCircle } from 'lucide-react';

function FAQPage() {
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState(null);

  const faqs = [
    {
      id: 1,
      question: '¿Hacen domicilios?',
      answer:
        'Sí, contamos con servicio de domicilio en zonas seleccionadas. El costo puede variar según la ubicación.',
    },
    {
      id: 2,
      question: '¿Qué métodos de pago reciben?',
      answer:
        'Aceptamos efectivo, transferencias, pagos digitales y otros métodos habilitados en el momento de la compra.',
    },
    {
      id: 3,
      question: '¿Puedo comprar al por mayor?',
      answer:
        'Sí, manejamos pedidos al por mayor para instituciones, oficinas y clientes frecuentes.',
    },
    {
      id: 4,
      question: '¿Tienen productos para oficina y papelería creativa?',
      answer:
        'Sí, ofrecemos una amplia variedad de artículos escolares, de oficina y materiales para creatividad.',
    },
    {
      id: 5,
      question: '¿Cuánto tardan en responder una consulta?',
      answer:
        'Normalmente respondemos en el menor tiempo posible durante nuestro horario de atención.',
    },
  ];

  const filteredFaqs = useMemo(() => {
    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(search.toLowerCase()) ||
        faq.answer.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <HelpCircle className="w-12 h-12" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Preguntas frecuentes
          </h1>
          <p className="text-lg md:text-xl text-white/90">
            Resuelve aquí las dudas más comunes sobre nuestros productos y servicios
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-md p-5 mb-8">
          <div className="flex items-center border rounded-2xl px-4 py-3">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Buscar una pregunta o respuesta..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full outline-none"
            />
          </div>
        </div>

        {filteredFaqs.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-md p-10 text-center text-gray-500">
            No se encontraron resultados.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;

              return (
                <article
                  key={faq.id}
                  className="bg-white rounded-3xl shadow-md overflow-hidden"
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition"
                  >
                    <span className="text-lg font-bold text-gray-800">
                      {faq.question}
                    </span>

                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default FAQPage;