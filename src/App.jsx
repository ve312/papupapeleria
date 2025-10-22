import Header from './components/Header';
import Carousel from './components/Carousel';
import Features from './components/Features';
import Categories from './components/Categories';
// import Products from './components/Products'; ← ya no es necesario
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Carousel />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Features />
        <Categories />
        {/* <Products /> ← elimina o comenta esta línea */}
      </div>

      <Footer />
    </div>
  );
}
