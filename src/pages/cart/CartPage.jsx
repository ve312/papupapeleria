import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatPrice';
import Button from '../../components/ui/Button';

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

  return (
    <section className="page container">
      <h1>Carrito</h1>

      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <div className="grid">
            {cartItems.map((item) => (
              <article className="card" key={item.id}>
                <h2>{item.name}</h2>
                <p>Precio: {formatPrice(item.price)}</p>
                <p>Cantidad: {item.quantity}</p>

                <div className="card-actions">
                  <Button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</Button>
                  <Button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
                  <Button onClick={() => removeFromCart(item.id)}>Eliminar</Button>
                </div>
              </article>
            ))}
          </div>

          <h2>Total: {formatPrice(totalPrice)}</h2>
          <Button onClick={clearCart}>Vaciar carrito</Button>
        </>
      )}
    </section>
  );
}

export default CartPage;