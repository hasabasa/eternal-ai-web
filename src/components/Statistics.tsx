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
    <div
      className={`text-center p-6 bg-white/80 rounded-2xl backdrop-blur-sm border border-white/40 hover:bg-white/95 transition-all shadow-lg animate-card-wave hover-lift will-animate stagger-${index + 1}`}
    >
      <div className="text-4xl lg:text-6xl font-bold text-brand-orange mb-4 animate-counter-count will-animate">
        {count}{stat.suffix}
      </div>
      <div className="font-semibold text-lg lg:text-xl text-brand-darkBlue mb-3">
        {stat.label}
      </div>
      <div className="text-base lg:text-lg text-gray-600">
        {stat.desc}
      </div>
    </div>
  );
};

const Statistics: React.FC = () => (
  <div className="max-w-6xl mx-auto px-8 animate-curtain-reveal">
    <div className="text-center mb-12">
      <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-brand-darkBlue animate-title-wave stagger-1 will-animate">
        Результаты внедрения в цифрах
      </h2>
      <p className="text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto animate-description-fade-up stagger-2 will-animate">
        Конкретные показатели эффективности наших ИИ-решений
      </p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <StatCard key={i} stat={stat} index={i} />
      ))}
    </div>
  </div>
);

export default Statistics;
