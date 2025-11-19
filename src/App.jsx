import { useState } from 'react';
import Header from './components/Header';
import Carousel from './components/Carousel';
import Features from './components/Features';
import Categories from './components/Categories';
import Footer from './components/Footer';
import ProductsPage from './pages/ProductsPage';
import OffersPage from './pages/OffersPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import FAQPage from './pages/FAQPage';
import { CartProvider } from './context/CartContext';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'products': return <ProductsPage />;
      case 'offers': return <OffersPage />;
      case 'contact': return <ContactPage />;
      case 'cart': return <CartPage />;
      case 'faq': return <FAQPage />;
      case 'home':
      default:
        return (
          <>
            <Carousel setCurrentPage={setCurrentPage} />
            <div className="max-w-7xl mx-auto px-4 py-8">
              <Features />
              <Categories />
            </div>
          </>
        );
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
        {renderPage()}
        <Footer />
      </div>
    </CartProvider>
  );
}
