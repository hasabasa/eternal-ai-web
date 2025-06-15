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
      className={`text-center p-2 sm:p-3 md:p-4 lg:p-6 bg-white/80 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-white/40 hover:bg-white/95 transition-all shadow-lg animate-card-wave hover-lift will-animate stagger-${index + 1}`}
    >
      <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-brand-orange mb-1 sm:mb-2 md:mb-3 lg:mb-4 animate-number-pop will-animate">
        {count}{stat.suffix}
      </div>
      <div className="font-semibold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-brand-darkBlue mb-1 sm:mb-2 animate-text-reveal stagger-2 will-animate">
        {stat.label}
      </div>
      <div className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 animate-text-reveal stagger-3 will-animate">
        {stat.desc}
      </div>
    </div>
  );
};

const Statistics: React.FC = () => (
  <div className="max-w-6xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 xl:px-16 py-4 sm:py-6 md:py-8 animate-section-entrance">
    <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-6 text-brand-darkBlue animate-title-wave stagger-1 will-animate">
        Результаты внедрения в цифрах
      </h2>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto animate-description-fade-up stagger-2 will-animate">
        Конкретные показатели эффективности наших ИИ-решений
      </p>
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
      {stats.map((stat, i) => (
        <StatCard key={i} stat={stat} index={i} />
      ))}
    </div>
  </div>
);

export default Statistics;