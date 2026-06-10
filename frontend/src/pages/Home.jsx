import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from '../components/Slider';
import { Calendar, Tag, ChevronRight, Award, BookOpen, Users, Compass } from 'lucide-react';

function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/news')
      .then((res) => {
        if (!res.ok) throw new Error('Помилка завантаження новин');
        return res.json();
      })
      .then((data) => {
        // Display only the first 10 news articles
        setNews(data.slice(0, 10));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container py-4">
      {/* Slider Section */}
      <section className="mb-5">
        <Slider />
      </section>

      {/* Stats Counter Section */}
      <section className="mb-5 py-4 bg-white rounded-4 shadow-sm border border-light">
        <div className="row g-4 justify-content-center text-center">
          <div className="col-lg-3 col-md-6">
            <div className="stat-box">
              <div className="stat-number">12</div>
              <div className="fw-semibold text-dark mb-1">Наукових лабораторій</div>
              <p className="text-muted small mb-0">Обладнаних сучасним устаткуванням</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="stat-box">
              <div className="stat-number">45+</div>
              <div className="fw-semibold text-dark mb-1">Діючих патентів</div>
              <p className="text-muted small mb-0">У галузі біопластику, AI та сенсорів</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="stat-box">
              <div className="stat-number">180+</div>
              <div className="fw-semibold text-dark mb-1">Щорічних публікацій</div>
              <p className="text-muted small mb-0">У Scopus, Web of Science та Nature</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="stat-box">
              <div className="stat-number">2.5M €</div>
              <div className="fw-semibold text-dark mb-1">Грантовий фонд</div>
              <p className="text-muted small mb-0">Для підтримки інноваційних проектів</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid: News & Activities */}
      <div className="row g-5">
        {/* Left Column: News (10 items limit) */}
        <div className="col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold mb-0 text-gradient">Останні новини центру</h2>
            <Link to="/news" className="btn btn-premium-outline btn-sm rounded-pill d-flex align-items-center gap-1">
              Всі новини <ChevronRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Завантаження...</span>
              </div>
              <p className="mt-2 text-muted">Завантаження новин...</p>
            </div>
          ) : error ? (
            <div className="alert alert-warning border-0 shadow-sm text-center py-4" role="alert">
              <h5>Не вдалося завантажити новини з бази даних</h5>
              <p className="small text-muted mb-3">Переконайтеся, що сервер Node.js запущений.</p>
              <button 
                className="btn btn-outline-secondary btn-sm" 
                onClick={() => window.location.reload()}
              >
                Спробувати знову
              </button>
            </div>
          ) : (
            <div className="row g-4">
              {news.map((item) => (
                <div className="col-md-6" key={item.id}>
                  <div className="card h-100 border-0 glass-card">
                    <div className="news-card-img-wrapper">
                      <img 
                        src={item.image_url} 
                        className="news-card-img" 
                        alt={item.title} 
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80";
                        }}
                      />
                      <span className="news-badge">{item.category}</span>
                    </div>
                    <div className="card-body d-flex flex-column p-4">
                      <div className="d-flex align-items-center gap-2 mb-2 text-muted small">
                        <Calendar size={14} />
                        <span>{new Date(item.date).toLocaleDateString('uk-UA')}</span>
                      </div>
                      <h5 className="card-title fw-bold text-dark mb-3 line-clamp-2">{item.title}</h5>
                      <p className="card-text text-muted small mb-4 line-clamp-3">{item.summary}</p>
                      <Link 
                        to={`/news?id=${item.id}`} 
                        className="mt-auto text-decoration-none text-info fw-semibold d-flex align-items-center gap-1 hover-text-dark"
                      >
                        Читати повністю <ChevronRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Sidebar (Departments & Activities) */}
        <div className="col-lg-4">
          <div className="mb-5">
            <h3 className="fw-bold mb-4 text-dark">Напрямки досліджень</h3>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex align-items-start p-3 bg-white rounded-3 shadow-sm border-start border-4 border-info">
                <Compass className="text-info me-3 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h6 className="fw-bold mb-1">Космічні технології</h6>
                  <p className="text-muted small mb-0">Проектування мікросупутників та аналіз іоносфери.</p>
                </div>
              </div>
              <div className="d-flex align-items-start p-3 bg-white rounded-3 shadow-sm border-start border-4 border-teal" style={{ borderColor: 'var(--secondary-color) !important' }}>
                <Award className="text-teal me-3 mt-1 flex-shrink-0" size={24} style={{ color: 'var(--secondary-color)' }} />
                <div>
                  <h6 className="fw-bold mb-1">Зелена хімія</h6>
                  <p className="text-muted small mb-0">Розробка біорозкладних матеріалів та екологічний синтез.</p>
                </div>
              </div>
              <div className="d-flex align-items-start p-3 bg-white rounded-3 shadow-sm border-start border-4 border-primary">
                <BookOpen className="text-primary me-3 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h6 className="fw-bold mb-1">Штучний інтелект</h6>
                  <p className="text-muted small mb-0">Нейромережеві рішення для аналізу клімату та робототехніки.</p>
                </div>
              </div>
              <div className="d-flex align-items-start p-3 bg-white rounded-3 shadow-sm border-start border-4 border-warning">
                <Users className="text-warning me-3 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h6 className="fw-bold mb-1">Квантова фізика</h6>
                  <p className="text-muted small mb-0">Дослідження кубітів та квантової суперпозиції в кристалах.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Newsletter / Contact Prompt */}
          <div className="p-4 text-white rounded-4 shadow-sm bg-gradient-teal position-relative overflow-hidden">
            <div className="position-relative z-10">
              <h4 className="fw-bold mb-2">Зворотний зв'язок</h4>
              <p className="small text-white-50 mb-4">Маєте запитання щодо грантів чи вступу до наукової групи? Зв'яжіться з нами безпосередньо!</p>
              <Link to="/contacts" className="btn btn-light text-teal fw-bold rounded-pill px-4">
                Надіслати запит
              </Link>
            </div>
            {/* Background decorative atom logo shape */}
            <div className="position-absolute end-0 bottom-0 opacity-10" style={{ transform: 'translate(40px, 40px)' }}>
              <Compass size={180} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
