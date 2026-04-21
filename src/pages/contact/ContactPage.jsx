import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';

function ContactPage() {
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    mensaje: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Mensaje enviado:', form);
  };

  const info = [
    {
      icon: Phone,
      title: 'Teléfono',
      text: '+57 300 123 4567',
    },
    {
      icon: Mail,
      title: 'Correo',
      text: 'papupapeleria@gmail.com',
    },
    {
      icon: MapPin,
      title: 'Ubicación',
      text: 'Neiva, Huila',
    },
    {
      icon: Clock,
      title: 'Horario',
      text: 'Lunes a sábado, 8:00 AM - 8:00 PM',
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Contáctanos</h1>
          <p className="text-lg md:text-xl text-white/90">
            Estamos aquí para ayudarte con tus pedidos, dudas o información general
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Hablemos</h2>
            <p className="text-gray-600 mb-8">
              Si necesitas ayuda, deseas hacer un pedido o quieres más información,
              escríbenos y te responderemos lo antes posible.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {info.map((item) => (
                <div
                  key={item.title}
                  className="border rounded-2xl p-5 hover:shadow-md transition bg-gray-50"
                >
                  <item.icon className="w-8 h-8 text-orange-500 mb-3" />
                  <h3 className="font-bold text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-gray-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl shadow-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-3">Atención personalizada</h3>
            <p className="text-white/90">
              Nuestro equipo está listo para ayudarte a encontrar los productos
              ideales para tus necesidades escolares, creativas y de oficina.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Envíanos un mensaje</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="nombre" className="block mb-2 font-semibold text-gray-700">
                Nombre
              </label>
              <input
                id="nombre"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Tu nombre"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <label htmlFor="correo" className="block mb-2 font-semibold text-gray-700">
                Correo
              </label>
              <input
                id="correo"
                name="correo"
                type="email"
                value={form.correo}
                onChange={handleChange}
                placeholder="Tu correo"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <label htmlFor="mensaje" className="block mb-2 font-semibold text-gray-700">
                Mensaje
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={6}
                value={form.mensaje}
                onChange={handleChange}
                placeholder="Escribe tu mensaje"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:scale-[1.01] transition flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Enviar mensaje
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;