import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';

import HomePage from '../../pages/home/HomePage';
import ProductsPage from '../../pages/products/ProductsPage';
import CreateProductPage from '../../pages/products/CreateProductPage';
import OffersPage from '../../pages/offers/OffersPage';
import CreateOfferPage from '../../pages/offers/CreateOfferPage';
import FAQPage from '../../pages/faqs/FAQPage';
import CreateFaqPage from '../../pages/faqs/CreateFaqPage';
import CreateCategoryPage from '../../pages/categories/CreateCategoryPage';
import ContactPage from '../../pages/contact/ContactPage';
import CartPage from '../../pages/cart/CartPage';
import LoginPage from '../../pages/auth/LoginPage';
import RegisterPage from '../../pages/auth/RegisterPage';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/productos" element={<ProductsPage />} />
          <Route path="/ofertas" element={<OffersPage />} />
          <Route path="/preguntas-frecuentes" element={<FAQPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/admin/categorias/crear" element={<CreateCategoryPage />} />
          <Route path="/admin/faqs/crear" element={<CreateFaqPage />} />
          <Route path="/admin/ofertas/crear" element={<CreateOfferPage />} />
          <Route path="/admin/productos/crear" element={<CreateProductPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;