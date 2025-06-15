import React from "react";
import { Search, Settings, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-8 h-8 sm:w-12 sm:h-12 text-brand-purple" />,
    title: "Анализ бизнеса",
    desc: "Изучаем ваши процессы",
    duration: "1-2 дня"
  },
  {
    icon: <Settings className="w-8 h-8 sm:w-12 sm:h-12 text-brand-orange" />,
    title: "Настройка ИИ",
    desc: "Создаём ассистента под потребности",
    duration: "3-5 дней"
  },
  {
    icon: <Rocket className="w-8 h-8 sm:w-12 sm:h-12 text-brand-purple" />,
    title: "Запуск",
    desc: "Подключаем к системам",
    duration: "1 день"
  },
  {
    icon: <TrendingUp className="w-8 h-8 sm:w-12 sm:h-12 text-brand-orange" />,
    title: "Оптимизация",
    desc: "Анализируем результаты",
    duration: "Постоянно"
  }
];

const Process: React.FC = () => (
  <div className="max-w-6xl mx-auto responsive-padding animate-section-entrance">
    <div className="text-center mb-8 sm:mb-12">
      <h2 className="responsive-title font-bold mb-4 sm:mb-6 text-brand-darkBlue animate-title-wave stagger-1 will-animate">
        Как мы внедряем ИИ в ваш бизнес
      </h2>
      <p className="responsive-text text-gray-600 max-w-4xl mx-auto animate-description-fade-up stagger-2 will-animate">
        Простой процесс от анализа до результата
      </p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
      {steps.map((step, i) => (
        <div key={i} className="relative">
          {i < steps.length - 1 && (
            <div className="hidden lg:block absolute top-12 left-full w-full h-1 bg-gradient-to-r from-brand-orange/30 to-transparent" />
          )}
          <div className={`bg-white/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center hover:bg-white/95 transition-all shadow-xl border border-white/40 backdrop-blur-sm h-full flex flex-col justify-between hover-lift will-animate animate-card-wave stagger-${i + 1}`}>
            <div>
              <div className="mb-4 sm:mb-6 flex justify-center will-animate animate-icon-bounce stagger-1">
                {step.icon}
              </div>
              <div className="text-sm sm:text-base font-semibold text-brand-orange mb-3 sm:mb-4 animate-title-wave stagger-2 will-animate">
                Шаг {i + 1}
              </div>
              <h3 className="font-bold text-lg sm:text-xl lg:text-2xl mb-3 sm:mb-4 text-brand-darkBlue animate-title-wave stagger-3 will-animate">
                {step.title}
              </h3>
              <p className="responsive-text text-gray-600 mb-4 sm:mb-6 animate-description-fade-up stagger-4 will-animate">
                {step.desc}
              </p>
            </div>
            <div className="responsive-text bg-brand-purple/10 text-brand-purple px-3 sm:px-5 py-2 sm:py-3 rounded-full mt-auto animate-text-reveal stagger-5 will-animate">
              {step.duration}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Process;