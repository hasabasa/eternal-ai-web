
import React from "react";
import { MessageCircle, ShoppingCart, Calendar, BarChart3 } from "lucide-react";

const solutions = [
  {
    icon: <MessageCircle className="w-5 h-5 text-brand-purple" />,
    title: "Чат-боты",
    desc: "Telegram, WhatsApp, Instagram",
    features: ["Обработка заявок", "Консультации 24/7"]
  },
  {
    icon: <ShoppingCart className="w-5 h-5 text-brand-orange" />,
    title: "Автоматизация продаж",
    desc: "От лида до закрытия сделки",
    features: ["Квалификация лидов", "Презентация товаров"]
  },
  {
    icon: <Calendar className="w-5 h-5 text-brand-purple" />,
    title: "Система бронирований",
    desc: "Управление записями и услугами",
    features: ["Онлайн-запись", "Напоминания"]
  },
  {
    icon: <BarChart3 className="w-5 h-5 text-brand-orange" />,
    title: "Аналитика",
    desc: "Глубокая аналитика в реальном времени",
    features: ["Метрики эффективности", "Прогнозы продаж"]
  }
];

const Solutions: React.FC = () => (
  <div className="max-w-5xl mx-auto px-8 sm:px-12 animate-fade-in">
    <div className="text-center mb-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-brand-darkBlue">
        Комплексные ИИ-решения для бизнеса
      </h2>
      <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
        Мы не просто создаём чат-ботов. Мы строим целые экосистемы.
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {solutions.map((solution, i) => (
        <div
          key={i}
          className="bg-white/80 rounded-xl p-6 shadow-lg border border-white/40 hover:bg-white/95 transition-all backdrop-blur-sm"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 bg-white rounded-lg shadow-sm">
              {solution.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-2 text-brand-darkBlue">
                {solution.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {solution.desc}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {solution.features.map((feature, j) => (
              <span
                key={j}
                className="px-3 py-1 bg-brand-purple/10 text-brand-purple rounded-full text-xs font-medium"
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
