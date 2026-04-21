import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatPrice';
import Button from '../../components/ui/Button';

const products = [
  {
    id: 1,
    name: 'Cuaderno argollado',
    price: 12000,
    description: 'Cuaderno de alta calidad para tus apuntes.',
    stock: 15,
    image: 'https://via.placeholder.com/300x200?text=Cuaderno',
  },
  {
    id: 2,
    name: 'Lapicero azul',
    price: 2500,
    description: 'Lapicero de tinta suave y duradera.',
    stock: 50,
    image: 'https://via.placeholder.com/300x200?text=Lapicero',
  },
];

function ProductsPage() {
  const { addToCart } = useCart();

  return (
    <section className="page container">
      <h1>Productos</h1>

      <div className="grid">
        {products.map((product) => (
          <article className="card" key={product.id}>
            <img src={product.image} alt={product.name} className="card-image" />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p><strong>Precio:</strong> {formatPrice(product.price)}</p>
            <p><strong>Stock:</strong> {product.stock}</p>
            <Button onClick={() => addToCart(product)}>Agregar al carrito</Button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ProductsPage;