import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { icon: Facebook, label: 'Facebook', url: '#', color: 'hover:text-blue-500' },
    { icon: Instagram, label: 'Instagram', url: '#', color: 'hover:text-pink-500' },
    { icon: Twitter, label: 'Twitter', url: '#', color: 'hover:text-sky-400' },
    { icon: Youtube, label: 'YouTube', url: '#', color: 'hover:text-red-500' }
  ];

  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Sección de Redes Sociales */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-6 text-white">Síguenos</h3>
            <p className="text-gray-400 mb-4">Conecta con nosotros en nuestras redes sociales</p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  aria-label={social.label}
                  className={`bg-white/10 p-3 rounded-full transition-all duration-300 hover:bg-white/20 hover:scale-110 ${social.color}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-4">¡Entérate de nuestras ofertas!</p>
          </div>

          {/* Enlaces */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold mb-6 text-white">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-orange-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-orange-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-orange-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-orange-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold mb-6 text-white">Contáctanos</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors group">
                <Phone className="w-5 h-5 mt-0.5 text-orange-400 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-semibold text-white">Teléfono</p>
                  <a href="tel:+573001234567" className="hover:text-orange-400">+57 300 123 4567</a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors group">
                <Mail className="w-5 h-5 mt-0.5 text-orange-400 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-semibold text-white">Email</p>
                  <a href="mailto:Papupapeleria@gmail.com" className="hover:text-orange-400">Papupapeleria@gmail.com</a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors group">
                <MapPin className="w-5 h-5 mt-0.5 text-orange-400 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-semibold text-white">Ubicación</p>
                  <p>Neiva, Huila</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Horarios */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold mb-6 text-white">Horarios de Atención</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors">
                <span className="text-gray-400">Lunes - Viernes</span>
                <span className="font-semibold text-orange-400">8:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors">
                <span className="text-gray-400">Sábado</span>
                <span className="font-semibold text-orange-400">8:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors">
                <span className="text-gray-400">Domingo</span>
                <span className="font-semibold text-orange-400">9:00 AM - 2:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center font-bold text-xl">
                P
              </div>
              <span className="text-xl font-bold">Papupapeleria</span>
            </div>
            
            <p className="text-gray-400 text-center">
              © 2025 Papupapeleria. Todos los derechos reservados.
            </p>

            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-orange-400 text-sm transition-colors">
                Mapa del Sitio
              </a>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-gray-400 hover:text-orange-400 text-sm transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
