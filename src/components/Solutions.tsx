
import React from "react";
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

const Solutions: React.FC = () => (
  <div className="max-w-7xl mx-auto px-8 animate-fade-in">
    <div className="text-center mb-16">
      <h2 className="text-5xl lg:text-7xl font-bold mb-8 text-brand-darkBlue">
        Комплексные ИИ-решения для бизнеса
      </h2>
      <p className="text-2xl lg:text-3xl text-gray-600 max-w-5xl mx-auto">
        Мы не просто создаём чат-ботов. Мы строим целые экосистемы.
      </p>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {solutions.map((solution, i) => (
        <div
          key={i}
          className="bg-white/80 rounded-2xl p-12 shadow-lg border border-white/40 hover:bg-white/95 transition-all backdrop-blur-sm"
        >
          <div className="flex items-start gap-8 mb-8">
            <div className="p-6 bg-white rounded-xl shadow-sm">
              {solution.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-3xl lg:text-4xl font-bold mb-4 text-brand-darkBlue">
                {solution.title}
              </h3>
              <p className="text-xl lg:text-2xl text-gray-600 mb-6">
                {solution.desc}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            {solution.features.map((feature, j) => (
              <span
                key={j}
                className="px-6 py-3 bg-brand-purple/10 text-brand-purple rounded-full text-lg lg:text-xl font-medium"
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
