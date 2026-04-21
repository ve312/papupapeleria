import { useCart } from '../../context/CartContext';

function CartPage() {
  const { items, subtotal, inc, dec, remove, clear } = useCart();

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Tu carrito</h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-10 text-center text-gray-500">
            Tu carrito está vacío.
          </div>
        ) : (
          <div className="grid gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md p-5 flex flex-col md:flex-row gap-5 items-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-xl"
                />

                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
                  <p className="text-gray-500 mb-2">{item.category}</p>
                  <p className="text-red-600 font-bold text-lg">
                    ${item.price.toLocaleString('es-CO')}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => dec(item.id)}
                    className="px-3 py-2 rounded-lg border hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="font-semibold text-lg">{item.qty}</span>
                  <button
                    onClick={() => inc(item.id)}
                    className="px-3 py-2 rounded-lg border hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => remove(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
                >
                  Eliminar
                </button>
              </div>
            ))}

            <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Total: ${subtotal.toLocaleString('es-CO')}
              </h2>

              <div className="flex gap-3">
                <button
                  onClick={clear}
                  className="px-5 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
                >
                  Vaciar carrito
                </button>

                <button className="px-5 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:scale-105 transition">
                  Finalizar compra
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;