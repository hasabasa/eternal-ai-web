
import React from "react";
import { MessageCircle, ShoppingCart, Calendar, BarChart3, Zap, Users } from "lucide-react";

const solutions = [
  {
    icon: <MessageCircle className="w-8 h-8 text-aurora5" />,
    title: "Чат-боты для мессенджеров",
    desc: "Telegram, WhatsApp, Instagram Direct - автоматизация общения с клиентами",
    features: ["Обработка заявок", "Консультации 24/7", "Интеграция с CRM"]
  },
  {
    icon: <ShoppingCart className="w-8 h-8 text-aurora2" />,
    title: "Автоматизация продаж",
    desc: "От лида до закрытия сделки - ИИ ведёт клиента по всему воронке",
    features: ["Квалификация лидов", "Презентация товаров", "Обработка возражений"]
  },
  {
    icon: <Calendar className="w-8 h-8 text-aurora3" />,
    title: "Система бронирований",
    desc: "Автоматическое управление записями и бронированием услуг",
    features: ["Онлайн-запись", "Напоминания", "Управление расписанием"]
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-aurora4" />,
    title: "Аналитика и отчёты",
    desc: "Глубокая аналитика взаимодействий и конверсий в реальном времени",
    features: ["Метрики эффективности", "Прогнозы продаж", "A/B тестирование"]
  }
];

const Solutions: React.FC = () => (
  <section className="max-w-6xl mx-auto px-4 py-16 md:py-24 animate-fade-in">
    <div className="text-center mb-16">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-primary">
        Комплексные ИИ-решения для бизнеса
      </h2>
      <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
        Мы не просто создаём чат-ботов. Мы строим целые экосистемы, которые трансформируют ваш бизнес.
      </p>
    </div>
    
    <div className="grid md:grid-cols-2 gap-8">
      {solutions.map((solution, i) => (
        <div
          key={i}
          className="bg-white/90 rounded-2xl p-8 shadow-lg border border-muted hover:shadow-xl transition-all group"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
              {solution.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2 text-primary">
                {solution.title}
              </h3>
              <p className="text-muted-foreground mb-4">
                {solution.desc}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {solution.features.map((feature, j) => (
              <span
                key={j}
                className="px-3 py-1 bg-aurora5/10 text-aurora5 rounded-full text-sm font-medium"
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
