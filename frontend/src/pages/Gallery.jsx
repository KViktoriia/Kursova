import React, { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryItems = [
  {
    id: 1,
    title: "Лабораторія робототехніки",
    category: "Лабораторії",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    desc: "Студенти проектують маніпулятори для автоматизованої збірки деталей."
  },
  {
    id: 2,
    title: "Промисловий 3D-принтер",
    category: "Обладнання",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    desc: "Виготовлення деталей для мікросупутника з високоміцного пластику."
  },
  {
    id: 3,
    title: "Конференц-зал під час доповіді",
    category: "Події",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    desc: "Виступ нанофізиків на щорічній конференції в науковому центрі."
  },
  {
    id: 4,
    title: "Центр управління польотами",
    category: "Лабораторії",
    image: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80",
    desc: "Прийом першої телеметрії від нашого студентського мікросупутника."
  },
  {
    id: 5,
    title: "Лабораторія органічної хімії",
    category: "Лабораторії",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
    desc: "Синтез екологічних полімерів на основі целюлози."
  },
  {
    id: 6,
    title: "Оптичні вимірювальні стенди",
    category: "Обладнання",
    image: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&w=800&q=80",
    desc: "Лазерні інтерферометри для калібрування квантових сенсорів."
  },
  {
    id: 7,
    title: "Підписання угоди з ТУ Мюнхен",
    category: "Події",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    desc: "Зміцнення міжнародного партнерства та обміну аспірантами."
  },
  {
    id: 8,
    title: "Квантові кристали під мікроскопом",
    category: "Обладнання",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
    desc: "Аналіз дефектів у кристалічній ґратці для стабілізації кубітів."
  }
];

function Gallery() {
  const [filter, setFilter] = useState("Всі");
  const [activeImage, setActiveImage] = useState(null);

  const filteredItems = filter === "Всі" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  const openLightbox = (index) => {
    setActiveImage(index);
  };

  const closeLightbox = () => {
    setActiveImage(null);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setActiveImage((activeImage === filteredItems.length - 1) ? 0 : activeImage + 1);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setActiveImage((activeImage === 0) ? filteredItems.length - 1 : activeImage - 1);
  };

  return (
    <div className="container py-5">
      {/* Intro */}
      <section className="mb-5 text-center">
        <span className="badge bg-gradient-teal mb-3 px-3 py-2 text-uppercase fw-bold" style={{ letterSpacing: '1px' }}>
          Візуальний огляд
        </span>
        <h1 className="fw-bold mb-3 text-gradient display-5">Галерея нашого центру</h1>
        <p className="lead text-muted mx-auto" style={{ maxWidth: '750px' }}>
          Ознайомтеся з обладнанням наших лабораторій, науковими заходами та життям вчених через фотоматеріали.
        </p>
      </section>

      {/* Filter Buttons */}
      <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
        {["Всі", "Лабораторії", "Обладнання", "Події"].map((category) => (
          <button
            key={category}
            className={`btn px-4 py-2 rounded-pill fw-semibold transition-smooth ${
              filter === category 
                ? 'btn-premium' 
                : 'btn-outline-dark border-secondary bg-white text-dark'
            }`}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="row g-4">
        {filteredItems.map((item, index) => (
          <div className="col-sm-6 col-lg-3" key={item.id}>
            <div className="gallery-item" onClick={() => openLightbox(index)}>
              <img 
                src={item.image} 
                className="gallery-image" 
                alt={item.title} 
                loading="lazy"
              />
              <div className="gallery-overlay">
                <span className="badge bg-info mb-2">{item.category}</span>
                <h5 className="fw-bold text-white mb-2">{item.title}</h5>
                <p className="small text-white-50 mb-0">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeImage !== null && (
        <div 
          className="modal fade show d-block" 
          style={{ backgroundColor: 'rgba(11, 25, 44, 0.95)', zIndex: 1060 }}
          onClick={closeLightbox}
          tabIndex="-1"
        >
          {/* Close button */}
          <button 
            className="btn text-white position-absolute top-0 end-0 m-4 border-0 bg-transparent" 
            style={{ zIndex: 1070 }}
            onClick={closeLightbox}
          >
            <X size={36} />
          </button>

          {/* Nav arrows */}
          <button 
            className="btn text-white position-absolute start-0 top-50 translate-middle-y ms-3 border-0 bg-transparent"
            style={{ zIndex: 1070 }}
            onClick={prevImage}
          >
            <ChevronLeft size={48} />
          </button>

          <button 
            className="btn text-white position-absolute end-0 top-50 translate-middle-y me-3 border-0 bg-transparent"
            style={{ zIndex: 1070 }}
            onClick={nextImage}
          >
            <ChevronRight size={48} />
          </button>

          {/* Modal Container */}
          <div 
            className="modal-dialog modal-dialog-centered modal-lg" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content bg-transparent border-0">
              <div className="modal-body text-center p-0">
                <img 
                  src={filteredItems[activeImage].image} 
                  className="img-fluid rounded-3 shadow-lg" 
                  alt={filteredItems[activeImage].title}
                  style={{ maxHeight: '70vh', objectFit: 'contain' }}
                />
                <div className="mt-3 text-white">
                  <span className="badge bg-gradient-teal mb-2">{filteredItems[activeImage].category}</span>
                  <h4 className="fw-bold">{filteredItems[activeImage].title}</h4>
                  <p className="text-white-50 mb-0">{filteredItems[activeImage].desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
