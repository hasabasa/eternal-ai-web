
import React from "react";
import { MessageCircle, ShoppingCart, Calendar, BarChart3 } from "lucide-react";

const solutions = [
  {
    icon: <MessageCircle className="w-16 h-16 text-brand-purple" />,
    title: "Чат-боты",
    desc: "Telegram, WhatsApp, Instagram",
    features: ["Обработка заявок", "Консультации 24/7"]
  },
  {
    icon: <ShoppingCart className="w-16 h-16 text-brand-orange" />,
    title: "Автоматизация продаж",
    desc: "От лида до закрытия сделки",
    features: ["Квалификация лидов", "Презентация товаров"]
  },
  {
    icon: <Calendar className="w-16 h-16 text-brand-purple" />,
    title: "Система бронирований",
    desc: "Управление записями и услугами",
    features: ["Онлайн-запись", "Напоминания"]
  },
  {
    icon: <BarChart3 className="w-16 h-16 text-brand-orange" />,
    title: "Аналитика",
    desc: "Глубокая аналитика в реальном времени",
    features: ["Метрики эффективности", "Прогнозы продаж"]
  }
];

const Solutions: React.FC = () => (
  <div className="max-w-7xl mx-auto px-8 animate-fade-in">
    <div className="text-center mb-20">
      <h2 className="text-6xl lg:text-7xl font-bold mb-12 text-brand-darkBlue">
        Комплексные ИИ-решения для бизнеса
      </h2>
      <p className="text-3xl lg:text-4xl text-gray-600 max-w-5xl mx-auto">
        Мы не просто создаём чат-ботов. Мы строим целые экосистемы.
      </p>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      {solutions.map((solution, i) => (
        <div
          key={i}
          className="bg-white/80 rounded-3xl p-16 shadow-xl border border-white/40 hover:bg-white/95 transition-all backdrop-blur-sm"
        >
          <div className="flex items-start gap-10 mb-12">
            <div className="p-8 bg-white rounded-2xl shadow-lg">
              {solution.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-4xl lg:text-5xl font-bold mb-6 text-brand-darkBlue">
                {solution.title}
              </h3>
              <p className="text-2xl lg:text-3xl text-gray-600 mb-8">
                {solution.desc}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            {solution.features.map((feature, j) => (
              <span
                key={j}
                className="px-8 py-4 bg-brand-purple/10 text-brand-purple rounded-full text-xl lg:text-2xl font-medium"
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
