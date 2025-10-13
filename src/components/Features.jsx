import { Truck, CreditCard, Package } from 'lucide-react';

export default function Features() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div className="bg-white rounded-lg p-6 shadow-md flex items-center space-x-4 hover:shadow-xl transition">
        <Truck className="w-12 h-12 text-orange-500" />
        <div>
          <h3 className="font-bold text-gray-800">Envío Gratis</h3>
          <p className="text-sm text-gray-600">En compras mayores a $20</p>
        </div>
      </div>
      <div className="bg-white rounded-lg p-6 shadow-md flex items-center space-x-4 hover:shadow-xl transition">
        <CreditCard className="w-12 h-12 text-red-500" />
        <div>
          <h3 className="font-bold text-gray-800">Pago Seguro</h3>
          <p className="text-sm text-gray-600">Múltiples métodos de pago</p>
        </div>
      </div>
      <div className="bg-white rounded-lg p-6 shadow-md flex items-center space-x-4 hover:shadow-xl transition">
        <Package className="w-12 h-12 text-pink-500" />
        <div>
          <h3 className="font-bold text-gray-800">Garantía Total</h3>
          <p className="text-sm text-gray-600">30 días de devolución</p>
        </div>
      </div>
    </div>
  );
}