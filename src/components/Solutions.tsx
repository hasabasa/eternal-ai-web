
import React from "react";
import { MessageCircle, ShoppingCart, Calendar, BarChart3 } from "lucide-react";

const solutions = [
  {
    icon: <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-brand-purple" />,
    title: "Чат-боты",
    desc: "Telegram, WhatsApp, Instagram Direct",
    features: ["Обработка заявок", "Консультации 24/7"]
  },
  {
    icon: <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 text-brand-orange" />,
    title: "Автоматизация продаж",
    desc: "От лида до закрытия сделки",
    features: ["Квалификация лидов", "Презентация товаров"]
  },
  {
    icon: <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-brand-purple" />,
    title: "Система бронирований",
    desc: "Управление записями и услугами",
    features: ["Онлайн-запись", "Напоминания"]
  },
  {
    icon: <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-brand-orange" />,
    title: "Аналитика",
    desc: "Глубокая аналитика в реальном времени",
    features: ["Метрики эффективности", "Прогнозы продаж"]
  }
];

const Solutions: React.FC = () => (
  <div className="max-w-6xl mx-auto px-4 animate-fade-in">
    <div className="text-center mb-8 md:mb-16">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-brand-darkBlue">
        Комплексные ИИ-решения для бизнеса
      </h2>
      <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
        Мы не просто создаём чат-ботов. Мы строим целые экосистемы.
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      {solutions.map((solution, i) => (
        <div
          key={i}
          className="bg-white/70 rounded-3xl p-6 md:p-8 shadow-lg border border-white/30 hover:bg-white/90 transition-all backdrop-blur-sm"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 bg-white rounded-2xl shadow-sm">
              {solution.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-bold mb-2 text-brand-darkBlue">
                {solution.title}
              </h3>
              <p className="text-base md:text-lg text-gray-600 mb-4">
                {solution.desc}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {solution.features.map((feature, j) => (
              <span
                key={j}
                className="px-3 py-1 bg-brand-purple/10 text-brand-purple rounded-full text-sm font-medium"
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

export default Solutions;
