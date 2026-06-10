import React, { useState, useEffect } from 'react';
import { PlusCircle, MessageSquare, Database, CheckCircle, AlertTriangle, FileText } from 'lucide-react';

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

  // States for projects
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [projectsError, setProjectsError] = useState(null);

  const categories = ['Гранти', 'Дослідження', 'Патенти', 'Конференції', 'Публікації', 'Міжнародна співпраця'];

  // Handle Tab changes
  useEffect(() => {
    if (activeTab === 'view-feedback') {
      fetchFeedbacks();
    } else if (activeTab === 'view-projects') {
      fetchProjects();
    }
  }, [activeTab]);

  const fetchFeedbacks = () => {
    setFeedbacksLoading(true);
    setFeedbacksError(null);
    fetch('http://localhost:5000/api/contacts')
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
    fetch('http://localhost:5000/api/projects')
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

    fetch('http://localhost:5000/api/news', {
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

  return (
    <div className="container py-5">
      {/* Intro */}
      <section className="mb-5 text-center">
        <span className="badge bg-gradient-teal mb-3 px-3 py-2 text-uppercase fw-bold" style={{ letterSpacing: '1px' }}>
          Адміністративна панель
        </span>
        <h1 className="fw-bold mb-3 text-gradient display-5">Кабінет керування базою даних</h1>
        <p className="lead text-muted mx-auto" style={{ maxWidth: '750px' }}>
          Демонстрація REST API запитів та взаємодії з базою даних SQLite (3-й ступінь складності).
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
                className={`btn text-start py-3 px-3 rounded-3 border-0 d-flex align-items-center gap-2 ${
                  activeTab === 'view-feedback' ? 'btn-premium text-white' : 'bg-light hover-bg-light text-dark'
                }`}
              >
                <MessageSquare size={18} />
                Повідомлення
                {feedbacks.length > 0 && activeTab !== 'view-feedback' && (
                  <span className="badge bg-danger ms-auto">{feedbacks.length}</span>
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
              <p className="text-muted small mb-4">
                Заповніть форму нижче, щоб записати нову публікацію безпосередньо у таблицю <code>news</code> бази даних SQLite.
              </p>

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
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold mb-0 text-dark">Зворотний зв'язок з контактної форми</h3>
                <button className="btn btn-outline-secondary btn-sm rounded-pill" onClick={fetchFeedbacks}>
                  Оновити
                </button>
              </div>
              <p className="text-muted small mb-4">
                Список повідомлень, збережених у таблиці <code>contacts</code> при заповненні форми на сторінці Контакти.
              </p>

              {feedbacksLoading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-info" role="status"></div>
                </div>
              ) : feedbacksError ? (
                <div className="alert alert-danger border-0 shadow-sm text-center py-3">
                  <AlertTriangle className="me-2 d-inline" /> {feedbacksError}
                </div>
              ) : feedbacks.length === 0 ? (
                <div className="text-center py-5 bg-white border border-light rounded-3">
                  <p className="text-muted mb-0">Повідомлень поки що немає.</p>
                </div>
              ) : (
                <div className="table-responsive admin-table">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="px-4 py-3">Дата</th>
                        <th className="py-3">Відправник</th>
                        <th className="py-3">Тема</th>
                        <th className="px-4 py-3">Повідомлення</th>
                      </tr>
                    </thead>
                    <tbody>
                      {feedbacks.map((f) => (
                        <tr key={f.id}>
                          <td className="px-4 py-3 text-muted small">
                            {new Date(f.created_at).toLocaleString('uk-UA')}
                          </td>
                          <td className="py-3">
                            <span className="fw-bold text-dark d-block">{f.name}</span>
                            <span className="small text-muted">{f.email}</span>
                          </td>
                          <td className="py-3 fw-semibold text-dark">{f.subject}</td>
                          <td className="px-4 py-3 text-muted small" style={{ maxWidth: '300px' }}>
                            {f.message}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
              <p className="text-muted small mb-4">
                Перегляд проектів з таблиці <code>projects</code>.
              </p>

              {projectsLoading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-info" role="status"></div>
                </div>
              ) : projectsError ? (
                <div className="alert alert-danger border-0 shadow-sm text-center py-3">
                  <AlertTriangle className="me-2 d-inline" /> {projectsError}
                </div>
              ) : (
                <div className="table-responsive admin-table">
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
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;
