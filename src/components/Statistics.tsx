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
      className={`text-center p-3 sm:p-4 md:p-6 bg-white/80 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-white/40 hover:bg-white/95 transition-all shadow-lg animate-card-wave hover-lift will-animate stagger-${index + 1}`}
    >
      <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-brand-orange mb-2 sm:mb-3 md:mb-4 animate-number-pop will-animate">
        {count}{stat.suffix}
      </div>
      <div className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl text-brand-darkBlue mb-1 sm:mb-2 md:mb-3 animate-text-reveal stagger-2 will-animate">
        {stat.label}
      </div>
      <div className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 animate-text-reveal stagger-3 will-animate">
        {stat.desc}
      </div>
    </div>
  );
};

const Statistics: React.FC = () => (
  <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 animate-section-entrance">
    <div className="text-center mb-6 sm:mb-8 md:mb-12">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-brand-darkBlue animate-title-wave stagger-1 will-animate">
        Результаты внедрения в цифрах
      </h2>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 max-w-4xl mx-auto animate-description-fade-up stagger-2 will-animate">
        Конкретные показатели эффективности наших ИИ-решений
      </p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
      {stats.map((stat, i) => (
        <StatCard key={i} stat={stat} index={i} />
      ))}
    </div>
  </div>
);

export default Statistics;