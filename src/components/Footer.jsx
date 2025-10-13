export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white mt-16 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Papupapeleria</h3>
            <p className="text-gray-400">Tu miscelánea de confianza desde 2020</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Enlaces</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-orange-400">Sobre Nosotros</a></li>
              <li><a href="#" className="hover:text-orange-400">Términos</a></li>
              <li><a href="#" className="hover:text-orange-400">Privacidad</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contacto</h4>
            <ul className="space-y-2 text-gray-400">
              <li>+57 300 123 4567</li>
              <li>Papupapeleria@gmail.com</li>
              <li>Neiva, Huila</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Horarios</h4>
            <p className="text-gray-400">Lun - Sáb: 8am - 8pm</p>
            <p className="text-gray-400">Domingo: 9am - 2pm</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>© 2025 Papupapeleria. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}