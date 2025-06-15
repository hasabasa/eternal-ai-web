
import React from "react";
import { MessageCircle, ShoppingCart, Calendar, BarChart3 } from "lucide-react";
import PageTransition from "./PageTransition";

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
  return (
    <PageTransition
      title="Комплексные ИИ-решения для бизнеса"
      subtitle="Мы не просто создаём чат-ботов. Мы строим целые экосистемы."
    >
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {solutions.map((solution, i) => (
            <div
              key={i}
              className="bg-white/80 rounded-3xl p-4 shadow-xl border border-white/40 hover:bg-white/95 transition-all backdrop-blur-sm flex flex-col animate-stagger-in"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="flex items-start gap-4 mb-4 flex-grow">
                <div className="p-3 bg-white rounded-2xl shadow-lg">
                  {solution.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl lg:text-2xl font-bold mb-2 text-brand-darkBlue">
                    {solution.title}
                  </h3>
                  <p className="text-base lg:text-lg text-gray-600 mb-3">
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
    </PageTransition>
  );
};

export default Solutions;
