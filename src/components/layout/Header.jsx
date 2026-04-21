import { NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

function Header() {
  const { totalItems } = useCart();

  return (
    <header className="header">
      <div className="container header-container">
        <NavLink to="/" className="logo">
          PapuPapelería
        </NavLink>

        <nav className="nav">
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/productos">Productos</NavLink>
          <NavLink to="/ofertas">Ofertas</NavLink>
          <NavLink to="/preguntas-frecuentes">Preguntas frecuentes</NavLink>
          <NavLink to="/contacto">Contacto</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/registro">Registro</NavLink>
          <NavLink to="/carrito">Carrito ({totalItems})</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;