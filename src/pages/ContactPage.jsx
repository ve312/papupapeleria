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
      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-14">
          <h1 className="text-5xl font-extrabold mb-3">Contacto</h1>
          <p className="text-white/90 text-lg">Estamos aquí para ayudarte. {responseTime}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Tarjetas de contacto rápidas */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-orange-100 text-orange-600"><Mail className="w-6 h-6" /></div>
              <div>
                <h3 className="font-bold text-gray-800">Correo</h3>
                <p className="text-gray-600">Papupapeleria@gmail.com</p>
                <a href="mailto:Papupapeleria@gmail.com" className="text-orange-600 font-semibold hover:underline">Escríbenos</a>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-orange-100 text-orange-600"><Phone className="w-6 h-6" /></div>
              <div>
                <h3 className="font-bold text-gray-800">Teléfono</h3>
                <p className="text-gray-600">+57 300 123 4567</p>
                <a href="tel:+573001234567" className="text-orange-600 font-semibold hover:underline">Llámanos</a>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-orange-100 text-orange-600"><Clock className="w-6 h-6" /></div>
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
              <h2 className="text-2xl font-bold text-gray-800 mb-1">Envíanos un mensaje</h2>
              <p className="text-gray-600 mb-6">Completa el formulario y te responderemos a la brevedad.</p>

              {status.sent && (
                <div className="mb-4 flex items-center gap-2 text-green-600 bg-green-50 border border-green-100 px-4 py-3 rounded-lg">
                  <CheckCircle2 className="w-5 h-5" />
                  Mensaje enviado correctamente. Te contactaremos pronto.
                </div>
              )}

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                <div className="md:col-span-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${errors.name ? 'border-red-300' : 'border-gray-200'} focus:border-orange-500 outline-none`}
                    placeholder="Tu nombre"
                  />
                  {errors.name && <p className="text-sm text-red-600 mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {errors.name}</p>}
                </div>

                <div className="md:col-span-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Correo</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${errors.email ? 'border-red-300' : 'border-gray-200'} focus:border-orange-500 outline-none`}
                    placeholder="tucorreo@dominio.com"
                  />
                  {errors.email && <p className="text-sm text-red-600 mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {errors.email}</p>}
                </div>

                <div className="md:col-span-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Teléfono</label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${errors.phone ? 'border-red-300' : 'border-gray-200'} focus:border-orange-500 outline-none`}
                    placeholder="+57 300 000 0000"
                  />
                  {errors.phone && <p className="text-sm text-red-600 mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {errors.phone}</p>}
                </div>

                <div className="md:col-span-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Asunto</label>
                  <div className="relative">
                    <select
                      value={form.topic}
                      onChange={(e) => handleChange('topic', e.target.value)}
                      className="appearance-none w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 outline-none bg-white"
                    >
                      {topics.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="md:col-span-2 flex flex-col flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Mensaje</label>
                  <textarea
                    rows="8"
                    value={form.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${errors.message ? 'border-red-300' : 'border-gray-200'} focus:border-orange-500 outline-none resize-none flex-1`}
                    placeholder="¿En qué podemos ayudarte?"
                  />
                  {errors.message && <p className="text-sm text-red-600 mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {errors.message}</p>}
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    disabled={status.loading}
                    className={`w-full md:w-auto px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 transition-colors ${
                      status.loading
                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg'
                    }`}
                  >
                    <Send className="w-5 h-5" />
                    {status.loading ? 'Enviando...' : 'Enviar mensaje'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Información + mapa */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Nuestra Tienda</h3>
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
                    <a className="hover:underline" href="tel:+573001234567">+57 300 123 4567</a>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <Mail className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Correo</p>
                    <a className="hover:underline" href="mailto:Papupapeleria@gmail.com">Papupapeleria@gmail.com</a>
                  </div>
                </li>
              </ul>

              <div className="mt-5 flex gap-3">
                {socials.map(s => (
                  <a key={s.label} href={s.url} aria-label={s.label} className={`text-gray-500 ${s.hover} bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-all`}>
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
    </div>
  );
}
