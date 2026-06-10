import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertTriangle } from 'lucide-react';

function Contacts() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });

    fetch('/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Щось пішло не так при відправці повідомлення');
        }
        return data;
      })
      .then(() => {
        setStatus({ submitting: false, success: true, error: null });
        setFormData({ name: '', email: '', subject: '', message: '' });
      })
      .catch((err) => {
        console.error(err);
        setStatus({ submitting: false, success: false, error: err.message });
      });
  };

  return (
    <div className="container py-5">
      {/* Page Header */}
      <section className="mb-5 text-center">
        <span className="badge bg-gradient-teal mb-3 px-3 py-2 text-uppercase fw-bold" style={{ letterSpacing: '1px' }}>
          Зв'яжіться з нами
        </span>
        <h1 className="fw-bold mb-3 text-gradient display-5">Контакти та зворотний зв'язок</h1>
        <p className="lead text-muted mx-auto" style={{ maxWidth: '750px' }}>
          Маєте пропозиції щодо наукового співробітництва, грантів чи роботи лабораторій? Напишіть нам або завітайте особисто.
        </p>
      </section>

      <div className="row g-5 mb-5">
        {/* Left: Contact Info */}
        <div className="col-lg-5">
          <h3 className="fw-bold mb-4 text-dark">Контактна інформація</h3>
          
          <div className="d-flex flex-column gap-4">
            <div className="d-flex align-items-start bg-white p-3 rounded-4 shadow-sm border border-light">
              <MapPin className="text-info me-3 mt-1 flex-shrink-0" size={24} />
              <div>
                <h6 className="fw-bold mb-1">Наша адреса</h6>
                <p className="text-muted small mb-0">вул. Наукова, 12, корпус 3, м. Полтава, 36000, Україна</p>
              </div>
            </div>

            <div className="d-flex align-items-start bg-white p-3 rounded-4 shadow-sm border border-light">
              <Phone className="text-info me-3 mt-1 flex-shrink-0" size={24} />
              <div>
                <h6 className="fw-bold mb-1">Телефон приймальні</h6>
                <p className="text-muted small mb-0">
                  <a href="tel:+380532555555" className="text-decoration-none text-muted">+38 (0532) 55-55-55</a>
                </p>
              </div>
            </div>

            <div className="d-flex align-items-start bg-white p-3 rounded-4 shadow-sm border border-light">
              <Mail className="text-info me-3 mt-1 flex-shrink-0" size={24} />
              <div>
                <h6 className="fw-bold mb-1">Електронна пошта</h6>
                <p className="text-muted small mb-0">
                  <a href="mailto:science@univ.edu.ua" className="text-decoration-none text-muted">science@univ.edu.ua</a>
                </p>
              </div>
            </div>

            <div className="d-flex align-items-start bg-white p-3 rounded-4 shadow-sm border border-light">
              <Clock className="text-info me-3 mt-1 flex-shrink-0" size={24} />
              <div>
                <h6 className="fw-bold mb-1">Графік роботи</h6>
                <p className="text-muted small mb-0">Понеділок – П'ятниця: 09:00 – 17:00</p>
                <p className="text-muted small mb-0">Субота, Неділя: Вихідні</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="col-lg-7">
          <div className="card border-0 glass-card p-4">
            <h3 className="fw-bold mb-4 text-dark">Надіслати нам повідомлення</h3>

            {status.success && (
              <div className="alert alert-success border-0 shadow-sm d-flex align-items-center gap-2 mb-4" role="alert">
                <CheckCircle className="text-success flex-shrink-0" size={24} />
                <div>
                  <strong>Успішно відправлено!</strong> Ваше повідомлення збережено в базі даних. Ми відповімо вам найближчим часом.
                </div>
              </div>
            )}

            {status.error && (
              <div className="alert alert-danger border-0 shadow-sm d-flex align-items-center gap-2 mb-4" role="alert">
                <AlertTriangle className="text-danger flex-shrink-0" size={24} />
                <div>
                  <strong>Помилка відправки:</strong> {status.error}. Переконайтеся, що сервер запущений.
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="name" className="form-label small fw-semibold text-muted">Ваше ім'я</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control custom-form-control"
                    placeholder="Іван Петренко"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label small fw-semibold text-muted">Електронна пошта</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control custom-form-control"
                    placeholder="example@domain.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="subject" className="form-label small fw-semibold text-muted">Тема повідомлення</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="form-control custom-form-control"
                    placeholder="Співробітництво щодо проекту..."
                    required
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="message" className="form-label small fw-semibold text-muted">Текст повідомлення</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="form-control custom-form-control"
                    placeholder="Напишіть ваше питання сюди..."
                    required
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="col-12 mt-4">
                  <button
                    type="submit"
                    className="btn btn-premium w-100 py-3 rounded-pill d-flex align-items-center justify-content-center gap-2"
                    disabled={status.submitting}
                  >
                    {status.submitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Надсилання...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Надіслати запит
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <section className="mb-4">
        <h3 className="fw-bold mb-4 text-dark">Карта проїзду</h3>
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2586.3777598864704!2d34.56845347690659!3d49.590595371518335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d825f697479901%3A0xe510b106977dc816!2z0J3QsNGG0ZbQvtC90LDQu9GM0L3QuNC5INGD0L3RltCy0LXRgNGB0LjRgtC10YIgItCf0L7Qu9GC0LDQstGB0YzQutCwINC_0L7Qu9GW0YLQtdGF0L3RltC60LAi!5e0!3m2!1suk!2sua!4v1700000000000!5m2!1suk!2sua"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map location of Poltava National Technical University"
            id="google-map-iframe"
          ></iframe>
        </div>
      </section>
    </div>
  );
}

export default Contacts;
