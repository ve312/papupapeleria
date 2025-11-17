import { useMemo, useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle, Facebook, Instagram, Twitter, Youtube, ChevronDown } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', topic: 'General', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ sent: false, loading: false });

  const topics = ['General', 'Pedidos', 'Devoluciones', 'Mayoristas', 'Soporte'];
  const responseTime = useMemo(() => 'Respondemos en 24-48 horas hábiles', []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Tu nombre es obligatorio';
    if (!/^[\S]+@[\S]+\.[\S]+$/.test(form.email)) e.email = 'Correo inválido';
    if (form.phone && !/^[0-9+\-\s()]{7,}$/.test(form.phone)) e.phone = 'Número inválido';
    if (!form.message.trim() || form.message.trim().length < 10) e.message = 'Cuéntanos más (mín. 10 caracteres)';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus({ sent: false, loading: true });
    try {
      // Aquí podrías integrar tu API/Email service.
      await new Promise(r => setTimeout(r, 1200));
      setStatus({ sent: true, loading: false });
      setForm({ name: '', email: '', phone: '', topic: 'General', message: '' });
    } catch {
      setStatus({ sent: false, loading: false });
    }
  };

  const socials = [
    { icon: Facebook, label: 'Facebook', url: '#', hover: 'hover:text-blue-500' },
    { icon: Instagram, label: 'Instagram', url: '#', hover: 'hover:text-pink-500' },
    { icon: Twitter, label: 'Twitter', url: '#', hover: 'hover:text-sky-400' },
    { icon: Youtube, label: 'YouTube', url: '#', hover: 'hover:text-red-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Contacto Mejorado */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-red-500 to-pink-500">
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Círculos decorativos animados */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-yellow-400/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/4 w-80 h-80 bg-pink-400/10 rounded-full blur-3xl animate-pulse"
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

          {/* Iconos flotantes decorativos */}
          <div className="absolute top-20 left-[15%] text-white/10 animate-float">
            <Mail className="w-24 h-24" />
          </div>
          <div
            className="absolute top-32 right-[20%] text-white/10 animate-float"
            style={{ animationDelay: "1s" }}
          >
            <Phone className="w-20 h-20" />
          </div>
          <div
            className="absolute bottom-24 left-[25%] text-white/10 animate-float"
            style={{ animationDelay: "2s" }}
          >
            <MapPin className="w-16 h-16" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Contenido principal */}
            <div className="flex-1 text-white space-y-6">
              {/* Badge superior */}
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/30">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
                </div>
                <span className="text-sm font-bold">
                  Disponibles para ayudarte
                </span>
              </div>

              {/* Título principal */}
              <div>
                <h1 className="text-6xl md:text-7xl font-black mb-4 leading-tight">
                  ¡Hablemos!
                  <span className="block bg-gradient-to-r from-yellow-200 via-yellow-100 to-white bg-clip-text text-transparent">
                    Estamos aquí
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-white/95 max-w-2xl font-medium">
                  Nuestro equipo está listo para resolver tus dudas y ayudarte
                  con lo que necesites
                </p>
              </div>

              {/* Características del servicio */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/20 hover:bg-white/15 transition-all group">
                  <div className="bg-white/20 p-2 rounded-lg group-hover:scale-110 transition-transform">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold">24-48h</div>
                    <div className="text-xs text-white/80">
                      Tiempo de respuesta
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/20 hover:bg-white/15 transition-all group">
                  <div className="bg-white/20 p-2 rounded-lg group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-5 h-5 text-green-300" />
                  </div>
                  <div>
                    <div className="text-lg font-bold">100%</div>
                    <div className="text-xs text-white/80">
                      Atención personalizada
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/20 hover:bg-white/15 transition-all group">
                  <div className="bg-white/20 p-2 rounded-lg group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5 text-blue-300" />
                  </div>
                  <div>
                    <div className="text-lg font-bold">Email</div>
                    <div className="text-xs text-white/80">
                      Soporte por correo
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/20 hover:bg-white/15 transition-all group">
                  <div className="bg-white/20 p-2 rounded-lg group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5 text-yellow-300" />
                  </div>
                  <div>
                    <div className="text-lg font-bold">Llamadas</div>
                    <div className="text-xs text-white/80">
                      Atención telefónica
                    </div>
                  </div>
                </div>
              </div>

              {/* Botones de contacto rápido */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="mailto:Papupapeleria@gmail.com"
                  className="group bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-white/50 hover:scale-105 transition-all flex items-center gap-3"
                >
                  <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Enviar Email
                </a>
                <a
                  href="tel:+573001234567"
                  className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all flex items-center gap-3"
                >
                  <Phone className="w-5 h-5" />
                  Llamar Ahora
                </a>
              </div>
            </div>

            {/* Tarjetas de contacto decorativas */}
            <div className="hidden lg:block relative">
              <div className="relative w-80">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 to-pink-400/30 rounded-full blur-3xl"></div>

                {/* Tarjetas flotantes con información */}
                <div className="relative space-y-4">
                  {/* Tarjeta Email */}
                  <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white hover:scale-105 transition-all animate-float">
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl">
                        <Mail className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 mb-1">Email</h3>
                        <p className="text-sm text-gray-600">
                          Papupapeleria@gmail.com
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tarjeta Teléfono */}
                  <div
                    className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white hover:scale-105 transition-all animate-float ml-8"
                    style={{ animationDelay: "0.5s" }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-xl">
                        <Phone className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 mb-1">
                          Teléfono
                        </h3>
                        <p className="text-sm text-gray-600">
                          +57 300 123 4567
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tarjeta Ubicación */}
                  <div
                    className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white hover:scale-105 transition-all animate-float"
                    style={{ animationDelay: "1s" }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-xl">
                        <MapPin className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 mb-1">
                          Ubicación
                        </h3>
                        <p className="text-sm text-gray-600">Neiva, Huila</p>
                      </div>
                    </div>
                  </div>

                  {/* Redes sociales en círculo */}
                  <div
                    className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white animate-float ml-4"
                    style={{ animationDelay: "1.5s" }}
                  >
                    <h3 className="font-bold text-gray-800 mb-3 text-center">
                      Síguenos
                    </h3>
                    <div className="flex justify-center gap-3">
                      {socials.map((s) => (
                        <a
                          key={s.label}
                          href={s.url}
                          aria-label={s.label}
                          className={`${s.hover} bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-all hover:scale-110`}
                        >
                          <s.icon className="w-5 h-5" />
                        </a>
                      ))}
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
              d="M0 120L60 105C120 90 240 60 360 50C480 40 600 50 720 60C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="rgb(249 250 251)"
            />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Tarjetas de contacto rápidas */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-orange-100 text-orange-600">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Correo</h3>
                <p className="text-gray-600">Papupapeleria@gmail.com</p>
                <a
                  href="mailto:Papupapeleria@gmail.com"
                  className="text-orange-600 font-semibold hover:underline"
                >
                  Escríbenos
                </a>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-orange-100 text-orange-600">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Teléfono</h3>
                <p className="text-gray-600">+57 300 123 4567</p>
                <a
                  href="tel:+573001234567"
                  className="text-orange-600 font-semibold hover:underline"
                >
                  Llámanos
                </a>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-orange-100 text-orange-600">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Horario</h3>
                <p className="text-gray-600">Lun - Sáb: 8am - 8pm</p>
                <p className="text-gray-600">Dom: 9am - 2pm</p>
              </div>
            </div>
          </div>
        </section>

        {/* Bloque principal: Form + Info + Mapa */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Formulario */}
          <div className="lg:col-span-3 flex">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full flex flex-col">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                Envíanos un mensaje
              </h2>
              <p className="text-gray-600 mb-6">
                Completa el formulario y te responderemos a la brevedad.
              </p>

              {status.sent && (
                <div className="mb-4 flex items-center gap-2 text-green-600 bg-green-50 border border-green-100 px-4 py-3 rounded-lg">
                  <CheckCircle2 className="w-5 h-5" />
                  Mensaje enviado correctamente. Te contactaremos pronto.
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1"
              >
                <div className="md:col-span-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      errors.name ? "border-red-300" : "border-gray-200"
                    } focus:border-orange-500 outline-none`}
                    placeholder="Tu nombre"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.name}
                    </p>
                  )}
                </div>

                <div className="md:col-span-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Correo
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      errors.email ? "border-red-300" : "border-gray-200"
                    } focus:border-orange-500 outline-none`}
                    placeholder="tucorreo@dominio.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.email}
                    </p>
                  )}
                </div>

                <div className="md:col-span-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      errors.phone ? "border-red-300" : "border-gray-200"
                    } focus:border-orange-500 outline-none`}
                    placeholder="+57 300 000 0000"
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.phone}
                    </p>
                  )}
                </div>

                <div className="md:col-span-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Asunto
                  </label>
                  <div className="relative">
                    <select
                      value={form.topic}
                      onChange={(e) => handleChange("topic", e.target.value)}
                      className="appearance-none w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 outline-none bg-white"
                    >
                      {topics.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="md:col-span-2 flex flex-col flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Mensaje
                  </label>
                  <textarea
                    rows="8"
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      errors.message ? "border-red-300" : "border-gray-200"
                    } focus:border-orange-500 outline-none resize-none flex-1`}
                    placeholder="¿En qué podemos ayudarte?"
                  />
                  {errors.message && (
                    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    disabled={status.loading}
                    className={`w-full md:w-auto px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 transition-colors ${
                      status.loading
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg"
                    }`}
                  >
                    <Send className="w-5 h-5" />
                    {status.loading ? "Enviando..." : "Enviar mensaje"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Información + mapa */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Nuestra Tienda
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-700">
                  <MapPin className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Dirección</p>
                    <p>Neiva, Huila</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <Phone className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Teléfono</p>
                    <a className="hover:underline" href="tel:+573001234567">
                      +57 300 123 4567
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <Mail className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Correo</p>
                    <a
                      className="hover:underline"
                      href="mailto:Papupapeleria@gmail.com"
                    >
                      Papupapeleria@gmail.com
                    </a>
                  </div>
                </li>
              </ul>

              <div className="mt-5 flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    aria-label={s.label}
                    className={`text-gray-500 ${s.hover} bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-all`}
                  >
                    <s.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex-1">
              <iframe
                title="Ubicación Papupapeleria"
                src="https://www.google.com/maps?q=Neiva%2C%20Huila&output=embed"
                width="100%"
                height="100%"
                className="w-full h-full min-h-[350px]"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
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
