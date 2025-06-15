import React, { useState, useEffect } from "react";
import { MessageCircle, ShoppingCart, Calendar, BarChart3 } from "lucide-react";

const solutions = [
  {
    icon: <MessageCircle className="w-12 h-12 text-brand-purple" />,
    title: "Чат-боты",
    desc: "Telegram, WhatsApp, Instagram",
    features: ["Обработка заявок", "Консультации 24/7"]
  },
  {
    icon: <ShoppingCart className="w-12 h-12 text-brand-orange" />,
    title: "Автоматизация продаж",
    desc: "От лида до закрытия сделки",
    features: ["Квалификация лидов", "Презентация товаров"]
  },
  {
    icon: <Calendar className="w-12 h-12 text-brand-purple" />,
    title: "Система бронирований",
    desc: "Управление записями и услугами",
    features: ["Онлайн-запись", "Напоминания"]
  },
  {
    icon: <BarChart3 className="w-12 h-12 text-brand-orange" />,
    title: "Аналитика",
    desc: "Глубокая аналитика в реальном времени",
    features: ["Метрики эффективности", "Прогнозы продаж"]
  }
];

const Solutions: React.FC = () => {
  const [showTitle, setShowTitle] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Показываем заголовок сразу
    const titleTimer = setTimeout(() => {
      setShowTitle(true);
    }, 100);

    // Показываем контент через 800мс после заголовка
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 900);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-8 animate-curtain-reveal">
      <div className={`text-center mb-6 transition-all duration-800 ${
        showTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-brand-darkBlue animate-title-wave stagger-1 will-animate">
          Комплексные ИИ-решения для бизнеса
        </h2>
        <p className="text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto animate-description-fade-up stagger-2 will-animate">
          Мы не просто создаём чат-ботов. Мы строим целые экосистемы.
        </p>
      </div>
      
      {/* Контент с анимацией */}
      <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 transition-all duration-1000 delay-200 ${
        showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}>
        {solutions.map((solution, i) => (
          <div
            key={i}
            className={`bg-white/80 rounded-3xl p-4 shadow-xl border border-white/40 hover:bg-white/95 transition-all backdrop-blur-sm flex flex-col hover-lift will-animate animate-card-wave stagger-${i + 1}`}
          >
            <div className="flex items-start gap-4 mb-4 flex-grow">
              <div className="p-3 bg-white rounded-2xl shadow-lg will-animate">
                {solution.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-xl lg:text-2xl font-bold mb-2 text-brand-darkBlue animate-title-wave stagger-1 will-animate">
                  {solution.title}
                </h3>
                <p className="text-base lg:text-lg text-gray-600 mb-3 animate-description-fade-up stagger-2 will-animate">
                  {solution.desc}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-auto">
              {solution.features.map((feature, j) => (
                <span
                  key={j}
                  className="px-3 py-1 bg-brand-purple/10 text-brand-purple rounded-full text-sm lg:text-base font-medium"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Solutions;
