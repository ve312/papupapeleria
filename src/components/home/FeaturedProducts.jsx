import { Star } from 'lucide-react';
import { products } from '../../data/productsData';
import { useCart } from '../../context/CartContext';

export default function FeaturedProducts() {
  const { addItem } = useCart();

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Productos Destacados</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all hover:-translate-y-2"
          >
            <div className="bg-white h-48 flex items-center justify-center overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>

            <div className="p-4">
              <h3 className="font-bold text-gray-800 mb-2">{product.name}</h3>

              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className={`w-4 h-4 ${
                      j < product.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-red-600">
                  ${product.price.toLocaleString('es-CO')}
                </span>

                <button
                  onClick={() => addItem(product)}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full font-semibold hover:scale-105 transition"
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}