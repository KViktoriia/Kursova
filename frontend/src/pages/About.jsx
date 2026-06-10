import React from 'react';
import { Shield, Target, Award, Users, Compass, Code, Brain, Microscope } from 'lucide-react';

function About() {
  return (
    <div className="container py-5">
      {/* Intro section */}
      <section className="mb-5 text-center">
        <span className="badge bg-gradient-teal mb-3 px-3 py-2 text-uppercase fw-bold" style={{ letterSpacing: '1px' }}>
          Хто ми є
        </span>
        <h1 className="fw-bold mb-3 text-gradient display-5">Про науковий центр ЗВО</h1>
        <p className="lead text-muted mx-auto" style={{ maxWidth: '800px' }}>
          Наш науковий центр є провідним осередком науково-дослідницької діяльності університету, об'єднуючи найкращих викладачів, аспірантів та студентів для розробки високих технологій та вирішення глобальних наукових проблем.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="row g-4 mb-5">
        <div className="col-md-6">
          <div className="card h-100 p-4 border-0 glass-card">
            <div className="d-flex align-items-center mb-3">
              <div className="p-3 rounded-3 bg-info bg-opacity-10 text-info me-3">
                <Target size={28} />
              </div>
              <h4 className="fw-bold mb-0">Наша місія</h4>
            </div>
            <p className="text-muted">
              Сприяння розвитку інтелектуального потенціалу України шляхом проведення передових наукових досліджень, впровадження інновацій у виробництво та підготовки нового покоління висококваліфікованих вчених. Ми інтегруємо академічну науку з освітнім процесом для підготовки конкурентоспроможних фахівців.
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100 p-4 border-0 glass-card">
            <div className="d-flex align-items-center mb-3">
              <div className="p-3 rounded-3 bg-teal bg-opacity-10 text-teal me-3" style={{ color: 'var(--secondary-color)', backgroundColor: 'rgba(13, 148, 136, 0.1)' }}>
                <Compass size={28} style={{ color: 'var(--secondary-color)' }} />
              </div>
              <h4 className="fw-bold mb-0">Наше бачення</h4>
            </div>
            <p className="text-muted">
              Стати визнаним на міжнародному рівні науково-дослідним хабом, який є магнітом для молодих талантів, надійним партнером для світових наукових інституцій та лідером інноваційного розвитку нашого регіону та держави.
            </p>
          </div>
        </div>
      </section>

      {/* Structure of labs */}
      <section className="mb-5">
        <h2 className="fw-bold mb-4 text-center text-dark">Структурні підрозділи та лабораторії</h2>
        <div className="row g-4">
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 border-0 p-4 shadow-sm text-center bg-white hover-shadow transition-smooth">
              <div className="text-info mx-auto mb-3">
                <Microscope size={48} />
              </div>
              <h5 className="fw-bold mb-2">Лабораторія космічних технологій</h5>
              <p className="text-muted small mb-0">Спеціалізується на моделюванні космічних апаратів, аналізі радіосигналів та супутниковому моніторингу.</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 border-0 p-4 shadow-sm text-center bg-white hover-shadow transition-smooth">
              <div className="mx-auto mb-3" style={{ color: 'var(--secondary-color)' }}>
                <Code size={48} />
              </div>
              <h5 className="fw-bold mb-2">Лабораторія зеленої хімії</h5>
              <p className="text-muted small mb-0">Займається розробкою екологічних біорозкладних матеріалів та органічним синтезом нових сполук.</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 border-0 p-4 shadow-sm text-center bg-white hover-shadow transition-smooth">
              <div className="text-primary mx-auto mb-3">
                <Brain size={48} />
              </div>
              <h5 className="fw-bold mb-2">Лабораторія ШІ та робототехніки</h5>
              <p className="text-muted small mb-0">Досліджує алгоритми глибокого навчання, нейромережевий аналіз даних та програмування роботів.</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 border-0 p-4 shadow-sm text-center bg-white hover-shadow transition-smooth">
              <div className="text-warning mx-auto mb-3">
                <Users size={48} />
              </div>
              <h5 className="fw-bold mb-2">Лабораторія квантової оптики</h5>
              <p className="text-muted small mb-0">Проводить дослідження квантової суперпозиції в складних кристалах та розробляє елементи нанофотоніки.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership / Administration */}
      <section className="mb-5">
        <h2 className="fw-bold mb-4 text-center text-dark">Керівництво центру</h2>
        <div className="row g-4 justify-content-center">
          {/* Leader 1 */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm text-center bg-white p-4">
              <div className="rounded-circle overflow-hidden mx-auto mb-3" style={{ width: '120px', height: '120px' }}>
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80" 
                  alt="Директор" 
                  className="w-100 h-100 object-fit-cover"
                />
              </div>
              <h5 className="fw-bold mb-1">Ляшенко Сергій Володимирович</h5>
              <span className="text-info small fw-semibold d-block mb-3">Директор наукового центру</span>
              <p className="text-muted small mb-0">Доктор технічних наук, професор. Лауреат Державної премії України в галузі науки і техніки. Автор понад 150 наукових праць.</p>
            </div>
          </div>
          {/* Leader 2 */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm text-center bg-white p-4">
              <div className="rounded-circle overflow-hidden mx-auto mb-3" style={{ width: '120px', height: '120px' }}>
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80" 
                  alt="Заступник директора" 
                  className="w-100 h-100 object-fit-cover"
                />
              </div>
              <h5 className="fw-bold mb-1">Петров Юрій Григорович</h5>
              <span className="text-info small fw-semibold d-block mb-3">Заступник директора з наукової роботи</span>
              <p className="text-muted small mb-0">Доктор фізико-математичних наук, доцент. Керівник лабораторії квантової оптики. Координатор міжнародних грантових програм.</p>
            </div>
          </div>
          {/* Leader 3 */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm text-center bg-white p-4">
              <div className="rounded-circle overflow-hidden mx-auto mb-3" style={{ width: '120px', height: '120px' }}>
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80" 
                  alt="Вчений секретар" 
                  className="w-100 h-100 object-fit-cover"
                />
              </div>
              <h5 className="fw-bold mb-1">Соколова Ольга Петрівна</h5>
              <span className="text-info small fw-semibold d-block mb-3">Вчений секретар центру</span>
              <p className="text-muted small mb-0">Кандидат біологічних наук, доцент. Спеціаліст із зеленої хімії та екологічного моніторингу. Організатор наукових конференцій.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
