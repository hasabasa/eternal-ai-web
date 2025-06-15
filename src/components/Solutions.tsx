
import React from "react";
import { MessageCircle, ShoppingCart, Calendar, BarChart3 } from "lucide-react";

const solutions = [
  {
    icon: <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-brand-purple" />,
    title: "Чат-боты для мессенджеров",
    desc: "Telegram, WhatsApp, Instagram Direct - автоматизация общения с клиентами",
    features: ["Обработка заявок", "Консультации 24/7", "Интеграция с CRM"]
  },
  {
    icon: <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-brand-orange" />,
    title: "Автоматизация продаж",
    desc: "От лида до закрытия сделки - ИИ ведёт клиента по всей воронке",
    features: ["Квалификация лидов", "Презентация товаров", "Обработка возражений"]
  },
  {
    icon: <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-brand-purple" />,
    title: "Система бронирований",
    desc: "Автоматическое управление записями и бронированием услуг",
    features: ["Онлайн-запись", "Напоминания", "Управление расписанием"]
  },
  {
    icon: <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-brand-orange" />,
    title: "Аналитика и отчёты",
    desc: "Глубокая аналитика взаимодействий и конверсий в реальном времени",
    features: ["Метрики эффективности", "Прогнозы продаж", "A/B тестирование"]
  }
];

const Solutions: React.FC = () => (
  <section className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-4 h-full flex flex-col justify-center">
    <div className="text-center mb-2 sm:mb-4">
      <h2 className="text-base sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2 text-brand-darkBlue leading-tight">
        Комплексные ИИ-решения для бизнеса
      </h2>
      <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Мы не просто создаём чат-ботов. Мы строим целые экосистемы.
      </p>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 flex-1">
      {solutions.map((solution, i) => (
        <div
          key={i}
          className="bg-white/90 rounded-lg p-2 sm:p-3 shadow-lg border border-gray-200 hover:shadow-xl transition-all group h-full flex flex-col"
        >
          <div className="flex items-start gap-2 mb-2">
            <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform flex-shrink-0">
              {solution.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xs sm:text-sm font-bold mb-1 text-brand-darkBlue line-clamp-2">
                {solution.title}
              </h3>
              <p className="text-xs text-gray-600 mb-2 leading-relaxed line-clamp-2">
                {solution.desc}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1 mt-auto">
            {solution.features.map((feature, j) => (
              <span
                key={j}
                className="px-1.5 sm:px-2 py-0.5 bg-brand-purple/10 text-brand-purple rounded-full text-xs font-medium"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Solutions;
