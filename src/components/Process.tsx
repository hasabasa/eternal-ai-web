import React from "react";
import { Search, Settings, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-brand-purple" />,
    title: "Анализ бизнеса",
    desc: "Изучаем ваши процессы",
    duration: "1-2 дня"
  },
  {
    icon: <Settings className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-brand-orange" />,
    title: "Настройка ИИ",
    desc: "Создаём ассистента под потребности",
    duration: "3-5 дней"
  },
  {
    icon: <Rocket className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-brand-purple" />,
    title: "Запуск",
    desc: "Подключаем к системам",
    duration: "1 день"
  },
  {
    icon: <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-brand-orange" />,
    title: "Оптимизация",
    desc: "Анализируем результаты",
    duration: "Постоянно"
  }
];

const Process: React.FC = () => (
  <div className="max-w-6xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 xl:px-16 py-4 sm:py-6 md:py-8 animate-section-entrance">
    <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-6 text-brand-darkBlue animate-title-wave stagger-1 will-animate">
        Как мы внедряем ИИ в ваш бизнес
      </h2>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto animate-description-fade-up stagger-2 will-animate">
        Простой процесс от анализа до результата
      </p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
      {steps.map((step, i) => (
        <div key={i} className="relative">
          {i < steps.length - 1 && (
            <div className="hidden lg:block absolute top-12 left-full w-full h-1 bg-gradient-to-r from-brand-orange/30 to-transparent" />
          )}
          <div className={`bg-white/80 rounded-xl sm:rounded-2xl md:rounded-3xl p-2 sm:p-3 md:p-4 lg:p-6 text-center hover:bg-white/95 transition-all shadow-xl border border-white/40 backdrop-blur-sm h-full flex flex-col justify-between hover-lift will-animate animate-card-wave stagger-${i + 1}`}>
            <div>
              <div className="mb-2 sm:mb-3 md:mb-4 lg:mb-6 flex justify-center will-animate animate-icon-bounce stagger-1">
                {step.icon}
              </div>
              <div className="text-xs sm:text-sm md:text-base font-semibold text-brand-orange mb-1 sm:mb-2 md:mb-3 lg:mb-4 animate-title-wave stagger-2 will-animate">
                Шаг {i + 1}
              </div>
              <h3 className="font-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-1 sm:mb-2 md:mb-3 lg:mb-4 text-brand-darkBlue animate-title-wave stagger-3 will-animate">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 mb-2 sm:mb-3 md:mb-4 lg:mb-6 animate-description-fade-up stagger-4 will-animate">
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