import { categories } from '../data/productsData';

export default function Categories() {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Categorías Populares</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {categories.map((cat, i) => (
          <div key={i} className={`${cat.color} rounded-lg p-6 text-center hover:scale-110 transition-transform cursor-pointer shadow-md`}>
            <div className="text-4xl mb-2">{cat.icon}</div>
            <p className="text-sm font-semibold text-gray-700">{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}