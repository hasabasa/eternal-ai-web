
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
  <section className="max-w-6xl mx-auto px-4 py-16 animate-fade-in">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="text-center p-4 bg-white/60 rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/80 transition-all"
        >
          <div className="text-2xl md:text-3xl font-bold text-aurora4 mb-1">
            {stat.number}
          </div>
          <div className="font-semibold text-sm md:text-base text-primary mb-1">
            {stat.label}
          </div>
          <div className="text-xs md:text-sm text-muted-foreground">
            {stat.desc}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Statistics;
