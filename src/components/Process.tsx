import React from "react";
import { Search, Settings, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 text-brand-purple" />,
    title: "Анализ бизнеса",
    desc: "Изучаем ваши процессы",
    duration: "1-2 дня"
  },
  {
    icon: <Settings className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 text-brand-orange" />,
    title: "Настройка ИИ",
    desc: "Создаём ассистента под потребности",
    duration: "3-5 дней"
  },
  {
    icon: <Rocket className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 text-brand-purple" />,
    title: "Запуск",
    desc: "Подключаем к системам",
    duration: "1 день"
  },
  {
    icon: <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 text-brand-orange" />,
    title: "Оптимизация",
    desc: "Анализируем результаты",
    duration: "Постоянно"
  }
];

const Process: React.FC = () => (
  <div className="w-full h-full flex items-center justify-center p-2 sm:p-4 md:p-6 animate-section-entrance">
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-3 sm:mb-4 md:mb-6">
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-1 sm:mb-2 md:mb-3 text-brand-darkBlue animate-title-wave stagger-1 will-animate">
          Как мы внедряем ИИ в ваш бизнес
        </h2>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 animate-description-fade-up stagger-2 will-animate">
          Простой процесс от анализа до результата
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        {steps.map((step, i) => (
          <div key={i} className="relative">
            {i < steps.length - 1 && (
              <div className="hidden lg:block absolute top-8 left-full w-full h-1 bg-gradient-to-r from-brand-orange/30 to-transparent" />
            )}
            <div className={`bg-white/80 rounded-lg sm:rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-4 text-center hover:bg-white/95 transition-all shadow-xl border border-white/40 backdrop-blur-sm h-full flex flex-col justify-between hover-lift will-animate animate-card-wave stagger-${i + 1}`}>
              <div>
                <div className="mb-2 sm:mb-3 md:mb-4 flex justify-center will-animate animate-icon-bounce stagger-1">
                  {step.icon}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-brand-orange mb-1 sm:mb-2 animate-title-wave stagger-2 will-animate">
                  Шаг {i + 1}
                </div>
                <h3 className="font-bold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl mb-1 sm:mb-2 md:mb-3 text-brand-darkBlue animate-title-wave stagger-3 will-animate">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-2 sm:mb-3 animate-description-fade-up stagger-4 will-animate">
                  {step.desc}
                </p>
              </div>
              <div className="text-xs sm:text-sm bg-brand-purple/10 text-brand-purple px-2 sm:px-3 py-1 sm:py-2 rounded-full mt-auto animate-text-reveal stagger-5 will-animate">
                {step.duration}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Process;