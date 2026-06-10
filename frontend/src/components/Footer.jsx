import React from 'react';
import { Link } from 'react-router-dom';
import { Atom, Mail, Phone, MapPin, Globe } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-primary text-white pt-5 pb-3 mt-auto">
      <div className="container">
        <div className="row g-4">
          {/* Logo and brief info */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center mb-3">
              <Atom className="text-info me-2" size={36} />
              <div>
                <h5 className="fw-bold mb-0 text-white">НАУКОВИЙ ЦЕНТР</h5>
                <span style={{ fontSize: '0.7rem', letterSpacing: '1px' }} className="text-info">
                  ЗАКЛАДУ ВИЩОЇ ОСВІТИ
                </span>
              </div>
            </div>
            <p className="text-white-50 small">
              Провідний дослідницький та інноваційний хаб університету. Об'єднуємо теорію з практикою, створюємо передові технології та підтримуємо молодих вчених у їхніх прагненнях змінити світ.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 ms-lg-auto">
            <h6 className="fw-bold text-info mb-3">Навігація</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><Link to="/" className="text-white-50 text-decoration-none hover-text-white">Головна сторінка</Link></li>
              <li><Link to="/about" className="text-white-50 text-decoration-none hover-text-white">Про науковий центр</Link></li>
              <li><Link to="/gallery" className="text-white-50 text-decoration-none hover-text-white">Галерея фото</Link></li>
              <li><Link to="/news" className="text-white-50 text-decoration-none hover-text-white">Стрічка новин</Link></li>
              <li><Link to="/contacts" className="text-white-50 text-decoration-none hover-text-white">Наші контакти</Link></li>
            </ul>
          </div>

          {/* Quick Links 2 */}
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold text-info mb-3">Діяльність</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><a href="#" className="text-white-50 text-decoration-none hover-text-white">Наукові гранти</a></li>
              <li><a href="#" className="text-white-50 text-decoration-none hover-text-white">Патентування</a></li>
              <li><a href="#" className="text-white-50 text-decoration-none hover-text-white">Лабораторії</a></li>
              <li><a href="#" className="text-white-50 text-decoration-none hover-text-white">Конференції</a></li>
              <li><Link to="/admin" className="text-white-50 text-decoration-none hover-text-white">Панель управління</Link></li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold text-info mb-3">Контакти</h6>
            <ul className="list-unstyled d-flex flex-column gap-3 small">
              <li className="d-flex align-items-start">
                <MapPin className="text-info me-2 mt-1 flex-shrink-0" size={18} />
                <span className="text-white-50">
                  вул. Наукова, 12, корп. 3, м. Полтава, 36000, Україна
                </span>
              </li>
              <li className="d-flex align-items-center">
                <Phone className="text-info me-2 flex-shrink-0" size={18} />
                <a href="tel:+380532555555" className="text-white-50 text-decoration-none hover-text-white">
                  +38 (0532) 55-55-55
                </a>
              </li>
              <li className="d-flex align-items-center">
                <Mail className="text-info me-2 flex-shrink-0" size={18} />
                <a href="mailto:science@univ.edu.ua" className="text-white-50 text-decoration-none hover-text-white">
                  science@univ.edu.ua
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start mb-2 mb-md-0">
            <p className="mb-0 text-white-50 small">
              &copy; {currentYear} Науковий центр ЗВО. Всі права захищені.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end text-white-50 small">
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
