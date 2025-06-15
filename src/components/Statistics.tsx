
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
  <div className="max-w-6xl mx-auto px-4 animate-fade-in">
    <div className="text-center mb-16">
      <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-brand-darkBlue">
        Результаты внедрения в цифрах
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Конкретные показатели эффективности наших ИИ-решений
      </p>
    </div>
    
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="text-center p-8 bg-white/70 rounded-3xl backdrop-blur-sm border border-white/30 hover:bg-white/90 transition-all shadow-lg"
        >
          <div className="text-4xl md:text-5xl font-bold text-brand-orange mb-3">
            {stat.number}
          </div>
          <div className="font-semibold text-lg md:text-xl text-brand-darkBlue mb-2">
            {stat.label}
          </div>
          <div className="text-base md:text-lg text-gray-600">
            {stat.desc}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Statistics;
