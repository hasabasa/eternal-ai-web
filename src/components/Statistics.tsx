
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
  <div className="max-w-6xl mx-auto px-8 sm:px-12 animate-fade-in">
    <div className="text-center mb-10">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-brand-darkBlue">
        Результаты внедрения в цифрах
      </h2>
      <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto">
        Конкретные показатели эффективности наших ИИ-решений
      </p>
    </div>
    
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="text-center p-8 bg-white/80 rounded-xl backdrop-blur-sm border border-white/40 hover:bg-white/95 transition-all shadow-lg"
        >
          <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-orange mb-4">
            {stat.number}
          </div>
          <div className="font-semibold text-lg lg:text-xl text-brand-darkBlue mb-2">
            {stat.label}
          </div>
          <div className="text-base lg:text-lg text-gray-600">
            {stat.desc}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Statistics;
