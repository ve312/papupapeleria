import { Tag, BadgePercent, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

function OffersPage() {
  const { addItem } = useCart();

  const offers = [
    {
      id: 1,
      name: 'Oferta escolar',
      discount: 20,
      active: true,
      product: {
        id: 101,
        name: 'Kit escolar básico',
        category: 'Escolar',
        price: 25000,
        rating: 5,
        image:
          'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
      },
    },
    {
      id: 2,
      name: 'Oferta creativa',
      discount: 15,
      active: true,
      product: {
        id: 102,
        name: 'Set de marcadores',
        category: 'Arte y creatividad',
        price: 18000,
        rating: 4,
        image:
          'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&q=80',
      },
    },
    {
      id: 3,
      name: 'Oferta oficina',
      discount: 10,
      active: false,
      product: {
        id: 103,
        name: 'Organizador de escritorio',
        category: 'Oficina',
        price: 30000,
        rating: 5,
        image:
          'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80',
      },
    },
  ];

  const activeOffers = offers.filter((offer) => offer.active);

  const getDiscountedPrice = (price, discount) => {
    return Math.round(price - (price * discount) / 100);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <BadgePercent className="w-12 h-12" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Ofertas especiales</h1>
          <p className="text-lg md:text-xl text-white/90">
            Aprovecha descuentos increíbles en productos seleccionados
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        {activeOffers.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-md p-10 text-center text-gray-500">
            No hay ofertas activas en este momento.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {activeOffers.map((offer) => {
              const discountedPrice = getDiscountedPrice(
                offer.product.price,
                offer.discount
              );

              return (
                <article
                  key={offer.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all hover:-translate-y-2"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={offer.product.image}
                      alt={offer.product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />

                    <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                      -{offer.discount}%
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-orange-500 font-semibold mb-2">
                      <Tag className="w-4 h-4" />
                      {offer.name}
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {offer.product.name}
                    </h2>

                    <p className="text-gray-500 mb-5">{offer.product.category}</p>

                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-3xl font-extrabold text-red-600">
                        ${discountedPrice.toLocaleString('es-CO')}
                      </span>
                      <span className="text-lg text-gray-400 line-through">
                        ${offer.product.price.toLocaleString('es-CO')}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        addItem({
                          ...offer.product,
                          price: discountedPrice,
                        })
                      }
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Agregar al carrito
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default OffersPage;