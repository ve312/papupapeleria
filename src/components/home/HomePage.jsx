import Carousel from '../../components/home/Carousel';
import Features from '../../components/home/Features';
import FeaturedProducts from '../../components/home/FeaturedProducts';

export default function HomePage() {
  return (
    <>
      <Carousel />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Features />
        <FeaturedProducts />
      </div>
    </>
  );
}