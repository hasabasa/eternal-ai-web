
import React from "react";
import { MessageCircle, ShoppingCart, Calendar, BarChart3 } from "lucide-react";

const solutions = [
  {
    icon: <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-brand-purple" />,
    title: "Чат-боты для мессенджеров",
    desc: "Telegram, WhatsApp, Instagram Direct - автоматизация общения с клиентами",
    features: ["Обработка заявок", "Консультации 24/7", "Интеграция с CRM"]
  },
  {
    icon: <ShoppingCart className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-brand-orange" />,
    title: "Автоматизация продаж",
    desc: "От лида до закрытия сделки - ИИ ведёт клиента по всей воронке",
    features: ["Квалификация лидов", "Презентация товаров", "Обработка возражений"]
  },
  {
    icon: <Calendar className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-brand-purple" />,
    title: "Система бронирований",
    desc: "Автоматическое управление записями и бронированием услуг",
    features: ["Онлайн-запись", "Напоминания", "Управление расписанием"]
  },
  {
    icon: <BarChart3 className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-brand-orange" />,
    title: "Аналитика и отчёты",
    desc: "Глубокая аналитика взаимодействий и конверсий в реальном времени",
    features: ["Метрики эффективности", "Прогнозы продаж", "A/B тестирование"]
  }
];

const Solutions: React.FC = () => (
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 animate-fade-in">
    <div className="text-center mb-8 sm:mb-12 lg:mb-16">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 text-brand-darkBlue leading-tight">
        Комплексные ИИ-решения для бизнеса
      </h2>
      <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        Мы не просто создаём чат-ботов. Мы строим целые экосистемы, которые трансформируют ваш бизнес.
      </p>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
      {solutions.map((solution, i) => (
        <div
          key={i}
          className="bg-white/90 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg border border-gray-200 hover:shadow-xl transition-all group"
        >
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
            <div className="p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl shadow-sm group-hover:scale-110 transition-transform flex-shrink-0">
              {solution.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 text-brand-darkBlue">
                {solution.title}
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                {solution.desc}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {solution.features.map((feature, j) => (
              <span
                key={j}
                className="px-3 sm:px-4 py-1 sm:py-2 bg-brand-purple/10 text-brand-purple rounded-full text-xs sm:text-sm lg:text-base font-medium"
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
