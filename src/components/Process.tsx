import React from "react";
import { Search, Settings, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-brand-purple" />,
    title: "Анализ бизнеса",
    desc: "Изучаем ваши процессы",
    duration: "1-2 дня"
  },
  {
    icon: <Settings className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-brand-orange" />,
    title: "Настройка ИИ",
    desc: "Создаём ассистента под потребности",
    duration: "3-5 дней"
  },
  {
    icon: <Rocket className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-brand-purple" />,
    title: "Запуск",
    desc: "Подключаем к системам",
    duration: "1 день"
  },
  {
    icon: <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-brand-orange" />,
    title: "Оптимизация",
    desc: "Анализируем результаты",
    duration: "Постоянно"
  }
];

const Process: React.FC = () => (
  <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 animate-section-entrance">
    <div className="text-center mb-6 sm:mb-8 md:mb-12">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-brand-darkBlue animate-title-wave stagger-1 will-animate">
        Как мы внедряем ИИ в ваш бизнес
      </h2>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 max-w-4xl mx-auto animate-description-fade-up stagger-2 will-animate">
        Простой процесс от анализа до результата
      </p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
      {steps.map((step, i) => (
        <div key={i} className="relative">
          {i < steps.length - 1 && (
            <div className="hidden lg:block absolute top-12 left-full w-full h-1 bg-gradient-to-r from-brand-orange/30 to-transparent" />
          )}
          <div className={`bg-white/80 rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 text-center hover:bg-white/95 transition-all shadow-xl border border-white/40 backdrop-blur-sm h-full flex flex-col justify-between hover-lift will-animate animate-card-wave stagger-${i + 1}`}>
            <div>
              <div className="mb-3 sm:mb-4 md:mb-6 flex justify-center will-animate animate-icon-bounce stagger-1">
                {step.icon}
              </div>
              <div className="text-xs sm:text-sm md:text-base font-semibold text-brand-orange mb-2 sm:mb-3 md:mb-4 animate-title-wave stagger-2 will-animate">
                Шаг {i + 1}
              </div>
              <h3 className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl mb-2 sm:mb-3 md:mb-4 text-brand-darkBlue animate-title-wave stagger-3 will-animate">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 mb-3 sm:mb-4 md:mb-6 animate-description-fade-up stagger-4 will-animate">
                {step.desc}
              </p>
            </div>
            <div className="text-xs sm:text-sm md:text-base lg:text-lg bg-brand-purple/10 text-brand-purple px-2 sm:px-3 md:px-5 py-1 sm:py-2 md:py-3 rounded-full mt-auto animate-text-reveal stagger-5 will-animate">
              {step.duration}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Process;