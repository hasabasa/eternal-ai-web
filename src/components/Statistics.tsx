import React from "react";
import { useCounterAnimation } from "@/hooks/useCounterAnimation";

const stats = [
  {
    number: 90,
    suffix: "%",
    label: "увеличение конверсии",
    desc: "клиентов из соцсетей"
  },
  {
    number: 24,
    suffix: "/7",
    label: "работа без перерывов",
    desc: "365 дней в году"
  },
  {
    number: 70,
    suffix: "%",
    label: "экономия на зарплатах",
    desc: "операторов и менеджеров"
  },
  {
    number: 15,
    suffix: " мин",
    label: "время настройки",
    desc: "под ваш бизнес"
  }
];

const StatCard: React.FC<{ stat: typeof stats[0], index: number }> = ({ stat, index }) => {
  const { count } = useCounterAnimation({ 
    end: stat.number, 
    duration: 2000, 
    delay: index * 200 
  });

  return (
    <div className="text-center p-3 sm:p-4 bg-white/80 rounded-xl backdrop-blur-sm border border-white/40 hover:bg-white/95 transition-all shadow-lg hover-lift">
      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-orange mb-2">
        {count}{stat.suffix}
      </div>
      <div className="font-semibold text-sm sm:text-base text-brand-darkBlue mb-1">
        {stat.label}
      </div>
      <div className="text-xs sm:text-sm text-gray-600">
        {stat.desc}
      </div>
    </div>
  );
};

const Statistics: React.FC = () => (
  <div className="w-full max-w-5xl mx-auto px-4">
    <div className="text-center mb-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 text-brand-darkBlue">
        Результаты внедрения в цифрах
      </h2>
      <p className="text-sm sm:text-base text-gray-600">
        Конкретные показатели эффективности наших ИИ-решений
      </p>
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat, i) => (
        <StatCard key={i} stat={stat} index={i} />
      ))}
    </div>
  </div>
);

export default Statistics;