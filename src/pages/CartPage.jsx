import { Trash2, Minus, Plus, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { items, subtotal, inc, dec, setQty, remove, clear, FREE_SHIP_THRESHOLD, remainingForFreeShip, freeShipProgress } = useCart();
  const format = (n) => `$${n.toLocaleString('es-CO')}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-5xl font-extrabold">Carrito</h1>
          <p className="text-white/90">Revisa tus productos antes de pagar</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {items.length === 0 ? (
              <div className="p-12 text-center text-gray-600">Tu carrito está vacío</div>
            ) : (
              <ul className="divide-y">
                {items.map(item => (
                  <li key={item.id} className="p-5 flex flex-col sm:flex-row gap-4">
                    <div className="w-28 h-28 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.category}</p>
                        </div>
                        <button onClick={() => remove(item.id)} className="p-2 rounded hover:bg-gray-50">
                          <Trash2 className="w-5 h-5 text-gray-500" />
                        </button>
                      </div>

                      <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <button onClick={() => dec(item.id)} className="p-2 rounded border hover:bg-gray-50"><Minus className="w-4 h-4" /></button>
                          <input
                            type="number"
                            min="1"
                            max="99"
                            value={item.qty}
                            onChange={(e) => {
                              const v = parseInt(e.target.value || '1', 10);
                              if (Number.isFinite(v)) setQty(item.id, v);
                            }}
                            className="w-16 text-center border rounded py-2"
                          />
                          <button onClick={() => inc(item.id)} className="p-2 rounded border hover:bg-gray-50"><Plus className="w-4 h-4" /></button>
                        </div>
                        <div className="text-right sm:text-left">
                          <div className="text-sm text-gray-500">Precio</div>
                          <div className="font-semibold text-gray-900">{format(item.price)}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">Total</div>
                          <div className="font-semibold text-gray-900">{format(item.price * item.qty)}</div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {items.length > 0 && (
            <div className="flex items-center justify-between mt-4">
              <button onClick={clear} className="text-red-600 font-semibold hover:underline">Vaciar carrito</button>
              <div className="text-sm text-gray-600">¿Tienes un cupón? (futuro)</div>
            </div>
          )}
        </div>

        {/* Resumen */}
        <aside>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Resumen</h3>

            <div className="mb-4">
              {remainingForFreeShip > 0 ? (
                <p className="text-sm text-gray-700">
                  Te faltan <span className="font-semibold text-orange-600">{format(remainingForFreeShip)}</span> para envío gratis
                </p>
              ) : (
                <p className="text-sm font-semibold text-green-600">¡Tienes envío gratis!</p>
              )}
              <div className="h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-500 to-red-500" style={{ width: `${freeShipProgress}%` }} />
              </div>
              <p className="text-xs text-gray-500 mt-1">Envío gratis desde {format(FREE_SHIP_THRESHOLD)}</p>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">{format(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Envío</span>
                <span className="font-medium text-gray-800">Se calcula al pagar</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Impuestos</span>
                <span className="font-medium text-gray-800">Se calcula al pagar</span>
              </div>
            </div>

            <hr className="my-4" />

            <button className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:shadow-lg">
              Ir a pagar
            </button>

            <div className="mt-4 flex items-center gap-2 text-gray-500 text-xs">
              <ShieldCheck className="w-4 h-4" />
              Compra segura con pagos cifrados
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
