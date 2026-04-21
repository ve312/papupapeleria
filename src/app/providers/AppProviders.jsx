import { CartProvider } from '../../context/CartContext';

function AppProviders({ children }) {
  return <CartProvider>{children}</CartProvider>;
}

export default AppProviders;