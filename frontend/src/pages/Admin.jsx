import React, { useState, useEffect } from 'react';
import { PlusCircle, MessageSquare, Database, CheckCircle, AlertTriangle, FileText, Eye, Archive, ArrowUpLeft } from 'lucide-react';

function Admin() {
  const [activeTab, setActiveTab] = useState('add-news');
  
  // States for adding news
  const [newsForm, setNewsForm] = useState({
    title: '',
    summary: '',
    content: '',
    category: 'Гранти',
    date: new Date().toISOString().split('T')[0],
    image_url: ''
  });
  const [newsStatus, setNewsStatus] = useState({ submitting: false, success: false, error: null });

  // States for viewing contact feedback
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbacksLoading, setFeedbacksLoading] = useState(false);
  const [feedbacksError, setFeedbacksError] = useState(null);
  const [feedbackSubTab, setFeedbackSubTab] = useState('unread'); // 'unread' or 'read'
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  // States for projects
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [projectsError, setProjectsError] = useState(null);

  const categories = ['Гранти', 'Дослідження', 'Патенти', 'Конференції', 'Публікації', 'Міжнародна співпраця'];

  // Load database tables on mount
  useEffect(() => {
    fetchFeedbacks();
    fetchProjects();
  }, []);

  const fetchFeedbacks = () => {
    setFeedbacksLoading(true);
    setFeedbacksError(null);
    fetch('/api/contacts')
      .then((res) => {
        if (!res.ok) throw new Error('Не вдалося отримати повідомлення');
        return res.json();
      })
      .then((data) => {
        setFeedbacks(data);
        setFeedbacksLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setFeedbacksError(err.message);
        setFeedbacksLoading(false);
      });
  };

  const fetchProjects = () => {
    setProjectsLoading(true);
    setProjectsError(null);
    fetch('/api/projects')
      .then((res) => {
        if (!res.ok) throw new Error('Не вдалося завантажити проекти');
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setProjectsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setProjectsError(err.message);
        setProjectsLoading(false);
      });
  };

  // Mark message status actions
  const handleMarkAsRead = (id) => {
    fetch(`/api/contacts/${id}/read`, { method: 'PUT' })
      .then((res) => {
        if (!res.ok) throw new Error('Помилка оновлення статусу');
        fetchFeedbacks();
      })
      .catch((err) => console.error(err));
  };

  const handleMarkAsUnread = (id) => {
    fetch(`/api/contacts/${id}/unread`, { method: 'PUT' })
      .then((res) => {
        if (!res.ok) throw new Error('Помилка оновлення статусу');
        fetchFeedbacks();
      })
      .catch((err) => console.error(err));
  };

  const handleReadMessage = (feedback) => {
    setSelectedFeedback(feedback);
    if (!feedback.is_read) {
      fetch(`/api/contacts/${feedback.id}/read`, { method: 'PUT' })
        .then((res) => {
          if (res.ok) {
            // Update local state to show as read immediately and update badges
            setFeedbacks(prev => prev.map(f => f.id === feedback.id ? { ...f, is_read: 1 } : f));
          }
        })
        .catch((err) => console.error(err));
    }
  };

  // News Form submission
  const handleNewsChange = (e) => {
    setNewsForm({
      ...newsForm,
      [e.target.name]: e.target.value
    });
  };

  const handleNewsSubmit = (e) => {
    e.preventDefault();
    setNewsStatus({ submitting: true, success: false, error: null });

    fetch('/api/news', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newsForm)
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Помилка збереження новини');
        return data;
      })
      .then(() => {
        setNewsStatus({ submitting: false, success: true, error: null });
        setNewsForm({
          title: '',
          summary: '',
          content: '',
          category: 'Гранти',
          date: new Date().toISOString().split('T')[0],
          image_url: ''
        });
      })
      .catch((err) => {
        console.error(err);
        setNewsStatus({ submitting: false, success: false, error: err.message });
      });
  };

  // Compute counts
  const unreadFeedbacks = feedbacks.filter(f => !f.is_read);
  const readFeedbacks = feedbacks.filter(f => f.is_read);
  const unreadCount = unreadFeedbacks.length;

  const displayedFeedbacks = feedbackSubTab === 'unread' ? unreadFeedbacks : readFeedbacks;

  return (
    <div className="container py-5">
      {/* Intro */}
      <section className="mb-5 text-center">
        <span className="badge bg-gradient-teal mb-3 px-3 py-2 text-uppercase fw-bold" style={{ letterSpacing: '1px' }}>
          Адміністративна панель
        </span>
        <h1 className="fw-bold mb-3 text-gradient display-5">Кабінет керування базою даних</h1>
        <p className="lead text-muted mx-auto" style={{ maxWidth: '750px' }}>
          Керування матеріалами та запитами користувачів наукового центру.
        </p>
      </section>

      <div className="row g-4">
        {/* Left Sidebar Menu */}
        <div className="col-lg-3">
          <div className="admin-sidebar">
            <h5 className="fw-bold mb-4 text-dark d-flex align-items-center gap-2">
              <Database size={20} className="text-info" /> База даних
            </h5>
            <div className="d-flex flex-column gap-2">
              <button
                onClick={() => setActiveTab('add-news')}
                className={`btn text-start py-3 px-3 rounded-3 border-0 d-flex align-items-center gap-2 ${
                  activeTab === 'add-news' ? 'btn-premium text-white' : 'bg-light hover-bg-light text-dark'
                }`}
              >
                <PlusCircle size={18} />
                Додати новину
              </button>
              <button
                onClick={() => setActiveTab('view-feedback')}
                className={`btn text-start py-3 px-3 rounded-3 border-0 d-flex align-items-center gap-2 w-100 ${
                  activeTab === 'view-feedback' ? 'btn-premium text-white' : 'bg-light hover-bg-light text-dark'
                }`}
              >
                <MessageSquare size={18} />
                Повідомлення
                {unreadCount > 0 && (
                  <span className="badge bg-danger ms-auto rounded-pill">{unreadCount}</span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('view-projects')}
                className={`btn text-start py-3 px-3 rounded-3 border-0 d-flex align-items-center gap-2 ${
                  activeTab === 'view-projects' ? 'btn-premium text-white' : 'bg-light hover-bg-light text-dark'
                }`}
              >
                <FileText size={18} />
                Список проектів
              </button>
            </div>
          </div>
        </div>

        {/* Right Tab Content */}
        <div className="col-lg-9">
          {/* TAB 1: ADD NEWS */}
          {activeTab === 'add-news' && (
            <div className="card border-0 glass-card p-4">
              <h3 className="fw-bold mb-4 text-dark">Створити нову новину</h3>

              {newsStatus.success && (
                <div className="alert alert-success border-0 shadow-sm d-flex align-items-center gap-2 mb-4" role="alert">
                  <CheckCircle className="text-success flex-shrink-0" size={24} />
                  <div>
                    <strong>Успішно додано!</strong> Новину збережено в базі даних SQLite. Ви можете перевірити її відображення на головній сторінці або в стрічці новин.
                  </div>
                </div>
              )}

              {newsStatus.error && (
                <div className="alert alert-danger border-0 shadow-sm d-flex align-items-center gap-2 mb-4" role="alert">
                  <AlertTriangle className="text-danger flex-shrink-0" size={24} />
                  <div>
                    <strong>Помилка збереження:</strong> {newsStatus.error}. Перевірте підключення до Node.js сервера.
                  </div>
                </div>
              )}

              <form onSubmit={handleNewsSubmit}>
                <div className="row g-3">
                  <div className="col-md-8">
                    <label htmlFor="news-title" className="form-label small fw-semibold text-muted">Заголовок новини</label>
                    <input
                      type="text"
                      id="news-title"
                      name="title"
                      className="form-control custom-form-control"
                      placeholder="Введіть заголовок..."
                      required
                      value={newsForm.title}
                      onChange={handleNewsChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="news-category" className="form-label small fw-semibold text-muted">Категорія</label>
                    <select
                      id="news-category"
                      name="category"
                      className="form-select custom-form-control"
                      value={newsForm.category}
                      onChange={handleNewsChange}
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-8">
                    <label htmlFor="news-image" className="form-label small fw-semibold text-muted">URL-посилання на зображення (Unsplash тощо)</label>
                    <input
                      type="url"
                      id="news-image"
                      name="image_url"
                      className="form-control custom-form-control"
                      placeholder="https://images.unsplash.com/photo-..."
                      value={newsForm.image_url}
                      onChange={handleNewsChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="news-date" className="form-label small fw-semibold text-muted">Дата публікації</label>
                    <input
                      type="date"
                      id="news-date"
                      name="date"
                      className="form-control custom-form-control"
                      required
                      value={newsForm.date}
                      onChange={handleNewsChange}
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="news-summary" className="form-label small fw-semibold text-muted">Короткий опис (прев'ю на картці)</label>
                    <input
                      type="text"
                      id="news-summary"
                      name="summary"
                      className="form-control custom-form-control"
                      placeholder="Короткий виклад новинного матеріалу..."
                      required
                      value={newsForm.summary}
                      onChange={handleNewsChange}
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="news-content" className="form-label small fw-semibold text-muted">Повний зміст новини</label>
                    <textarea
                      id="news-content"
                      name="content"
                      rows="6"
                      className="form-control custom-form-control"
                      placeholder="Детальний опис події або дослідження..."
                      required
                      value={newsForm.content}
                      onChange={handleNewsChange}
                    ></textarea>
                  </div>
                  <div className="col-12 mt-4 text-end">
                    <button
                      type="submit"
                      className="btn btn-premium px-5 py-3 rounded-pill"
                      disabled={newsStatus.submitting}
                    >
                      {newsStatus.submitting ? 'Збереження...' : 'Записати в базу даних'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: VIEW FEEDBACKS */}
          {activeTab === 'view-feedback' && (
            <div className="card border-0 glass-card p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="fw-bold mb-0 text-dark">Зворотний зв'язок з контактної форми</h3>
                <button className="btn btn-outline-secondary btn-sm rounded-pill" onClick={fetchFeedbacks}>
                  Оновити
                </button>
              </div>

              {/* Feedbacks Sub-Tabs */}
              <div className="d-flex border-bottom mb-4">
                <button
                  onClick={() => setFeedbackSubTab('unread')}
                  className={`btn px-4 py-2 border-0 rounded-0 fw-semibold position-relative bg-transparent ${
                    feedbackSubTab === 'unread' ? 'text-info border-bottom border-2 border-info fw-bold' : 'text-muted'
                  }`}
                  style={{ borderBottom: feedbackSubTab === 'unread' ? '2px solid var(--secondary-color)' : 'none' }}
                >
                  Нові повідомлення
                  {unreadCount > 0 && (
                    <span className="badge bg-danger ms-2 rounded-pill">{unreadCount}</span>
                  )}
                </button>
                <button
                  onClick={() => setFeedbackSubTab('read')}
                  className={`btn px-4 py-2 border-0 rounded-0 fw-semibold position-relative bg-transparent ${
                    feedbackSubTab === 'read' ? 'text-info border-bottom border-2 border-info fw-bold' : 'text-muted'
                  }`}
                  style={{ borderBottom: feedbackSubTab === 'read' ? '2px solid var(--secondary-color)' : 'none' }}
                >
                  Прочитані / Архів
                  {readFeedbacks.length > 0 && (
                    <span className="badge bg-secondary ms-2 rounded-pill">{readFeedbacks.length}</span>
                  )}
                </button>
              </div>

              {feedbacksLoading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-info" role="status"></div>
                </div>
              ) : feedbacksError ? (
                <div className="alert alert-danger border-0 shadow-sm text-center py-3">
                  <AlertTriangle className="me-2 d-inline" /> {feedbacksError}
                </div>
              ) : displayedFeedbacks.length === 0 ? (
                <div className="text-center py-5 bg-white border border-light rounded-3">
                  <p className="text-muted mb-0">
                    {feedbackSubTab === 'unread' 
                      ? 'Немає нових повідомлень. Усі листи прочитано.' 
                      : 'Архів прочитаних листів порожній.'}
                  </p>
                </div>
              ) : (
                <>
                  {/* Desktop Table View */}
                  <div className="d-none d-md-block table-responsive admin-table">
                    <table className="table table-hover align-middle mb-0">
                      <thead className="table-light">
                        <tr>
                          <th className="px-4 py-3">Дата</th>
                          <th className="py-3">Відправник</th>
                          <th className="py-3">Тема</th>
                          <th className="px-4 py-3 text-end">Дії</th>
                        </tr>
                      </thead>
                      <tbody>
                        {displayedFeedbacks.map((f) => (
                          <tr key={f.id}>
                            <td className="px-4 py-3 text-muted small">
                              {new Date(f.created_at).toLocaleString('uk-UA')}
                            </td>
                            <td className="py-3">
                              <span className="fw-bold text-dark d-block">{f.name}</span>
                              <span className="small text-muted">{f.email}</span>
                            </td>
                            <td className="py-3 fw-semibold text-dark">{f.subject}</td>
                            <td className="px-4 py-3 text-end">
                              <div className="d-flex justify-content-end gap-2">
                                <button 
                                  className="btn btn-outline-info btn-sm rounded-pill d-flex align-items-center gap-1"
                                  onClick={() => handleReadMessage(f)}
                                  title="Читати повністю"
                                >
                                  <Eye size={14} /> Читати
                                </button>
                                
                                {feedbackSubTab === 'unread' ? (
                                  <button 
                                    className="btn btn-success btn-sm rounded-pill d-flex align-items-center gap-1"
                                    onClick={() => handleMarkAsRead(f.id)}
                                    title="Архівувати як прочитане"
                                  >
                                    <Archive size={14} /> Прочитано
                                  </button>
                                ) : (
                                  <button 
                                    className="btn btn-outline-secondary btn-sm rounded-pill d-flex align-items-center gap-1"
                                    onClick={() => handleMarkAsUnread(f.id)}
                                    title="Повернути в непрочитані"
                                  >
                                    <ArrowUpLeft size={14} /> У нові
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Card List View */}
                  <div className="d-block d-md-none">
                    {displayedFeedbacks.map((f) => (
                      <div key={f.id} className="card p-3 mb-3 border border-light shadow-sm rounded-3 bg-white">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="text-muted small">
                            {new Date(f.created_at).toLocaleString('uk-UA')}
                          </span>
                        </div>
                        <h6 className="fw-bold text-dark mb-1">{f.name}</h6>
                        <p className="small text-muted mb-2">{f.email}</p>
                        <div className="mb-3">
                          <span className="text-muted small d-block fw-semibold">Тема:</span>
                          <span className="text-dark small fw-semibold">{f.subject}</span>
                        </div>
                        <div className="d-flex gap-2">
                          <button 
                            className="btn btn-outline-info btn-sm rounded-pill d-flex align-items-center gap-1 flex-grow-1 justify-content-center"
                            onClick={() => handleReadMessage(f)}
                          >
                            <Eye size={14} /> Читати
                          </button>
                          
                          {feedbackSubTab === 'unread' ? (
                            <button 
                              className="btn btn-success btn-sm rounded-pill d-flex align-items-center gap-1 flex-grow-1 justify-content-center"
                              onClick={() => handleMarkAsRead(f.id)}
                            >
                              <Archive size={14} /> Прочитано
                            </button>
                          ) : (
                            <button 
                              className="btn btn-outline-secondary btn-sm rounded-pill d-flex align-items-center gap-1 flex-grow-1 justify-content-center"
                              onClick={() => handleMarkAsUnread(f.id)}
                            >
                              <ArrowUpLeft size={14} /> У нові
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* TAB 3: VIEW PROJECTS */}
          {activeTab === 'view-projects' && (
            <div className="card border-0 glass-card p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold mb-0 text-dark">Список наукових проектів</h3>
                <button className="btn btn-outline-secondary btn-sm rounded-pill" onClick={fetchProjects}>
                  Оновити
                </button>
              </div>

              {projectsLoading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-info" role="status"></div>
                </div>
              ) : projectsError ? (
                <div className="alert alert-danger border-0 shadow-sm text-center py-3">
                  <AlertTriangle className="me-2 d-inline" /> {projectsError}
                </div>
              ) : (
                <>
                  {/* Desktop Table View */}
                  <div className="d-none d-md-block table-responsive admin-table">
                    <table className="table table-hover mb-0">
                      <thead className="table-light">
                        <tr>
                          <th className="px-4 py-3">Рік початку</th>
                          <th className="py-3">Назва проекту</th>
                          <th className="py-3">Керівник</th>
                          <th className="py-3">Бюджет</th>
                          <th className="px-4 py-3">Статус</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projects.map((p) => (
                          <tr key={p.id}>
                            <td className="px-4 py-3 fw-bold text-dark">{p.start_year}</td>
                            <td className="py-3">
                              <span className="fw-bold text-dark d-block">{p.title}</span>
                              <span className="small text-muted">{p.description}</span>
                            </td>
                            <td className="py-3 small text-dark">{p.lead}</td>
                            <td className="py-3 fw-semibold text-info">{p.budget}</td>
                            <td className="px-4 py-3">
                              <span className={`badge ${
                                p.status === 'Завершено' ? 'bg-success' : p.status === 'У процесі виконання' ? 'bg-primary' : 'bg-secondary'
                              }`}>
                                {p.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Card List View */}
                  <div className="d-block d-md-none">
                    {projects.map((p) => (
                      <div key={p.id} className="card p-3 mb-3 border border-light shadow-sm rounded-3 bg-white">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <span className="fw-bold text-dark">{p.start_year} рік</span>
                          <span className={`badge ${
                            p.status === 'Завершено' ? 'bg-success' : p.status === 'У процесі виконання' ? 'bg-primary' : 'bg-secondary'
                          }`}>
                            {p.status}
                          </span>
                        </div>
                        <h6 className="fw-bold text-dark mb-2">{p.title}</h6>
                        <p className="small text-muted mb-2">{p.description}</p>
                        <hr className="my-2" />
                        <div className="d-flex justify-content-between align-items-center small">
                          <span className="text-muted">Керівник:</span>
                          <span className="fw-semibold text-dark">{p.lead}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center small mt-1">
                          <span className="text-muted">Бюджет:</span>
                          <span className="fw-bold text-info">{p.budget}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Message Reader Modal */}
      {selectedFeedback && (
        <div 
          className="modal fade show d-block" 
          style={{ backgroundColor: 'rgba(11, 25, 44, 0.85)', zIndex: 1060 }}
          onClick={() => setSelectedFeedback(null)}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered" onClick={e => e.stopPropagation()}>
            <div className="modal-content custom-modal-content border-0 shadow-lg">
              <div className="modal-header custom-modal-header d-flex justify-content-between align-items-center">
                <h5 className="fw-bold mb-0 text-white">Перегляд повідомлення</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setSelectedFeedback(null)} aria-label="Close"></button>
              </div>
              <div className="modal-body p-4">
                <div className="mb-3">
                  <span className="text-muted small d-block fw-semibold mb-1">Відправник:</span>
                  <div className="bg-light p-2 rounded text-dark">
                    <strong>{selectedFeedback.name}</strong> 
                    <span className="text-muted small"> ({selectedFeedback.email})</span>
                  </div>
                </div>
                <div className="mb-3">
                  <span className="text-muted small d-block fw-semibold mb-1">Тема повідомлення:</span>
                  <div className="bg-light p-2 rounded text-dark fw-bold">
                    {selectedFeedback.subject}
                  </div>
                </div>
                <div className="mb-3">
                  <span className="text-muted small d-block fw-semibold mb-1">Дата відправки:</span>
                  <span className="text-dark small bg-light p-2 rounded d-block">
                    {new Date(selectedFeedback.created_at).toLocaleString('uk-UA')}
                  </span>
                </div>
                <hr className="my-3" />
                <div className="mb-2">
                  <span className="text-muted small d-block fw-semibold mb-2">Текст листа:</span>
                  <div className="bg-light p-3 rounded text-dark" style={{ whiteSpace: 'pre-line', lineHeight: '1.6', fontSize: '0.95rem' }}>
                    {selectedFeedback.message}
                  </div>
                </div>
              </div>
              <div className="modal-footer bg-light border-0 p-3 justify-content-between">
                <div>
                  {!selectedFeedback.is_read || feedbacks.find(f => f.id === selectedFeedback.id)?.is_read === 0 ? (
                    <button 
                      className="btn btn-success rounded-pill px-4 btn-sm d-flex align-items-center gap-1" 
                      onClick={() => {
                        handleMarkAsRead(selectedFeedback.id);
                        setSelectedFeedback(null);
                      }}
                    >
                      <Archive size={14} /> Прочитано
                    </button>
                  ) : (
                    <button 
                      className="btn btn-outline-secondary rounded-pill px-4 btn-sm d-flex align-items-center gap-1" 
                      onClick={() => {
                        handleMarkAsUnread(selectedFeedback.id);
                        setSelectedFeedback(null);
                      }}
                    >
                      <ArrowUpLeft size={14} /> У непрочитані
                    </button>
                  )}
                </div>
                <button type="button" className="btn btn-secondary rounded-pill px-4 btn-sm" onClick={() => setSelectedFeedback(null)}>
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

export default Admin;
