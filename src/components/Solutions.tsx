
import React from "react";
import { MessageCircle, ShoppingCart, Calendar, BarChart3 } from "lucide-react";

const solutions = [
  {
    icon: <MessageCircle className="w-12 h-12 text-aurora5" />,
    title: "Чат-боты для мессенджеров",
    desc: "Telegram, WhatsApp, Instagram Direct - автоматизация общения с клиентами",
    features: ["Обработка заявок", "Консультации 24/7", "Интеграция с CRM"]
  },
  {
    icon: <ShoppingCart className="w-12 h-12 text-aurora2" />,
    title: "Автоматизация продаж",
    desc: "От лида до закрытия сделки - ИИ ведёт клиента по всей воронке",
    features: ["Квалификация лидов", "Презентация товаров", "Обработка возражений"]
  },
  {
    icon: <Calendar className="w-12 h-12 text-aurora3" />,
    title: "Система бронирований",
    desc: "Автоматическое управление записями и бронированием услуг",
    features: ["Онлайн-запись", "Напоминания", "Управление расписанием"]
  },
  {
    icon: <BarChart3 className="w-12 h-12 text-aurora4" />,
    title: "Аналитика и отчёты",
    desc: "Глубокая аналитика взаимодействий и конверсий в реальном времени",
    features: ["Метрики эффективности", "Прогнозы продаж", "A/B тестирование"]
  }
];

const Solutions: React.FC = () => (
  <div className="max-w-6xl mx-auto px-4 animate-fade-in">
    <div className="text-center mb-16">
      <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-primary">
        Комплексные ИИ-решения для бизнеса
      </h2>
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
        Мы не просто создаём чат-ботов. Мы строим целые экосистемы, которые трансформируют ваш бизнес.
      </p>
    </div>
    
    <div className="grid md:grid-cols-2 gap-8">
      {solutions.map((solution, i) => (
        <div
          key={i}
          className="bg-white/90 rounded-3xl p-10 shadow-lg border border-muted hover:shadow-xl transition-all group"
        >
          <div className="flex items-start gap-6 mb-6">
            <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
              {solution.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-3 text-primary">
                {solution.title}
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                {solution.desc}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {solution.features.map((feature, j) => (
              <span
                key={j}
                className="px-4 py-2 bg-aurora5/10 text-aurora5 rounded-full text-base font-medium"
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
