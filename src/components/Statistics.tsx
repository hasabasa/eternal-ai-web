
import React from "react";

const stats = [
  {
    number: "90%",
    label: "увеличение конверсии",
    desc: "клиентов из соцсетей"
  },
  {
    number: "24/7",
    label: "работа без перерывов",
    desc: "365 дней в году"
  },
  {
    number: "70%",
    label: "экономия на зарплатах",
    desc: "операторов и менеджеров"
  },
  {
    number: "15 мин",
    label: "время настройки",
    desc: "под ваш бизнес"
  }
];

const Statistics: React.FC = () => (
  <div className="max-w-4xl mx-auto px-6 sm:px-8 animate-fade-in">
    <div className="text-center mb-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-3 text-brand-darkBlue">
        Результаты внедрения в цифрах
      </h2>
      <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
        Конкретные показатели эффективности наших ИИ-решений
      </p>
    </div>
    
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="text-center p-4 bg-white/80 rounded-xl backdrop-blur-sm border border-white/40 hover:bg-white/95 transition-all shadow-lg"
        >
          <div className="text-2xl md:text-3xl font-bold text-brand-orange mb-2">
            {stat.number}
          </div>
          <div className="font-semibold text-sm text-brand-darkBlue mb-1">
            {stat.label}
          </div>
          <div className="text-xs text-gray-600">
            {stat.desc}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Statistics;
