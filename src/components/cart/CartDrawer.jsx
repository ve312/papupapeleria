import { X, Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartDrawer({ open, onClose, goToCart }) {
  const {
    items,
    subtotal,
    inc,
    dec,
    remove,
    freeShipProgress,
    remainingForFreeShip,
    FREE_SHIP_THRESHOLD,
  } = useCart();

  const format = (n) => `$${n.toLocaleString('es-CO')}`;

  return (
    <div className={`fixed inset-0 z-50 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      <aside
        className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-2xl flex flex-col transition-transform ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="px-5 py-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-orange-600" />
            <h3 className="text-lg font-bold text-gray-800">Tu carrito</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-5 py-3 border-b">
          {remainingForFreeShip > 0 ? (
            <p className="text-sm text-gray-700">
              Te faltan{' '}
              <span className="font-semibold text-orange-600">
                {format(remainingForFreeShip)}
              </span>{' '}
              para envío gratis
            </p>
          ) : (
            <p className="text-sm font-semibold text-green-600">
              ¡Tienes envío gratis!
            </p>
          )}
          <div className="h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-red-500"
              style={{ width: `${freeShipProgress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Envío gratis desde {format(FREE_SHIP_THRESHOLD)}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center text-gray-600 py-12">Tu carrito está vacío</div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 line-clamp-2">{item.name}</h4>
                  <p className="text-sm text-gray-500">{item.category}</p>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => dec(item.id)}
                        className="p-1 rounded border hover:bg-gray-50"
                      >
                        <Minus className="w-4 h-4" />
                      </button>

                      <input
                        className="w-10 text-center border rounded"
                        value={item.qty}
                        readOnly
                      />

                      <button
                        onClick={() => inc(item.id)}
                        className="p-1 rounded border hover:bg-gray-50"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-gray-500">{format(item.price)} c/u</div>
                      <div className="font-semibold text-gray-800">
                        {format(item.price * item.qty)}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => remove(item.id)}
                  className="p-2 h-10 self-start rounded hover:bg-gray-100"
                >
                  <Trash2 className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="border-t p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-lg font-bold text-gray-900">{format(subtotal)}</span>
          </div>

          <p className="text-xs text-gray-500">
            Impuestos y envío se calculan al finalizar la compra
          </p>

          <div className="flex gap-3">
            <button
              onClick={goToCart}
              className="flex-1 py-3 rounded-xl font-semibold bg-white border border-gray-300 hover:bg-gray-50"
            >
              Ver carrito
            </button>
            <button className="flex-1 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:shadow-lg">
              Ir a pagar
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}