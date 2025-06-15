
import React from "react";
import PageTransition from "./PageTransition";

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
  <PageTransition
    title="Результаты внедрения в цифрах"
    subtitle="Конкретные показатели эффективности наших ИИ-решений"
  >
    <div className="max-w-6xl mx-auto px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="text-center p-6 bg-white/80 rounded-2xl backdrop-blur-sm border border-white/40 hover:bg-white/95 transition-all shadow-lg animate-stagger-in"
            style={{ animationDelay: `${i * 150}ms` }}
          >
            <div className="text-4xl lg:text-6xl font-bold text-brand-orange mb-4">
              {stat.number}
            </div>
            <div className="font-semibold text-lg lg:text-xl text-brand-darkBlue mb-3">
              {stat.label}
            </div>
            <div className="text-base lg:text-lg text-gray-600">
              {stat.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  </PageTransition>
);

export default Statistics;
