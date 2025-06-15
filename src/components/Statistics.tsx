
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
  <div className="max-w-7xl mx-auto px-8 animate-fade-in">
    <div className="text-center mb-16">
      <h2 className="text-5xl lg:text-7xl font-bold mb-8 text-brand-darkBlue">
        Результаты внедрения в цифрах
      </h2>
      <p className="text-2xl lg:text-3xl text-gray-600 max-w-5xl mx-auto">
        Конкретные показатели эффективности наших ИИ-решений
      </p>
    </div>
    
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="text-center p-12 bg-white/80 rounded-2xl backdrop-blur-sm border border-white/40 hover:bg-white/95 transition-all shadow-lg"
        >
          <div className="text-6xl lg:text-8xl font-bold text-brand-orange mb-6">
            {stat.number}
          </div>
          <div className="font-semibold text-2xl lg:text-3xl text-brand-darkBlue mb-4">
            {stat.label}
          </div>
          <div className="text-xl lg:text-2xl text-gray-600">
            {stat.desc}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Statistics;
