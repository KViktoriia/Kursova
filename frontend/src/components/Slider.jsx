import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slidesData = [
  {
    id: 1,
    title: "Гранти Horizon Europe",
    subtitle: "Штучний інтелект для екологічного моніторингу",
    description: "Наш науковий центр отримав престижне фінансування у розмірі 2 млн євро від Європейського Союзу для дослідження екологічних змін за допомогою AI.",
    bgImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80",
    actionText: "Читати більше",
    actionLink: "/news"
  },
  {
    id: 2,
    title: "Студентський мікросупутник",
    subtitle: "Космічні розробки та орбітальні випробування",
    description: "Перший в історії ЗВО студентський наносупутник успішно виведено на орбіту Землі для вимірювання іоносферних коливань.",
    bgImage: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1600&q=80",
    actionText: "Деталі розробки",
    actionLink: "/news"
  },
  {
    id: 3,
    title: "Патент на біопластик",
    subtitle: "Інноваційні екологічно чисті матеріали",
    description: "Вчені центру запатентували унікальну технологію створення біорозкладного пластику з агропромислових відходів.",
    bgImage: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1600&q=80",
    actionText: "Переглянути патент",
    actionLink: "/news"
  },
  {
    id: 4,
    title: "Хаб робототехніки",
    subtitle: "Лабораторія майбутнього для молодих інноваторів",
    description: "Відкрито новітній простір, обладнаний сучасними маніпуляторами, 3D-принтерами та обчислювальними станціями.",
    bgImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1600&q=80",
    actionText: "Про лабораторію",
    actionLink: "/about"
  }
];

function Slider() {
  const [current, setCurrent] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const length = slidesData.length;
  const timeoutRef = useRef(null);

  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextSlide();
    }
    if (distance < -minSwipeDistance) {
      prevSlide();
    }
    
    setTouchStartX(0);
    setTouchEndX(0);
  };

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const setSlide = (index) => {
    setCurrent(index);
  };

  // Autoplay functionality
  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(nextSlide, 6000); // Change slide every 6 seconds

    return () => {
      resetTimeout();
    };
  }, [current]);

  if (!Array.isArray(slidesData) || slidesData.length <= 0) {
    return null;
  }

  return (
    <div 
      className="slider-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Left Arrow */}
      <button className="slider-btn prev" onClick={prevSlide} aria-label="Previous slide">
        <ChevronLeft size={24} />
      </button>

      {/* Right Arrow */}
      <button className="slider-btn next" onClick={nextSlide} aria-label="Next slide">
        <ChevronRight size={24} />
      </button>

      {/* Slides */}
      {slidesData.map((slide, index) => {
        return (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={slide.id}
            style={{ backgroundImage: `url(${slide.bgImage})` }}
          >
            {index === current && (
              <div className="container">
                <div className="slide-content">
                  <span className="badge bg-gradient-teal mb-3 px-3 py-2 text-uppercase fw-bold" style={{ letterSpacing: '1px', fontSize: '0.75rem' }}>
                    {slide.subtitle}
                  </span>
                  <h2 className="display-4 fw-bold mb-3 text-white">{slide.title}</h2>
                  <p className="lead mb-4 text-white-50">{slide.description}</p>
                  <a href={slide.actionLink} className="btn btn-premium px-4 py-2">
                    {slide.actionText}
                  </a>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Dots Indicator */}
      <div className="slider-dots">
        {slidesData.map((_, index) => (
          <div
            key={index}
            className={index === current ? 'slider-dot active' : 'slider-dot'}
            onClick={() => setSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Slider;
