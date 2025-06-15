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
      className={`text-center p-2 sm:p-3 md:p-4 bg-white/80 rounded-lg sm:rounded-xl backdrop-blur-sm border border-white/40 hover:bg-white/95 transition-all shadow-lg animate-card-wave hover-lift will-animate stagger-${index + 1}`}
    >
      <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-brand-orange mb-1 sm:mb-2 animate-number-pop will-animate">
        {count}{stat.suffix}
      </div>
      <div className="font-semibold text-xs sm:text-sm md:text-base lg:text-lg text-brand-darkBlue mb-1 animate-text-reveal stagger-2 will-animate">
        {stat.label}
      </div>
      <div className="text-xs sm:text-sm md:text-base text-gray-600 animate-text-reveal stagger-3 will-animate">
        {stat.desc}
      </div>
    </div>
  );
};

const Statistics: React.FC = () => (
  <div className="w-full h-full flex items-center justify-center p-2 sm:p-4 md:p-6 animate-section-entrance">
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-3 sm:mb-4 md:mb-6">
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-1 sm:mb-2 md:mb-3 text-brand-darkBlue animate-title-wave stagger-1 will-animate">
          Результаты внедрения в цифрах
        </h2>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 animate-description-fade-up stagger-2 will-animate">
          Конкретные показатели эффективности наших ИИ-решений
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        {stats.map((stat, i) => (
          <StatCard key={i} stat={stat} index={i} />
        ))}
      </div>
    </div>
  </div>
);

export default Statistics;