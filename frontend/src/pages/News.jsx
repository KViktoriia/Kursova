import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Calendar, Tag, Search, X, AlertCircle } from 'lucide-react';

function News() {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Всі');
  
  // URL Search Params for deep linking single news
  const [searchParams, setSearchParams] = useSearchParams();
  const activeNewsId = searchParams.get('id');
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Fetch news from API
  useEffect(() => {
    fetch('/api/news')
      .then((res) => {
        if (!res.ok) throw new Error('Помилка завантаження новин з сервера');
        return res.json();
      })
      .then((data) => {
        setNews(data);
        setFilteredNews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filter and Search logic
  useEffect(() => {
    let result = news;

    if (selectedCategory !== 'Всі') {
      result = result.filter(item => item.category === selectedCategory);
    }

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.summary.toLowerCase().includes(query) || 
        item.content.toLowerCase().includes(query)
      );
    }

    setFilteredNews(result);
  }, [searchQuery, selectedCategory, news]);

  // Handle opening modal based on URL query param id
  useEffect(() => {
    if (activeNewsId && news.length > 0) {
      const article = news.find(item => item.id === parseInt(activeNewsId));
      if (article) {
        setSelectedArticle(article);
      }
    } else {
      setSelectedArticle(null);
    }
  }, [activeNewsId, news]);

  const openArticle = (id) => {
    setSearchParams({ id });
  };

  const closeArticle = () => {
    setSearchParams({});
    setSelectedArticle(null);
  };

  const categories = ['Всі', 'Гранти', 'Дослідження', 'Патенти', 'Конференції', 'Публікації', 'Міжнародна співпраця'];

  return (
    <div className="container py-5">
      {/* Page Header */}
      <section className="mb-5 text-center">
        <span className="badge bg-gradient-teal mb-3 px-3 py-2 text-uppercase fw-bold" style={{ letterSpacing: '1px' }}>
          Новинний портал
        </span>
        <h1 className="fw-bold mb-3 text-gradient display-5">Стрічка новин центру</h1>
        <p className="lead text-muted mx-auto" style={{ maxWidth: '750px' }}>
          Дізнавайтеся про найважливіші події, відкриття, грантові перемоги та конференції нашого наукового центру.
        </p>
      </section>

      {/* Search and Category Filters */}
      <div className="row g-4 mb-5 align-items-center">
        <div className="col-lg-4">
          <div className="input-group bg-white rounded-pill shadow-sm border border-light overflow-hidden px-2 py-1">
            <span className="input-group-text bg-transparent border-0 text-muted">
              <Search size={20} />
            </span>
            <input
              type="text"
              className="form-control border-0 shadow-none bg-transparent"
              placeholder="Пошук новин..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="col-lg-8">
          <div className="d-flex flex-wrap gap-2 justify-content-lg-end">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`btn btn-sm px-3 py-2 rounded-pill fw-semibold border-0 transition-smooth ${
                  selectedCategory === cat
                    ? 'btn-premium'
                    : 'bg-white text-dark shadow-sm border border-light hover-bg-light'
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* News Grid */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Завантаження...</span>
          </div>
          <p className="mt-2 text-muted">Оновлення стрічки...</p>
        </div>
      ) : error ? (
        <div className="alert alert-warning border-0 shadow-sm text-center py-4" role="alert">
          <AlertCircle className="text-warning mb-2" size={40} />
          <h5>Не вдалося завантажити новини</h5>
          <p className="small text-muted">{error}</p>
          <p className="small text-muted">Будь ласка, перевірте, чи запущено сервер Node.js на порті 5000.</p>
        </div>
      ) : filteredNews.length === 0 ? (
        <div className="text-center py-5 bg-white rounded-4 shadow-sm border border-light">
          <p className="text-muted mb-0">Новин за вказаними критеріями не знайдено.</p>
        </div>
      ) : (
        <div className="row g-4">
          {filteredNews.map((item) => (
            <div className="col-md-6 col-lg-4" key={item.id}>
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
                  <button 
                    onClick={() => openArticle(item.id)}
                    className="mt-auto btn btn-premium-outline btn-sm rounded-pill w-100"
                  >
                    Читати детальніше
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div 
          className="modal fade show d-block" 
          style={{ backgroundColor: 'rgba(11, 25, 44, 0.85)', zIndex: 1050 }}
          onClick={closeArticle}
          tabIndex="-1"
        >
          <div 
            className="modal-dialog modal-dialog-centered modal-lg" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content custom-modal-content border-0 shadow-lg">
              <div className="modal-header custom-modal-header d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <span className="badge bg-info">{selectedArticle.category}</span>
                  <span className="text-white-50 small d-flex align-items-center gap-1">
                    <Calendar size={14} />
                    {new Date(selectedArticle.date).toLocaleDateString('uk-UA')}
                  </span>
                </div>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={closeArticle} 
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body p-4">
                <img 
                  src={selectedArticle.image_url} 
                  className="img-fluid rounded-3 mb-4 w-100" 
                  alt={selectedArticle.title}
                  style={{ maxHeight: '400px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80";
                  }}
                />
                <h3 className="fw-bold text-dark mb-3">{selectedArticle.title}</h3>
                <h6 className="fw-semibold text-teal mb-4" style={{ color: 'var(--secondary-color)' }}>
                  {selectedArticle.summary}
                </h6>
                <div className="text-muted" style={{ lineHeight: '1.7', whiteSpace: 'pre-line' }}>
                  {selectedArticle.content}
                </div>
              </div>
              <div className="modal-footer border-0 p-3 bg-light">
                <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={closeArticle}>
                  Закрити
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default News;
