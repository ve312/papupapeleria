import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { slides } from '../data/productsData';

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative h-96 overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-transform duration-500 ease-out ${
            index === currentSlide ? 'translate-x-0' : index < currentSlide ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          <div className={`h-full bg-gradient-to-r ${slide.bg} flex items-center justify-center relative overflow-hidden`}>
            <img 
              src={slide.image} 
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
            <div className="text-center z-10 px-4 max-w-4xl">
              <h2 className="text-6xl md:text-7xl font-extrabold text-white mb-4 drop-shadow-2xl animate-pulse">{slide.title}</h2>
              <p className="text-2xl md:text-3xl text-white mb-8 drop-shadow-lg font-semibold">{slide.subtitle}</p>
              <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-10 py-4 rounded-full font-bold text-xl hover:from-yellow-500 hover:to-orange-600 hover:scale-110 transition-all shadow-2xl border-4 border-white">
                ¡Comprar Ahora!
              </button>
            </div>
          </div>
        </div>
      ))}
      
      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg z-20">
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg z-20">
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}